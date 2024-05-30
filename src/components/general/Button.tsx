import React from 'react';

export enum ButtonState {
    Active = 'active',
    Unactive = 'unactive',
    ActiveWhite = 'activeWhite'
  }
  
  interface ButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    state: ButtonState;
    className?: string;
    width?: string;
    height?: string;
    fontSize?: string;
  }
  

  const Button: React.FC<ButtonProps> = ({ children, onClick, state, className, width, height, fontSize}) => {
    const baseClasses = "rounded-[10px] px-5 py-2.5 font-bold uppercase cursor-pointer outline-none transition-filter duration-300 ease-in-out hover:brightness-90 flex items-center justify-center";
    let stateClasses = "";

    switch (state) {
      case ButtonState.Active:
        stateClasses = "bg-gradient-to-r from-button-light-blue to-button-dark-blue text-white";
        break;
      case ButtonState.Unactive:
        stateClasses = "bg-gray-400 text-white";
        break;
      case ButtonState.ActiveWhite:
        stateClasses = "bg-white dark-blue";
        break;
    }
  
    const style = {
      width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        fontSize: fontSize
    };
  
    const finalClasses = `${baseClasses} ${stateClasses} ${className || ''} ${width != null ? style : ''}`;
  
    return (
      <button onClick={onClick} className={finalClasses} style={style}>
        {children}
      </button>
    );
  };
  

export default Button;