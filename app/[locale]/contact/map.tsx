'use client'

import React from 'react';
import GoogleMapComponent from "../../components/GoogleMapComponent";
import companyInfo from '@/companyInfo.json';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const MapSection: React.FC = () => {    
    const company = companyInfo[0];
    const markers = [
        { lat: company.companyLat, lng: company.companyLog }
    ]
    const t = useTranslations('contactSection'); // Use the 'contactSection' namespace for translations
	return (
        <section className="bg-f7 lg:bg-f7 contact-grid-container">
            <div className="text-block md:pl-8 md:pr-4 pt-8 pb-8 text-center lg:text-left md:py-[80px]">
                <h2 className="text-[26px] leading-[32px] font-bold text-agray-800 pb-2 md:text-[40px] md:pb-3 max-w-[200px] md:leading-[40px] mx-auto md:mx-0">{t("openH")}</h2>
                <div className="mt-8">
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
export default MapSection;
