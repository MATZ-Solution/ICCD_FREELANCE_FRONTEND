import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  const reviews = [
    {
      name: "Aisha Rahman",
      company: "Global Impact Ventures",
      text: "ICCD Talent Gate made it incredibly easy to connect with skilled professionals from across the Muslim world. The platform is trustworthy, values-driven, and delivers real results. We found top-tier talent while supporting a meaningful global mission.",
      role: "CEO"
    },
    {
      name: "Omar Al-Hassan",
      company: "Nexa Digital Solutions",
      text: "What sets ICCD Talent Gate apart is its focus on ethics, transparency, and community upliftment. The quality of freelancers and the seamless collaboration experience helped us scale projects across borders with confidence.",
      role: "CTO"
    },
    {
      name: "Fatima Noor",
      company: "EduSpark Initiative",
      text: "Through ICCD Talent Gate, we accessed passionate professionals who truly understand impact-driven work. It's more than a freelancing platform — it's a movement empowering sustainable digital careers across OIC member states.",
      role: "Founder"
    },
  ]

  const nextReview = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What Our <span className="text-transparent bg-clip-text  bg-gradient-to-t from-[#1B2A39] to-[#15A9B2] ">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover how we've helped businesses connect with exceptional talent worldwide
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex justify-center mb-8">
                <Quote className="w-16 h-16 text-blue-100" />
              </div>

              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
                "{reviews[activeIndex].text}"
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full  bg-gradient-to-t from-[#1B2A39] to-[#15A9B2]  flex items-center justify-center text-white text-xl font-bold">
                  {reviews[activeIndex].name.charAt(0)}
                </div>
                <div className="text-left">
                  <h5 className="text-lg font-semibold text-gray-900">{reviews[activeIndex].name}</h5>
                  <p className="text-sm text-gray-500">{reviews[activeIndex].role} at {reviews[activeIndex].company}</p>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? "w-8  bg-gradient-to-t from-[#1B2A39] to-[#15A9B2] " 
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={prevReview}
              className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={nextReview}
              className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}