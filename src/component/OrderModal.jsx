const OrderModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

export default OrderModal;