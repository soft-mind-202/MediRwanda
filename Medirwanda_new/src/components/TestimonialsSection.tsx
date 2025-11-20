import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jean Imanishimwe',
    role: 'Patient',
    image: '👨‍⚕️',
    rating: 5,
    text: 'MediRwanda has been a lifesaver for me. I was able to consult with a doctor within minutes and got the treatment I needed. Highly recommended!',
  },
  {
    name: 'Mariam Uwizeye',
    role: 'Patient',
    image: '👩‍⚕️',
    rating: 5,
    text: 'The platform is so easy to use and the doctors are very professional. I appreciate the secure way my medical records are kept.',
  },
  {
    name: 'Dr. Joseph Mugisha',
    role: 'Healthcare Provider',
    image: '👨‍🔬',
    rating: 5,
    text: 'As a doctor, I find MediRwanda very efficient for managing my patients. The consultation tools are excellent.',
  },
  {
    name: 'Grace Munyaneza',
    role: 'Patient',
    image: '👩‍💼',
    rating: 5,
    text: 'I had a terrible experience with long waiting times at hospitals. MediRwanda solved that problem for me. Great service!',
  },
  {
    name: 'Pierre Habimana',
    role: 'Patient',
    image: '👨‍💻',
    rating: 5,
    text: 'The prescription management feature is incredible. I never have to worry about losing my prescriptions anymore.',
  },
  {
    name: 'Dr. Sarah Nyirandora',
    role: 'Healthcare Provider',
    image: '👩‍⚕️',
    rating: 5,
    text: 'MediRwanda provides the perfect platform to reach more patients and provide quality care. Excellent system!',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thousands of satisfied patients and healthcare providers trust MediRwanda
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">{testimonial.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
