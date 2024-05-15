import React, { useState } from 'react';
import InputField from '../general/InputField';
import Button, { ButtonState } from '../general/Button';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        const registerData = {
            login: username,
            email: email,
            password: password
        };
        
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        if (response.ok) {
            navigate('/sign');
        } else {
            console.error('Registration failed:', await response.text());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className='bg-black my-3'></div>
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
                text="Email"
                onChange={setEmail}
                width={400}
                height={90}
                required={true}
            />
            <InputField
                text="Hasło"
                secret={true}
                onChange={setPassword}
                width={400}
                height={90}
                required={true}
            />
            <InputField
                text="Powtórz hasło"
                secret={true}
                onChange={setConfirmPassword}
                width={400}
                height={90}
                required={true}
            />
            <div className='bg-black my-3'></div>
            <Button
                onClick={handleRegister}
                state={ButtonState.Active}
                className="mt-4"
                width="250"
                height="55"
                fontSize="28px"
            >
                Zarejestruj
            </Button>
        </div>
    );
};

export default RegisterForm;
