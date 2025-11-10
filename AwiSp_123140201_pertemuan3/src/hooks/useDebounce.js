import { useState, useEffect } from 'react';

// Hook untuk menunda (debounce) nilai
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout untuk update nilai setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout jika value atau delay berubah
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Hanya re-run jika value atau delay berubah

  return debouncedValue;
};