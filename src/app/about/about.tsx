"use client";

import { IoRocketOutline, IoHeartOutline, IoTimeOutline, IoTrophyOutline } from "react-icons/io5";

const stats = [
  { number: "5+", label: "Years Experience", icon: IoTimeOutline },
  { number: "100+", label: "Projects Completed", icon: IoRocketOutline },
  { number: "50+", label: "Happy Clients", icon: IoHeartOutline },
  { number: "15+", label: "Awards Won", icon: IoTrophyOutline },
];

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Visionary leader with 10+ years of experience in tech innovation."
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Full-stack developer passionate about creating scalable solutions."
  },
  {
    name: "Mike Johnson",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Creative designer with a keen eye for user experience and aesthetics."
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Lovosis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a passionate team of developers, designers, and innovators dedicated to creating exceptional digital experiences that transform businesses.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Lovosis, we strive to bridge the gap between imagination and technology. Our mission is to deliver innovative digital solutions that empower businesses to thrive in the modern digital landscape.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in creating lasting partnerships with our clients, understanding their unique challenges, and delivering solutions that exceed expectations.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
