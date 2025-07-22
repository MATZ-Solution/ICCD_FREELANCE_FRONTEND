
import { useEffect, useState, useRef } from "react"
import { Bell, Check, X, Settings } from "lucide-react"
import { useSelector } from "react-redux"
import io from "socket.io-client"
import axios from "axios"
import moment from "moment"

const socket = io("http://localhost:2300") 

export default function NotificationDropdown() {
  const userDetails = useSelector((state) => state.user.userDetails)
  const [notifications, setNotifications] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleRemoveFromUI = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:2300/notifications/read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      )
    } catch (error) {
      console.error("Failed to mark as read:", error)
    }
  }

  useEffect(() => {
    if (userDetails?.id) {
      socket.emit("join", userDetails.id)
      socket.on(`notify_${userDetails.id}`, (notification) => {
        setNotifications((prev) => [notification, ...prev])
      })
    }

    return () => {
      if (userDetails?.id) {
        socket.off(`notify_${userDetails.id}`)
      }
    }
  }, [userDetails])

  useEffect(() => {
    if (userDetails?.id) {
      axios
        .get(`http://localhost:2300/notifications/get`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setNotifications(res.data.data || []))
        .catch((err) => console.error("Fetch error:", err))
    }
  }, [userDetails])

  const unreadCount = notifications.filter((n) => !n.is_read).length

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="relative p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 hover:scale-105 group"
      >
        <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse border-2 border-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-96 max-h-[500px] bg-white border border-gray-200/60 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/60">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
                <button className="p-1.5 hover:bg-gray-200/60 rounded-lg transition-colors">
                  <Settings className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No notifications yet</p>
                <p className="text-gray-400 text-sm mt-1">We'll notify you when something arrives!</p>
              </div>
            ) : (
              notifications.map((n, index) => (
                <div
                  key={n.id}
                  className={`group relative px-4 py-4 border-b border-gray-100/60 hover:bg-gray-50/60 transition-all duration-200 ${
                    n.is_read ? "bg-green-50" : "bg-blue-50/30"
                  } ${index === notifications.length - 1 ? "border-b-0" : ""}`}
                >
                  {!n.is_read && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  <div className="ml-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm leading-5 mb-1 truncate">{n.title}</h4>
                        <p className="text-gray-600 text-sm leading-5 mb-2 line-clamp-2">{n.message}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-medium">
                            {moment(n.created_at).fromNow()}
                          </span>
                         {n.is_read ? (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                    Readed
                                </span>
                                ) : (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                    New
                                </span>
                                )}

                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(n.id)}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors group/btn"
                          >
                            <Check className="h-3.5 w-3.5 text-gray-400 group-hover/btn:text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveFromUI(n.id)}
                          className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group/btn"
                        >
                          <X className="h-3.5 w-3.5 text-gray-400 group-hover/btn:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
