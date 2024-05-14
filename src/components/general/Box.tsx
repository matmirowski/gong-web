import React from 'react';
import Icon from './Icon';

interface BoxProps {
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative bg-light-blue p-5 rounded-[50px] w-[1000px] h-[600px] mx-auto">
        <div className="absolute left-5 top-5">
          <Icon name="logo-black" size={150} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Box;
