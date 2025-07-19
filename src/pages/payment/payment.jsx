"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import figmathumbnail from "../../assets/client_dashboard/blog1.png"
import { useSelector } from "react-redux"

const Payment = () => {
  const [method, setMethod] = useState("card")
  const cardRef = useRef(null)
  const paypalRef = useRef(null)
  const [cardHeight, setCardHeight] = useState("0px")
  const [paypalHeight, setPaypalHeight] = useState("0px")

  const order = useSelector((state) => state.order)
  const { quantity, basePrice, totalPrice, packageType, packageDescription, delivery, revisions } = order

  useEffect(() => {
    setCardHeight(method === "card" ? `${cardRef.current.scrollHeight}px` : "0px")
    setPaypalHeight(method === "paypal" ? `${paypalRef.current.scrollHeight}px` : "0px")
  }, [method])

  if (!order.packageType)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💳</span>
          </div>
          <p className="text-xl font-semibold text-gray-800">No order selected</p>
        </div>
      </div>
    )

  const handleCheckout = async () => {
    try {
      const lineItems = [
        {
          name: order.packageType + " Package",
          price: order.totalPrice * 100,
          quantity: order.quantity || 1,
        },
      ]

      const res = await fetch("http://localhost:2300/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderDetails: lineItems,
          paymentMethod: method,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to create checkout session")
      }

      const responseData = await res.json()
      if (responseData.url) {
        window.location.href = responseData.url
      } else {
        console.error("Stripe URL not received")
      }
    } catch (err) {
      console.error("Checkout Error:", err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Secure checkout powered by industry-leading encryption
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 lg:gap-12">
          {/* Payment Options */}
          <div className="flex flex-col gap-8 w-full md:w-3/5 lg:w-2/3">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">💳</span>
                  Select Payment Method
                </h2>
              </div>

              {/* Card Option */}
              <div className="border-b border-gray-100 overflow-hidden">
                <button
                  onClick={() => setMethod("card")}
                  className="w-full flex justify-between items-center px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group"
                >
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      {method === "card" && (
                        <div className="absolute inset-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        💳
                      </div>
                      <div className="text-left">
                        <span className="text-lg font-semibold text-gray-800 block">Credit & Debit Cards</span>
                        <span className="text-sm text-gray-500">Visa, Mastercard, Amex</span>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded">VISA</span>
                      <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded">MC</span>
                    </div>
                    {method === "card" ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    )}
                  </div>
                </button>
                <div
                  ref={cardRef}
                  style={{ maxHeight: cardHeight }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🔒</div>
                      <p className="text-sm text-blue-800 font-medium">
                        Pay securely using your credit or debit card on the next page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PayPal Option */}
              <div className="overflow-hidden">
                <button
                  onClick={() => setMethod("paypal")}
                  className="w-full flex justify-between items-center px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group"
                >
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={method === "paypal"}
                        onChange={() => setMethod("paypal")}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      {method === "paypal" && (
                        <div className="absolute inset-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        🅿️
                      </div>
                      <div className="text-left">
                        <span className="text-lg font-semibold text-gray-800 block">PayPal</span>
                        <span className="text-sm text-gray-500">Pay with PayPal account</span>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:block px-2 py-1 bg-blue-100 text-xs font-medium rounded text-blue-700">
                      PAYPAL
                    </span>
                    {method === "paypal" ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    )}
                  </div>
                </button>
                <div
                  ref={paypalRef}
                  style={{ maxHeight: paypalHeight }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🔒</div>
                      <p className="text-sm text-blue-800 font-medium">
                        You will be redirected to PayPal to complete the payment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">📋</span>
                  Billing Information
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your invoice will be issued according to the details listed here.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <span className="text-gray-600 font-medium">Account</span>
                    <span className="font-semibold text-gray-800">butt1997</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <span className="text-gray-600 font-medium">Country</span>
                    <span className="font-semibold text-gray-800">Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">📦</span>
                    Order Summary
                  </h2>
                </div>

                <div className="p-6">
                  <div className="flex gap-4 items-start mb-6">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={figmathumbnail || "/placeholder.svg"}
                        alt="Thumbnail"
                        className="w-24 h-16 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed flex-1">{packageDescription}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 text-lg">{packageType} Package</span>
                      <span className="font-bold text-gray-900 text-lg">PKR {totalPrice}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{quantity} page(s)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{delivery} day delivery</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">{revisions} revisions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="px-6 pb-6 border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      PKR {totalPrice}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">🔒</span>
                    Confirm & Pay
                  </button>

                  <p className="text-xs text-gray-600 text-center mt-4 leading-relaxed">
                    You will be charged PKR {totalPrice}. Includes any conversion fees.
                    <br />
                    <span className="font-medium text-green-600">✓ 256-bit SSL encrypted</span>
                  </p>
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
