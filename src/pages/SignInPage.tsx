import React from 'react';
import Box from '../components/general/BlueBackgroundBox';
import LoginInputField from '../components/sign/LoginInputField';
import PasswordInputField from '../components/sign/PasswordInputField';

const Sign = () => {
    return (
        <Box>
            <LoginInputField/>
            <PasswordInputField/>
        </Box>
    );
};

export default Sign;
