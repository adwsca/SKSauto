'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '../../i18n/routing'; // Ensure this path is correct based on your project structure

const Navbar: React.FC = () => {
  const t = useTranslations('navbar'); // Use the 'navbar' namespace for translations
  const pathname = usePathname();
  const currentLocale = useLocale(); // Get the current locale

  // Function to get the opposite locale link
  const getOppositeLocaleLink = () => {
    const oppositeLocale = currentLocale === 'en' ? 'fr' : 'en'; // Switch between 'en' and 'fr'
    return pathname.replace(new RegExp(`^/${currentLocale}`), `/${oppositeLocale}`);
  };

  // Get the localized path based on the routing config
  const getLocalizedPath = (path: string) => {
    const localizedPathObject = routing.pathnames[path];

    if (localizedPathObject) {
      return localizedPathObject[currentLocale] || path; // Return the localized path for the current locale or fallback to the original path
    }
    
    return path; // Fallback to the original path if not found in routing.pathnames
  };

  // Check if the current route is active
  const isActiveRoute = (route: string) => {
    const localeRegex = /^\/(?:[a-z]{2}-[A-Z]{2}|[a-z]{2})\//;
    const routeWithoutLocale = pathname.replace(localeRegex, '/');
    return pathname === route || routeWithoutLocale === route;
  };

  return (
    <div className="hidden lg:block w-full relative z-10 bg-secondary">
      <div className="w-full container flex items-center justify-between px-20 lg:px-4 text-xl font-semibold">
        <nav>
          {/* Links with active highlighting */}
          <Link href={getLocalizedPath('/')} className={`inline-block relative px-6 py-[22px] text-white before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-2 
            ${isActiveRoute(getLocalizedPath('/')) ? 'before:bg-primary' : 'before:bg-transparent hover:before:bg-primary before:transition-colors before:duration-300'}`}>
            {t('home')}
          </Link>
          <Link href={getLocalizedPath('/inventory')} className={`inline-block relative px-6 py-[22px] text-white before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-2 
            ${isActiveRoute(getLocalizedPath('/inventory')) ? 'before:bg-primary' : 'before:bg-transparent hover:before:bg-primary before:transition-colors before:duration-300'}`}>
            {t('inventory')}
          </Link>
          <Link href={getLocalizedPath('/financing')} className={`inline-block relative px-6 py-[22px] text-white before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-2 
            ${isActiveRoute(getLocalizedPath('/financing')) ? 'before:bg-primary' : 'before:bg-transparent hover:before:bg-primary before:transition-colors before:duration-300'}`}>
            {t('financing')}
          </Link>
          <Link href={getLocalizedPath('/contact')} className={`inline-block relative px-6 py-[22px] text-white before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-2 
            ${isActiveRoute(getLocalizedPath('/contact')) ? 'before:bg-primary' : 'before:bg-transparent hover:before:bg-primary before:transition-colors before:duration-300'}`}>
            {t('contact')}
          </Link>
        </nav>

        <ul className="flex justify-between items-center text-xl">
          <li className="relative group">
            <Link href={getOppositeLocaleLink()} className={`inline-block relative px-6 py-[22px] text-white before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-2 
              ${isActiveRoute('/contact') ? 'before:bg-primary' : 'before:bg-transparent hover:before:bg-primary before:transition-colors before:duration-300'}`}>
              {currentLocale === 'en' ? 'Français' : 'English'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;