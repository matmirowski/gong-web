import React from 'react';

interface RowProps {
  children?: React.ReactNode;
  className?: string;
  justify?: string;
  alignItems?: string;
  flexWrap?: string;
}

const Row: React.FC<RowProps> = ({ children, justify = 'justify-start', alignItems = 'items-start', flexWrap = 'flex-wrap', className = '' }) => {
  const flexClasses = `flex ${flexWrap} ${justify} ${alignItems} ${className}`;
  return (
    <div className={flexClasses.trim()}>
      {children}
    </div>
  );
};

export default Row;
