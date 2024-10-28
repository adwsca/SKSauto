'use client';

import companyInfo from '../../../../companyInfo.json';

import Link from 'next/link';
import { IoIosSpeedometer } from "react-icons/io";
import { CheckCircleIcon } from '@heroicons/react/24/outline'; 
import { TbBrandSpeedtest, TbAutomaticGearbox, TbGasStation, TbPhoneCall, TbCreditCard, TbZoomMoney, TbHelp } from "react-icons/tb";
import { useTranslations } from 'next-intl';
import GallerySwiper from './GallerySwiper';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineShare, MdOutlineDirectionsCarFilled, MdOutlinePrivacyTip } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { LuCreditCard } from "react-icons/lu";
import { FiDollarSign, FiSettings } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FaCar, FaClipboardCheck, FaFaceGrinStars } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { LuCheckSquare } from "react-icons/lu";

import GoogleMapComponent from "../../../components/GoogleMapComponent";
import GetPaymentForm from '@/app/components/forms/GetPaymentForm';
import TradeInForm from '@/app/components/forms/TradeInForm';
import AskDealerForm from '@/app/components/forms/AskDealerForm';
import ReleatedBestCar from '@/app/components/RelatedBestCar';
import ContactSection from '@/app/components/contact';



type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  photo: string;
  km: string;
  transtype: string;
  condition: string;
  stocknumber: string;
  serialnumber: string;
  noteextraf: string;
  useroptionsf: string[] | null;
  trim: string[] | null;
  drivetrain: string[] | null;
  details: { name: string; items: string[] }[];
  fuel: string;
};

type Company = {
  companyName: string;
  companyLogo: string;
  companyAddress: string;
  companyPhoneNumber: string;
  companyEmail: string;
  deliverEmail: string;
  companyLat: number;
  companyLog: number;
  mapsZoomLevel: number;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function formatPrice(price: number): string {
  const priceStr = price.toString();
  if (priceStr.length > 2) {
    return `${priceStr.slice(0, 2)} ${priceStr.slice(2)}`;
  }
  return priceStr;
}

export default function CarDetails({ car }: { car: Car }) {
  const t = useTranslations('inventory');
  const [selectedTab, setSelectedTab] = useState(t('description'));

  const [isGetPaymentFormVisible, setIsGetPaymentFormVisible] = useState(false);
  const [isTradeInFormVisible, setIsTradeInFormVisible] = useState(false);
  const [isAskDealerFormVisible, setIsAskDealerFormVisible] = useState(false);
  const [carBrand, setCarBrand] = useState(car.make);

  const [companyName, setCompanyName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);


  const carUrl = typeof window !== 'undefined' ? window.location.href : '';

  const router = useRouter();
  {/* const locale = router.locale || 'en'; */}

  const getPaymentFormRef = useRef<HTMLDivElement>(null);
  const tradeInFormRef = useRef<HTMLDivElement>(null);
  const askDealerFormRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (formRef: React.RefObject<HTMLDivElement>) => {
    if (formRef.current) {
      setTimeout(() => {
        const offsetPosition = formRef.current.getBoundingClientRect().top + window.scrollY - 15; // Adjust -100 or any value to scroll a bit higher
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 300); // Adjust the delay if necessary
    }
  };

  

  const toggleGetPaymentFormVisibility = () => {
    setIsGetPaymentFormVisible(!isGetPaymentFormVisible);
    if (isTradeInFormVisible) setIsTradeInFormVisible(false);
    if (isAskDealerFormVisible) setIsAskDealerFormVisible(false);
    if (!isGetPaymentFormVisible) scrollToForm(getPaymentFormRef);
  };

  const toggleTradeInFormVisibility = () => {
    setIsTradeInFormVisible(!isTradeInFormVisible);
    if (isGetPaymentFormVisible) setIsGetPaymentFormVisible(false);
    if (isAskDealerFormVisible) setIsAskDealerFormVisible(false);
    if (!isTradeInFormVisible) scrollToForm(tradeInFormRef);
  };

  const toggleAskDealerFormVisibility = () => {
    setIsAskDealerFormVisible(!isAskDealerFormVisible);
    if (isGetPaymentFormVisible) setIsGetPaymentFormVisible(false);
    if (isTradeInFormVisible) setIsTradeInFormVisible(false);
    if (!isAskDealerFormVisible) scrollToForm(askDealerFormRef);
  };

  const handleFormSubmit = (formID: number) => {
    const thankYouPagePath = locale === 'fr' ? 'merci' : 'thankyou';
    router.push(`/${locale}/${thankYouPagePath}?formID=${formID}`);
  };

  const transmissionTypeMap: { [key: string]: string } = {
    AT: t('transmission.AT'),
    MT: t('transmission.MT'),
  };

  const transmission = transmissionTypeMap[car.transtype] || 'N/A';

  const fuelTypeMap: { [key: string]: string } = {
    UL: t('fuel.UL'),
    HB: t('fuel.HB'),
    EL: t('fuel.EL'),
  };

  const fuel = fuelTypeMap[car.fuel] || 'N/A';


  const tabs = [
    { name: t('description'), href: '#', current: selectedTab === t('description') },
    { name: t('features'), href: '#', current: selectedTab === t('features') },
    { name: t('additionalDetails'), href: '#', current: selectedTab === t('additionalDetails') },
  ];

  const company = companyInfo[0]; 

  const markers = [
    { lat: company.companyLat, lng: company.companyLog}
  ]

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    <article className="py-10 bg-white">
      <div className="block lg:grid grid-cols-[57.6%,40.7%] grid-rows-[3fr_auto] gap-6 container">

        <div className="flex justify-between items-center col-span-2 row-span-1">
          <nav className="" aria-label="Breadcrumb">
            <ol className="flex leading-none text-[15px] text-agray-700">
              <li className="mr-2">
                <Link href="/inventory">{t('inventory')}</Link>
              </li>
              <li className="mr-2">/</li>
              <li className="font-medium text-agray-800 underline">
                {car.make} {car.model} ({car.year})
              </li>
            </ol>
          </nav>
          <div className="flex items-center">
            <a onClick={handlePrint} className="mr-3">
              <FiPrinter className='hover:scale-125 transition-all duration-100 text-2xl text-agray-700 hover:text-primary' />
            </a>
            <a href="#">
              <MdOutlineShare className='hover:scale-125 transition-all duration-100 text-2xl text-agray-700 hover:text-primary' />
            </a>
          </div>
        </div>
        
        <div className="mt-8 col-span-1 row-span-1">

          <GallerySwiper images={car.photo.split(',')} altText={`${car.make} ${car.model}`} car={car} carUrl={carUrl} />

        </div>

        <div className="mt-8 col-span-1 row-span-2 relative">

          <div className="lg:sticky left-0 right-0 top-0 w-full">
          
          <div className="text-center border border-[#DEDEDE] rounded-[10px]">
              <div className="py-6 px-8 border-b border-[#DEDEDE]">
                  <h1 className="text-[26px] font-bold text-ablack-600">{car.make} {car.model} ({car.year})</h1>
                  <p className="mt-2 text-sm text-agray-700">{car.trim} ({car.drivetrain})</p>
                  <span className="inline-flex items-center py-2 px-3 mt-3 justify-center bg-primary bg-opacity-10 rounded-full text-sm font-bold text-primary">
                    <IoSpeedometer className="size-5 mr-2" /> {car.km} km
                  </span>
              </div>
              <div className="p-6 pb-12 bg-primary bg-opacity-[0.02]">
                <p className="mb-6 text-[32px] font-bold text-agray-800 tracking-tighter">
                  {/* <span className="inline-block mr-2 line-through text-base text-[#CDCDCD] font-bold">38 490 $</span> */}
                  {formatPrice(car.price)} $
                </p>
                
                <button 
                  type="button" 
                  className="flex items-center justify-center w-full py-[13px] px-8 rounded-[10px] bg-primary hover:bg-secondary transition-all duration-200 ease-in-out text-center text-[15px] font-medium text-white"
                  ref={getPaymentFormRef}              
                  onClick={toggleGetPaymentFormVisibility}
                >
                  <LuCreditCard className="text-[#F5F5F5] mr-2" /> 
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
                  className="flex items-center justify-center w-full py-[13px] px-8 rounded-[10px] border border-primary bg-transparent hover:bg-secondary transition-all duration-200 ease-in-out text-center text-[15px] font-medium text-primary hover:text-white leading-[19px] mt-2"
                  ref={tradeInFormRef}
                  onClick={toggleTradeInFormVisibility}
                >
                  <FiDollarSign className="mr-2" /> 
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
                  className="flex items-center justify-center w-full py-[13px] px-8 rounded-[10px] border border-primary bg-transparent hover:bg-secondary transition-all duration-200 ease-in-out text-center text-[15px] font-medium text-primary hover:text-white leading-[19px] mt-2"
                  ref={askDealerFormRef}
                  onClick={toggleAskDealerFormVisibility}
                >
                  <FaRegQuestionCircle className="mr-2" /> 
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

                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center justify-center text-base size-10 rounded-full mr-1">
                    <FiPhone className="size-5 text-primary"/>
                  </div>
                  <span className="text-agray-700 mr-2">{t("contactTitle")}</span>
                  <a href="tel:{company.companyPhoneNumber}" className="text-black font-bold underline cursor-pointer hover:text-primary transition-colors duration-200 ease-in-out">{company.companyPhoneNumber}</a>
                </div>
              </div>
          </div>

          {/*<div className="grid grid-cols-2 gap-y-6 p-6 lg:p-8 mt-2 lg:mt-3 border border-[#DEDEDE] rounded-[10px]">
            <div className="flex text-left leading-5">
              <FaCar className="text-primary size-5 mr-2 mt-1 lg:size-6" />
              <div>
                <span className="text-sm text-agray-800 leading-5	lg:text-lg">{t("examinated")}</span>
              </div>
            </div>
            <div className="flex text-left leading-5">
              <FaClipboardCheck className="text-primary size-5 mr-2 mt-1 lg:size-6" />
              <div>
                <span className="text-sm text-agray-800 lg:text-lg">{t("guarantee")}</span>
              </div>
            </div>
            <div className="flex text-left leading-5">
              <TbTruckDelivery className="text-primary size-5 mr-2 mt-1 lg:size-6" />
              <div>
                <span className="text-sm text-agray-800 lg:text-lg">{t("delivery")}</span>
              </div>
            </div>
            <div className="flex text-left leading-5	">
              <FaFaceGrinStars className="text-primary size-5 mr-2 mt-1 lg:size-6" />
              <div>
                <span className="text-sm text-agray-800 lg:text-lg">{t("warranty")}</span>
              </div>s
            </div>
          </div> */}
          </div>

        </div>

        <div className="mt-4 lg:mt-6 col-span-1 row-span-1 relative">
          
          <div className="border border-[#E1E1E1] rounded-[10px] px-5 py-6 lg:py-[27px] lg:px-[30px]">
            <h3 className="text-left text-lg font-bold text-ablack-600 lg:text-2xl">{t("overview")}</h3>
            <div className="lg:mt-5">
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("make")}</span>
                <span>{car.make}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("model")}</span>
                <span>{car.model}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("color")}</span>
                <span>{car.colore}</span>
              </div>

              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("driveType")}</span>
                <span>{car.drivetrain}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("transmissionOverview")}</span>
                <span>{transmission}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("conditionOverview")}</span>
                <span>{car.saleclass}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("year")}</span>
                <span>{car.year}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("mileage")}</span>
                <span>{car.km} km</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("fuelType")}</span>
                <span>{fuel}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("engineSize")}</span>
                <span>{car.cubiccapacity || 'N/A' }</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("cylinders")}</span>
                <span>{car.enginetype}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("doors")}</span>
                <span>{car.bodydoors}</span>
              </div>
              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("seats")}</span>
                <span>{car.passengers}</span>
              </div>

              <div className="flex justify-between items-center py-3 text-sm lg:text-lg text-ablack-600 border-b border-[#CDCDCD]">
                <span className="font-bold lg:font-medium">{t("vin")}</span>
                <span>{car.serialnumber}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between mt-4 border border-[#E1E1E1] rounded-[10px] px-5 py-6 lg:py-8 lg:px-[30px]">
            <h3 className="w-1/2 text-left text-lg font-bold text-ablack-600 lg:text-2xl">{t('description')}</h3>
            {/* <span className="ml-auto text-lg font-bold text-agray-700 opacity-50 lg:text-2xl">ID #9535</span> */}
            <div className="w-full mt-4 lg:mt-8 text-sm lg:text-lg text-agray-700 text-justify">
              <p>{car.noteextraf}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between mt-4 border border-[#E1E1E1] rounded-[10px] px-5 py-6 lg:py-8 lg:px-[30px]">
            <h3 className="text-left text-lg font-bold text-ablack-600 lg:text-2xl lg:order-1 w-1/2">{t('features')}</h3>
            <div className="flex w-full flex-wrap justify-between lg:order-3 lg:mt-8">
            
 
              <div className="w-full mt-4">
                <ul className="mt-2 columns-2 text-xs list-none space-y-2 text-ablack-600 lg:text-[15px] lg:space-y-2 xl:columns-3">
                {Array.isArray(car.useroptionsf)
                  ? car.useroptionsf.map((option: string, index: number) => (
                      <li
                        key={index} // Add key prop
                        className="before:content-[''] before:inline-block before:size-3 lg:size-6 before:bg-check-list before:bg-no-repeat before:bg-center before:mr-2 whitespace-nowrap overflow-hidden text-ellipsis lg:overflow-visible"
                      >
                        {option}
                      </li>
                    ))
                  : typeof car.useroptionsf === 'string'
                  ? car.useroptionsf.split(',').map((option: string, index: number) => (
                      <li
                        key={index} // Add key prop
                        className="before:content-[''] before:inline-block before:size-3 lg:before:size-6 before:bg-check-list before:bg-no-repeat before:bg-center before:mr-2 whitespace-nowrap overflow-hidden text-ellipsis lg:overflow-visible"
                      >
                        {option.trim()}
                      </li>
                    ))
                : null}
                </ul>
              </div>
            </div>
            {/* <Link href="#" className="inline-flex mt-4 text-[15px] lg:text-lg font-bold underline text-ablack-600 lg:order-2 lg:mt-0">View all features</Link> */}
          </div>

          <div className="overflow-hidden mt-4 border border-[#E1E1E1] rounded-[10px]">
            <div className="min-h-[309px] lg:min-h-[328px]">
              <GoogleMapComponent lat={company.companyLat} lng={company.companyLog} zoom={company.mapsZoomLevel} markers={markers} />
            </div>
            <div className="px-5 py-6 lg:p-[30px] lg:flex lg:justify-between lg:items-center">
              <div className="lg:w-3/4">
                <h3 className="text-left text-lg font-bold text-ablack-600 lg:text-xl">{t('location')}</h3>
                <p className="text-xs text-agray-700 lg:text-[15px] lg:mt-2">{company.companyAddress}</p>
              </div>
              <button type="button" className="inline-flex justify-center w-full mt-4 py-3 rounded-[10px] text-[15px] text-white font-medium bg-primary hover:bg-secondary transition-all duration-200 ease-in-out lg:text-[15px] lg:py-4 lg:px-8 lg:inline-flex lg:w-auto lg:ml-auto">{t('getdirections')}</button>
            </div>
          </div>

        </div>

      </div>
    </article>

    <ReleatedBestCar make={carBrand} />
    <ContactSection />

    </>
  );
}
