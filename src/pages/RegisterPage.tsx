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
                    <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                        <Link to="/sign">Zaloguj</Link>
                    </Button>
                </Navbar>
            <Box>
                <RegisterForm/>
            </Box>
        </>
    );
};

export default RegisterPage;
