'use client'
import { useSearchParams } from 'next/navigation'; // Next.js 14 hook for search params
import { useEffect, useState } from 'react';

export default function SearchResults() {
  const searchParams = useSearchParams(); // Get search parameters from the URL
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const params = searchParams.toString(); // Convert params to string for API call
      const response = await fetch(`/api/cars?${params}`);
      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        console.error(data.message);
        setResults([]);
      }
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div>
      <h1>Search Results</h1>
      <div className="results">
        {results.length > 0 ? (
          results.map((car, index) => (
            <div key={index}>
              <h3>{car.make} {car.model} ({car.year})</h3>
              <p>Category: {car.category}</p>
              <p>Price: ${car.price}</p>
              {/* Add more details as needed */}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
