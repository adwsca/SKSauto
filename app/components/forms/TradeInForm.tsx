'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type GetPaymentFormProps = {
  onSubmit: () => void;
  carUrl: string;
  carDetails: {
    make: string;
    model: string;
    year: number;
    stocknumber: string;
  };
  request_type: string;
  formID: number;
};

export default function GetPaymentForm({ onSubmit, carUrl, carDetails, request_type, formID }: GetPaymentFormProps) {
  const t = useTranslations('form');
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    tradein_make: '',
    tradein_model: '',
    tradein_year: '',
    tradein_km: '',
    acceptTerms: false,
    acceptPrivacy: false,
    carUrl,
    ...carDetails,
    request_type,
    formID,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tradeIn: {
            make: formData.tradein_make,
            model: formData.tradein_model,
            year: formData.tradein_year,
            km: formData.tradein_km,
          },
        }),
      });

      if (response.ok) {
        const locale = router.locale || 'en';
        const thankYouPagePath = locale === 'fr' ? 'merci' : 'thankyou';
        router.push(`/${locale}/${thankYouPagePath}?formID=${formID}`);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          {t('firstName')}
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          {t('lastName')}
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          {t('phone')}
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>

      {/* Trade-In Fields */}
      <div>
        <label htmlFor="tradein_make" className="block text-sm font-medium text-gray-700">
          {t('tradein_make')}
        </label>
        <input
          id="tradein_make"
          name="tradein_make"
          type="text"
          value={formData.tradein_make}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tradein_model" className="block text-sm font-medium text-gray-700">
          {t('tradein_model')}
        </label>
        <input
          id="tradein_model"
          name="tradein_model"
          type="text"
          value={formData.tradein_model}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tradein_year" className="block text-sm font-medium text-gray-700">
          {t('tradein_year')}
        </label>
        <input
          id="tradein_year"
          name="tradein_year"
          type="text"
          value={formData.tradein_year}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tradein_km" className="block text-sm font-medium text-gray-700">
          {t('tradein_mileage')}
        </label>
        <input
          id="tradein_km"
          name="tradein_km"
          type="text"
          value={formData.tradein_km}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-fborder-primary sm:text-sm"
        />
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="focus:ring-blue-fborder-primary h-4 w-4 text-blue-fbg-primary border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptTerms" className="font-medium text-gray-700">
            {t('acceptTerms')}
          </label>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptPrivacy"
            name="acceptPrivacy"
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            required
            className="focus:ring-blue-fborder-primary h-4 w-4 text-blue-fbg-primary border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptPrivacy" className="font-medium text-gray-700">
            {t('acceptPrivacy')}
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-fborder-primary"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  );
}
