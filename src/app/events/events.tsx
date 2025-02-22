"use client";

import { useState } from "react";
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline, IoBookmarkOutline } from "react-icons/io5";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "tech" | "design" | "business" | "development";
  type: "workshop" | "seminar" | "conference";
  speaker: {
    name: string;
    role: string;
  };
  tags: string[];
  isFeatured: boolean;
}

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEventId, setActiveEventId] = useState<number | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: "Future of Web Development",
      date: "August 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Innovation Hub",
      description: "Explore the latest trends and technologies shaping the future of web development. Join us for an insightful discussion on modern frameworks, tools, and best practices.",
      category: "tech",
      type: "conference",
      speaker: {
        name: "Sarah Chen",
        role: "Tech Lead at WebFlow"
      },
      tags: ["web", "development", "innovation"],
      isFeatured: true
    },
    {
      id: 2,
      title: "UI/UX Design Workshop",
      date: "September 5, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Design Studio",
      description: "Learn practical UI/UX design techniques and principles. This hands-on workshop will cover the entire design process from wireframing to final implementation.",
      category: "design",
      type: "workshop",
      speaker: {
        name: "Alex Rivera",
        role: "Senior Designer"
      },
      tags: ["design", "ui", "ux"],
      isFeatured: false
    }
  ];

  const categories = ["all", "tech", "design", "business", "development"];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header Section - Reduced vertical spacing */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-4 animate-gradient">
            Upcoming Events
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our community of innovators and creators at these exciting events
          </p>
        </div>

        {/* Search & Filters - Reduced spacing */}
        <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-14">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search events or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-base placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105
                  ${selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-50 hover:shadow-md'}
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid - Updated card padding and spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setActiveEventId(event.id)}
              className={`
                group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer
                ${event.isFeatured ? 'border-2 border-gray-100' : ''}
                ${activeEventId === event.id ? 'ring-2 ring-purple-500' : ''}
              `}
            >
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-3">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: IoCalendarOutline, text: event.date },
                    { icon: IoTimeOutline, text: event.time },
                    { icon: IoLocationOutline, text: event.location }
                  ].map((detail, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600 group-hover:text-indigo-600 transition-colors">
                      <detail.icon className="text-xl" />
                      <span className="text-sm sm:text-base">{detail.text}</span>
                    </div>
                  ))}
                </div>

                {/* Speaker */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center text-white text-base font-medium shadow-lg transform group-hover:scale-110 transition-transform">
                    {event.speaker.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{event.speaker.name}</p>
                    <p className="text-xs text-gray-600">{event.speaker.role}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] shadow-md text-sm">
                  <IoBookmarkOutline className="text-lg" />
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
