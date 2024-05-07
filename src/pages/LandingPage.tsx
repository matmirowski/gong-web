import React from 'react';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';
import Box from '../components/general/BlueBackgroundBox';
import Button, { ButtonState } from '../components/general/Button';
import Row from '../components/general/Row';
import Column from '../components/general/Column';


const LandingPage = () => {
    return (
        <div>
            <Box>
                STYLE OF MAIN PAGE
                <h1><Link to="/sign">Click to go to sighIn Page</Link></h1>
                <Button children={'ZALOGUJ'} onClick={function (): void {
                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                } } state={ButtonState.Active} width='400'></Button>

                <Row><Column children={'aaaaaaaaaaaaa'}></Column> <Column children={'aaaaaaaaaaaaaaaaaaaa'}></Column></Row>
            </Box>
        </div>
    );
};

export default LandingPage;
