import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-600 font-medium text-xs shadow">
          {getInitials(userInfo.fullName)}
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start">
          <p className="text-xs font-medium text-white">{userInfo.fullName}</p>
          <button
            className="text-[10px] text-blue-200 hover:text-white hover:underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
