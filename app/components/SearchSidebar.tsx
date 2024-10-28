import React, { useEffect, useState } from 'react';
import {
  fetchAvailableMakes,
  fetchAvailableModels,
  fetchAvailableTransTypes,
  fetchAvailableBodyTypes,
  fetchAvailableFuelTypes,
  fetchAvailableDrivetrainTypes,
  fetchAvailableExtColorf,
  fetchPriceRange,
  fetchYearRange
} from '../../utils/carFilters';

interface FilterProps {
  filters: {
    make?: string;
    model?: string;
    transType?: string;
    bodyType?: string;
    fuelType?: string;
    drivetrainType?: string;
    extColorf?: string;
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
  };
  onFilterChange: (newFilters: Partial<FilterProps['filters']>) => void;
}

const SearchSidebar: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [transTypes, setTransTypes] = useState<string[]>([]);
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [drivetrainTypes, setDrivetrainTypes] = useState<string[]>([]);
  const [extColors, setExtColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ minPrice: number; maxPrice: number }>({ minPrice: 0, maxPrice: 100000 });
  const [yearRange, setYearRange] = useState<{ minYear: number; maxYear: number }>({ minYear: 1990, maxYear: 2030 });

  useEffect(() => {
    const loadFilters = async () => {
      setMakes(await fetchAvailableMakes());
      setModels(await fetchAvailableModels(filters.make || ''));
      setTransTypes(await fetchAvailableTransTypes());
      setBodyTypes(await fetchAvailableBodyTypes());
      setFuelTypes(await fetchAvailableFuelTypes());
      setDrivetrainTypes(await fetchAvailableDrivetrainTypes());
      setExtColors(await fetchAvailableExtColorf());
      setPriceRange(await fetchPriceRange());
      setYearRange(await fetchYearRange());
    };

    loadFilters();
  }, [filters.make]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="search-sidebar">
      <h2>Filters</h2>
      
      <div>
        <label>Make</label>
        <select name="make" value={filters.make || ''} onChange={handleFilterChange}>
          <option value="">All Makes</option>
          {makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Model</label>
        <select name="model" value={filters.model || ''} onChange={handleFilterChange}>
          <option value="">All Models</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Transmission</label>
        <select name="transType" value={filters.transType || ''} onChange={handleFilterChange}>
          <option value="">All Transmissions</option>
          {transTypes.map(transType => (
            <option key={transType} value={transType}>{transType}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Body Type</label>
        <select name="bodyType" value={filters.bodyType || ''} onChange={handleFilterChange}>
          <option value="">All Body Types</option>
          {bodyTypes.map(bodyType => (
            <option key={bodyType} value={bodyType}>{bodyType}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Fuel Type</label>
        <select name="fuelType" value={filters.fuelType || ''} onChange={handleFilterChange}>
          <option value="">All Fuel Types</option>
          {fuelTypes.map(fuelType => (
            <option key={fuelType} value={fuelType}>{fuelType}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Drivetrain Type</label>
        <select name="drivetrainType" value={filters.drivetrainType || ''} onChange={handleFilterChange}>
          <option value="">All Drivetrain Types</option>
          {drivetrainTypes.map(drivetrainType => (
            <option key={drivetrainType} value={drivetrainType}>{drivetrainType}</option>
          ))}
        </select>
      </div>

      <div>
        <label>External Color</label>
        <select name="extColorf" value={filters.extColorf || ''} onChange={handleFilterChange}>
          <option value="">All Colors</option>
          {extColors.map(extColorf => (
            <option key={extColorf} value={extColorf}>{extColorf}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Price Range</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice || priceRange.minPrice}
          onChange={handleFilterChange}
          placeholder={`Min ${priceRange.minPrice}`}
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice || priceRange.maxPrice}
          onChange={handleFilterChange}
          placeholder={`Max ${priceRange.maxPrice}`}
        />
      </div>

      <div>
        <label>Year Range</label>
        <input
          type="number"
          name="minYear"
          value={filters.minYear || yearRange.minYear}
          onChange={handleFilterChange}
          placeholder={`Min ${yearRange.minYear}`}
        />
        <input
          type="number"
          name="maxYear"
          value={filters.maxYear || yearRange.maxYear}
          onChange={handleFilterChange}
          placeholder={`Max ${yearRange.maxYear}`}
        />
      </div>
    </div>
  );
};

export default SearchSidebar;
