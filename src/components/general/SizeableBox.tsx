import React from "react";

interface BoxProps {
  children?: React.ReactNode;
  height?: string;
}

const SizeableBox: React.FC<BoxProps> = ({ children, height }) => {
  const style = {
    height: height ? `${height}px` : 'auto',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-auto">
      <div
        className="relative bg-light-blue p-5 rounded-[50px] w-full mx-auto my-20 max-w-5xl"
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

export default SizeableBox;
