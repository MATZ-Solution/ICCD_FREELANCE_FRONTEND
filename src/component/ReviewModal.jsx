import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object().shape({
  rating: yup.number().min(1, "Please select a rating").required(),
  review: yup.string().required("Review is required").min(10, "At least 10 characters"),
});

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [hover, setHover] = useState(0);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { rating: 0, review: "" },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Rating */}
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => field.onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`${
                        star <= (hover || field.value)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          />
          {errors.rating && (
            <p className="text-sm text-red-500">{errors.rating.message}</p>
          )}

          {/* Review */}
          <Controller
            name="review"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows="4"
                placeholder="Write your review..."
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-2"
              />
            )}
          />
          {errors.review && (
            <p className="text-sm text-red-500">{errors.review.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg mt-3"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
