// components/FullScreenLoader.jsx
import React from 'react';

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="flex flex-col items-center space-y-3">
          
          {/* Responsive Spinner */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          
          {/* Responsive Text */}
          <p className="text-white text-base sm:text-lg font-semibold">
            Loading...
          </p>
        </div>
    </div>
  );
};

export default FullScreenLoader;

