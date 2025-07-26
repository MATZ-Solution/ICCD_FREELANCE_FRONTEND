"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import dp from "../assets/contactheader.png"
import { ChevronRight, Disc } from "lucide-react"
import ticker from "../assets/tick.png"

export default function ContactPage() {
  // Yup validation schema
  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
    company: yup
      .string()
      .required("Company organization is required")
      .min(2, "Company name must be at least 2 characters"),
    email: yup.string().required("Email is required").email("Please enter a valid email address"),
    phone: yup
      .string()
      .matches(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
      .nullable(),
    country: yup.string().required("Please select a country"),
    message: yup.string().max(500, "Message must be less than 500 characters").nullable(),
  })

  // useForm hook
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    },
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      company: "UPWORK",
      logo: "U",
      color: "blue",
      text: "Working with freelancers through this platform has been incredible. The quality of talent and ease of management tools have transformed how we approach projects.",
      author: "Sarah Johnson",
      role: "Head of Operations",
    },
    {
      company: "FIVERR",
      logo: "F",
      color: "teal",
      text: "The platform streamlined our entire freelancer workflow. From finding talent to managing payments, everything is seamless and professional.",
      author: "Michael Chen",
      role: "Project Manager",
    },
    {
      company: "FREELANCER",
      logo: "FL",
      color: "gray",
      text: "Outstanding support and an amazing network of professionals. This platform has become essential to our business operations.",
      author: "Emily Rodriguez",
      role: "Creative Director",
    },
    {
      company: "TOPTAL",
      logo: "T",
      color: "purple",
      text: "The quality of freelancers and the platform's project management tools have exceeded our expectations. Highly recommended for any business.",
      author: "David Kim",
      role: "Tech Lead",
    },
    {
      company: "99DESIGNS",
      logo: "99",
      color: "green",
      text: "This platform has revolutionized how we work with creative professionals. The talent pool is exceptional and the tools are intuitive.",
      author: "Lisa Wang",
      role: "Design Director",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      console.log("Form submitted with values:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Form submitted successfully!")
      reset()
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const colorClasses = {
    blue: "bg-blue-600 text-white",
    teal: "bg-teal-600 text-white",
    gray: "bg-gray-600 text-white",
    purple: "bg-purple-600 text-white",
    green: "bg-green-600 text-white",
  }

  const logoColorClasses = {
    blue: "bg-blue-500",
    teal: "bg-teal-500",
    gray: "bg-gray-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
  }

  const textColorClasses = {
    blue: "text-blue-100",
    teal: "text-teal-100",
    gray: "text-gray-100",
    purple: "text-purple-100",
    green: "text-green-100",
  }

  const roleColorClasses = {
    blue: "text-blue-200",
    teal: "text-teal-200",
    gray: "text-gray-200",
    purple: "text-purple-200",
    green: "text-green-200",
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative w-full">
        <img
          src={dp}
          alt="Contact header"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
        />
      </header>

      {/* Main Content */}
      <main className="bg-[#F3FDF9] flex flex-col items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Everything businesses need to work with top freelancers
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Get access to a curated network of independent professionals and the tools to manage and pay them.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3">
                <Disc className="text-teal-600 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                    Find the right talent fast
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Browse our freelancer directory with 1,000+ trusted pros, ask for referrals, or let us find talent
                    for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Disc className="text-teal-600 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                    Get work and payment management
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Easily manage contracts and invoices through our platform that streamlines the entire workflow from
                    project start to finish.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Disc className="text-teal-600 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                    Experience peace of mind
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Get dedicated support for every freelancing project, plus legal and compliance coverage that takes
                    the admin work off your plate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-gray-50 shadow-xl p-6 sm:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl text-center font-semibold mb-4 text-gray-900">
              Feel Free to Contact Us
            </h3>
            <img className="mx-auto w-8 sm:w-16 mb-4" src={ticker} alt="Tick icon" />

            <div
              onClick={(e) => e.preventDefault()}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="firstName"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="lastName"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company / Organization
                </label>
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="company"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base ${
                        errors.company ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.company && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Company email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      id="phone"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  How Can We Help You
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="country"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select an option</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
                {errors.country && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="message"
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical text-sm sm:text-base ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us about your project..."
                    />
                  )}
                />
                {errors.message && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full bg-[#043A53] text-white py-2 sm:py-3 px-6 rounded-md font-semibold hover:bg-teal-800 disabled:bg-teal-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Schedule a free consultation →"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Testimonials Carousel Section */}
      <section className="bg-gray-100 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center sm:text-left">
            Trusted by leading <span className="text-teal-600">Brands and Startups</span>
          </h2>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Carousel Container */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
                    {testimonials.slice(index, index + 3).map((testimonialData, offset) => (
                      <div
                        key={offset}
                        className={`${colorClasses[testimonialData.color]} p-4 sm:p-6 md:p-8 rounded-lg`}
                      >
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div
                              className={`${logoColorClasses[testimonialData.color]} w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center`}
                            >
                              <span className="text-xs sm:text-sm font-bold">{testimonialData.logo}</span>
                            </div>
                            <span className="font-semibold text-sm sm:text-base">{testimonialData.company}</span>
                          </div>
                          <p className={`${textColorClasses[testimonialData.color]} text-xs sm:text-sm mb-4`}>
                            "{testimonialData.text}"
                          </p>
                          <div className="text-xs sm:text-sm">
                            <p className="font-semibold">{testimonialData.author}</p>
                            <p className={roleColorClasses[testimonialData.color]}>{testimonialData.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-teal-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}