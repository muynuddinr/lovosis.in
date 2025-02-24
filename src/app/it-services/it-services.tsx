"use client";

import { IoCodeSlash, IoCloudDone, IoShieldCheckmark, IoTrendingUp } from "react-icons/io5";

const services = [
  {
    title: "Software Development",
    description: "Custom software solutions tailored to your business needs, from web applications to enterprise systems.",
    icon: IoCodeSlash,
    features: [
      "Full-stack web development",
      "Mobile app development",
      "Custom software solutions",
      "API development and integration"
    ]
  },
  {
    title: "Cloud Computing",
    description: "Comprehensive cloud solutions to modernize your infrastructure and improve scalability.",
    icon: IoCloudDone,
    features: [
      "Cloud migration services",
      "Cloud infrastructure management",
      "Serverless architecture",
      "Cloud optimization"
    ]
  },
  {
    title: "Cybersecurity",
    description: "Protect your digital assets with our advanced cybersecurity solutions and best practices.",
    icon: IoShieldCheckmark,
    features: [
      "Security assessments",
      "Threat detection and prevention",
      "Data encryption",
      "Security compliance"
    ]
  },
  {
    title: "Digital Transformation",
    description: "Transform your business with innovative digital solutions and modern technologies.",
    icon: IoTrendingUp,
    features: [
      "Digital strategy consulting",
      "Process automation",
      "Legacy system modernization",
      "Digital workflow optimization"
    ]
  }
];

export default function ITServices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            IT Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering your business with cutting-edge technology solutions and expert IT services
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
