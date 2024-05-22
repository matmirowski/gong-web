import React from "react";
import Icon from "./Icon";

interface BoxProps {
  children?: React.ReactNode;
  height?: string;
}

const SizeableBox: React.FC<BoxProps> = ({ children, height}) => {
  const style = {
    height: height ? `${height}px` : 'auto',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative bg-light-blue p-5 rounded-[50px] w-[1000px] mx-auto my-20"
        style={style}
      >
        <div className="absolute left-5 top-5">
          <Icon name="logo-black" size={125} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SizeableBox;
