import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, ArrowRight, Home, Receipt } from "lucide-react"

export default function PaymentSuccess() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">

        {/* Success Animation */}
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-30"></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Thank you for your purchase!
              <br />
              Your payment has been processed successfully.
            </p>
          </div>
        </div>

        {/* Success Card */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Receipt className="w-5 h-5" />
              <span className="font-medium">Transaction Complete</span>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-700">Your Desired Freelancer Will Soon Contact You.</p>
              <p className="text-sm text-gray-500">Please check your inbox for transaction details.</p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">What would you like to do next?</p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/client")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
            <p className="text-sm text-gray-600 mb-3">Need help? Our support team is available 24/7</p>
            <div className="flex justify-center space-x-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Contact Support
              </button>
              <span className="text-gray-300">•</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Help Center
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
