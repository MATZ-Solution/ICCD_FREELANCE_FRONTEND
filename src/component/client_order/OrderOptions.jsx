import { useState, useEffect, memo } from "react"
import { X, Package, Truck, RotateCcw, Minus, Plus, Check } from "lucide-react"
import { setOrderDetails } from "../../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function OrderOptions({
  isOpen,
  onClose,
  packageType,
  packageDescription,
  delivery,
  revisions,
  basePrice = 0,
  freelancer_id,
  freelancer_client_id,
  client_id,
  gig_id


}) {
  const [quantity, setQuantity] = useState(1);
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

    navigate("/client/payment"); // redirect to payment page
  };

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setIsLoading(false);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        flex items-center justify-center p-4 sm:p-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-96 sm:rounded-none`}
      >
        <div
          className={`bg-white rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none w-full sm:w-96 h-auto sm:h-screen max-h-[90vh] sm:max-h-none flex flex-col overflow-hidden
          ${isOpen ? "scale-100 sm:translate-x-0" : "scale-95 sm:translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Order Details</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content - Scrollable on mobile, fit on desktop */}
          <div className="flex-1 overflow-y-auto sm:overflow-hidden flex flex-col">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 sm:overflow-y-auto">
              
              {/* Package Card */}
              <div className="rounded-xl p-4 sm:p-5 border-2 border-[#40978A]/20 bg-gradient-to-br from-[#40978A]/8 to-[#40978A]/5 hover:border-[#40978A]/40 transition-all flex-shrink-0">
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className="w-3 h-3 bg-[#40978A] rounded-full mt-1.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg break-words">{packageType}</h3>
                    </div>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-[#40978A] whitespace-nowrap flex-shrink-0">
                    ${basePrice?.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-5 sm:pl-6">{packageDescription}</p>
              </div>

              {/* Single Order Option */}
              <div className="flex-shrink-0">
                <h4 className="font-semibold mb-2 sm:mb-3 text-gray-900 text-xs sm:text-sm uppercase tracking-wide">Order Frequency</h4>
                <div className="border-2 border-[#40978A]/30 rounded-lg p-3 sm:p-4 bg-[#40978A]/5 cursor-pointer hover:border-[#40978A]/60 transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                      <div className="w-5 h-5 rounded-full border-2 border-[#40978A] bg-[#40978A] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">Single Order</span>
                    </div>
                    <span className="font-bold text-[#40978A] text-sm sm:text-lg whitespace-nowrap">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-between mb-2 sm:mb-4 gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Quantity</span>
                  <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gray-100 rounded-lg p-1.5 flex-shrink-0">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-white hover:border-[#40978A] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                    <span className="font-semibold text-sm sm:text-lg min-w-[2rem] sm:min-w-[2.5rem] text-center text-gray-900">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-white hover:border-[#40978A] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                {quantity > 1 && (
                  <p className="text-xs text-gray-500">
                    ${basePrice.toLocaleString()} × {quantity} = <span className="font-semibold text-gray-700">${subtotal.toLocaleString()}</span>
                  </p>
                )}
              </div>

              {/* Package Features */}
              <div className="space-y-2.5 sm:space-y-3 bg-gray-50 rounded-lg p-3 sm:p-4 flex-shrink-0">
                <div className="flex items-center space-x-2 sm:space-x-3 gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#40978A]/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-[#40978A]" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium break-words">{packageType} Package</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#40978A]/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-[#40978A]" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">{delivery}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#40978A]/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-4 h-4 text-[#40978A]" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">{revisions}</span>
                </div>
              </div>
            </div>

            {/* Price Summary & Button - Always visible at bottom */}
            <div className="border-t border-gray-200 bg-white px-4 sm:px-6 py-4 sm:py-6 flex-shrink-0 space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Subtotal ({quantity}×${basePrice.toLocaleString()})
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200">
                  <span className="text-sm sm:text-lg font-bold text-gray-900">Total Price</span>
                  <span className="text-lg sm:text-2xl font-bold text-[#40978A]">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="w-full bg-[#40978A] hover:bg-[#357068] active:bg-[#2d5c5a] disabled:bg-[#40978A]/50 text-white py-3 sm:py-3.5 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 sm:mr-3" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Continue to Payment</span>
                )}
              </button>
              <p className="text-xs text-center text-gray-500 font-medium">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(OrderOptions)