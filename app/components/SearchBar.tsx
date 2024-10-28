import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Fetch available categories initially
    fetch('/api/search?listBodyTypes=true') // Adjusted to your existing API
      .then(res => res.json())
      .then(data => setCategories(data.BodyTypes || []));
  }, []);

  useEffect(() => {
    // Fetch available makes based on the selected category
    if (selectedCategory) {
      fetch(`/api/search?category=${selectedCategory}`)
        .then(res => res.json())
        .then(data => {
          setMakes(data.availableMakes || []);
          setModels([]); // Reset models when category changes
          setYears([]);  // Reset years when category changes
          setSelectedMake('');
          setSelectedModel('');
          setSelectedYear('');
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Fetch available models based on the selected category and make
    if (selectedCategory && selectedMake) {
      fetch(`/api/search?category=${selectedCategory}&make=${selectedMake}`)
        .then(res => res.json())
        .then(data => {
          setModels(data.availableModels || []);
          setYears([]);  // Reset years when make changes
          setSelectedModel('');
          setSelectedYear('');
        });
    }
  }, [selectedCategory, selectedMake]);

  useEffect(() => {
    // Fetch available years based on the selected category, make, and model
    if (selectedCategory && selectedMake && selectedModel) {
      fetch(`/api/search?category=${selectedCategory}&make=${selectedMake}&model=${selectedModel}`)
        .then(res => res.json())
        .then(data => {
          setYears(data.availableYears || []);
          setSelectedYear('');
        });
    }
  }, [selectedCategory, selectedMake, selectedModel]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (selectedCategory) searchParams.append('category', selectedCategory);
    if (selectedMake) searchParams.append('make', selectedMake);
    if (selectedModel) searchParams.append('model', selectedModel);
    if (selectedYear) searchParams.append('year', selectedYear);

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="search-bar">
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)} disabled={!selectedCategory}>
        <option value="">Select Make</option>
        {makes.map((make) => (
          <option key={make} value={make}>
            {make}
          </option>
        ))}
      </select>

      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedMake}>
        <option value="">Select Model</option>
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>

      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} disabled={!selectedModel}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
