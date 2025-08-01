
import { useState, useEffect, memo } from "react"
import { X, Package, Truck, RotateCcw, Minus, Plus, Check } from "lucide-react"
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom"

function OrderOptions({
  isOpen,
  onClose,
  packageType,
  packageDescription,
  delivery,
  revisions,
  basePrice = 2980,
  freelancer_id,
  freelancer_client_id,
  client_id,
  gig_id
}) {
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("single");
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = basePrice * quantity;
  const totalPrice = subtotal;

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleContinue = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    dispatch(setOrderDetails({
      quantity,
      basePrice,
      totalPrice,
      packageType,
      packageDescription,
      delivery,
      revisions,
      freelancer_id,
      freelancer_client_id,
      client_id,
      gig_id
    }));

    navigate("/payment"); // redirect to payment page
  };

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setOrderType("single");
      setIsLoading(false);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        flex flex-col shadow-2xl border-l border-gray-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Order options</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <h3 className="font-semibold text-gray-900">{packageType}</h3>
              </div>
              <span className="text-xl font-bold text-blue-600">
                PKR {basePrice?.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{packageDescription} || In tempore harum ma In tempore harum ma In tempore harum ma In tempore harum maIn tempore harum maIn tempore harum  </p>
          </div>

          {/* Order Frequency */}
          <div>
            <h4 className="font-medium mb-3 text-gray-900">How often do you need this order?</h4>
            <div
              className={`border rounded-lg p-3 cursor-pointer ${orderType === "single"
                  ? "border-teal-500 bg-teal-50 shadow-sm"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              onClick={() => setOrderType("single")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${orderType === "single" ? "border-teal-500 bg-teal-500" : "border-gray-300"
                      }`}
                  >
                    {orderType === "single" && <Check className="w-2 h-2 text-white" />}
                  </div>
                  <span className="text-sm font-medium">Single order</span>
                </div>
                <span className="font-semibold text-gray-900">PKR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Gig Quantity</span>


              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-lg min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {quantity > 1 && (
              <p className="text-xs text-gray-500">
                PKR {basePrice.toLocaleString()} × {quantity} = PKR {subtotal.toLocaleString()}
              </p>
            )}
          </div>

          {/* Price Summary */}
          <div className="border-t border-gray-300 pt-4 bg-gray-50 -mx-4 px-4 pb-4">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Subtotal ({quantity} × PKR {basePrice.toLocaleString()})
                </span>
                <span className="text-sm font-medium">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-300 pt-2">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-teal-600">PKR {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{packageType} Package</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{delivery}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">{revisions} Revisons</span>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white py-3 rounded-lg font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(OrderOptions)
