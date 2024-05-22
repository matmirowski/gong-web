import React from 'react';
import Box from '../components/general/Box';
import Button, { ButtonState } from '../components/general/Button';
import { Link } from 'react-router-dom';
import Navbar from '../components/general/Navbar';

const HomePage = () => {
    return (
        <>
        <Navbar>
                    <>
                        <Button onClick={() => console.log('Navigating...')} state={ButtonState.Active} width='136' height='35'>
                            <Link to="/">Landing</Link>
                        </Button>
                       
                    </>
                
            </Navbar>
            <Box>
            Home Page
        </Box>  
        </>
        
    );
};

export default HomePage;
