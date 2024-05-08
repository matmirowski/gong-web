import React from 'react';
import {Link} from 'react-router-dom';
import Box from '../components/general/BlueBackgroundBox';
import Button, { ButtonState } from '../components/general/Button';
import Row from '../components/general/Row';
import Column from '../components/general/Column';
import Navbar from '../components/general/Navbar';

const LandingPage = () => {
    return (
        <div>
            <Navbar>
                <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                    <Link to="/sign">Zaloguj</Link>
                </Button>
                <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                    <Link to="/">Zarejestruj</Link>
                </Button>
            </Navbar>
            <Box>
            </Box>
        </div>
    );
};

export default LandingPage;
