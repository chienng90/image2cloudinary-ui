import React from 'react';

const ProfileIcon = () => {
  return (
    <svg
      className='w-[24px] md:w-auto'
      id="avatarDropDown"
      aria-label="Profile"
      color='#262626'
      fill='#262626'
      role="img"
      viewBox="0 0 24 24"
    >
      <circle
        id="avatarDropDown"
        cx="12.004"
        cy="12.004"
        fill="none"
        r="10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth='1'
      />
      <path
        d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth='1'
      />
      <circle
        cx="12.006"
        cy="9.718"
        fill="none"
        r="4.109"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth='1'
      />
    </svg>
  );
}

export default ProfileIcon;
