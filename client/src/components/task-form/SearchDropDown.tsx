/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSpaceStore } from "@/lib/store/useSpaceStore";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js","Nuxt.js","Nuxt.js","Nuxt.js", "Remix", "Astro"];
type PropsSearch={
    handleSelect:(value:string)=>void
}
const SearchDropdown = ({handleSelect}:PropsSearch) => {
  const {column}=useSpaceStore()
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(frameworks);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(
      frameworks.filter((fw) => fw.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return (
    <div className="w-56 h-56 animate__animated animate__fadeIn  absolute bg-black  right-0 text-white rounded-md border border-gray-600 p-2">
      <div className="flex items-center gap-2 bg-black px-2 py-1 rounded">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search framework..."
          className="bg-black text-white outline-none w-full placeholder-gray-400"
        />
      </div>

      <ul className="mt-2 max-h-44  overflow-auto overflow-hide">
        {column.length > 0 ? (
          column.map((item, idx) => (
            <li
            onClick={()=>handleSelect(item.name)}
              key={idx}
              className="px-3 py-2 hover:bg-gray-800 cursor-pointer rounded"
            >
                
              {item.name}
            </li>
          ))
        ) : (
          <li className="px-3 py-2 text-gray-400 italic">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchDropdown;
