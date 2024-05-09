import React, { useState } from 'react';
import InputField from '../general/InputField';
import Button, { ButtonState } from '../general/Button';
import { Link } from 'react-router-dom';

const SignInForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        console.log('Username:', username, 'Password:', password);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className='bg-black my-11'></div>
            <text className='text-button-light-blue font-extrabold text-3xl'>Wprowadz prawidlowe dane</text>
            <div className='bg-black my-3'></div>
            <InputField
                text="Login"
                onChange={setUsername}
                width={400}
                height={90}
                required={true}
            />
            <InputField
                text="Haslo"
                secret={true}
                onChange={setPassword}
                width={400}
                height={90}
                required={true}
            />
            <Link  className='text-button-light-blue font-extrabold' to={'/'}>Nie posiadasz konta? Zarejestruj sie!</Link>
            <div className='bg-black my-11'></div>
            <Button
                onClick={handleLogin}
                state={ButtonState.Active}
                className="mt-4"
                width="250"
                height="55"
                fontSize="28px"
            >
                Zaloguj
            </Button>
        </div>
    );
};

export default SignInForm;
