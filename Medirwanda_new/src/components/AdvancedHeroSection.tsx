import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, Users } from 'lucide-react';
import './AdvancedHeroSection.css';

export default function AdvancedHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
      const event = e as MouseEvent;
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { number: '10K+', label: 'Active Patients' },
    { number: '500+', label: 'Medical Professionals' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Available Support' },
  ];

  const features = [
    { icon: Zap, text: 'Lightning Fast Consultations' },
    { icon: Shield, text: 'Bank-Level Security' },
    { icon: Users, text: 'Expert Network' },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Grid Background */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, .05) 25%, rgba(255, 0, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, .05) 75%, rgba(255, 0, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 255, .05) 25%, rgba(255, 0, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, .05) 75%, rgba(255, 0, 255, .05) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
          }}
        ></div>

        {/* Floating particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--i': i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-md hover:border-purple-500/60 transition-all duration-300">
              <Zap size={16} className="text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Revolutionizing Healthcare in Rwanda
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Your Health,{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Our Priority
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              Experience the future of healthcare with MediRwanda. Connect with certified medical
              professionals, receive instant consultations, and manage your health—all from your
              fingertips.
            </p>

            {/* Feature List with Icons */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                    style={{
                      animation: `slideInLeft 0.6s ease-out ${0.2 + index * 0.1}s both`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon size={20} className="text-purple-300" />
                    </div>
                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Start Free Consultation</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <button className="group px-8 py-4 border-2 border-purple-500/50 text-white font-bold rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-700/50">
              <p className="text-sm text-gray-400 mb-4">Trusted by healthcare professionals</p>
              <div className="flex items-center gap-6">
                {['USAID', 'Rwanda MOH', 'Kigali Health'].map((org, i) => (
                  <div
                    key={i}
                    className="text-xs font-semibold text-gray-400 px-4 py-2 rounded-lg border border-gray-700/50 backdrop-blur-sm"
                  >
                    {org}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Demo Card */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              {/* Glowing Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-t-2xl"></div>

                {/* Mock Stats Dashboard */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Your Health Overview</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Heart Rate', value: '72', unit: 'bpm', color: 'bg-red-500/10' },
                      { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', color: 'bg-blue-500/10' },
                      { label: 'Temperature', value: '36.8', unit: '°C', color: 'bg-orange-500/10' },
                      { label: 'O2 Saturation', value: '98', unit: '%', color: 'bg-cyan-500/10' },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={`${stat.color} border border-gray-700/50 rounded-lg p-4 hover:border-gray-600 transition-all duration-300`}
                      >
                        <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">
                          {stat.value}
                          <span className="text-xs ml-1 text-gray-400">{stat.unit}</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Consultation Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group/btn">
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle size={18} />
                      Book Consultation
                    </span>
                  </button>

                  {/* Activity Feed */}
                  <div className="space-y-3 pt-6 border-t border-gray-700/50">
                    {['Vitals Checked', 'Prescription Filled', 'Doctor Available'].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{activity}</span>
                        <CheckCircle size={16} className="text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute top-0 -left-20 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform hover:scale-110 cursor-pointer p-4 flex items-center justify-center text-white font-bold text-center backdrop-blur-xl border border-white/20">
              <span className="text-sm">Fast & Secure</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-20 border-t border-gray-700/50">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center hover:bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
              style={{
                animation: `fadeInUp 0.6s ease-out ${0.6 + index * 0.1}s both`,
              }}
            >
              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <p className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors">
            Scroll to explore
          </p>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center group-hover:border-purple-400 transition-colors">
            <div className="w-1 h-2 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
