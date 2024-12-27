import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-sm bg-transparent py-2 outline-none text-slate-700 placeholder-slate-400"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-lg text-slate-500 cursor-pointer hover:text-red-500 transition duration-200 mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-blue-500 transition duration-200"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
