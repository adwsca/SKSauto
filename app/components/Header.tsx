'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import companyInfo from '../../companyInfo.json';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

// React Icons
import { PiMapPinLight } from "react-icons/pi";
import { PiPhoneCallLight } from "react-icons/pi";
import { FiMenu, FiX } from "react-icons/fi";


const Header: React.FC = () => {
  const company = companyInfo[0];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navbar');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // ... Ajoutez ici les fonctions de Navbar.tsx
  const getOppositeLocaleLink = () => {
    const oppositeLocale = currentLocale === 'en' ? 'fr' : 'en';
    return pathname.replace(new RegExp(`^/${currentLocale}`), `/${oppositeLocale}`);
  };

  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  const isActiveRoute = (route: string) => {
    const localeRegex = /^\/(?:[a-z]{2}-[A-Z]{2}|[a-z]{2})\//; 
    const routeWithoutLocale = pathname.replace(localeRegex, '/');
    return pathname === route || routeWithoutLocale === route;
  };

  return (
    <>
      <header className='bg-black relative z-50'>
        <div className="container lg:py-[20px] py-[20px] lg:px-4 px-4 w-full flex justify-between items-center relative z-60">
          <div className='lg:hidden'>
            <Link href={`tel:${company.companyPhoneNumber}`}>
              <PiPhoneCallLight className='text-white text-3xl ml-2 bg-primary hover:bg-primary/60 p-2 w-10 h-10 rounded-lg' />
            </Link>
          </div>
          
          <div className="flex justify-center items-center">
            <Link href="/">
              <Image
                width={323}
                height={166}
                src={company.companyLogo}
                alt={company.companyName}
                className="max-w-[200px] h-auto lg:max-w-[280px]"
              />
            </Link>
          </div>

          <div className="hidden lg:block text-md text-right text-gray-300">
            <Link href={company.googleMapLink} target='_blank' className="flex justify-end items-center mt-3 hover:text-grey-forza transition-all duration-300 linear"> 
              <div className="mr-3">
                <PiMapPinLight className='text-primary text-2xl' />
              </div> 
              {company.companyAddress}
            </Link>
            <Link href="tel:{company.companyPhoneNumber}" className="flex justify-end items-center mt-3 hover:text-grey-forza transition-all duration-300 linear"> 
              <div className="mr-3">
                <PiPhoneCallLight className='text-primary text-2xl' />
              </div> 
              {company.companyPhoneNumber}
            </Link>
          </div>

          <div 
            className="flex w-12 h-12 rounded-full justify-center items-center cursor-pointer lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className='text-4xl text-white' />
            ) : (
              <FiMenu className='text-4xl text-white' />
            )}
          </div>

        </div>

        {/* Menu mobile */}
        <div 
          ref={menuRef}
          className={`fixed top-[81px] left-0 right-0 bg-black z-40 transform ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          } transition-transform duration-500 linear lg:hidden overflow-hidden`}
          style={{ maxHeight: isMenuOpen ? 'calc(100vh - 81px)' : '0' }}
        >
          <nav className="py-6">
            <Link 
              href={getLocalizedPath('/')} 
              className={`block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200 ${
                isActiveRoute('/') ? 'bg-primary' : ''
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              href={getLocalizedPath('/inventory')} 
              className={`block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200 ${
                isActiveRoute('/inventory') ? 'bg-primary' : ''
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('inventory')}
            </Link>
            <Link 
              href={getLocalizedPath('/financing')} 
              className={`block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200 ${
                isActiveRoute('/financing') ? 'bg-primary' : ''
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('financing')}
            </Link>
            <Link href={getLocalizedPath('/mecanic')} className={`block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200 ${
                isActiveRoute('/mecanic') ? 'bg-primary' : ''
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('mecanic')}
            </Link>
            <Link 
              href={getLocalizedPath('/aesthetics')} 
              className={`block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200 ${
                isActiveRoute('/aesthetics') ? 'bg-primary' : ''
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('aesthetics')}
            </Link>
            <Link 
              href={getLocalizedPath('/contact')} 
              className={`block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200 ${
                isActiveRoute('/contact') ? 'bg-primary' : ''
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            <Link 
              href={getOppositeLocaleLink()} 
              className="block py-3 px-4 text-white text-lg hover:bg-primary hover:text-white transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              {currentLocale === 'en' ? 'Français' : 'English'}
            </Link>
          </nav>
        </div>

        {/* Overlay */}
        <div 
          className={`fixed top-[100px] inset-0 bg-black z-30 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-80' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      </header>
    </>
  );
};

export default Header;
