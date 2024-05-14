import React, { useState, ReactNode } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-light-blue flex justify-between items-center h-[55px] w-full px-4 text-white'>
        <ul className='hidden md:flex flex-grow justify-start'></ul>
        <div className='md:flex hidden items-center gap-[40px]'>
            {children}
        </div>
        <div onClick={handleNav} className='md:hidden text-button-dark-blue'>
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        {nav && (
            <ul className='bg-light-blue fixed left-0 top-[55px] w-[60%] h-full ease-in-out duration-500 z-10'>
                <li className='p-2'>
                    {children}
                </li>
            </ul>
      )}
    </div>
  );
};

export default Navbar;
