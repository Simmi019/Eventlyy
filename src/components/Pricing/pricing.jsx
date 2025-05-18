import React, { useState } from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "₹1,499",
      description: "Perfect for small events and beginners",
      features: ["Up to 3 events", "Basic analytics", "Email support"],
      button: "Get Started",
      border: false,
    },
    {
      name: "Pro",
      price: "₹3,999",
      description: "Ideal for growing businesses",
      features: ["Up to 10 events", "Advanced analytics", "Priority support", "Custom branding"],
      button: "Get Started",
      border: true, // Most Popular
    },
    {
      name: "Enterprise",
      price: "₹9,999",
      description: "For large organizations and events",
      features: ["Unlimited events", "Real-time analytics", "Dedicated account manager", "API access"],
      button: "Contact Sales",
      border: false,
    },
  ];

  // FAQ State for Toggle
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  return (
    <section id="pricing" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Affordable Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Choose the perfect plan for your event needs. No hidden charges, just simple and transparent pricing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-md p-6 md:p-8 transition duration-300 hover:shadow-lg transform hover:scale-105 ${
                plan.border ? "border-2 border-purple-600" : ""
              }`}
            >
              {plan.border && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4 md:mb-6">{plan.description}</p>
              <div className="flex items-end mb-4 md:mb-6">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2 text-sm">/month</span>
              </div>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 sm:py-3 px-4 sm:px-6 ${
                  plan.border
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                } font-medium rounded-lg transition duration-300 text-sm sm:text-base`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 md:mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 md:space-y-6">
            {[
              { question: "Can I change my plan later?", answer: "Yes, you can upgrade or downgrade anytime. Changes will reflect in your next billing cycle." },
              { question: "Is there a free trial available?", answer: "Yes, we offer a 14-day free trial on all plans. No credit card required." },
              { question: "Do you offer discounts for non-profits?", answer: "We provide special pricing for non-profit organizations. Contact our sales team for details." },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-4 md:p-6 cursor-pointer transition-all duration-300"
                onClick={() => toggleFAQ(i)}
              >
                <h4 className="flex justify-between items-center font-semibold text-gray-900 text-sm sm:text-base">
                  {faq.question}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openFAQ === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </h4>
                {openFAQ === i && (
                  <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
