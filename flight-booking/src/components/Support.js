const Support = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Customer Support</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            We're here to help you 24/7 with any questions about bookings, changes, or travel advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-orange-500 text-4xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-3">Phone Support</h3>
            <p className="text-gray-600 mb-4">
              Speak directly with our travel experts
            </p>
            <p className="text-2xl font-semibold text-gray-800">1-800-SKY-BOOK</p>
            <p className="text-sm text-gray-500 mt-2">24/7 availability</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-orange-500 text-4xl mb-4">✉️</div>
            <h3 className="text-xl font-bold mb-3">Email Support</h3>
            <p className="text-gray-600 mb-4">
              Get help via email with detailed responses
            </p>
            <a 
              href="mailto:support@skybooker.com" 
              className="text-blue-600 hover:underline"
            >
              skybookerflyhigh@gmail.com
            </a>
            <p className="text-sm text-gray-500 mt-2">Response within 2 hours</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-orange-500 text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-4">
              Instant messaging with our support team
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition">
              Start Chat
            </button>
            <p className="text-sm text-gray-500 mt-2">Available 6AM-12AM EST</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;