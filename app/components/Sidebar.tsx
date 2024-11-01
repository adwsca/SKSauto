import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 

import { TfiReload } from "react-icons/tfi";

import Accordion from './Accordion';
import {
  fetchAvailableMakes,
  fetchAvailableTransTypes,
  fetchAvailableBodyTypes,
  fetchAvailableFuelTypes,
  fetchAvailableDrivetrainTypes,
  fetchPriceRange,  // Import the function to fetch the price range
  fetchCarsByPriceRange,
  fetchYearRange,
  fetchCarsByYearRange,
} from '../../utils/carFilters';

const Sidebar = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const t = useTranslations('sidebar');  // Load sidebar translations

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const bodyTypeMap: { [key: string]: string } = {
    Car: t('body.Car'),
    Cargovan: t('body.Cargovan'),
    Minivan: t('body.Minivan'),
    Passenger: t('body.Passenger'),
    Pickup: t('body.Pickup'),
    SportUtil: t('body.SportUtil'),
  };
  
  const transmissionTypeMap: { [key: string]: string } = {
    AT: t('transmission.AT'),
    MT: t('transmission.MT'),
  };
  
  const fuelTypeMap: { [key: string]: string } = {
    D: t('fuel.DS'),
    UL: t('fuel.UL'),
    HB: t('fuel.HB'),
    EL: t('fuel.EL'),
  };
  
  const drivetrainTypeMap: { [key: string]: string } = {
    '4X4': t('drivetrain.4x4'),
    'AWD': t('drivetrain.AWD'), // Enclose 'AWD' in quotes for consistency
    'FWD': t('drivetrain.FWD'),
    'RWD': t('drivetrain.RWD'),
  };

  const [range, setRange] = useState([20, 80]);

  const handleRangeChange = (newRange : any) => {
    setRange(newRange);
  };

  const [availableMakes, setAvailableMakes] = useState<string[]>([]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [models, setModels] = useState<{ [key: string]: string[] }>({});
  const [selectedModels, setSelectedModels] = useState<{ [key: string]: string[] }>({});

  const [availableTransTypes, setAvailableTransTypes] = useState<string[]>([]);
  const [selectedTransTypes, setSelectedTransTypes] = useState<string[]>([]);

  const [availableBodyTypes, setAvailableBodyTypes] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);

  const [availableFuelTypes, setAvailableFuelTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);

  const [availableDrivetrainTypes, setAvailableDrivetrainTypes] = useState<string[]>([]);
  const [selectedDrivetrainTypes, setSelectedDrivetrainTypes] = useState<string[]>([]);

  const [selectedMileage, setSelectedMileage] = useState<string>('');  // New state for mileage filter

  const [priceRange, setPriceRange] = useState<{ minPrice: number; maxPrice: number }>({ minPrice: 0, maxPrice: 100000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 100000]);

  const [yearRange, setYearRange] = useState<{ minYear: number; maxYear: number }>({ minYear: 1990, maxYear: 2030 });
  const [selectedYearRange, setSelectedYearRange] = useState<[number, number]>([1990, 2030]);

  const resetFilters = () => {
    setSelectedMakes([]);
    setSelectedModels({});
    setModels({});
    setSelectedTransTypes([]);
    setSelectedBodyTypes([]);
    setSelectedFuelTypes([]);
    setSelectedDrivetrainTypes([]);
    setSelectedMileage('');  // Reset mileage filter
    setSelectedPriceRange([priceRange.minPrice, priceRange.maxPrice]); // Reset price range
    setSelectedYearRange([yearRange.minYear, yearRange.maxYear]);

    onFilterChange({ 
      makes: [], 
      models: {}, 
      transtype: [], 
      bodytype: [], 
      fueltype: [], 
      drivetraintype: [], 
      minPrice: priceRange.minPrice, 
      maxPrice: priceRange.maxPrice,
      minYear: yearRange.minYear,
      maxYear: yearRange.maxYear,
      maxKm: ''  // Reset mileage filter in filter state
    });
  };

  useEffect(() => {
    fetchAvailableMakes().then(setAvailableMakes);
    fetchAvailableTransTypes().then(setAvailableTransTypes);
    fetchAvailableBodyTypes().then(setAvailableBodyTypes);
    fetchAvailableFuelTypes().then(setAvailableFuelTypes);
    fetchAvailableDrivetrainTypes().then(setAvailableDrivetrainTypes);
    fetchPriceRange().then((range) => {
      console.log('Setting price range in state:', range);

      setPriceRange(range);
      setSelectedPriceRange([range.minPrice, range.maxPrice]); // Initialize selected range
    });

    fetchYearRange().then((range) => {
      console.log('Setting year range in state:', range);

      // setYearRange(range);
      setYearRange({ minYear: range.minYear, maxYear: range.maxYear });
      setSelectedYearRange([range.minYear, range.maxYear]); // Initialize selected range
    });

  }, []);

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const newRange: [number, number] = value as [number, number]; // Assert the type
      console.log('Price range changed:', newRange);
      setSelectedPriceRange(newRange);
      debounceApplyPriceRange(newRange);
    } else {
      // If a single number is received (though unlikely with a range slider), handle it accordingly
      console.warn('Expected an array for the price range but received a single number:', value);
    }
  };


 //   fetchCarsByPriceRange(newRange[0], newRange[1]).then((filteredCars) => {
 //     onFilterChange({
 //       makes: selectedMakes,
 //       models: selectedModels,
 //       transtype: selectedTransTypes,
 //       bodytype: selectedBodyTypes,
 //      fueltype: selectedFuelTypes,
 //       drivetraintype: selectedDrivetrainTypes,
 //       minPrice: newRange[0],
 //       maxPrice: newRange[1],
 //       cars: filteredCars, // Add filtered cars to the filters or another relevant state
 //     });
 //   });
 // Create a debounced version of the function that applies the price range filter
const debounceApplyPriceRange = debounce((newRange: [number, number]) => {
  fetchCarsByPriceRange(newRange[0], newRange[1]).then((filteredCars) => {
    onFilterChange({
      makes: selectedMakes,
      models: selectedModels,
      transtype: selectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: newRange[0],
      maxPrice: newRange[1],
      cars: filteredCars, // Add filtered cars to the filters or another relevant state
    });
  });
  }, 300);

  const handleYearRangeChange = (newYearRange: [number, number]) => {
    console.log('Year range changed:', newYearRange); 
    setSelectedYearRange(newYearRange);

    fetchCarsByYearRange(newYearRange[0], newYearRange[1]).then((filteredCars) => {
      onFilterChange({
        makes: selectedMakes,
        models: selectedModels,
        transtype: selectedTransTypes,
        bodytype: selectedBodyTypes,
        fueltype: selectedFuelTypes,
        drivetraintype: selectedDrivetrainTypes,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1],
        minYear: newYearRange[0],
        maxYear: newYearRange[1],
        cars: filteredCars,
      });
    });
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMaxKm = e.target.value;
    setSelectedMileage(selectedMaxKm);

    onFilterChange({
      makes: selectedMakes,
      models: selectedModels,
      transtype: selectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMaxKm,  // Pass the mileage filter to the parent component
    });
  };

  const handleMakeChange = (make: string) => {
    const newSelectedMakes = selectedMakes.includes(make)
      ? selectedMakes.filter((m) => m !== make)
      : [...selectedMakes, make];

    setSelectedMakes(newSelectedMakes);

    if (!models[make]) {
      fetch(`/api/cars?make=${make}`)
        .then((response) => response.json())
        .then((data) => {
          const uniqueModels = [...new Set(data.map((car: any) => car.model))].sort((a, b) =>
            a.localeCompare(b)
          );
          setModels((prevModels) => ({ ...prevModels, [make]: uniqueModels }));
        })
        .catch((error) => console.error('Failed to fetch models:', error));
    }

    if (!newSelectedMakes.includes(make)) {
      setSelectedModels((prevModels) => {
        const { [make]: removed, ...rest } = prevModels;
        return rest;
      });
    }

    onFilterChange({
      makes: newSelectedMakes,
      models: selectedModels,
      transtype: selectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMileage, // Keep the current mileage filter
    });
  };

  const handleModelChange = (make: string, model: string) => {
    const newSelectedModels = selectedModels[make]?.includes(model)
      ? selectedModels[make].filter((m) => m !== model)
      : [...(selectedModels[make] || []), model];

    setSelectedModels((prevModels) => ({ ...prevModels, [make]: newSelectedModels }));

    onFilterChange({
      makes: selectedMakes,
      models: { ...selectedModels, [make]: newSelectedModels },
      transtype: selectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMileage, // Keep the current mileage filter
    });
  };

  const handleTransTypeChange = (transtype: string) => {
    const newSelectedTransTypes = selectedTransTypes.includes(transtype)
      ? selectedTransTypes.filter((t) => t !== transtype)
      : [...selectedTransTypes, transtype];

    setSelectedTransTypes(newSelectedTransTypes);
    onFilterChange({
      makes: selectedMakes,
      models: selectedModels,
      transtype: newSelectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMileage, // Keep the current mileage filter
    });
  };

  const handleBodyTypeChange = (bodytype: string) => {
    const newSelectedBodyTypes = selectedBodyTypes.includes(bodytype)
      ? selectedBodyTypes.filter((bt) => bt !== bodytype)
      : [...selectedBodyTypes, bodytype];

    setSelectedBodyTypes(newSelectedBodyTypes);
    onFilterChange({
      makes: selectedMakes,
      models: selectedModels,
      transtype: selectedTransTypes,
      bodytype: newSelectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMileage, // Keep the current mileage filter
    });
  };

  const handleFuelTypeChange = (fueltype: string) => {
    const newSelectedFuelTypes = selectedFuelTypes.includes(fueltype)
      ? selectedFuelTypes.filter((ft) => ft !== fueltype)
      : [...selectedFuelTypes, fueltype];

    setSelectedFuelTypes(newSelectedFuelTypes);
    onFilterChange({
      makes: selectedMakes,
      models: selectedModels,
      transtype: selectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: newSelectedFuelTypes,
      drivetraintype: selectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMileage, // Keep the current mileage filter
    });
  };

  const handleDrivetrainTypeChange = (drivetrain: string) => {
    const newSelectedDrivetrainTypes = selectedDrivetrainTypes.includes(drivetrain)
      ? selectedDrivetrainTypes.filter((ft) => ft !== drivetrain)
      : [...selectedDrivetrainTypes, drivetrain];

    setSelectedDrivetrainTypes(newSelectedDrivetrainTypes);
    onFilterChange({
      makes: selectedMakes,
      models: selectedModels,
      transtype: selectedTransTypes,
      bodytype: selectedBodyTypes,
      fueltype: selectedFuelTypes,
      drivetraintype: newSelectedDrivetrainTypes,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      minYear: selectedYearRange[0],
      maxYear: selectedYearRange[1],
      maxKm: selectedMileage, // Keep the current mileage filter
    });
  };

  const isFilterApplied =
    selectedMakes.length > 0 ||
    Object.values(selectedModels).some((models) => models.length > 0) ||
    selectedTransTypes.length > 0 ||
    selectedBodyTypes.length > 0 ||
    selectedFuelTypes.length > 0 ||
    selectedDrivetrainTypes.length > 0 ||
    selectedPriceRange[0] !== priceRange.minPrice || // Check if the selected min price is not the default min price
    selectedPriceRange[1] !== priceRange.maxPrice ||
    selectedYearRange[0] !== yearRange.minYear ||
    selectedYearRange[1] !== yearRange.maxYear ||
    selectedMileage !== ''; // Check if the mileage filter is applied
    
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <>
    <div className="pt-3 px-4 pb-4 rounded-[10px] bg-agray-400 md:py-8 md:px-6 md:rounded-2xl">

        <h5 className="hidden md:block text-[32px] font-bold text-ablack-600 text-left leading-6">Rechercher</h5>

        <button type="button" className="flex w-full justify-start items-center text-[15px] text-agray-800 font-medium cursor-pointer md:hidden" onClick={() => setIsOpenFilter(!isOpenFilter)}>
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
            <path d="M8.00003 16C7.7167 16 7.47936 15.904 7.28803 15.712C7.0967 15.52 7.0007 15.2827 7.00003 15V9L1.20003 1.6C0.95003 1.26667 0.912696 0.916667 1.08803 0.55C1.26336 0.183334 1.56736 0 2.00003 0H16C16.4334 0 16.7377 0.183334 16.913 0.55C17.0884 0.916667 17.0507 1.26667 16.8 1.6L11 9V15C11 15.2833 10.904 15.521 10.712 15.713C10.52 15.905 10.2827 16.0007 10 16H8.00003ZM9.00003 8.3L13.95 2H4.05003L9.00003 8.3Z" fill="#333333"/>
          </svg>
          <span className="leading-[13px]">{t('filters')}</span>
            <svg 
              width="9" 
              height="6" 
              viewBox="0 0 9 6" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`ml-auto transition-transform duration-200 transform ${isOpenFilter ? 'rotate-0' : 'rotate-180'}`}
            >
              <path d="M0.199902 4.50002L3.8249 0.875024C3.90824 0.79169 3.99157 0.733358 4.0749 0.700024C4.15824 0.666691 4.2499 0.650024 4.3499 0.650024C4.4499 0.650024 4.54157 0.666691 4.6249 0.700024C4.70824 0.733358 4.79157 0.79169 4.8749 0.875024L8.4999 4.50002C8.5499 4.55002 8.58724 4.60436 8.6119 4.66302C8.63657 4.72169 8.64924 4.78402 8.6499 4.85002C8.6499 4.98336 8.6039 5.10002 8.5119 5.20002C8.4199 5.30002 8.29924 5.35002 8.1499 5.35002L0.549902 5.35002C0.399902 5.35002 0.278902 5.30002 0.186902 5.20002C0.0949018 5.10002 0.0492361 4.98336 0.0499027 4.85002C0.0499027 4.81669 0.099902 4.70002 0.199902 4.50002Z" fill="#333333"/>
            </svg>
          </button>

          <div className={`mt-4 pt-4 border-t border-agray-300 ${isOpenFilter ? 'block' : 'hidden'} md:block md:border-0 md:pt-0 md:mt-6`}>
            {/* <select 
              id="sort"
              // value={sortOption}
              // onChange={handleSortChange}
              className="relative w-full p-4 pl-12 border-0 bg-primary sort-select rounded-[30px] text-[16px] font-medium text-white focus:outline-none"
            >
              <option value="Sort by" className="bg-white text-ablack-800">Trier par</option>
              <option value="name-asc" className="bg-white text-ablack-800">Nom ASC</option>
              <option value="name-desc">{t('nameDesc')}</option>
              <option value="price-asc">{t('priceAsc')}</option>
              <option value="price-desc">{t('priceDesc')}</option>
            </select> */}

            <div className="relative text-ablack-600">

            <Accordion title={t('filterByPrice')} defaultOpen={true}>
  <div className="relative max-h-64">
    <Slider 
      range 
      value={selectedPriceRange} 
      onChange={handlePriceRangeChange} 
      min={priceRange.minPrice} 
      max={priceRange.maxPrice} 
      step={1000} // Set step value as needed
      className="rc-slider-handle:hidden mb-6"
      styles={{
        rail: {
          background: `#DEDEDE`,
        },
        track: {
          background: '#050B20',
        },
        handle: {
          borderColor: 'blue',
          height: 23,
          width: 23,
          marginTop: -10,
          borderRadius: 6,
          backgroundColor: '#fff',
          opacity: 1,
          border: 'none',
          boxShadow: '0px 1px 2px rgba(000,000,000,0.25)',
          backgroundImage: 'url(/images/handle.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }
      }}
    />

    <span className="absolute bottom-[-30px] left-0 text-base text-agray-800">
      ${selectedPriceRange[0]}
    </span>

    <span className="absolute bottom-[-30px] right-0 text-base text-agray-800">
      ${selectedPriceRange[1]}
    </span>
  </div>
</Accordion>

              {isFilterApplied && (
              <div className="flex">
                <button
                  onClick={resetFilters}
                  className="flex justify-center items-center w-full py-3 border rounded-[10px] border-primary hover:border-secondary hover:bg-secondary text-[15px] font-medium text-primary hover:text-white transition-all duration-200 ease-in-out"
                >
                  <TfiReload className='mr-3 text-xl' />
                  {t('resetFilters')}
                </button>
              </div>
              )}

              <Accordion title={t('make')} defaultOpen={true}>
                <div className="max-h-64 overflow-y-auto">
                  {availableMakes.map((make) => (
                  <div key={make} className="mb-2 text-ablack-600">
                    <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMakes.includes(make)}
                      onChange={() => handleMakeChange(make)}
                      className="form-checkbox text-primary"
                    />
                    <span className="text-sm text-ablack-600">{make}</span>
                    </label>
                    {selectedMakes.includes(make) && models[make] && (
                    <div className="ml-4 mt-2 max-h-64 overflow-y-auto">
                      {models[make].map((model) => (
                      <div key={model} className="mb-2">
                        <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedModels[make]?.includes(model) || false}
                          onChange={() => handleModelChange(make, model)}
                          className="form-checkbox text-primary"
                        />
                        <span className="text-sm">{model}</span>
                        </label>
                      </div>
                      ))}
                    </div>
                    )}
                  </div>
                  ))}
                </div>
              </Accordion>

            <Accordion title={t('filterByYear')} defaultOpen={true}>
              <div className="relative max-h-64 flex justify-between">
                <select
                  value={selectedYearRange[0]}
                  onChange={(e) => {
                    const minYear = parseInt(e.target.value, 10);
                    setSelectedYearRange([minYear, selectedYearRange[1]]);
                    onFilterChange({
                      minYear: minYear,
                      maxYear: selectedYearRange[1],
                    });
                  }}
                  className="w-[48%] px-4 py-3 bg-white border-[#DEDEDE] rounded-[8px] outline-none mb-2 text-agray-800 text-sm"
                >
                  <option value="">{t('minYear')}</option>
                  {Array.from({ length: yearRange.maxYear - yearRange.minYear + 1 }, (_, i) => (
                    <option key={i} value={yearRange.minYear + i}>
                      {yearRange.minYear + i}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedYearRange[1]}
                  onChange={(e) => {
                    const maxYear = parseInt(e.target.value, 10);
                    setSelectedYearRange([selectedYearRange[0], maxYear]);
                    onFilterChange({
                      minYear: selectedYearRange[0],
                      maxYear: maxYear,
                    });
                  }}
                  className="w-[48%] px-4 py-3 bg-white border-[#DEDEDE] rounded-[8px] outline-none mb-2 text-agray-800 text-sm"
                >
                  <option value="">{t('maxYear')}</option>
                  {Array.from({ length: yearRange.maxYear - yearRange.minYear + 1 }, (_, i) => (
                    <option key={i} value={yearRange.minYear + i}>
                      {yearRange.minYear + i}
                    </option>
                  ))}
                </select>
              </div>
            </Accordion>

              <Accordion title={t('mileage')}>
                <select
                  value={selectedMileage}
                  onChange={handleMileageChange}
                  className="w-full px-4 py-3 bg-white border-[#DEDEDE] rounded-[8px] outline-none mb-2 text-agray-800 text-sm"
                >
                  <option value="">{t('any')}</option>
                  <option value="1000">{t('under1k')}</option>
                  <option value="5000">{t('under5k')}</option>
                  <option value="10000">{t('under10k')}</option>
                  <option value="20000">{t('under20k')}</option>
                  <option value="30000">{t('under30k')}</option>
                  <option value="40000">{t('under40k')}</option>
                  <option value="50000">{t('under50k')}</option>
                  <option value="60000">{t('under60k')}</option>
                  <option value="70000">{t('under70k')}</option>
                  <option value="80000">{t('under80k')}</option>
                  <option value="90000">{t('under90k')}</option>
                  <option value="100000">{t('under100k')}</option>
                </select>
              </Accordion>

              <Accordion title={t('transmissionT')}>
              <div className="max-h-64 overflow-y-auto">
                {availableTransTypes.length > 0 ? (
                availableTransTypes.map((transtype) => (
                  <div key={transtype} className="mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    checked={selectedTransTypes.includes(transtype)}
                    onChange={() => handleTransTypeChange(transtype)}
                    className="form-checkbox text-blue-500"
                    />
                    <span className="text-sm">{transmissionTypeMap[transtype] || transtype}</span>
                  </label>
                  </div>
                ))
                ) : (
                <p className="text-sm text-gray-500">{t('noTransmissionTypes')}</p>
                )}
              </div>
              </Accordion>
              
              <Accordion title={t('bodyType')}>
                <div className="max-h-64 overflow-y-auto">
                  {availableBodyTypes.length > 0 ? (
                  availableBodyTypes.map((bodytype) => (
                    <div key={bodytype} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                      type="checkbox"
                      checked={selectedBodyTypes.includes(bodytype)}
                      onChange={() => handleBodyTypeChange(bodytype)}
                      className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm">{bodyTypeMap[bodytype] || bodytype}</span>
                    </label>
                    </div>
                  ))
                  ) : (
                  <p className="text-sm text-gray-500">{t('noBodyTypes')}</p>
                  )}
                </div>
              </Accordion>

              <Accordion title={t('fuelType')}>
                <div className="max-h-64 overflow-y-auto">
                  {availableFuelTypes.length > 0 ? (
                  availableFuelTypes.map((fueltype) => (
                    <div key={fueltype} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                      type="checkbox"
                      checked={selectedFuelTypes.includes(fueltype)}
                      onChange={() => handleFuelTypeChange(fueltype)}
                      className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm">{fuelTypeMap[fueltype] || fueltype}</span>
                    </label>
                    </div>
                  ))
                  ) : (
                  <p className="text-sm text-gray-500">{t('noFuelTypes')}</p>
                  )}
                </div>
              </Accordion>

              <Accordion title={t('drivetrainType')}>
                <div className="max-h-64 overflow-y-auto">
                  {availableDrivetrainTypes.length > 0 ? (
                  availableDrivetrainTypes.map((drivetrain) => (
                    <div key={drivetrain} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                      type="checkbox"
                      checked={selectedDrivetrainTypes.includes(drivetrain)}
                      onChange={() => handleDrivetrainTypeChange(drivetrain)}
                      className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm">{drivetrainTypeMap[drivetrain] || drivetrain}</span>
                    </label>
                    </div>
                  ))
                  ) : (
                  <p className="text-sm text-gray-500">{t('noDrivetrainTypes')}</p>
                  )}
                </div>
              </Accordion>
            </div>
          </div>
    </div>
	</>
  );
};

export default Sidebar;
