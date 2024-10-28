'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function ThankYouPage({ params }: { params: { thankyouPage: string } }) {
  const searchParams = useSearchParams();
  const formID = searchParams.get('formID');
  const t = useTranslations('thankyou');
  
  const { thankyouPage } = params; // Access the dynamic route parameter

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t(`${thankyouPage}.title`)}</h1>
      <p>{t(`${thankyouPage}.message`, { formID })}</p>
    </div>
  );
}
