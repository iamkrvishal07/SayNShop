import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
    </div>
  );
}

export default Loading;
