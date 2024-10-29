'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

// React Icons
import { FaWpforms } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";



const HowWork = () => {
    const t = useTranslations('HowWork'); // Use the 'HowWork' namespace for translations

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
    const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;
  
  return (<>
    <section className='container bg-gradient-to-b from-secondary to-secondary-dark mt-12 overflow-hidden rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px,rgba(17,_17,_26,_0.1)_0px_8px_24px,rgba(17,_17,_26,_0.1)_0px_16px_56px] p-0'>
        <div className='container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:justify-center lg:justify-between items-center w-full h-full gap-6 p-0'>
            <Image
                src='/images/howwork.jpg'
                width={1778}
                height={1000}
                alt='Comment ça marche'
                className='object-contain h-full w-full'
            />
            <div className='w-full lg:px-14 lg:py-8 p-12 flex flex-col justify-center letter item-center lg:items-start lg:justify-start tracking-[-1px]'>
                <h3 className='text-5xl text-white font-bold mb-6'>{t("title")}</h3>
                <div className='w-[80px] h-[5px] bg-primary mb-8'></div>
                <div className='flex flex-grow flex-nowrap gap-5 mb-3'>
                    <FaWpforms className='text-4xl lg:text-4xl text-primary' />
                    <p className='text-[20px] text-white'>{t("step1")}</p>
                </div>
                <div className='flex flex-grow flex-nowrap gap-5 mb-3'>
                    <FaRegCircleCheck className='text-4xl lg:text-4xl text-primary' />
                    <p className='text-[20px] text-white'>{t("step2")}</p>
                </div>
                <div className='flex flex-grow flex-nowrap gap-5 mb-5'>
                    <IoCarSportOutline className='text-4xl lg:text-4xl text-primary' />
                    <p className='text-[20px] text-white'>{t("step3")}</p>
                </div>

                <Link 
                    href={getLocalizedPath('/financing')}
                    className='block rounded-md w-fit px-6 py-3 bg-primary hover:bg-secondary text-sm font-semibold text-white transition-all duration-300 ease-in-out uppercase cursor-pointer'
                >
                    {t("cta")}
                </Link>
                
            </div>
        </div>
    </section>
  </>
  )
}

export default HowWork