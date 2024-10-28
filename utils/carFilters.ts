// utils/carFilters.ts

// Function to fetch available makes
export const fetchAvailableMakes = async () => {
  try {
	const response = await fetch('/api/cars');
	if (!response.ok) {
	  throw new Error('Failed to fetch available makes');
	}
	const cars = await response.json();
	const uniqueMakes = [...new Set(cars.map((car: any) => car.make))];
	return uniqueMakes.sort((a, b) => a.localeCompare(b));
  } catch (error) {
	console.error('Error fetching available makes:', error);
	return [];
  }
};

// Function to fetch available transmission types
export const fetchAvailableTransTypes = async () => {
  try {
	const response = await fetch('/api/cars?listTransTypes=true');
	if (!response.ok) {
	  throw new Error('Failed to fetch available transmission types');
	}
	const data = await response.json();
	return data.transmissionTypes || [];
  } catch (error) {
	console.error('Error fetching available transmission types:', error);
	return [];
  }
};

// Function to fetch available body types
export const fetchAvailableBodyTypes = async () => {
  try {
	const response = await fetch('/api/cars?listBodyTypes=true');
	if (!response.ok) {
	  throw new Error('Failed to fetch available body types');
	}
	const data = await response.json();
	return data.BodyTypes || [];
  } catch (error) {
	console.error('Error fetching available body types:', error);
	return [];
  }
};


// Function to fetch available fuel types, ignoring null values
export const fetchAvailableFuelTypes = async () => {
  try {
	const response = await fetch('/api/cars?listFuelTypes=true');
	if (!response.ok) {
	  throw new Error('Failed to fetch available fuel types');
	}
	const data = await response.json();
	
	// Filter out null or undefined fuel types
	const validFuelTypes = (data.FuelTypes || []).filter((fuelType: string | null) => fuelType !== null && fuelType !== undefined);

	return validFuelTypes;
  } catch (error) {
	console.error('Error fetching available fuel types:', error);
	return [];
  }
};

// Function to fetch available fuel types, ignoring null values
export const fetchAvailableDrivetrainTypes = async () => {
  try {
	const response = await fetch('/api/cars?listDrivetrainTypes=true');
	if (!response.ok) {
	  throw new Error('Failed to fetch available drivetrain types');
	}
	const data = await response.json();
	
	// Filter out null or undefined fuel types
	const validDrivetrainTypes = (data.DrivetrainTypes || []).filter((drivetrainType: string | null) => drivetrainType !== null && drivetrainType !== undefined);

	return validDrivetrainTypes;
  } catch (error) {
	console.error('Error fetching available drivetrain types:', error);
	return [];
  }
};

export const fetchAvailableExtColorf = async () => {
	try {
	  const response = await fetch('/api/cars?listExtColorf=true');
	  if (!response.ok) {
		throw new Error('Failed to fetch available external colors');
	  }
	  const data = await response.json();
	  
	  // Filter out null or undefined colors
	  const validExtColorf= (data.ExtColorf || []).filter((extcolorf: string | null) => extcolorf !== null && extcolorf !== undefined);

  
	  return validExtColorf;
	} catch (error) {
	  console.error('Error fetching available external colors:', error);
	  return [];
	}
  };

  export const fetchPriceRange = async () => {
	try {
	  const response = await fetch('/api/cars?getPriceRange=true');
	  if (!response.ok) {
		throw new Error('Failed to fetch price range');
	  }
	  const data = await response.json();
  
	  // Assuming the API returns { minPrice: number, maxPrice: number }
	  const { minPrice, maxPrice } = data;
  
	  if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
		return { minPrice, maxPrice };
	  } else {
		throw new Error('Price range data is not valid');
	  }
	} catch (error) {
	  console.error('Error fetching price range:', error);
	  return { minPrice: 0, maxPrice: 100000 }; // Return a default range if the fetch fails
	}
  };

  export const fetchCarsByPriceRange = async (minPrice: number, maxPrice: number) => {
	try {
		console.log(`Making API call to fetch cars with minPrice=${minPrice} and maxPrice=${maxPrice}`); // Log the API call details

	  const response = await fetch(`/api/cars?minPrice=${minPrice}&maxPrice=${maxPrice}`);
	  if (!response.ok) {
		throw new Error('Failed to fetch cars within the specified price range');
	  }
	  const data = await response.json();
	  console.log('API response data:', data);  // Log the response data

  
	  return data; // assuming data is the list of cars
	} catch (error) {
	  console.error('Error fetching cars by price range:', error);
	  return []; // return empty array in case of error
	}
  };


  export const fetchYearRange = async () => {
	try {
	  const response = await fetch('/api/cars?getYearRange=true');
	  if (!response.ok) {
		throw new Error('Failed to fetch year range');
	  }
	  const data = await response.json();
  
	  // Assuming the API returns { minPrice: number, maxPrice: number }
	  const { minYear, maxYear } = data;
  
	  if (typeof minYear === 'number' && typeof maxYear === 'number') {
		return { minYear, maxYear };
	  } else {
		throw new Error('Price range data is not valid');
	  }
	} catch (error) {
	  console.error('Error fetching price range:', error);
	  return { minYear: 1990, maxYear: 2030 }; // Return a default range if the fetch fails
	}
  };
  

  export const fetchCarsByYearRange = async (minYear: number, maxYear: number) => {
	try {
		console.log(`Making API call to fetch cars with minYear=${minYear} and maxYear=${maxYear}`); // Log the API call details

	  const response = await fetch(`/api/cars?minYear=${minYear}&maxYear=${maxYear}`);
	  if (!response.ok) {
		throw new Error('Failed to fetch cars within the specified year range');
	  }
	  const data = await response.json();
	  console.log('API response data:', data);  // Log the response data

  
	  return data; // assuming data is the list of cars
	} catch (error) {
	  console.error('Error fetching cars by year range:', error);
	  return []; // return empty array in case of error
	}
  };

  export const fetchCarsByMileage = async (mileage: number) => {
	try {
	  const response = await fetch(`/api/cars?mileageFilter=${mileage}`);
	  if (!response.ok) {
		throw new Error('Failed to fetch cars by mileage');
	  }
	  const data = await response.json();
	  return data; // assuming data is the list of cars
	} catch (error) {
	  console.error('Error fetching cars by mileage:', error);
	  return []; // return empty array in case of error
	}
  };