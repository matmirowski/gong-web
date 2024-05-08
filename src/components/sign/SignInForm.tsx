import React, { useState } from 'react';
import InputField from '../general/InputField'; // Adjust the path as necessary
import Button, { ButtonState } from '../general/Button'; // Adjust the path as necessary

const SignInForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        console.log('Username:', username, 'Password:', password);
        // Here you would typically handle authentication
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <InputField
                text="Username"
                onChange={setUsername}
            />
            <InputField
                text="Password"
                secret={true}
                onChange={setPassword}
            />
            <Button
                onClick={handleLogin}
                state={ButtonState.Active}
                className="mt-4"
                width="300"
                height="50"
                fontSize="16px"
            >
                Sign In
            </Button>
        </div>
    );
};

export default SignInForm;
