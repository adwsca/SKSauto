'use client'

import Image from 'next/image';
import React, { useState, useEffect} from 'react';
import { useTranslations } from 'next-intl';

const ExplorePremiumBrands: React.FC = () => {
    const t = useTranslations('ExplorePremiumBrands'); // Use the 'ExplorePremiumBrands' namespace for translations
    const [brands, setBrands] = useState<string[]>([]);
    useEffect(() => {
        async function fetchMakes() {
          const response = await fetch('/api/search');
          const data = await response.json();
          setBrands(data.availableMakes);
        }
        fetchMakes();
    }, []);   
	return (
        <section id='brands' className="pt-10 md:pt-12 bg-white pb-12">
            <div className="container md:flex md:flex-wrap md:justify-between">

                <h2 className="text-agray-800 text-[26px] md:text-[40px] font-bold text-left md:order-1">{t("title")}</h2>

                <div className="grid grid-cols-3 gap-2 my-6 md:grid-cols-7 md:gap-3 md:order-3 md:w-full">
                {brands.map((brand) => {
                    const brandImageName = brand.toLowerCase().replace(/\s+/g, '_');
                    return (
                        <a
                            key={brand}
                            href={`/inventory/?make=${brand}`} 
                            className="border border-agray-500 rounded-[10px] py-5 text-center md:py-[25px] md:rounded-2xl transition-all duration-300 ease-in-out bg-white text-agray-800 hover:border-primary hover:text-white hover:bg-primary group"
                        >
                            <div className="flex justify-center items-center h-[40px] text-center">
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={`/images/brands/${brandImageName}.svg`} 
                                    className="flex-shrink-0 max-h-full max-w-[70px]" 
                                    alt={brand}
                                />
                            </div>
                            <p className="text-[15px] md:text-lg font-medium mt-2">{brand}</p>
                        </a>
                    );
                })}
                </div>

                <a href="#" className="text-dark-3 text-base font-bold underline md:text-lg md:order-2 md:pt-5 hover:text-primary transition-all duration-300 linear">{t("search")}</a>

                {/* <div className="w-full border-b border-[#DEDEDE] mt-8 md:order-4"></div> */}

            </div>
        </section>
  	)
}
export default ExplorePremiumBrands;
