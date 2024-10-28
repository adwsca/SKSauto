import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Accordion from './Accordion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  fetchAvailableMakes,
  fetchAvailableTransTypes,
  fetchAvailableBodyTypes,
  fetchAvailableFuelTypes,
  fetchPriceRange,
  fetchYearRange,

} from '../../utils/carFilters';

const Sidebar = ({ onFilterChange }) => {
  const t = useTranslations('sidebar');

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

  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100000]);
  
  const [yearRange, setYearRange] = useState([2000, new Date().getFullYear()]); // Default year range
  const [yearFrom, setYearFrom] = useState<number | ''>('');
  const [yearTo, setYearTo] = useState<number | ''>('');
  
  const [underTenThousand, setUnderTenThousand] = useState<boolean>(false); // New filter


  const bodyTypeMap = {
	Car: t('body.Car'),
	Cargovan: t('body.Cargovan'),
	Minivan: t('body.Minivan'),
	Passenger: t('body.Passenger'),
	Pickup: t('body.Pickup'),
	SportUtil: t('body.SportUtil'),
  };

  const transmissionTypeMap = {
	AT: t('transmission.AT'),
	MT: t('transmission.MT'),
  };

  const fuelTypeMap = {
	UL: t('fuel.UL'),
	HB: t('fuel.HB'),
	EL: t('fuel.EL'),
  };

  const resetFilters = () => {
	setSelectedMakes([]);
	setSelectedModels({});
	setSelectedTransTypes([]);
	setSelectedBodyTypes([]);
	setSelectedFuelTypes([]);
	setSelectedPriceRange(priceRange); // Reset to initial fetched price range
	setYearFrom(yearRange[0]);
	setYearTo(yearRange[1]);
	setUnderTenThousand(false); // Reset the new filter

	
  };

  useEffect(() => {
	fetchAvailableMakes().then(setAvailableMakes);
	fetchAvailableTransTypes().then(setAvailableTransTypes);
	fetchAvailableBodyTypes().then(setAvailableBodyTypes);
	fetchAvailableFuelTypes().then(setAvailableFuelTypes);

	fetchPriceRange().then((range) => {
	  setPriceRange(range);
	  setSelectedPriceRange(range);
	});
	fetchYearRange().then((range) => {
	  setYearRange(range);
	  setYearFrom(range[0]);
	  setYearTo(range[1]);
	});
  }, []);

  useEffect(() => {
	  
	  console.log('Calling onFilterChange with:', {
		  makes: selectedMakes,
		  models: selectedModels,
		  transtype: selectedTransTypes,
		  bodytype: selectedBodyTypes,
		  fueltype: selectedFuelTypes,
		  priceRange: selectedPriceRange,
		  yearFrom,
		  yearTo,
		});
	  
	onFilterChange({
	  makes: selectedMakes,
	  models: selectedModels,
	  transtype: selectedTransTypes,
	  bodytype: selectedBodyTypes,
	  fueltype: selectedFuelTypes,
	  priceRange: selectedPriceRange,
	  yearFrom,
		yearTo,
	});
  }, [
	selectedMakes,
	selectedModels,
	selectedTransTypes,
	selectedBodyTypes,
	selectedFuelTypes,
	selectedPriceRange,
	yearFrom,
	  yearTo,
  ]);

  const handlePriceRangeChange = (range) => {
	console.log('Price range changed:', range);
	setSelectedPriceRange(range);
  };

  const handleMakeChange = (make) => {
	const newSelectedMakes = selectedMakes.includes(make)
	  ? selectedMakes.filter((m) => m !== make)
	  : [...selectedMakes, make];

	setSelectedMakes(newSelectedMakes);

	if (!models[make]) {
	  fetch(`/api/cars?make=${make}`)
		.then((response) => response.json())
		.then((data) => {
		  const uniqueModels = [...new Set(data.map((car) => car.model))].sort((a, b) =>
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
  };

  const handleModelChange = (make, model) => {
	const newSelectedModels = selectedModels[make]?.includes(model)
	  ? selectedModels[make].filter((m) => m !== model)
	  : [...(selectedModels[make] || []), model];

	setSelectedModels((prevModels) => ({ ...prevModels, [make]: newSelectedModels }));
  };

  const handleTransTypeChange = (transtype) => {
	const newSelectedTransTypes = selectedTransTypes.includes(transtype)
	  ? selectedTransTypes.filter((t) => t !== transtype)
	  : [...selectedTransTypes, transtype];

	setSelectedTransTypes(newSelectedTransTypes);
  };

  const handleBodyTypeChange = (bodytype) => {
	const newSelectedBodyTypes = selectedBodyTypes.includes(bodytype)
	  ? selectedBodyTypes.filter((bt) => bt !== bodytype)
	  : [...selectedBodyTypes, bodytype];

	setSelectedBodyTypes(newSelectedBodyTypes);
  };

  const handleFuelTypeChange = (fueltype) => {
	const newSelectedFuelTypes = selectedFuelTypes.includes(fueltype)
	  ? selectedFuelTypes.filter((ft) => ft !== fueltype)
	  : [...selectedFuelTypes, fueltype];

	setSelectedFuelTypes(newSelectedFuelTypes);
  };
  
  const handleYearFromChange = (e) => {
	  const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
	  setYearFrom(value);
	  console.log('year changed from:', value);

	};
  
	const handleYearToChange = (e) => {
	  const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
	  setYearTo(value);
	  console.log('year changed to:', value);

	};

  const isFilterApplied =
	selectedMakes.length > 0 ||
	Object.values(selectedModels).some((models) => models.length > 0) ||
	selectedTransTypes.length > 0 ||
	selectedBodyTypes.length > 0 ||
	selectedFuelTypes.length > 0 ||
	selectedPriceRange[0] !== priceRange[0] ||
	selectedPriceRange[1] !== priceRange[1] ||
	yearFrom !== yearRange[0] ||
	yearTo !== yearRange[1];
	
  return (
	<div className="py-4 w-64 border border-gray-200 bg-white shadow-lg rounded-lg mt-6 mb-6 ml-6">
	  <h2 className="text-2xl font-semibold mb-4 ml-4">{t('filters')}</h2>

	  <Accordion title={t('make')}>
		<div className="max-h-64 overflow-y-auto">
		  {availableMakes.map((make) => (
			<div key={make} className="mb-2">
			  <label className="flex items-center space-x-2">
				<input
				  type="checkbox"
				  checked={selectedMakes.includes(make)}
				  onChange={() => handleMakeChange(make)}
				  className="form-checkbox text-blue-500"
				/>
				<span className="text-sm">{make}</span>
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
						  className="form-checkbox text-blue-500"
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
	  
	  <Accordion title={t('yearRange')}>
		  <div className="flex justify-between px-4">
			<div>
			  <label className="block text-sm mb-1">{t('yearFrom')}</label>
			  <select
				className="form-select"
				value={yearFrom}
				onChange={handleYearFromChange}
			  >
				<option value="">{t('any')}</option>
				{Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, i) => yearRange[0] + i).map((year) => (
				  <option key={year} value={year}>
					{year}
				  </option>
				))}
			  </select>
			</div>
			<div>
			  <label className="block text-sm mb-1">{t('yearTo')}</label>
			  <select
				className="form-select"
				value={yearTo}
				onChange={handleYearToChange}
			  >
				<option value="">{t('any')}</option>
				{Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, i) => yearRange[0] + i).map((year) => (
				  <option key={year} value={year}>
					{year}
				  </option>
				))}
			  </select>
			</div>
		  </div>
		</Accordion>

	  <Accordion title={t('priceRange')}>
		<div className="px-4">
		  <Slider
			range
			min={priceRange[0]}
			max={priceRange[1]}
			value={selectedPriceRange}
			onChange={handlePriceRangeChange}
			trackStyle={[{ backgroundColor: 'blue' }]}
			handleStyle={[{ borderColor: 'blue' }]}
		  />
		  <div className="flex justify-between mt-2">
			<span>${selectedPriceRange[0]}</span>
			<span>${selectedPriceRange[1]}</span>
		  </div>
		</div>
	  </Accordion>

	  {isFilterApplied && (
		<div className="flex">
		  <button
			onClick={resetFilters}
			className="w-[90%] mx-auto my-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150"
		  >
			{t('resetFilters')}
		  </button>
		</div>
	  )}
	</div>
  );
};

export default Sidebar;
