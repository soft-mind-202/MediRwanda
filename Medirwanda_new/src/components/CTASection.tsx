export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Take Control of Your Health?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of Rwandans who are already using MediRwanda for better healthcare.
          Start your free account today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Create Free Account
          </a>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
