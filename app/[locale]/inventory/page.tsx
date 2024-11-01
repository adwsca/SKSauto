'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Sidebar from '../../components/Sidebar';
import WhyChooseUs2 from '../../components/whyChooseUs-inventory';
import ContactSection from '../../components/contact';
import LoadingSpinner from '../../components/LoadingSpinner';

import { MdOutlineSpeed, MdOutlineSettingsInputComponent } from "react-icons/md";
import { HiOutlineHashtag } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import Image from 'next/image';
import { routing } from '../../../i18n/routing'; // Ensure this path is correct based on your project structure


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

const Inventory = () => {
  const t = useTranslations('inventory');
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Car[] = await response.json();
        setCars(data);

        const sortedCars = data.sort((a, b) => a.price - b.price);
        setFilteredCars(sortedCars); // Set filtered cars to the sorted array

        const makeQuery = searchParams.get('make');
        const modelQuery = searchParams.get('model');
        const yearsQuery = searchParams.get('year');
        const typeQuery = searchParams.get('type');

        const filtered = sortedCars.filter(car => {
          let matches = true;

          if (makeQuery) {
            matches = matches && car.make.toLowerCase() === makeQuery.toLowerCase();
          }

          if (modelQuery) {
            matches = matches && car.model.toLowerCase() === modelQuery.toLowerCase();
          }

          if (yearsQuery) {
            matches = matches && car.year.toString() === yearsQuery;
          }

          if (typeQuery) {
            matches = matches && car.category.toLowerCase() === typeQuery.toLowerCase();
          }

          return matches;
        });

        setFilteredCars(filtered);

      } catch (error) {
        console.error('Error fetching cars:', error);
        setError(t('errorFetchingCars'));
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [t, searchParams]);

  const handleFilterChange = (filters: { 
    makes?: string[]; 
    models?: { [key: string]: string[] }; 
    transtype?: string[]; 
    bodytype?: string[]; 
    fueltype?: string[]; 
    drivetraintype?: string[];
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    maxKm?: string;
  }) => {
    let filtered = cars;
    const selectedMakes = filters.makes || [];
    const selectedModels = filters.models || {};
    const selectedTransTypes = filters.transtype || [];
    const selectedBodyTypes = filters.bodytype || [];
    const selectedFuelTypes = filters.fueltype || [];
    const selectedDrivetrainTypes = filters.drivetraintype || [];

    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice || Number.MAX_VALUE;
    const minYear = filters.minYear || 0;
    const maxYear = filters.maxYear || Number.MAX_VALUE;
    const maxKm = filters.maxKm ? parseInt(filters.maxKm, 10) : Number.MAX_VALUE;

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

    if (selectedTransTypes.length > 0) {
      filtered = filtered.filter((car) => selectedTransTypes.includes(car.transtype));
    }

    if (selectedBodyTypes.length > 0) {
      filtered = filtered.filter((car) => selectedBodyTypes.includes(car.category));
    }

    if (selectedFuelTypes.length > 0) {
      filtered = filtered.filter((car) => selectedFuelTypes.includes(car.fuel));
    }

    if (selectedDrivetrainTypes.length > 0) {
      filtered = filtered.filter((car) => selectedDrivetrainTypes.includes(car.drivetrain));
    }

    filtered = filtered.filter((car) => car.price >= minPrice && car.price <= maxPrice);
    filtered = filtered.filter((car) => car.year >= minYear && car.year <= maxYear);
    filtered = filtered.filter((car) => parseInt(car.km, 10) <= maxKm);

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term);
      filtered = filtered.filter((car) => {
        const carDetails = `${car.make.toLowerCase()} ${car.model.toLowerCase()} ${car.year} ${car.stocknumber.toLowerCase()}`;
        return searchTerms.every(term => carDetails.includes(term));
      });
    }

    // Sort filtered cars by year if the year range filter is applied
    if (minYear > 0 || maxYear < Number.MAX_VALUE) {
      filtered.sort((a, b) => a.year - b.year);
    }

    setFilteredCars(filtered);
  };

  const handleSearch = () => {
    handleFilterChange({});
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    let sortedCars = [...filteredCars];

    switch (value) {
      case 'price-asc':
        sortedCars.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedCars.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedCars.sort((a, b) => a.make.localeCompare(b.make));
        break;
      case 'name-desc':
        sortedCars.sort((a, b) => b.make.localeCompare(a.make));
        break;
      default:
        break;
    }

    setFilteredCars(sortedCars);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9); // Load 9 more cars each time
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{t('error')}: {error}</div>;
  }

  // Get the localized path based on the routing config
  const getLocalizedPath = (path: string) => {
    const localizedPathObject = routing.pathnames[path];

    if (localizedPathObject) {
      return localizedPathObject[currentLocale] || path; // Return the localized path for the current locale or fallback to the original path
    }
    
    return path; // Fallback to the original path if not found in routing.pathnames
  };

  const generateSlug = (car: Car): string => {
    return `${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}-${car._id}`;
  };

  return (
    <>
    <section className="pt-8 pb-10 md:pt-[72px] md:pb-[120px] bg-white">
      <div className="container lg:grid lg:grid-cols-[342px_1fr] lg:grid-rows-[auto_auto] lg:gap-6 items-center">
        
        <div className="text-left pb-6 xl:pb-0">
          <h1 className="text-[28px] font-bold text-ablack-600 md:text-[46px] md:leading-[48px]">{t("inventory")}</h1>
        </div>
        
        <div className="flex items-center p-3 rounded-2xl w-full bg-dark-3 md:p-2">
          <input type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
            className="w-full text-lg text-black-57 py-[13px] px-6 rounded-l-2xl md:text-lg md:py-[13px] md:rounded-l-[10px]"
          />
          <button 
            type="button" 
            className="flex flex-shrink-0 items-center justify-center size-14 rounded-r-2xl bg-primary hover:bg-grey-forza transition-all ease md:text-white md:text-xl md:py-[14px] md:px-8 md:w-[162px]"
            onClick={handleSearch}
          >
          <LuSearch className="mr-2 text-xl" />

            <span className="hidden md:inline-block">{t('search')}</span>
          </button>
        </div>
        
        <div className="pt-10 self-start md:pt-2">
          <Sidebar onFilterChange={handleFilterChange} />
          {/* Sidebar */}
        </div>
        <div className="pt-6 md:pt-2 self-start">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {
              filteredCars.slice(0, visibleCount).map((car) => {
              const slug = generateSlug(car);

              return (
                <Link key={car._id} href={getLocalizedPath(`/inventory/${slug}`)} passHref legacyBehavior>
                  <div className="block border border-agray-500 overflow-hidden rounded-2xl cursor-pointer">
                    <div className="block relative">
                      <img
                        alt={`${car.make} ${car.model} for sale`}
                        src={car.photo.split(',')[0]}
                     
                        className="w-full h-[240px] object-cover object-center"
                      />
                    </div>
                    <div className="py-4 px-5 lg:py-5">
                      <p className="text-agray-800 text-base font-bold mb-1 lg:text-xl">{car.year} {car.make} {car.model}</p>
                      <p className="text-agray-700 text-xs whitespace-nowrap overflow-hidden text-ellipsis lg:text-sm">{car.condition || t('used')}</p>
                      <div className="flex items-center justify-between mt-2 border-t border-agray-500 pt-3">
                        <div className="flex items-center">
                          <MdOutlineSpeed className="text-xl mr-2 antialised text-primary" />
                          <span className="text-xs font-dm-sans text-agray-700">{car.km || 'N/A'} km</span>
                        </div>
                        <div className="flex items-center">
                        <MdOutlineSettingsInputComponent className="text-lg mr-2 antialised text-primary" />

                          <span className="text-xs font-dm-sans text-agray-700">{car.intcolore || 'N/A'}</span>
                        </div>
                        <div className="flex items-center">
                        <HiOutlineHashtag className="text-lg mr-1 antialised text-primary" />
                          <span className="text-xs font-dm-sans text-agray-700">{car.stocknumber || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-[18px] lg:mt-5">
                        {/* <span className="text-[20px] font-bold text-agray-300 line-through lg:text-2xl">38 490 $</span> */}
                        <span className="text-[20px] ml-auto font-bold text-agray-700 lg:text-4xl">{car.price} $</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="relative mt-6 w-full flex justify-center md:mt-8">
          {visibleCount < filteredCars.length && (
              <div className="flex justify-center m-4">
              <button
                onClick={handleLoadMore}
                className="flex justify-center items-center w-full px-5 py-3 border-0 rounded-[10px] bg-primary hover:bg-secondary transition-all duration-200 ease text-[15px] font-medium text-white"
              >
                {t('loadMore')}
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    <ContactSection/>
  </>
  );
};

export default Inventory;
