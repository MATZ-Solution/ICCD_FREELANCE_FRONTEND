
import { useState, useRef, useEffect } from "react"
import { Settings, Check, X } from "lucide-react"
import NotificationBell from "./notificationBell"
import { useGetNotification, useUpdateReadNot } from "../../api/client/notification"
import { useSelector } from "react-redux"
import ErrorMessage from "./ErrorMessage"

export default function NotificationDropdown() {

  const user = useSelector((state) => state.userType.user);
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const { data, error, isLoading, isError } = useGetNotification(user)
  const { error: isUpdateErr, isLoading: isUpdateLoad, isError: isUpdateLoadIsErr } = useUpdateReadNot(user)

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="absolute right-0 mt-3 w-52 lg:w-96 max-h-[500px] bg-white border border-gray-200/60 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
        {/* Header */}

        {data?.length === 0 ?
          <ErrorMessage title='No Notification found' isShowSecondTitle={false} />
          :
          <>
            {/* <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/60">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-lg">Notifications</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-200/60 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div> */}

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {
                data?.map((item, index) => (
                  <div key={index} className={`group relative px-4 py-4 border-b border-gray-100/60 hover:bg-gray-100 transition-all duration-200} `}>
                    <div className="ml-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm leading-5 mb-1 truncate">{item?.title}</h4>
                          <p className="text-gray-600 text-sm leading-5 mb-2 line-clamp-2">{item?.message}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">
                              {/* {moment(n.created_at).fromNow()} */}
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            // onClick={() => handleMarkAsRead(n.id)}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors group/btn"
                          >
                            <Check className="h-3.5 w-3.5 text-gray-400 group-hover/btn:text-green-600" />
                          </button>
                          <button
                            // onClick={() => handleRemoveFromUI(n.id)}
                            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group/btn"
                          >
                            <X className="h-3.5 w-3.5 text-gray-400 group-hover/btn:text-red-600" />
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}
