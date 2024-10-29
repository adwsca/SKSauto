'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// React Icons
import { RiSearchLine } from "react-icons/ri";


const HomeSearchBar: React.FC = () => {
	const [makes, setMakes] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);
	const [years, setYears] = useState<number[]>([]);
	const [selectedMake, setSelectedMake] = useState<string>('');
	const [selectedModel, setSelectedModel] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<number | string>('');

	useEffect(() => {
	  async function fetchMakes() {
		const response = await fetch('/api/search');
		const data = await response.json();
		setMakes(data.availableMakes);
	  }
	  fetchMakes();
	}, []);
  
	const handleMakeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
	  const make = e.target.value;
	  setSelectedMake(make);
	  const response = await fetch(`/api/search?make=${make}`);
	  const data = await response.json();
	  setModels(data.availableModels);
	};
  
	const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
	  const model = e.target.value;
	  setSelectedModel(model);
	  const response = await fetch(`/api/search?model=${model}`);
	  const data = await response.json();
	  setYears(data.availableYears);
	};

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const year = e.target.value;
		setSelectedYear(year);
	};
	

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
	  
		const queryParams = [];
	  
		if (selectedMake) {
		  queryParams.push(`make=${selectedMake}`);
		}
		if (selectedModel) {
		  queryParams.push(`model=${selectedModel}`);
		}
		if (selectedYear) {
		  queryParams.push(`year=${selectedYear}`);
		}
		const searchUrl = `/inventory?${queryParams.join('&')}`;
		window.location.href = searchUrl;
	  };
	  const t = useTranslations('HomeSearchBar'); // Use the 'HomeSearchBar' namespace for translations
	return (
		<section className="relative bg-primary">
			<div className="w-full h-auto m-0 p-0 text-center relative">
				
				<form onSubmit={handleSearch} className="relative z-10 flex lg:flex-row flex-col flex-nowrap mb-0 bg-primary container lg:mx-auto lg:h-auto lg:items-center py-3 gap-4">
					<select onChange={handleMakeChange} name="make" className="w-full px-4 py-3 rounded-[10px] outline-none text-dark-3 text-sm lg:border-2 lg:border-primary lg:py-[15px] lg:px-8 lg:pl-[35px] lg:rounded-lg lg:max-w-[350px] focus:ring-primary focus:border-primary">
						<option value="">Marques</option>
						{makes.map((make) => (
						<option key={make} value={make}>
							{make}
						</option>
						))}
					</select>
					<div className="relative w-full lg:max-w-[350px]">
					<select onChange={handleModelChange} name="model" className="w-full px-4 py-3 rounded-[10px] outline-none text-dark-3 text-sm lg:border-2 lg:border-primary lg:py-[15px] lg:px-8 lg:pl-[35px] lg:rounded-lg lg:max-w-[350px] focus:ring-primary focus:border-primary">
						<option value="">Modèles</option>
						{models.map((model) => (
						<option key={model} value={model}>
							{model}
						</option>
						))}
					</select>
					</div>
					<select onChange={handleYearChange} name="years" className="w-full px-4 py-3 rounded-[10px] outline-none text-dark-3 text-sm lg:border-2 lg:border-primary lg:py-[15px] lg:px-8 lg:pl-[35px] lg:rounded-lg lg:max-w-[350px] focus:ring-primary focus:border-primary">
						<option value="">Années</option>
						{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
						))}
					</select>
					<button type="submit" className="w-full flex items-center justify-center py-3 px-4 bg-secondary text-white hover:bg-secondary-dark transition-all duration-200 ease-in-out rounded-[10px] lg:py-[12px] lg:px-8 lg:pl-[35px] lg:rounded-lg lg:max-w-[320px] outline-none">
						<RiSearchLine className='size-6 lg:size-7 mr-3' />
						<span className="text-lg font-medium">{t("search")}</span>
					</button>
				</form>
			</div>
		</section>
  	)
}
export default HomeSearchBar;
