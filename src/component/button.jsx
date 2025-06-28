import React from 'react';
import clsx from 'clsx'; // optional utility for combining classes

function Button({ children, className = '', onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={clsx('bg-[#01AEAD] text-white px-12 py-2 rounded-md', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
