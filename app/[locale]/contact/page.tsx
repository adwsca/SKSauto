// app/[locale]/contact/page.tsx
"use client";  // Mark this as a client-side component

import React, { useState } from 'react';
import MapSection from './map';
import companyInfo from '@/companyInfo.json';
import { useTranslations } from 'next-intl';

// React Icons
import { HiOutlineMapPin } from "react-icons/hi2";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";



const company = companyInfo[0];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic, like sending data to an API
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const t = useTranslations('ContactPage'); // Use the 'ContactPage' namespace for translations
  return (
  <section className="w-full h-auto mx-auto bg-white p-0 m-0 text-dark-3">
    <div className='w-full h-auto container grid grid-col grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-start'>
      <div className='w-full h-auto mx-auto pt-12 md:py-16 px-4 sm:px-6 lg:px-8'>
        <h3 className='text-4xl font-bold text-gray-900 mb-8 max-w-[450px]'>{t("titleText")}</h3>
        <p className='text-lg text-justify'>{t("description")}</p>
        <div className='flex flex-row flex-nowrap w-full h-auto mt-12 justify-between gap-6'>
          <div className='w-full h-auto'>
            <h4 className='font-bold text-2xl mb-6'>{t('address')}</h4>
            <div className='flex flex-row flex-nowrap justify-start items-start gap-4'>
              <HiOutlineMapPin className='text-3xl p-0 text-primary' />
              <p className='text-md'>{company.companyAddress}</p>
            </div>
          </div>
          <div className='w-full h-auto p-0'>
            <h4 className='font-bold text-2xl mb-6'>{t("infos")}</h4>
            <div className='flex flex-row flex-nowrap justify-start items-center gap-4 mb-4'>
              <PiPhoneCallLight className='text-3xl p-0 text-primary' />
              <p className='text-md'>{company.companyPhoneNumber}</p>
            </div>
            <div className='flex flex-row flex-nowrap justify-start items-center gap-4'>
              <CiMail className='text-3xl p-0 text-primary' />
              <p className='text-md'>{company.companyEmail}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2">{t("titleForm")}</h1>
        <p className='text-xl font-medium'>{t("subtitleForm")}</p>
        <form onSubmit={handleSubmit} className="max-w mx-auto mt-8 p-6 bg-f7 rounded-lg border space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t("lastName")}:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              {t("firstName")}:
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t("phoneNumber")}:
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t("email")}:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            {t("message")}:
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-primary rounded-md hover:bg-dark-3 focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 w-full transition-all duration-200 ease-in-out"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
    <MapSection />
  </section>
  );
};

export default ContactPage;
