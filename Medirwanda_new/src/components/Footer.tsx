import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MediRwanda</h3>
            <p className="text-gray-400 mb-4">
              Transforming healthcare delivery in Rwanda with innovative technology and trusted professionals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Call us</p>
                  <p className="text-white">+250 788 123 456</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email us</p>
                  <p className="text-white">support@medirwanda.com</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin size={20} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Office</p>
                  <p className="text-white">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 MediRwanda. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Security
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Compliance
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
