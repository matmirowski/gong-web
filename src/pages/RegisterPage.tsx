import React from 'react';
import Box from '../components/general/Box';
import { Link } from 'react-router-dom';
import Button, { ButtonState } from '../components/general/Button';
import Navbar from '../components/general/Navbar';
import RegisterForm from '../components/Register/RegisterForm';

const RegisterPage = () => {
    return (
        <>
            <Navbar>
                <Link to="/home">
                    <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                        Główna
                    </Button>
                </Link>
                <Link to="/sign">
                    <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                        Zaloguj
                    </Button>
                </Link>
            </Navbar>
            <Box>
                <RegisterForm/>
            </Box>
        </>
    );
};

export default RegisterPage;
