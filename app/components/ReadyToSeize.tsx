'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const ReadyToSeize = () => {
    const pathname = usePathname();
    const currentLocale = useLocale(); // Use `useLocale` to get the current locale in App Router

   // Function to get the opposite locale link
    const getOppositeLocaleLink = () => {
    const oppositeLocale = currentLocale === 'en' ? 'fr' : 'en'; // Switch between 'en' and 'fr'
    
    // Replace the current locale in the pathname with the opposite locale
    const newPathname = pathname.replace(
      new RegExp(`^/${currentLocale}`),
      `/${oppositeLocale}`
    );
    return newPathname;
  };
  const t = useTranslations('ReadyToSeize'); // Use the 'ReadyToSeize' namespace for translations
  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  return (
    <section className='container bg-gradient-to-b from-primary to-primary mt-12 overflow-hidden rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px,rgba(17,_17,_26,_0.1)_0px_8px_24px,rgba(17,_17,_26,_0.1)_0px_16px_56px] p-0'>
        <div className='container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:justify-center lg:justify-between justify-center items-center w-full h-full gap-6 p-0'>
            <Image
                src='/images/readytostart.jpg'
                width={889}
                height={500}
                alt='Comment ça marche'
                className='object-contain h-full'
            />
            <div className='w-full py-10 px-4 lg:px-14 lg:py-7 flex flex-col justify-center item-center lg:items-start lg:justify-start md:justify-center md:items-center text-center md:text-center lg:text-left'>
                <h3 className='text-5xl max-w-[600px] text-white font-light mb-6 mx-auto md:mx-0 lg:mx-0'>{t('title')} <span className='font-black'>{t('titleSpan')}</span></h3>
                <div className='w-[80px] h-[5px] bg-secondary mb-4 mx-auto lg:mx-0 md:mx-0'></div>
                <p className='text-xl text-white max-w-[500px] mx-auto md:mx-0 lg:mx-0 mb-4 antialiased'>{t('description')}</p>
                <Link 
                    href={getLocalizedPath('/financing')}
                    className='block mx-auto md:mx-0 lg:mx-0 rounded-md w-fit px-6 py-3 bg-secondary hover:bg-secondary-dark text-sm font-semibold text-white transition-all duration-300 ease-in-out uppercase cursor-pointer'
                >
                    {t('cta')}
                </Link>
            </div>
            
        </div>
    </section>
  )
}

export default ReadyToSeize