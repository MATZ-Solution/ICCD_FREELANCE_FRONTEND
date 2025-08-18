import { useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import figmathumbnail from "../../assets/client_dashboard/blog1.png"
import { useSelector } from "react-redux"

const Payment = () => {
  const [method, setMethod] = useState("card")

  const order = useSelector((state) => state.order)
  const { quantity, basePrice, totalPrice, packageType, packageDescription, delivery, revisions } = order
  console.log("orders: ", order)

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

      const res = await fetch("https://iccd.freelanceserver.matzsolutions.com/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderDetails: lineItems,
          paymentMethod: method,
        }),
      })

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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">💳</span>
                  Select Payment Method
                </h2>
              </div>

              {/* Card Option */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setMethod("card")}
                  className="w-full flex justify-between items-center px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer group"
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={method === "card"}
                      onChange={() => setMethod("card")}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">💳</div>
                      <div className="text-left">
                        <span className="text-lg font-semibold text-gray-800 block">Credit & Debit Cards</span>
                        <span className="text-sm text-gray-500">Visa, Mastercard, Amex</span>
                      </div>
                    </div>
                  </label>
                  {method === "card" ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {method === "card" && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-t border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🔒</div>
                      <p className="text-sm text-blue-800 font-medium">
                        Pay securely using your credit or debit card on the next page.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* PayPal Option
              <div>
                <button
                  onClick={() => setMethod("paypal")}
                  className="w-full flex justify-between items-center px-6 py-5 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer group"
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={method === "paypal"}
                      onChange={() => setMethod("paypal")}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">🅿</div>
                      <div className="text-left">
                        <span className="text-lg font-semibold text-gray-800 block">PayPal</span>
                        <span className="text-sm text-gray-500">Pay with PayPal account</span>
                      </div>
                    </div>
                  </label>
                  {method === "paypal" ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {method === "paypal" && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-t border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🔒</div>
                      <p className="text-sm text-blue-800 font-medium">
                        You will be redirected to PayPal to complete the payment.
                      </p>
                    </div>
                  </div>
                )}
              </div> */}
            </div>

            {/* Billing Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">📋 Billing Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 mb-4">Your invoice will be issued according to the details listed here.</p>
                <div className="flex justify-between bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-600">Account</span>
                  <span className="font-semibold text-gray-800">butt1997</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-600">Country</span>
                  <span className="font-semibold text-gray-800">Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">📦 Order Summary</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <img
                      src={figmathumbnail || "/placeholder.svg"}
                      alt="Thumbnail"
                      className="w-24 h-16 object-cover rounded-lg shadow"
                    />
                    <p className="text-sm text-gray-700">{packageDescription}</p>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{packageType} Package</span>
                    <span>$ {totalPrice}</span>
                  </div>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600" />
                      {quantity} page(s)
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-blue-600" />
                      {delivery} day delivery
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-purple-600" />
                      {revisions} revisions
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t pt-4">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      $ {totalPrice}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] transition transform font-semibold flex items-center justify-center gap-2"
                  >
                    🔒 Confirm & Pay
                  </button>
                  <p className="text-xs text-gray-600 text-center">
                    You will be charged $ {totalPrice}. Includes any conversion fees.
                    <br />
                    <span className="text-green-600 font-medium">✓ 256-bit SSL encrypted</span>
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