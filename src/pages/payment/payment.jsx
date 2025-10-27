import { useState } from "react"
import { ChevronDown, ChevronUp, Check, Lock, Shield } from "lucide-react"
import figmathumbnail from "../../assets/client_dashboard/blog1.png"
import { useSelector } from "react-redux"

const Payment = () => {
  const [method, setMethod] = useState("card")
  const order = useSelector((state) => state.order)
  const { quantity, totalPrice, packageType, packageDescription, delivery, revisions } = order

  if (!order.packageType)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-[#40978A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">No Order Selected</p>
          <p className="text-gray-500 text-sm mt-2">Please select an order to proceed with payment</p>
        </div>
      </div>
    )

  const handleCheckout = async () => {
    try {
      const lineItems = [
        {
          name: `${packageType} Package`,
          price: totalPrice * 100,
          quantity: quantity || 1,
        },
      ]

      const res = await fetch(
        "https://iccd.freelanceserver.matzsolutions.com/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderDetails: lineItems, paymentMethod: method }),
        }
      )

      const responseData = await res.json()
      if (responseData.url) window.location.href = responseData.url
      else console.error("Stripe URL not received")
    } catch (err) {
      console.error("Checkout Error:", err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Complete Your Payment
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-1">
            <Shield className="w-4 h-4 text-[#40978A]" />
            Secure checkout powered by industry-leading encryption
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Payment Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#40978A] to-[#357068] px-4 sm:px-6 py-4">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Payment Method
                </h2>
              </div>

              {/* Card Payment Option */}
              <div className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => setMethod("card")}
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-4 hover:bg-gradient-to-r hover:from-[#40978A]/5 hover:to-transparent transition-all duration-200"
                >
                  <label className="flex items-center cursor-pointer w-full gap-3 sm:gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      method === "card" 
                        ? "border-[#40978A] bg-[#40978A]" 
                        : "border-gray-300"
                    }`}>
                      {method === "card" && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#40978A]/20 to-[#40978A]/10 rounded-lg flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                      💳
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 block">Credit & Debit Card</span>
                      <span className="text-xs sm:text-sm text-gray-500">Visa, Mastercard, Amex</span>
                    </div>
                  </label>
                  {method === "card" ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {method === "card" && (
                  <div className="bg-gradient-to-r from-[#40978A]/5 to-transparent px-4 sm:px-6 py-3 sm:py-4 border-t border-[#40978A]/10">
                    <div className="flex items-start gap-3">
                      <Shield className="w-4 h-4 text-[#40978A] flex-shrink-0 mt-0.5" />
                      <p className="text-xs capitalize sm:text-sm text-gray-700">
                        Your payment information is encrypted and secured. You'll be redirected to a secure payment page to complete your transaction.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#40978A]/90 to-[#357068]/90 px-4 sm:px-6 py-4">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  📋 Billing Information
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <p className="text-sm text-gray-600">Your invoice will be issued according to the details below.</p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">Account</span>
                    <span className="font-semibold text-gray-900">ICCD Talent Gate Escrow</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">Country</span>
                    <span className="font-semibold text-gray-900">Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#40978A] to-[#357068] px-4 sm:px-6 py-4">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    📦 Order Summary
                  </h2>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  
                  {/* Package Info */}
                  <div className="flex gap-3">
                    {/* <img
                      src={figmathumbnail || "/placeholder.svg"}
                      alt="Thumbnail"
                      className="w-20 h-16 sm:w-24 sm:h-16 object-cover rounded-lg shadow-sm flex-shrink-0"
                    /> */}
                    <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">{packageDescription}</p>
                  </div>

                  {/* Package Type & Price */}
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-sm capitalize sm:text-base font-semibold text-gray-900">{packageType} Package</span>
                    <span className="text-lg sm:text-xl font-bold text-[#40978A]">${totalPrice}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#40978A] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{quantity} {quantity === 1 ? 'page' : 'pages'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#40978A] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{delivery} day delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#40978A] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{revisions} revisions</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-br from-[#40978A]/5 to-[#40978A]/10 p-4 rounded-lg border border-[#40978A]/20">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Total Amount</span>
                      <span className="text-2xl sm:text-3xl font-bold text-[#40978A]">${totalPrice}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#40978A] to-[#357068] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all duration-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                    Confirm & Pay
                  </button>

                  {/* Security Badge */}
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                      You will be charged <span className="font-semibold text-gray-900">${totalPrice}</span>
                      <br />
                      <span className="text-[#40978A] font-medium flex items-center justify-center gap-1 mt-1">
                        <Shield className="w-3 h-3" />
                        256-bit SSL encrypted
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment