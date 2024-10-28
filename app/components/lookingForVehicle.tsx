'use client'

import { useState } from 'react';
import companyInfo from '../../companyInfo.json';

const LookingForVehicle: React.FC = () => {
    const company = companyInfo[0]; 
	return (
		<section className="bg-agray-400 ">
            <div className='container block-grid-container'>
            <div className="image-div">
			    <img src="/images/girl.jpg" className="w-full h-auto lg:h-full object-cover" alt="" />
            </div>
            <div className="pt-5 pb-10 px-4 lg:py-10 lg:pl-14 text-div">
                <h2 className="text-3xl font-light text-agray-800 lg:text-4xl lg:mb-4 mb-2">Looking for a vehicle?</h2>
                <h2 className="text-3xl font-bold text-agray-800 lg:text-6xl lg:mb-4 mb-2">Bienvenue chez {company.companyName}</h2>
                <p className="pt-3 text-md text-agray-700 lg:text-lg text-justify">Forza Autogroup au Laval, QC répond aux besoins de chaque client avec grand soin. Nous savons que vous avez de grandes attentes et en tant que concessionnaire d'automobiles, nous relevons le défi de répondre et de surpasser chaque fois les normes. Laissez-nous vous prouver notre engagement à atteindre l'excellence!</p>
                <p className='pt-3 text-md text-agray-700 lg:text-lg text-justify'>
                Notre personnel des ventes chevronné a hâte de partager leurs connaissances et leur enthousiasme avec vous. Nous vous invitons à parcourir notre inventaire en ligne, à planifier un essai routier et à examiner les options de financement. Vous pouvez également faire une demande de renseignements au sujet d'un véhicule à l'aide de notre formulaire en ligne ou en appelant au {company.companyPhoneNumber}     
                </p>
                <button type="button" className="mt-6 w-full text-[15px] font-medium text-white py-[13.5px] px-8 rounded-[10px] bg-ared-400 lg:w-auto lg:text-[20px] lg:mt-12 lg:py-4 lg:px-8  cursor-pointer">Contact Us</button>
                <div className="mt-6 text-center lg:flex lg:mt-12">
                    <a href="tel:{company.companyPhoneNumber}" className="flex justify-center items-center text-ared-400 text-[18px] font-medium mb-4 lg:mb-0 lg:text-[15px] lg:mr-12">
                        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path d="M12.3333 0.8125H3.66667C2.02325 0.8125 0.6875 2.14825 0.6875 3.79167V18.9583C0.6875 20.6018 2.02325 21.9375 3.66667 21.9375H12.3333C13.9768 21.9375 15.3125 20.6018 15.3125 18.9583V3.79167C15.3125 2.14825 13.9768 0.8125 12.3333 0.8125ZM13.6875 18.9583C13.6875 19.7048 13.0798 20.3125 12.3333 20.3125H3.66667C2.92025 20.3125 2.3125 19.7048 2.3125 18.9583V3.79167C2.3125 3.04525 2.92025 2.4375 3.66667 2.4375H12.3333C13.0798 2.4375 13.6875 3.04525 13.6875 3.79167V18.9583ZM9.89583 4.875C9.89583 5.3235 9.53183 5.6875 9.08333 5.6875H6.91667C6.46817 5.6875 6.10417 5.3235 6.10417 4.875C6.10417 4.4265 6.46817 4.0625 6.91667 4.0625H9.08333C9.53183 4.0625 9.89583 4.4265 9.89583 4.875Z" fill="#BC3149"/>
                        </svg>
                        {company.companyPhoneNumber}
                    </a>
                    <a href="mailto:{company.companyEmail}" className="flex justify-center items-center text-ared-400 text-[15px] font-medium lg:text-[15px]">
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path d="M18.5833 0.979004H3.41667C1.77325 0.979004 0.4375 2.31475 0.4375 3.95817V14.7915C0.4375 16.4349 1.77325 17.7707 3.41667 17.7707H18.5833C20.2268 17.7707 21.5625 16.4349 21.5625 14.7915V3.95817C21.5625 2.31475 20.2268 0.979004 18.5833 0.979004ZM18.5833 2.604C18.6083 2.604 18.6299 2.617 18.6538 2.61809L11.8125 7.74984C11.3337 8.10842 10.6653 8.10842 10.1875 7.74984L3.34625 2.61809C3.37117 2.617 3.39175 2.604 3.41667 2.604H18.5833ZM19.9375 14.7915C19.9375 15.5379 19.3298 16.1457 18.5833 16.1457H3.41667C2.67025 16.1457 2.0625 15.5379 2.0625 14.7915V3.95817C2.0625 3.87475 2.09608 3.80217 2.11017 3.72309L9.2125 9.04984C9.739 9.44417 10.3695 9.64134 11 9.64134C11.6305 9.64134 12.2621 9.44417 12.7875 9.04984L19.8898 3.72309C19.9039 3.80217 19.9375 3.87475 19.9375 3.95817V14.7915Z" fill="#BC3149"/>
                        </svg>
                        {company.companyEmail}
                    </a>
                </div>
            </div>
            </div>
		</section>
  	)
}
export default LookingForVehicle;
