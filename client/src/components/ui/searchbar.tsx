/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClick:()=>void
  debounceTime?: number;
  searchTogle:boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onClick,
  searchTogle,
  debounceTime = 300,
}) => {
  const [query, setQuery] = useState('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearch(value);
    }, debounceTime);
  };

  

  return (
    <div className={` animate__animated animate__backInDown py-1  bg-[#7d7a7a76] input-group my-3 flex justify-evenly rounded-sm  border border-white `}>
      <input
        type="text"
        className="form-control px-3 w-28 "
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      <span  onClick={onClick} className={` input-group-text`}>
<SearchIcon/>
     
      </span>
    </div>
  );
};

export default SearchBar;
