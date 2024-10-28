import FinanceForm from '@/app/components/FinanceForm'
import React from 'react'
import { useTranslations } from 'next-intl';


const FinancePage = () => {

  const t = useTranslations('FinanceForm'); // Use the 'FinanceForm' namespace for translations

  return ( <>
      <div className='bg-white'>
        <div className="container mx-auto pt-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-dark-3 mb-8">{t("title")}</h1>
          <p className="text-2xl text-gray-700 mb-4">
          {t('description')}
          </p>
        </div>
      </div>
      <FinanceForm />
    </>
  )
}

export default FinancePage
