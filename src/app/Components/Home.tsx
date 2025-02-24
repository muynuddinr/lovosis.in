"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { IoRocketOutline, IoLayersOutline, IoCodeSlashOutline, IoTrophyOutline, IoCheckmarkCircleOutline, IoTimeOutline, IoBarChartOutline, IoPeopleOutline } from 'react-icons/io5';

// Enhanced features array with more items
const features = [
  {
    icon: IoRocketOutline,
    title: "Fast Performance",
    description: "Lightning-fast solutions optimized for maximum efficiency and speed."
  },
  {
    icon: IoLayersOutline,
    title: "Scalable Solutions",
    description: "Build and grow with architectures that scale with your needs."
  },
  {
    icon: IoCodeSlashOutline,
    title: "Clean Code",
    description: "Maintainable and efficient code following best practices."
  },
  {
    icon: IoTrophyOutline,
    title: "Award Winning",
    description: "Recognized excellence in digital solutions and innovation."
  }
];

// New statistics array
const statistics = [
  { number: "98%", label: "Client Satisfaction", icon: IoCheckmarkCircleOutline },
  { number: "24/7", label: "Support Available", icon: IoTimeOutline },
  { number: "500+", label: "Projects Completed", icon: IoBarChartOutline },
  { number: "50+", label: "Expert Team Members", icon: IoPeopleOutline }
];

// New testimonials array
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content: "Working with this team has transformed our business operations completely. Their innovative solutions and dedication to excellence are unmatched.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Michael Chen",
    role: "CTO, InnovateX",
    content: "The level of technical expertise and professional support we received was exceptional. They delivered beyond our expectations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section - Enhanced with more dynamic elements */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
            >
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
                Welcome to the Future of Digital Innovation
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6"
            >
              Transform Your Digital Vision
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              We craft innovative solutions that empower businesses to thrive in the digital age. 
              From web development to IT services, we're your partner in digital transformation.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/services" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 text-center">
                Explore Services
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-blue-100 text-center">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section - Enhanced with animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine innovation with expertise to deliver exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - New */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-10 h-10 text-white/80 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your ideas to life. Transform your business with our innovative solutions.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute left-0 top-0 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
