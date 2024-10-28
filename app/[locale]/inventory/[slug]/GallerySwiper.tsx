'use client';

import companyInfo from '../../../../companyInfo.json';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { MdClose } from "react-icons/md";
import { GrPrevious, GrNext } from "react-icons/gr";
import { LuCreditCard } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";

import GetPaymentForm from '@/app/components/forms/GetPaymentForm';
import TradeInForm from '@/app/components/forms/TradeInForm';
import AskDealerForm from '@/app/components/forms/AskDealerForm';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './GallerySwiper.css'; // Import custom styles
import './GallerySwiper.css'; // Import custom styles


type GallerySwiperProps = {
  images: string[];
  altText: string;
  car: any;
  carUrl: string;
};

type Swiper = any;

export default function GallerySwiper({ images, altText, car, carUrl }: GallerySwiperProps) {
	const t = useTranslations('inventory');
  	const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
	const company = companyInfo[0]; 
	const [isGetPaymentFormVisible, setIsGetPaymentFormVisible] = useState(false);
	const [isTradeInFormVisible, setIsTradeInFormVisible] = useState(false);
	const [isAskDealerFormVisible, setIsAskDealerFormVisible] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
  	const [currentImageIndex, setCurrentImageIndex] = useState(0);

  	const getPaymentFormRef = useRef<HTMLDivElement>(null);
  	const tradeInFormRef = useRef<HTMLDivElement>(null);
	const askDealerFormRef = useRef<HTMLDivElement>(null);
	
	const router = useRouter();

	const openModal = (index : any) => {
    	setCurrentImageIndex(index);
    	setIsModalOpen(true);
  	};

  	const closeModal = () => {
    	setIsModalOpen(false);
  	};

	const prevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	const toggleGetPaymentFormVisibility = () => {
		setIsGetPaymentFormVisible(!isGetPaymentFormVisible);
		if (isTradeInFormVisible) setIsTradeInFormVisible(false);
		if (isAskDealerFormVisible) setIsAskDealerFormVisible(false);
	};

	const toggleTradeInFormVisibility = () => {
		setIsTradeInFormVisible(!isTradeInFormVisible);
		if (isGetPaymentFormVisible) setIsGetPaymentFormVisible(false);
		if (isAskDealerFormVisible) setIsAskDealerFormVisible(false);
	};

	const toggleAskDealerFormVisibility = () => {
		setIsAskDealerFormVisible(!isAskDealerFormVisible);
		if (isGetPaymentFormVisible) setIsGetPaymentFormVisible(false);
		if (isTradeInFormVisible) setIsTradeInFormVisible(false);
	};

	const handleFormSubmit = (formID: number) => {
		const thankYouPagePath = locale === 'fr' ? 'merci' : 'thankyou';
		router.push(`/${locale}/${thankYouPagePath}?formID=${formID}`);
	};

  return (
	<div className="gallery-container">
	  {/* Main Swiper */}
	  <Swiper
		spaceBetween={10}
		slidesPerView={1}
		loop={true} // Enable looping
		thumbs={{ swiper: thumbsSwiper }}
		modules={[Thumbs]} // Ensure modules are passed here
		className="w-full h-auto mb-2 lg:mb-3"
	  >
		{images.map((image, index) => (
		  <SwiperSlide key={index}>
			<img
			  src={image}
			  alt={`${altText} - Image ${index + 1}`}
			  className="h-full w-full object-cover object-center rounded-[10px]"
			  onClick={() => openModal(index)}
			/>
		  </SwiperSlide>
		))}
	  </Swiper>

	  {/* Thumbnail Swiper */}
	  <Swiper
		onSwiper={setThumbsSwiper}
		spaceBetween={8}
		slidesPerView={4}
		loop={true} // Enable looping for thumbnails
		modules={[Thumbs]}
		breakpoints={{
			1920: {
				slidesPerView: 5,
			},
			1280: {
				slidesPerView: 5,
			},
			320: {
			  slidesPerView: 4,
			}
		}}
		className="w-full h-auto"
	  >
		{images.map((image, index) => (
		  <SwiperSlide key={index} className="overflow-hidden rounded-lg">
			<img
			  src={image}
			  alt={`${altText} - Thumbnail ${index + 1}`}
			  className="h-14 w-full lg:h-28 object-cover object-center cursor-pointer"
			/>
		  </SwiperSlide>
		))}
	  </Swiper>
	  {/* Модальное окно */}
      {isModalOpen && (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative flex justify-between bg-white p-2 xl:w-full xl:h-full xl:p-6">
		  	<button
              className="absolute right-1 -top-[2.2rem] xl:right-[1rem] xl:top-[1rem] text-[2rem]"
              onClick={closeModal}
            >
              <MdClose className="text-white xl:text-black" />
            </button>
			
			<div className="relative max-w-full lg:w-[75%]">
				<img
					src={images[currentImageIndex]}
					alt="Selected"
					className="w-full h-full object-cover object-center max-h-full rounded-lg"
				/>

            	<button
                	className="px-2 absolute left-0 bottom-0 top-0 m-auto text-[2rem] text-white"
                	onClick={prevImage}
              	>
                	<GrPrevious />
              	</button>
              	<button
                	className="px-2 absolute right-0 bottom-0 top-0 m-auto text-[2rem] text-white"
                	onClick={nextImage}
              	>
                	<GrNext />
              	</button>
			</div>

			<div className="hidden overflow-auto lg:block w-fit lg:w-[29%] p-3 pr-0 border-l border-[#DEDEDE]">
			
			<img src={company.companyLogoDark} className="flex mt-5 mb-10 mx-auto w-full max-w-[70%]" />

				<button 
                  type="button" 
                  className="flex mb-2 items-center justify-center mx-auto w-full max-w-[60%] py-[13px] px-8 rounded-[10px] bg-primary hover:bg-secondary transition-all duration-200 ease-in-out text-center text-[15px] font-medium text-white"
                  ref={getPaymentFormRef}              
                  onClick={toggleGetPaymentFormVisibility}
                >
                  <LuCreditCard className="mr-2 text-xl" /> 
                  {t('getPayment')}
                </button>
                
                <div
                  className={`text-left transition-max-height duration-700 ease-in-out overflow-hidden ${
                    isGetPaymentFormVisible ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  {isGetPaymentFormVisible && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <GetPaymentForm
                        onSubmit={() => handleFormSubmit(1)} // Assuming formID 1 for "Get Payment"
                        carUrl={carUrl}
                        carDetails={{
                          make: car.make,
                          model: car.model,
                          year: car.year,
                          stocknumber: car.stocknumber,
                        }}
                        request_type="get car details"
                        formID={1}
                      />
                    </div>
                  )}
                </div>


                <button 
                  type="button" 
                  className="flex mb-2 items-center justify-center mx-auto w-full max-w-[60%] py-[13px] px-8 rounded-[10px] border border-primary bg-transparent text-center text-[15px] font-medium text-primary hover:bg-primary hover:text-white transition-all duration-200 ease-in-out leading-[19px] mt-2"
                  ref={tradeInFormRef}
                  onClick={toggleTradeInFormVisibility}
                >
                  <FiDollarSign className="mr-2 text-xl" /> 
                  {t('askDealer')}
                </button>

                <div
                  className={`text-left transition-max-height duration-700 ease-in-out overflow-hidden ${
                    isTradeInFormVisible ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  {isTradeInFormVisible && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <TradeInForm
                        onSubmit={() => handleFormSubmit(2)} // Assuming formID 2 for "Value My Trade"
                        carUrl={carUrl}
                        carDetails={{
                          make: car.make,
                          model: car.model,
                          year: car.year,
                          stocknumber: car.stocknumber,
                        }}
                        request_type="value my trade"
                        formID={2}
                      />
                    </div>
                  )}
                </div>


                <button 
                  type="button" 
                  className="flex mb-2 items-center justify-center mx-auto w-full max-w-[60%] py-[13px] px-8 rounded-[10px] border border-primary bg-transparent text-center text-[15px] font-medium text-primary hover:bg-primary hover:text-white transition-all duration-200 ease-in-out leading-[19px] mt-2"
                  ref={askDealerFormRef}
                  onClick={toggleAskDealerFormVisibility}
                >
                  <FaRegQuestionCircle className="mr-2 text-xl" /> 
                  {t('contactDealer')}
                </button>
              
                <div
                  className={`text-left transition-max-height duration-700 ease-in-out overflow-hidden ${
                    isAskDealerFormVisible ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  {isAskDealerFormVisible && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <AskDealerForm
										  onSubmit={() => handleFormSubmit(3)} // Assuming formID 2 for "Value My Trade"
										  carUrl={carUrl}
										  carDetails={{
											  make: car.make,
											  model: car.model,
											  year: car.year,
											  stocknumber: car.stocknumber,
										  }}
										  request_type="ask dealer"
										  formID={3} prepopulatedMessage={''}                      />
                    </div>
                  )}
                </div>


			</div>



          </div>
        </div>
      )}
	</div>
  );
}
