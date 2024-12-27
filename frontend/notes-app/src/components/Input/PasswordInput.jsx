import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className='relative'>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder || "Password"}
        className='input-box pr-12 focus:border-blue-500'
      />
      <div 
        className="absolute right-4 top-3 cursor-pointer text-slate-400 hover:text-blue-500"
        onClick={() => setIsShowPassword(!isShowPassword)}
      >
        {isShowPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
      </div>
    </div>
  );
};

export default PasswordInput;
