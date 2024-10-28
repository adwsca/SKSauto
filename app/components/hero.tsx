'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// React Icons
import { RiSearchLine } from "react-icons/ri";


const Hero: React.FC = () => {
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
	  const t = useTranslations('Hero'); // Use the 'Hero' namespace for translations
	return (
		<section className="relative overflow-visible lg:overflow-visible lg:max-h-[560px] mb-12 md:mb-32 lg:mb-32 bg-slider01 bg-cover bg-center">
			<div className="container text-center relative bg-transparent bg-cover bg-center pt-16 pb-32 lg:bg-none lg:pt-30 lg:pb-60">
				<p className="text-white text-sm pb-4 lg:text-base">{t("subtitle")}</p>
				<h1 className="text-white text-[32px] font-bold lg:text-[60px]"><span className="text-primary">{t("titleSpan")}</span> {t("title")}</h1>
				<form onSubmit={handleSearch} className="relative z-10 flex flex-wrap mt-8 mb-0 lg:bg-white lg:w-[750px] lg:mx-auto lg:rounded-[80px] lg:h-[75px] lg:items-center lg:overflow-hidden">
					<select onChange={handleMakeChange} name="make" className="w-full px-4 py-3 bg-white rounded-[10px] outline-none mb-2 text-dark-3 text-sm lg:max-w-[200px] lg:border-0 lg:mb-0 lg:py-[28px] lg:px-8 lg:pl-[35px] lg:rounded-none">
						<option value="">Marques</option>
						{makes.map((make) => (
						<option key={make} value={make}>
							{make}
						</option>
						))}
					</select>
					<div className="relative w-full lg:max-w-[221px] lg:before:content-[''] lg:before:absolute lg:before:z-10 lg:before:w-[1px] lg:before:h-[50%] lg:before:left-[5px] lg:before:top-0 lg:before:bottom-0 lg:before:m-auto lg:before:bg-agray-500 lg:after:content-[''] lg:after:absolute lg:after:z-10 lg:after:w-[1px] lg:after:h-[50%] lg:after:-right-[5px] lg:after:top-0 lg:after:bottom-0 lg:after:m-auto lg:after:bg-agray-500">
					<select onChange={handleModelChange} name="model" className="relative w-full px-4 py-3 bg-white rounded-[10px] outline-none mb-2 text-dark-3 text-sm lg:max-w-[221px] lg:border-0 lg:mb-0 lg:py-[28px] lg:px-8 lg:rounded-none">
						<option value="">Modèles</option>
						{models.map((model) => (
						<option key={model} value={model}>
							{model}
						</option>
						))}
					</select>
					</div>
					<select onChange={handleYearChange} name="years" className="w-full px-4 py-3 bg-white rounded-[10px] outline-none mb-2 text-dark-3 text-sm lg:max-w-[221px] lg:border-0 lg:mb-0 lg:py-[28px] lg:px-8 lg:rounded-none">
						<option value="">Années</option>
						{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
						))}
					</select>
					<div className="flex items-center w-full mb-4 lg:hidden">
						<input type="checkbox" id="allPrices" name="allPrices" className="hidden peer" />
						<label htmlFor="allPrices" className="flex items-center cursor-pointer w-full px-4 py-3 bg-white rounded-[10px] text-sm text-agray-800 peer-checked:bg-primary peer-checked:text-white peer-checked:border-secondary">
							<span>All Prices</span>
						</label>
					</div>
					<button type="submit" className="w-full flex items-center justify-center py-[14px] bg-primary hover:bg-secondary transition-all duration-200 ease-in-out rounded-[10px] lg:size-14 lg:rounded-full lg:ml-auto lg:mr-3">
						<RiSearchLine className='size-6 lg:size-7 text-white' />
						<span className="text-white text-xl font-medium lg:hidden">Search</span>
					</button>
				</form>
			</div>
			<div className="absolute -bottom-[50px] left-0 right-0 md:left-0 md:right-0 md:-bottom-[120px] lg:-bottom-[140px] overflow-x-hidden p-0">
				<Image
					width={1749}
					height={535}
					src="/images/car.png" 
					alt="Car Hero Picture"
					className="w-auto h-auto md:w-[1200px] mx-auto lg:w-[1200px]" 
				/>
			</div>
		</section>
  	)
}
export default Hero;
