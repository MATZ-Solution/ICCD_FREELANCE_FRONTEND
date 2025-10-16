import React, { useEffect, useState } from "react";
import { X, Star } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddRating } from "../../api/client/review";

const schema = yup.object().shape({
  rating: yup.number().min(1, "Please select a rating").required(),
  review: yup.string().required("Review is required").min(10, "At least 10 characters"),
});

const ReviewModal = ({ orderData, isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { rating: 0, review: "" },
  });

  const { addRating, isSuccess, isPending, isError, error } = useAddRating();

  // Handle API response
  useEffect(() => {
    if (isSuccess) {
      console.log("✅ Rating added successfully");
      onSubmit({ rating: control._formValues.rating, review: control._formValues.review });
      reset();
      onClose();
    }
    if (isError) {
      console.error("❌ Error adding rating:", error);
      setSubmitError(error?.message || "Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  }, [isSuccess, isError, error]);

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      console.log("📝 Review Form Submitted Data:", data);
      console.log("📦 Order Data for Review:", orderData);
      console.log("📋 All orderData fields:", Object.keys(orderData || {}));

      const orderId = orderData?.id || orderData?.orderId || orderData?.order_id;
      const clientId = orderData?.client_id || orderData?.clientId || orderData?.buyer_id;
      const freelancerId = orderData?.freelancer_id || orderData?.freelancerId || orderData?.seller_id;

      if (!orderId) {
        throw new Error("❌ Order ID is missing. Available fields: " + Object.keys(orderData || {}).join(", "));
      }

      if (!clientId) {
        console.warn("⚠️ Client ID is missing");
      }

      if (!freelancerId) {
        console.warn("⚠️ Freelancer ID is missing");
      }

      const ratingData = { 
        rating: data.rating,
        review: data.review,
        order_id: orderId,
        client_id: clientId, 
        freelancer_id: freelancerId 
      };

      console.log("🚀 Sending Rating Data to API:", ratingData);
      console.log("📤 Full payload structure:", JSON.stringify(ratingData, null, 2));
      addRating(ratingData);
    } catch (err) {
      console.error("❌ Error submitting review:", err);
      setSubmitError(err.message || "An error occurred while submitting your review.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  console.log("💬 Review Modal Opened:", orderData);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose} 
          disabled={isSubmitting || isPending}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave a Review</h2>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        console.log("⭐ Selected Rating:", star);
                        field.onChange(star);
                      }}
                      disabled={isSubmitting || isPending}
                      className="focus:outline-none disabled:opacity-50 transition-opacity"
                    >
                      <Star
                        size={28}
                        className={star <= field.value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-sm text-red-500">{errors.rating.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="review"
            control={control}
            render={({ field }) => (
              <div className="mb-4">
                <textarea
                  {...field}
                  rows="4"
                  placeholder="Write your review..."
                  disabled={isSubmitting || isPending}
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 disabled:bg-gray-50"
                  onChange={(e) => {
                    console.log("🖊 Review Text Changed:", e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
                {errors.review && (
                  <p className="text-sm text-red-500 mt-1">{errors.review.message}</p>
                )}
              </div>
            )}
          />

          <button 
            type="submit" 
            disabled={isSubmitting || isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 rounded-lg mt-3 transition-colors duration-200"
          >
            {isSubmitting || isPending ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;