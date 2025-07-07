import React from 'react';
import clsx from 'clsx'; // optional utility for combining classes

// give padding to this button is compulsary
function Button({ children, className = '', onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={clsx('bg-[#01AEAD] rounded-md text-white cursor-pointer hover:bg-[#05929c] ', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
