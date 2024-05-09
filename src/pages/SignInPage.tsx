import React from 'react';
import Box from '../components/general/Box';
import SignInForm from '../components/sign/SignInForm';
import { Link } from 'react-router-dom';
import Button, { ButtonState } from '../components/general/Button';
import Navbar from '../components/general/Navbar';

const Sign = () => {
    return (
        <>
            <Navbar>
                    <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                        <Link to="/">Zarejestruj</Link>
                    </Button>
                </Navbar>
            <Box>
                <SignInForm/>
            </Box>
        </>
    );
};

export default Sign;
