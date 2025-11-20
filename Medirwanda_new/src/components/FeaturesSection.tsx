import React from 'react';
import { Video, Clock, Lock, FileText, MessageSquare, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'Video Consultations',
    description: 'Connect with doctors via secure video calls for real-time medical consultations.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Access healthcare services anytime, anywhere. Book appointments at your convenience.',
  },
  {
    icon: FileText,
    title: 'Digital Prescriptions',
    description: 'Receive electronic prescriptions and manage your medications digitally.',
  },
  {
    icon: Lock,
    title: 'Secure Records',
    description: 'Your medical records are encrypted and stored securely with bank-level security.',
  },
  {
    icon: MessageSquare,
    title: 'Doctor Chat',
    description: 'Send messages to your doctors for follow-ups and medical advice.',
  },
  {
    icon: TrendingUp,
    title: 'Health Analytics',
    description: 'Track your health metrics and get personalized health insights.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for convenient and accessible healthcare management
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
