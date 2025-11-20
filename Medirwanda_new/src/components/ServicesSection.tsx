import React from 'react';
import { Stethoscope, Pill, Heart, Brain } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    name: 'General Medicine',
    description: 'Consultation with general practitioners for common health issues and preventive care.',
    specialists: '150+ Doctors',
  },
  {
    icon: Pill,
    name: 'Pharmacology',
    description: 'Prescription management and medication consultation with licensed pharmacists.',
    specialists: '80+ Pharmacists',
  },
  {
    icon: Heart,
    name: 'Cardiology',
    description: 'Specialized heart and cardiovascular health consultations with cardiologists.',
    specialists: '45+ Specialists',
  },
  {
    icon: Brain,
    name: 'Mental Health',
    description: 'Psychological counseling and mental health support from certified therapists.',
    specialists: '65+ Therapists',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Medical Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services from specialized medical professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-blue-600" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {service.specialists}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
