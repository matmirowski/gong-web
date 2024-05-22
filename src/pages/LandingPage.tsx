import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Box from '../components/general/Box';
import Button, { ButtonState } from '../components/general/Button';
import Navbar from '../components/general/Navbar';
import LandingPageGraphic from '../resources/2.webp';

export interface JwtPayload {
    userId: number;
    role: string;
    iat: number;
    exp: number;
}

const LandingPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token && token.split('.').length === 3) {
            try {
                const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
                const isExpired: boolean = Date.now() >= decoded.exp * 1000;
                if (!isExpired) {
                    setIsLoggedIn(true);
                    setUserRole(decoded.role);
                } else {
                    localStorage.removeItem('jwtToken');
                }
            } catch (error) {
                console.error('Failed to decode token:', error);
                localStorage.removeItem('jwtToken');
            }
        }
    }, []);

    return (
        <>
            <Navbar>
                {isLoggedIn ? (
                    <>
                      {userRole === 'owner' && (
                            <Button onClick={() => console.log('Navigating to owner...')} state={ButtonState.Active} width='136' height='35' fontSize='12px'>
                                <Link to="/home">Strona główna</Link>
                            </Button>
                        )}
                        {userRole === 'admin' && (
                            <Button onClick={() => console.log('Navigating to admin...')} state={ButtonState.Active} width='136' height='35' fontSize='12px'>
                                <Link to="/admin/branches">Panel admina</Link>
                            </Button>
                        )}
                        <Button onClick={() => {
                            console.log('Logging out...');
                            localStorage.removeItem('jwtToken');
                            window.location.reload();
                        }} state={ButtonState.Active} width='136' height='35'>
                            <Link to="/">Wyloguj</Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                            <Link to="/sign">Zaloguj</Link>
                        </Button>
                        <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                            <Link to="/register">Zarejestruj</Link>
                        </Button>
                    </>
                )}
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
