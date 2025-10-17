import {
  Search,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileText,
  Upload,
  X,
} from "lucide-react";

export const Modal = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  type = "default",
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative transform transition-all scale-100">
      {/* Close Button */}
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
          type === "success"
            ? "bg-green-100"
            : type === "danger"
            ? "bg-red-100"
            : "bg-blue-100"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-8 h-8 text-green-600" />
        ) : type === "danger" ? (
          <AlertTriangle className="w-8 h-8 text-red-600" />
        ) : (
          <Clock className="w-8 h-8 text-blue-600" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
        {title}
      </h3>

      {description && (
        <p className="text-gray-600 mb-8 text-center">{description}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 px-6 py-3 text-white rounded-xl font-medium transition-colors ${
            type === "success"
              ? "bg-green-600 hover:bg-green-700"
              : type === "danger"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);
