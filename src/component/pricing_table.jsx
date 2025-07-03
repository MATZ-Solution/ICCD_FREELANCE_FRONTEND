import React from "react";

export default function PricingTable() {
  const plans = [
    {
      title: "Basic",
      price: "$50",
      description: "A simple solution to get started.",
      features: ["1 Page Design", "Responsive", "2 Revisions"],
    },
    {
      title: "Standard",
      price: "$100",
      description: "A full-featured design package.",
      features: ["Up to 5 Pages", "Responsive", "5 Revisions", "Basic SEO"],
    },
    {
      title: "Premium",
      price: "$200",
      description: "Advanced custom design with extras.",
      features: [
        "Unlimited Pages",
        "Responsive + Animations",
        "Unlimited Revisions",
        "SEO + Speed Optimization",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-3xl font-bold text-gray-800 mb-4">
                {plan.price}
              </p>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="bg-[#043A53] hover:bg-[#065070] text-white py-2 rounded-full transition duration-300">
              Select {plan.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
