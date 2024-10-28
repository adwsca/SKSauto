// app/about/page.tsx
import React from 'react';

const AboutPage = () => {
  return (
    <section className='bg-white'>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">À propos</h1>
        
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our company! We are a team of passionate individuals dedicated to delivering the best solutions to our clients. Our mission is to create innovative, high-quality products and services that enhance the lives of those who use them.
        </p>
        
        <p className="text-lg text-gray-700 mb-4">
          Our team is composed of experts in various fields, including technology, design, and customer support. We pride ourselves on our ability to work collaboratively, leveraging each team member’s strengths to create truly exceptional outcomes.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Established in 20XX, our company has grown from a small startup to a leading player in the industry. Our values are rooted in integrity, innovation, and a commitment to our customers’ success.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-4">
          We envision a world where technology empowers individuals and businesses to achieve more. We are constantly exploring new ideas and pushing boundaries to make this vision a reality.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our team is the backbone of our success. Each member brings unique talents and perspectives that contribute to our dynamic work environment. Together, we are committed to excellence and delivering the best possible results for our clients.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700">
          Interested in working with us? Have questions? Feel free to <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
