'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const CustomersSay: React.FC = () => {    
	return (
        <section className="relative py-10 md:pt-[120px] md:pb-[180px] bg-white">
            
            <h2 className="text-center text-[26px] md:text-[40px] font-bold text-agray-800">What our customers say</h2>
            
            <div className="relative w-full mt-6 pl-4 md:pl-0 md:mt-12">
                <Swiper
                    spaceBetween={24}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-auto"
                    centeredSlides={true}
                    breakpoints={{
                        1920: {
                            slidesPerView: 4.4,
                        },
                        1440: {
                            slidesPerView: 3.4,
                        },
                        1024: {
                            centeredSlides: true,
                            slidesPerView: 2.8,
                        },
                        768: {
                            centeredSlides: true,
                            slidesPerView: 1.8,
                        },
                        600: {
                            centeredSlides: false,
                            slidesPerView: 2.2,
                        },
                        480: {
                            centeredSlides: false,
                            slidesPerView: 1.2,
                        },
                        320: {
                            centeredSlides: false,
                            slidesPerView: 1.2,
                        }
                    }}
                >
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="block max-w-[310px] p-5 bg-agray-400 rounded-2xl md:max-w-[464px] md:p-8">
                            <p className="relative pb-3 text-left text-base font-bold text-agray-800 md:text-xl md:pb-6 before:content-[''] before:absolute before:right-0 before:top-1 before:w-[28px] before:h-[20px] before:bg-quotes before:bg-no-repeat before:bg-contain md:before:w-[36px] md:before:h-[25px]">Great Work</p>
                            <p className="text-sm text-agray-700 md:text-[15px]">“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</p>
                            <div className="flex items-center mt-4 md:mt-12">
                                <img src="/images/girl.jpeg" className="size-14 rounded-full mr-3 md:size-[60px]" alt="" />
                                <div>
                                    <p className="text-sm font-bold text-agray-800 md:text-base">Leslie Alexander</p>
                                    <span className="text-xs text-agray-700 md:text-sm">Owner</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
  	)
}
export default CustomersSay;
