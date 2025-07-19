import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react"

const PaymentCancel = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Error Animation */}
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-red-200 rounded-full mx-auto animate-ping opacity-30"></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Cancelled ❌</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your payment was not completed.
              <br />
              You can try again or go back to shopping.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 mb-4">Choose your next action:</p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>

              <button
                onClick={() => navigate("/products")}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCancel
