'use client'

import React from 'react';

const SellAndLooking: React.FC = () => {    
	return (
		<section className="py-10 md:py-[60px] bg-white">
            <div className="container">

                <div className="block md:flex md:justify-between">
                    <div className="w-full md:w-[49%] h-[394px] rounded-2xl mb-6 py-8 px-4 bg-car-1 bg-no-repeat bg-cover bg-right md:flex md:flex-wrap md:flex-row md:items-center md:content-center md:px-8">
                        <p className="text-white text-xl font-bold mb-2 md:text-[32px]">Are You Looking For a Car?</p>
                        <p className="text-white text-sm mb-6 pr-9 md:text-lg md:pr-[30%]">We are committed to providing our customers with exceptional service.</p>
                        <a href="#" className="inline-flex items-baseline justify-center text-[15px] font-medium text-agray-800 bg-white rounded-xl px-[18px] py-3 md:py-[18px] md:px-6">
                            Get Started
                            <svg width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3">
                                <path d="M9.44302 2L1.84302 2C1.55968 2 1.32202 1.904 1.13002 1.712C0.938018 1.52 0.842351 1.28267 0.843018 0.999999C0.843684 0.717333 0.939684 0.48 1.13102 0.288C1.32235 0.0959996 1.55968 -4.9321e-07 1.84302 -4.80825e-07L11.843 -4.37114e-08C12.1264 -3.13265e-08 12.3637 0.0960001 12.555 0.288C12.7464 0.48 12.8424 0.717333 12.843 1L12.843 11C12.843 11.2833 12.747 11.521 12.555 11.713C12.363 11.905 12.1257 12.0007 11.843 12C11.5604 11.9993 11.3227 11.9033 11.13 11.712C10.9374 11.5207 10.8417 11.2833 10.843 11L10.843 3.4L1.94302 12.3C1.75968 12.4833 1.52635 12.575 1.24302 12.575C0.959683 12.575 0.726351 12.4833 0.543018 12.3C0.359684 12.1167 0.268016 11.8833 0.268016 11.6C0.268016 11.3167 0.359684 11.0833 0.543018 10.9L9.44302 2Z" fill="#050B20"/>
                            </svg>
                        </a>
                    </div>
                    <div className="w-full md:w-[49%] h-[394px] rounded-2xl mb-6 py-8 px-4 bg-car-2 bg-no-repeat bg-cover bg-right md:flex md:flex-wrap md:flex-row md:items-center md:content-center md:px-8">
                        <p className="text-white text-xl font-bold mb-2 md:text-[32px]">Do You Want to Sell a Car?</p>
                        <p className="text-white text-sm mb-6 pr-9 md:text-lg md:pr-[30%]">We are committed to providing our customers with exceptional service.</p>
                        <a href="#" className="inline-flex items-baseline justify-center text-[15px] font-medium text-agray-800 bg-white rounded-xl px-[18px] py-3 md:py-[18px] md:px-6">
                            Get Started
                            <svg width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3">
                                <path d="M9.44302 2L1.84302 2C1.55968 2 1.32202 1.904 1.13002 1.712C0.938018 1.52 0.842351 1.28267 0.843018 0.999999C0.843684 0.717333 0.939684 0.48 1.13102 0.288C1.32235 0.0959996 1.55968 -4.9321e-07 1.84302 -4.80825e-07L11.843 -4.37114e-08C12.1264 -3.13265e-08 12.3637 0.0960001 12.555 0.288C12.7464 0.48 12.8424 0.717333 12.843 1L12.843 11C12.843 11.2833 12.747 11.521 12.555 11.713C12.363 11.905 12.1257 12.0007 11.843 12C11.5604 11.9993 11.3227 11.9033 11.13 11.712C10.9374 11.5207 10.8417 11.2833 10.843 11L10.843 3.4L1.94302 12.3C1.75968 12.4833 1.52635 12.575 1.24302 12.575C0.959683 12.575 0.726351 12.4833 0.543018 12.3C0.359684 12.1167 0.268016 11.8833 0.268016 11.6C0.268016 11.3167 0.359684 11.0833 0.543018 10.9L9.44302 2Z" fill="#050B20"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </section>
  	)
}
export default SellAndLooking;
