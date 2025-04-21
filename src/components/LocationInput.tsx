"use client";

import { useState, useEffect, useRef } from 'react';

// Popular travel destinations for suggestions
const POPULAR_DESTINATIONS = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "Rome, Italy",
  "London, UK",
  "Barcelona, Spain",
  "Sydney, Australia",
  "Dubai, UAE",
  "Bangkok, Thailand",
  "Amsterdam, Netherlands",
  "Singapore",
  "Istanbul, Turkey",
  "Berlin, Germany",
  "Bali, Indonesia"
];

export default function LocationInput() {
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter suggestions based on input
    if (location) {
      const filtered = POPULAR_DESTINATIONS.filter(
        dest => dest.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [location]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-6 relative">
      <div className="flex items-center justify-between mb-3">
        <label 
          htmlFor="location" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Travel Destination
        </label>
        {location && (
          <button 
            className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => setLocation('')}
          >
            Clear
          </button>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-gray-400"
          >
            <path 
              fillRule="evenodd" 
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <input
          type="text"
          id="location"
          ref={inputRef}
          value={location}
          onChange={handleLocationChange}
          onFocus={() => setShowSuggestions(true)}
          className="input-primary w-full pl-10"
          placeholder="Enter a city or country"
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 max-h-60 overflow-auto"
        >
          <ul className="py-1 text-sm">
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2 transition-colors duration-150"
              >
                <span className="text-blue-500 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                </span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 