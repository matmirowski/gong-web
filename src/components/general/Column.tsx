import React from 'react';

interface ColumnProps {
  children: React.ReactNode;
  width?: string;
  mdWidth?: string;
  lgWidth?: string;
  className?: string;
}

const Column: React.FC<ColumnProps> = ({ children, width = 'full', mdWidth = '', lgWidth = '', className = '' }) => {
  const widthClass = `w-${width} ${mdWidth ? `md:w-${mdWidth} ` : ''}${lgWidth ? `lg:w-${lgWidth} ` : ''}${className}`;
  return (
    <div className={widthClass.trim()}>
      {children}
    </div>
  );
};

export default Column;