import React, { useState, useEffect } from 'react';
import InputField from '../general/InputField';
import Button, { ButtonState } from '../general/Button';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginData = {
            login: username,
            password: password
        };
        const response = await fetch('http://localhost:3030/users/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('jwtToken', data.jwtToken);
            console.log('JWT Token stored:', localStorage.getItem('jwtToken'));

            navigate('/home');
        } else {
            console.error('Login failed:', await response.text());
        }
    };

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                console.log('Token present:', token);
            } else {
                console.log('No token found');
            }
        };

        checkToken();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className='bg-black my-11'></div>
            <text className='text-button-light-blue font-black text-3xl'>Wprowadź prawidłowe dane</text>
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
            <Link className='text-button-light-blue font-extrabold' to={'/register'}>Nie posiadasz konta? Zarejestruj sie!</Link>
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
