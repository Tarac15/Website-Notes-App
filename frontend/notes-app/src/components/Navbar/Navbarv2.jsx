import React, { useState } from 'react';
import { FaStickyNote } from 'react-icons/fa';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from "react-router-dom";


const Navbarv2 = ({ userInfo }) => {

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6 py-3 shadow-lg">
      <div className="flex items-center space-x-2">
        <FaStickyNote className="text-white text-2xl" />
        <h2 className="text-2xl font-semibold text-white">Notes</h2>
      </div>

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbarv2;
