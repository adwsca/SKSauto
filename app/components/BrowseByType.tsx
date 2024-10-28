'use client'

import React, { useState, useEffect} from 'react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

// React Icons
import { TbCarSuv } from "react-icons/tb";
import { FaTruckPickup } from "react-icons/fa6";
import { PiVanFill } from "react-icons/pi";
import { FaTruck } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import Link from 'next/link';



const getIconForType = (type: string): JSX.Element => {
  const sedanTypes = ['passenger', 'car', 'sedan'];
  const sportTypes = ['coupe', 'sport', 'cabrio'];

  const lowerCaseType = type.toLowerCase();

  if (sedanTypes.includes(lowerCaseType)) {
    return <>
    <Image 
      width={762}
      height={366}
      src='/images/minicars/car-sedan.png'
      alt='Hatchback'
      className='px-4'
    />
    {/* <FaCarSide size={34} className="inline-flex mx-auto" /> */}
    </> ;

  }
  if (sportTypes.includes(lowerCaseType)) {
    return <>
            <Image 
              width={762}
              height={366}
              src='/images/minicars/car-coupe.png'
              alt='coupe'
              className='px-4'
            />
          </>;
  }

  switch (lowerCaseType) {
    case 'cargovan':
      return <>
              <Image 
                width={762}
                height={366}
                src='/images/minicars/car-station-wagon.png'
                alt='Station Wagon'
                className='px-4'
              />
            </>;
    case 'minivan':
      return <>
              <Image 
                width={762}
                height={366}
                src='/images/minicars/car-van.png'
                alt='Van'
                className='px-4'
              />
            </>;
    case 'pickup':
      return <>
              <Image 
                width={762}
                height={366}
                src='/images/minicars/car-pickup.png'
                alt='Camion'
                className='px-4'
              />
            </>;
    case 'sportutil':
      return <>
              <Image 
                width={762}
                height={366}
                src='/images/minicars/car-vus.png'
                alt='VUS'
                className='px-4'
              />
            </>;
    default:
      return <>
              <Image 
                width={762}
                height={366}
                src='/images/minicars/car-hatchback.png'
                alt='Hatchback'
                className='px-4'
              />
            </>;
  }
};

const BrowseByType: React.FC = () => {
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
  const t = useTranslations('BrowseByType'); // Use the 'BrowseByType' namespace for translations

  const bodyTypeMap: { [key: string]: string } = {
    Car: t('Car'),
    Cargovan: t('Cargovan'),
    Minivan: t('Minivan'),
    Passenger: t('Passenger'),
    Pickup: t('Pickup'),
    SportUtil: t('SportUtil'),
  };
    const [types, setTypes] = useState<string[]>([]);
    useEffect(() => {
        async function fetchMakes() {
          const response = await fetch('/api/cars?listBodyTypes=true');
          const data = await response.json();
          setTypes(data.BodyTypes);
        }
        fetchMakes();
    }, []);
	  return (
        <section className="pt-10 md:pt-[60px] bg-white">
            <div className="container md:flex md:flex-wrap md:justify-between">

                <h2 className="text-agray-800 text-[26px] md:text-[40px] font-bold text-left md:order-1">{t("title")}</h2>

                <div className="grid grid-cols-3 gap-2 my-6 md:grid-cols-4 md:gap-x-6 md:order-3 md:w-full mx-auto">
                    {types.map((type) => (
                        <Link 
                          key={type}
                          href={`/inventory/?type=${type}`} 
                          className="border border-agray-500 rounded-[10px] py-5 text-center md:py-[20px] px-0 lg:px-[15px] md:rounded-2xl transition-all duration-300 ease-in-out bg-white text-agray-800  hover:border-primary hover:text-white hover:bg-primary group">
                            {getIconForType(type)}
                            <p className="text-[15px] md:text-2xl font-medium mt-6 capitalize">{bodyTypeMap[type] || type}
                            </p>
                        </Link>
					          ))}
                </div>

                <Link href={getLocalizedPath('/inventory')}
                  className="text-dark-3 text-base font-bold underline md:text-lg md:order-2 md:pt-5 hover:text-primary transition-all duration-300 linear">{t("search")}</Link>

            </div>
        </section>
  	)
}
export default BrowseByType;
