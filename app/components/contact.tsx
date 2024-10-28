'use client'

import React from 'react';
import GoogleMapComponent from "../components/GoogleMapComponent";
import companyInfo from '../../companyInfo.json';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const ContactSection: React.FC = () => {  
    const company = companyInfo[0]; 
    const t = useTranslations('contactSection'); // Use the 'contactSection' namespace for translations
    const markers = [
        { lat: company.companyLat, lng: company.companyLog }
    ]
    
	return (
        <section className="bg-f7 lg:bg-f7 contact-grid-container">
            <div className="text-block px-4 pt-8 pb-8 text-center lg:text-left md:py-[80px]">
                <h2 className="text-[26px] font-bold text-agray-800 pb-2 md:text-[40px] md:pb-3">{t("title")}</h2>
                <p className="text-sm text-dark-3 md:text-lg max-w-[380px] lg:mx-0 mx-auto">{t("description")}</p>
                <Link href='/contact' type="button" className="mt-6 inline-flex justify-center w-full bg-primary hover:bg-secondary transition-all duration-300 linear rounded-[8px] py-[13px] text-white text-[15px] md:mt-6 md:inline-block md:text-xl md:py-4 md:px-8 md:w-auto">{t("button")}</Link>
                <div className="mt-8 md:mt-20">
                    <p className="pb-2 text-xl font-semibold text-agray-800 md:text-xl">{t('WorkDaysLine1')}</p>
                    <p className="text-[16px] text-dark-3">{company.timeWorkLine1}</p>
                    <p className="pt-5 pb-2 text-xl font-semibold text-agray-800 md:text-xl">{t('WorkDaysLine2')}</p>
                    <p className="text-[16px] text-dark-3">{company.timeWorkLine2}</p>
                    <p className="pt-5 pb-2 text-xl font-semibold text-agray-800 md:text-xl">{t('WorkDaysLine3')}</p>
                    <p className="text-[16px] text-dark-3">{t('closed')}</p>
                </div>
            </div>
            <div className="map-block">
                <GoogleMapComponent lat={company.companyLat} lng={company.companyLog} zoom={company.mapsZoomLevel} markers={markers} />
            </div>
        </section>
  	)
}
export default ContactSection;
