'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineSpeed, MdOutlineSettingsInputComponent } from "react-icons/md";
import { HiOutlineHashtag } from "react-icons/hi";
import Link from 'next/link';
import 'swiper/css';
import { useTranslations } from 'next-intl';

// React Icons
import { RiSearchLine } from "react-icons/ri";

type Car = {
    _id: { $oid: string };
    auto123id: { $numberLong: string };
    saleclass: string;
    entrydate: { $date: string };
    lastmoddate: { $date: string };
    make: string;
    model: string;
    year: number;
    price: number;
    photo: string;
    km: string;
    transtype: string;
    condition: string;
    stocknumber: string;
    intcolore: string;
    drivetrain: string;
    fuel: string;
    category: string;
};

const TheMostRecentsVehicles: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
	const [makes, setMakes] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);
    const [selectedMake, setSelectedMake] = useState<string>('');
	const [selectedModel, setSelectedModel] = useState<string>('');
	const [selectedPrice, setSelectedMaxPrice] = useState<number | string>('');
    const [visibleCount, setVisibleCount] = useState(16);
    const [isDesktop, setIsDesktop] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };
  
      handleResize();

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        async function fetchMakes() {
          const response = await fetch('/api/search');
          const data = await response.json();
          setMakes(data.availableMakes);
        }
        fetchMakes();
    }, []);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars');

                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: Car[] = await response.json();
                data.sort((a, b) => {
                    let A = a.lastmoddate;
                    let B = b.lastmoddate;
                    const dateA = new Date(A).getTime();
                    const dateB = new Date(A).getTime();
                    return dateB - dateA;
                });
                setCars(data);
                setFilteredCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
                setError(('errorFetchingCars'));
            } finally {
                setLoading(false);
            }
        };
    fetchCars();
    }, []);

    const handleMakeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
	  const make = e.target.value;
	  setSelectedMake(make);
	  const response = await fetch(`/api/search?make=${make}`);
	  const data = await response.json();
      setSelectedModel('');
	  setModels(data.availableModels);
	};
  
	const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
	  const model = e.target.value;
	  setSelectedModel(model);
	  const response = await fetch(`/api/search?model=${model}`);
	  const data = await response.json();
	};

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const price = parseFloat(e.target.value);
		setSelectedMaxPrice(price);
	};

    const generateSlug = (car: Car): string => {
        return `${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}-${car._id}`;
    };

    const handleFilterChange = (filters: {
        makes?: string[]; 
        models?: { [key: string]: string[] }; 
        minPrice?: number;
        maxPrice?: number;
      }) => {
        let filtered = cars;
    
        const selectedMakes = filters.makes || [];
        const selectedModels = filters.models || {};
    
        const minPrice = filters.minPrice || 0;
        const maxPrice = filters.maxPrice || Number.MAX_VALUE;

        if (selectedMakes.length > 0) {
          filtered = filtered.filter((car) => selectedMakes.includes(car.make));
        }
    
        if (Object.keys(selectedModels).length > 0) {
          filtered = filtered.filter((car) => {
            if (selectedModels[car.make]?.length > 0) {
              return selectedModels[car.make].includes(car.model);
            }
            return true;
          });
        }

        filtered = filtered.filter((car) => car.price >= minPrice && car.price <= maxPrice);

        setFilteredCars(filtered);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    
        const selectedMakes = selectedMake ? [selectedMake] : [];
        const selectedModels = selectedModel ? { [selectedMake]: [selectedModel] } : {};
        const minPrice = 0;
        const maxPrice = selectedPrice ? Number(selectedPrice) : Number.MAX_VALUE;
        handleFilterChange({
            makes: selectedMakes,
            models: selectedModels,
            minPrice: minPrice,
            maxPrice: maxPrice,
        });
    };

    const swiperRef = useRef<any>(null);
    
    const handlePrevSlide = () => {
        if (swiperRef.current) {
          swiperRef.current.slidePrev();
        }
    };
    
    const handleNextSlide = () => {
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
    };
    const t = useTranslations('theMostRecentsVehicules'); // Use the 'theMostRecentsVehicules' namespace for translations
	return (
		<section className="py-10 lg:pt-[100px] lg:pb-[40px] overflow-hidden bg-white">
            <div className="container">

                <h2 className="px-7 text-center text-[26px] text-agray-800 font-bold lg:text-[40px] lg:px-0">{t('title')}</h2>

                <form onSubmit={handleSearch} className="block mt-6 lg:mt-12 lg:flex lg:items-center lg:w-full lg:max-w-[960px] lg:bg-[#F9F9F9] lg:border lg:border-[#E6E6E6] lg:rounded-full lg:mx-auto lg:p-[10px]">
                    <select name="make" onChange={handleMakeChange} className="text-agray-700 text-sm w-full border border-[#E6E6E6] bg-[#F9F9F9] rounded-[10px] py-[13.5px] px-4 mb-2 lg:text-lg lg:py-1 lg:px-[30px] lg:border-0 lg:m-0 lg:border-r lg:border-[agray-500] bg-select bg-8 bg-right-center lg:bg-lg-right-center">
						<option value="">{t('brand')}</option>
						    {makes.map((make) => (
						        <option key={make} value={make}>
							        {make}
						        </option>
						    ))}
                    </select>
                    <select onChange={handleModelChange} name="model" className="text-agray-700 text-sm w-full border border-[#E6E6E6] bg-[#F9F9F9] rounded-[10px] py-[13.5px] px-4 mb-2 lg:text-lg lg:py-1 lg:px-[30px] lg:border-0 lg:m-0 lg:border-r lg:border-[agray-500] bg-select bg-8 bg-right-center lg:bg-lg-right-center">
                        <option value="">{t('makes')}</option>
						    {models.map((model) => (
						        <option key={model} value={model}>
							        {model}
						        </option>
						    ))}
                    </select>
                    <select name="price" onChange={handleMaxPriceChange} className="text-agray-700 text-sm w-full border border-[#E6E6E6] bg-[#F9F9F9] rounded-[10px] py-[13.5px] px-4 mb-2 lg:text-lg lg:py-1 lg:px-[30px] lg:border-0 lg:m-0 bg-select bg-8 bg-right-center lg:bg-lg-right-center">
                        <option value="">{t('price')}</option>
                        <option value="10000">{t("10k")}</option>
                        <option value="20000">{t("20k")}</option>
                        <option value="30000">{t("30k")}</option>
                        <option value="40000">{t("40k")}</option>
                        <option value="50000">{t("50k")}</option>
                        <option value="60000">{t("60k")}</option>
                        <option value="70000">{t("70k")}</option>
                        <option value="80000">{t("80k")}</option>
                        <option value="90000">{t("90k")}</option>
                        <option value="100000">{t("100k")}</option>
                    </select>
                    <button className="flex w-full bg-primary hover:bg-secondary transition-all duration-200 ease-in-out py-[14px] px-6 justify-center items-center rounded-[10px] text-white mt-2 lg:size-14 lg:rounded-full lg:p-0 lg:flex-shrink-0 lg:mt-0">
                    <RiSearchLine className='size-6 lg:size-7' />
                        <span className="text-xl font-medium lg:hidden">Search</span>
                    </button>
                </form>


            {isDesktop ? (
                    <div className="relative mt-4 lg:mt-12">
                        <button type="button" onClick={handlePrevSlide} className="absolute -left-28 top-0 bottom-0 m-auto flex items-center justify-center size-[50px] rounded-full border border-agray-500">
                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.1624 7.12507L7.6749 12.6376C7.8624 12.8251 7.95315 13.0438 7.94715 13.2938C7.94115 13.5438 7.84415 13.7626 7.65615 13.9501C7.46815 14.1376 7.2494 14.2313 6.9999 14.2313C6.7504 14.2313 6.53165 14.1376 6.34365 13.9501L0.568653 8.19382C0.418653 8.04382 0.306152 7.87507 0.231152 7.68757C0.156152 7.50007 0.118652 7.31257 0.118652 7.12507C0.118652 6.93757 0.156152 6.75007 0.231152 6.56257C0.306152 6.37507 0.418653 6.20632 0.568653 6.05632L6.34365 0.281318C6.53115 0.0938181 6.75315 0.00306813 7.00965 0.00906813C7.26615 0.0150681 7.4879 0.112068 7.6749 0.300068C7.8619 0.488068 7.95565 0.706818 7.95615 0.956318C7.95665 1.20582 7.8629 1.42457 7.6749 1.61257L2.1624 7.12507Z" fill="#050B20"/>
                            </svg>
                        </button>
                        <button type="button" onClick={handleNextSlide} className="absolute -right-28 top-0 bottom-0 m-auto flex items-center justify-center size-[50px] rounded-full border border-agray-500">
                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.8376 7.12493L0.325099 1.61243C0.137599 1.42493 0.0468485 1.20618 0.0528481 0.95618C0.0588481 0.70618 0.155849 0.48743 0.343848 0.29993C0.531849 0.11243 0.750599 0.0186799 1.0001 0.01868C1.2496 0.01868 1.46835 0.11243 1.65635 0.29993L7.43135 6.05618C7.58135 6.20618 7.69385 6.37493 7.76885 6.56243C7.84385 6.74993 7.88135 6.93743 7.88135 7.12493C7.88135 7.31243 7.84385 7.49993 7.76885 7.68743C7.69385 7.87493 7.58135 8.04368 7.43135 8.19368L1.65635 13.9687C1.46885 14.1562 1.24685 14.2469 0.990347 14.2409C0.733847 14.2349 0.512098 14.1379 0.325098 13.9499C0.138098 13.7619 0.0443478 13.5432 0.0438481 13.2937C0.0433479 13.0442 0.137098 12.8254 0.325098 12.6374L5.8376 7.12493Z" fill="#050B20"/>
                            </svg>
                        </button>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            pagination={{ clickable: true }}
                            loop={true}
                            className="w-full h-auto"
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                        >

                            {
                                filteredCars.slice(0, visibleCount).map((car) => {
                                const slug = generateSlug(car);

                                return (
                                    <SwiperSlide key={car._id}>
                                        <Link href={`/inventory/${slug}`} legacyBehavior>
                                            <a>
                                                <div className="block border border-agray-500 overflow-hidden rounded-2xl cursor-pointer">
                                                    <div className="block relative">
                                                    <img 
                                                        alt={`${car.make} ${car.model} for sale`}
                                                        src={car.photo.split(',')[0]}
                                                        className="w-full h-[218px] object-cover object-center"
                                                    />
                                                    </div>
                                                    <div className="py-4 px-5 lg:py-5">
                                                        <p className="text-agray-800 text-2xl font-extrabold mb-1 lg:text-2xl">{car.year} {car.make} {car.model}</p>
                                                        <p className="text-agray-700 text-lg whitespace-nowrap overflow-hidden text-ellipsis lg:text-sm">{car.condition || t('used')}</p>
                                                        <div className="flex items-center justify-between mt-2 border-t border-agray-500 pt-3">
                                                            <div className="flex items-center">
                                                                <MdOutlineSpeed className="text-xl mr-2 antialised text-primary" />
                                                                <span className="text-sm font-dm-sans text-agray-700">{car.km || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <MdOutlineSettingsInputComponent className="text-xl mr-2 antialised text-primary" />
                                                                <span className="text-sm font-dm-sans text-agray-700">{car.intcolore || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <HiOutlineHashtag className="text-xl mr-1 antialised text-primary" />
                                                                <span className="text-sm font-dm-sans text-agray-700">{car.stocknumber || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-[18px] lg:mt-5">
                                                            {/* <span className="text-[20px] font-bold text-agray-300 line-through lg:text-2xl">38 490 $</span> */}
                                                            <span className="text-4xl ml-auto font-extrabold text-dark-3 lg:text-3xl">${car.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
            ) : (
                <div className="mt-4 lg:mt-12">
                {
                    filteredCars.slice(0, visibleCount).map((car) => {
                    const slug = generateSlug(car);

                    return (
                        <Link key={car._id} href={`/inventory/${slug}`} passHref legacyBehavior>
                            <div className="block border border-agray-500 overflow-hidden rounded-2xl mt-2">
                                <div className="block relative">
                                    <img 
                                        alt={`${car.make} ${car.model} for sale`}
                                        src={car.photo.split(',')[0]}
                                        className="w-full h-[250px] object-cover object-center"
                                    />
                                </div>
                                <div className="py-4 px-5 lg:py-5">
                                    <p className="text-agray-800 text-2xl font-extrabold mb-1 lg:text-2xl">{car.year} {car.make} {car.model}</p>
                                    <p className="text-agray-700 text-lg whitespace-nowrap overflow-hidden text-ellipsis lg:text-sm">{car.condition || ('used')}</p>
                                    <div className="flex items-center justify-between mt-2 border-t border-agray-500 pt-3">
                                        <div className="flex items-center">
                                            <MdOutlineSpeed className="text-xl mr-2 antialised" />
                                            <span className="text-sm font-dm-sans text-agray-700">{car.km || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MdOutlineSettingsInputComponent className="text-xl mr-2 antialised" />
                                            <span className="text-sm font-dm-sans text-agray-700">{car.intcolore || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <HiOutlineHashtag className="text-xl mr-1 antialised" />
                                            <span className="text-sm font-dm-sans text-agray-700">{car.stocknumber || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-[18px] lg:mt-5">
                                        {/* <span className="text-[20px] font-bold text-agray-300 line-through lg:text-2xl">38 490 $</span> */}
                                        <span className="text-4xl ml-auto font-black text-dark-3 lg:text-4xl">${car.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

            </div>
            )}

                <button type="button" className="mt-4 w-full flex justify-center bg-white border border-blue-fbg-primary hover:bg-secondary rounded-[10px] px-8 py-3 text-blue-fbg-primary hover:bg-secondary text-[15px] font-medium lg:hidden">Load More</button>

            </div>
		</section>
  	)
}
export default TheMostRecentsVehicles;
