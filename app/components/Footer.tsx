'use client'

import React, { useState, useEffect} from 'react';
import companyInfo from '../../companyInfo.json';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { routing } from '../../i18n/routing'; // Ensure this path is correct based on your project structure


// React Icons
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';
import ScrollToTopButton from './ScrollToTopButton';

const Footer: React.FC = () => {
	const company = companyInfo[0]; 
	const [types, setTypes] = useState<string[]>([]);
	const [brands, setBrands] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        async function fetchMakes() {
          const response = await fetch('/api/cars?listBodyTypes=true');
          const data = await response.json();
          setTypes(data.BodyTypes);
        }
        fetchMakes();
    }, []);

    useEffect(() => {
        async function fetchMakes() {
          const response = await fetch('/api/search');
          const data = await response.json();
          setBrands(data.availableMakes);
        }
        fetchMakes();
    }, []); 

	const shuffleArray = (array: string[]) => {
		return array.sort(() => Math.random() - 0.5);
	};

	const t = useTranslations('footer'); // Use the 'footer' namespace for translations
	const currentLocale = useLocale();

	const getLocalizedPath = (path: string) => {
		const localizedPathObject = routing.pathnames[path];
	
		if (localizedPathObject) {
		  return localizedPathObject[currentLocale] || path; // Return the localized path for the current locale or fallback to the original path
		}
		
		return path; // Fallback to the original path if not found in routing.pathnames
	  };

  return (
	<footer className="bg-gradient-to-b from-secondary to-secondary-dark">
		<div className="flex lg:flex-row lg:justify-between flex-col justify-center lg:items-start items-center text-center lg:text-left px-4 pt-10 border-b border-white-20 md:py-[60px] md:px-20 container pb-12">
			<div className="my-8 md:my-0 relative ml-0">
				<Image
					width={229}
					height={90}
					 src={company.companyLogoDark}
					 className="w-full h-auto max-w-[200px]"
					 alt={company.companyName}
				/>
				<div className="mt-8 flex justify-between items-center md:block">
					<ul className="flex items-center justify-center w-full h-auto mx-auto">
						<li className="mr-2">
							<Link href={company.linkFacebook} target="_blank" className="flex items-center justify-center size-10 rounded-full hover:bg-primary transition-all ease-in-out">
							<FaFacebookF className='text-white' />
							</Link>
						</li>
						<li className="mr-2">
							<Link href={company.linkTwitter} target="_blank" className="flex items-center justify-center size-10 rounded-full hover:bg-primary transition-all ease-in-out">
							<FaXTwitter className='text-white' />
							</Link>
						</li>
						<li className="mr-2">
							<Link href={company.linkInstagram} target="_blank" className="flex items-center justify-center size-10 rounded-full hover:bg-primary transition-all ease-in-out">
							<FaInstagram className='text-white' />
							</Link>
						</li>
						<li className="mr-2">
							<Link href={company.linkLinkedin} target="_blank" className="flex items-center justify-center size-10 rounded-full hover:bg-primary transition-all ease-in-out">
							<FaLinkedinIn className='text-white' />
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<nav className="flex flex-wrap flex-col text-white text-sm w-1/2 md:text-[15px] md:w-auto mb-8">
				<p className="pb-2 text-base font-bold text-white md:text-xl md:pb-5">{t('title1')}</p>
				<Link href={getLocalizedPath('/inventory')} className="pb-1 md:pb-3 hover:text-primary">{t('inventory')}</Link>
				<Link href={getLocalizedPath('/financing')} className="pb-1 md:pb-3 hover:text-primary">{t('financing')}</Link>
				<Link href={getLocalizedPath('/contact')} className="pb-1 md:pb-3 hover:text-primary">{t('contact')}</Link>
				<Link href={getLocalizedPath('/privacy')} className="pb-1 md:pb-3 hover:text-primary">{t('privacy')}</Link>
				<Link href={getLocalizedPath('/terms')} className="pb-1 md:pb-3 hover:text-primary">{t('terms')}</Link>
			</nav>
			
			<nav className="flex flex-wrap flex-col text-white text-sm w-1/2 mt-8 md:text-[15px] md:w-auto md:mt-0">
				<p className="pb-2 text-base font-bold text-white md:text-xl md:pb-5">{t('title2')}</p>
				{
					shuffleArray(brands)
					.slice(0, visibleCount)
					.map((brand) => {
                    return (
						<Link 
                        	key={brand}
                        	href={`/inventory/?make=${brand}`} 
							className="pb-1 md:pb-3 hover:text-primary"
						>
                    		{brand}
                    	</Link>
					)
				})}
			</nav>
			<nav className="flex flex-wrap flex-col text-white text-sm w-1/2 mt-8 md:w-auto md:mt-0 relative">
				<p className="pb-2 text-base font-bold text-white md:text-xl md:pb-5">{t('title3')}</p>
				{
                	types.slice(0, visibleCount).map((types) => {
                    return (
						<Link 
                        	key={types}
                        	href={`/inventory/?type=${types}`} 
							className="pb-1 md:pb-3 hover:text-primary"
						>
                    		{types}
                    	</Link>
					)
				})}
				<ScrollToTopButton />
			</nav>
		</div>
		<div className="py-6 px-4 text-white text-center md:flex md:justify-between md:items-center md:px-20 md:py-5 container">
			<p className="text-sm md:text-[15px]">© 2024 <span className='font-bold'>{company.companyName}.</span> {t('copyright')}</p>
			<div className='flex items-center justify-center gap-2 mt-4 lg:mt-0 select-none'>
				{t("poweredBy")} 
				<Link href="https://www.adws.ca/" target="_blank">
					
					<Image 
						src="/images/logo-footer-adws.png"
						width={1376}
						height={259}
						alt="ADWS"
						className="w-auto h-auto max-h-[33px]"
					/>
				</Link>
			</div>
		</div>
	</footer>
  );
}

export default Footer;
