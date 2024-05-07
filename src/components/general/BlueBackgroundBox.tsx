import React from 'react';

interface BoxProps {
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-light-blue p-5 rounded-[50px] w-[1000px] h-[600px] mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Box;
