import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Healthcare at Your Fingertips
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with trusted healthcare professionals, book consultations, manage prescriptions,
              and access quality healthcare services all in one platform.
            </p>

            {/* Key Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">24/7 Telemedicine Consultations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">Licensed Medical Professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">Secure & Private Healthcare Records</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">Easy Prescription Management</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition">
                Schedule Demo
              </button>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Trusted by over 10,000+ patients in Rwanda</p>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">4.9★</p>
                  <p className="text-xs text-gray-500">App Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">98%</p>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">500+</p>
                  <p className="text-xs text-gray-500">Doctors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="hidden md:flex justify-center">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-lg p-8">
                <div className="space-y-4">
                  <div className="bg-blue-100 h-12 rounded-lg"></div>
                  <div className="bg-blue-50 h-32 rounded-lg"></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-100 h-16 rounded-lg"></div>
                    <div className="bg-blue-100 h-16 rounded-lg"></div>
                    <div className="bg-blue-100 h-16 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
