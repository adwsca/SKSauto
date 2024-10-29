'use client';
import React from 'react'
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

// React icons
import { GiHomeGarage } from "react-icons/gi";
import { AiOutlineCar } from "react-icons/ai";


const HomeCards = () => {
    const t = useTranslations('HomeCards'); // Use the 'HomeCards' namespace for translations
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
  
  return ( <>
    <section className='w-full h-auto pt-[60px]'>
        <div className='text-black container'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full justify-center lg:justify-between gap-[20px]'> 
                <Link
                    href={getLocalizedPath('/inventory')}
                    className="w-full h-[450px] bg-slate-200 flex flex-col justify-end items-center py-[40px] gap-[20px] hover:text-primary hover:font-bold hover:border-b-[10px] hover:border-primary transition-all duration-200 ease-in-out rounded-xl hover:shadow-[rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] bg-bannerHome-1 bg-cover bg-center text-white">
                    <GiHomeGarage className='text-6xl text-primary' />
                    <h2 className='text-[22px]'>{t("inventory")}</h2>
                </Link>
                <Link
                    href='#brands'
                    scroll={true}
                    className="scroll-smooth w-full h-[450px] bg-slate-200 flex flex-col justify-end items-center py-[40px] gap-[20px] hover:text-primary hover:font-bold hover:border-b-[10px] hover:border-primary transition-all duration-200 ease-in-out rounded-xl hover:shadow-[rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] bg-bannerHome-2 bg-cover bg-center text-white">
                    <AiOutlineCar className='text-6xl text-primary' />
                    <h2 className='text-[22px]'>{t("makes")}</h2>
                </Link>
                <Link
                    href={getLocalizedPath('/financing')}
                    className="w-full h-[450px] bg-slate-200 flex flex-col justify-end items-center py-[40px] gap-[20px] hover:text-primary hover:font-bold hover:border-b-[10px] hover:border-primary transition-all duration-200 ease-in-out rounded-xl hover:shadow-[rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] bg-bannerHome-3 bg-cover bg-center text-white">
                    <AiOutlineCar className='text-6xl text-primary' />
                    <h2 className='text-[22px]'>{t("financing")}</h2>
                </Link>
                <Link
                    href={getLocalizedPath('/contact')}
                    className="w-full h-[450px] bg-slate-200 flex flex-col justify-end items-center py-[40px] gap-[20px] hover:text-primary hover:font-bold hover:border-b-[10px] hover:border-primary transition-all duration-200 ease-in-out rounded-xl hover:shadow-[rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] bg-bannerHome-4 bg-cover bg-center text-white">
                    <AiOutlineCar className='text-6xl text-primary' />
                    <h2 className='text-[22px]'>{t("contact")}</h2>
                </Link>
            </div>
        </div>
    </section>
    </> )
}

export default HomeCards;