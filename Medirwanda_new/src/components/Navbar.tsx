import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">MediRwanda</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition">
              Services
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600">
              Features
            </a>
            <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">
              Services
            </a>
            <a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600">
              Testimonials
            </a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">
              Contact
            </a>
            <div className="flex gap-2 mt-4">
              <Link
                to="/login"
                className="flex-1 text-center text-gray-700 hover:text-blue-600 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
