import React, { useState } from 'react';
import { FaStickyNote } from 'react-icons/fa';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6 py-3 shadow-lg">
      <div className="flex items-center space-x-2">
        <FaStickyNote className="text-white text-2xl" />
        <h2 className="text-2xl font-semibold text-white">Notes</h2>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
