import React from 'react';

export enum ButtonState {
    Active = 'active',
    Unactive = 'unactive',
    ActiveWhite = 'activeWhite'
  }
  
  interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    state: ButtonState;
    className?: string;
    width?: string;
  }
  

  const Button: React.FC<ButtonProps> = ({ children, onClick, state, className, width }) => {
    const baseClasses = "border-none rounded px-5 py-2.5 text-lg font-bold uppercase cursor-pointer outline-none transition-filter duration-300 ease-in-out hover:brightness-90";
    let stateClasses = "";
  
    switch (state) {
      case ButtonState.Active:
        stateClasses = "bg-gradient-to-r from-button-light-blue to-button-dark-blue text-white";
        break;
      case ButtonState.Unactive:
        stateClasses = "bg-gray-400 text-white";
        break;
      case ButtonState.ActiveWhite:
        stateClasses = "bg-white text-button-dark-blue";
        break;
    }
  
    const style = {
      width: `${width}px`
    };
  
    const finalClasses = `${baseClasses} ${stateClasses} ${className || ''} ${width != null ? style : ''}`;
  
    return (
      <button onClick={onClick} className={finalClasses} style={style}>
        {children}
      </button>
    );
  };
  

export default Button;