import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 bg-sky-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-orange-500 text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Our Mission</h3>
            <p className="text-gray-600">
              To make air travel accessible and affordable for everyone by providing 
              transparent pricing, unbiased search results, and exceptional customer 
              service.
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-orange-500 text-3xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, and customer satisfaction drive everything we do. 
              We believe travel should be easy, enjoyable, and accessible to all.
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-orange-500 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Our Vision</h3>
            <p className="text-gray-600">
              To become the world's most trusted travel platform, revolutionizing how 
              people search, compare, and book flights through cutting-edge technology.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Why Choose SkyBooker?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Best Price Guarantee on all flight bookings</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>No hidden fees - transparent pricing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>24/7 customer support in multiple languages</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Easy cancellation and rebooking options</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Personalized flight recommendations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Eco-friendly travel options</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;