import React from 'react';

interface Service {
  title: string;
  description: string;
  icon?: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Custom website development using modern technologies and frameworks.",
    icon: "💻"
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile application development.",
    icon: "📱"
  },
  {
    title: "Cloud Solutions",
    description: "Cloud infrastructure setup and maintenance services.",
    icon: "☁️"
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            We offer a wide range of digital solutions to help your business grow
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
