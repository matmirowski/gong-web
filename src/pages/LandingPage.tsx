import React from 'react';
import {Link} from 'react-router-dom';
import Box from '../components/general/Box';
import Button, { ButtonState } from '../components/general/Button';
import Navbar from '../components/general/Navbar';
import LandingPageGraphic from '../resources/2.webp';

const LandingPage = () => {
    return (
        <>
            <Navbar>
                <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                    <Link to="/sign">Zaloguj</Link>
                </Button>
                <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                    <Link to="/">Zarejestruj</Link>
                </Button>
            </Navbar>
            <Box>
            <div className="grid grid-cols-2 items-center justify-center h-full">
                <div className="flex flex-col text-t-dark-blue font-proxima-nova items-center justify-center">
                    <h2 className="text-3xl  font-black	 text-center">
                    PRZEDSIĘBIORCO...<br/>STUDENT TEŻ MA <br/>PRAWO DO ZABAWY!
                    </h2>
                    <p className="text-xl font-semibold m-4 text-center">
                    Promuj swoje miejsce i dotrzyj<br/>do tysięcy potencjalnych klientów
                    </p>
                    <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='272' height='64' fontSize='32px'>
                        <Link to="/sign">Zaloguj</Link>
                    </Button>
                    <span className='font-bold mt-4'>
                        <Link to="/sign">Nie posiadasz konta? Zarejestruj się!</Link>
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <img
                        src={LandingPageGraphic}
                        alt="Graphic of person using a laptop"
                        className="h-[408px] w-[408px] rounded-[50px]"
                    />
                </div>
            </div>
            </Box>
        </>
    );
};

export default LandingPage;
