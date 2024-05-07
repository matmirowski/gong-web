import React from 'react';
import HomePage from './HomePage';
import { Link } from 'react-router-dom'; // Corrected import
import Box from '../components/general/BlueBackgroundBox';

const LandingPage = () => {
    return (
        <div>
            <Box>
                STYLE OF MAIN PAGE
                <h1><Link to="/sign">Click to go to sighIn Page</Link></h1>
            </Box>
        </div>
    );
};

export default LandingPage;
