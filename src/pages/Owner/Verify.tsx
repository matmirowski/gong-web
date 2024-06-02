import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/general/Navbar';
import Button, { ButtonState } from '../../components/general/Button';
import Box from '../../components/general/Box';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/general/InputField';
import PopUp from '../../components/general/PopUp';

const Verify = () => {
    const { branchId } = useParams<{ branchId: string }>();
    const [code, setCode] = useState<string>('');
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<{ headline: string, message: string, color: string, progressBarColor: string }>({
        headline: '',
        message: '',
        color: '',
        progressBarColor: ''
    });
    const { token } = useAuth();

    const handleVerify = async () => {
        const response = await fetch(`http://localhost:3030/branches/${branchId}/coupons/codes/verify?code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (response.ok && data.type === 'success') {
            console.log('Verification successful:', data);
            setPopupMessage({
                headline: 'Sukces',
                message: `Udalo sie! Kupon dalej wazny.\nTytul: ${data.title}\nOpis: ${data.description}`,
                color: 'text-green-500',
                progressBarColor: 'bg-green-500'
            });

        } else {
            console.error('Verification failed:', data);
            let message = '';
            let color = 'text-red-500';
            let progressBarColor = 'bg-red-500';

            switch (data.type) {
                case 'code-expired':
                    message = 'Kod wygasl.';
                    break;
                case 'not-found':
                    message = 'Nie znaleziono kodu.';
                    break;
                default:
                    message = response.statusText;
            }

            setPopupMessage({
                headline: 'Bład',
                message,
                color,
                progressBarColor
            });
        }
        setPopupVisible(true);
    };

    const handleEmptyCodeError = () => {
        setPopupMessage({
            headline: 'Błąd',
            message: 'Podaj kod',
            color: 'text-red-500',
            progressBarColor: 'bg-red-500'
        });
        setPopupVisible(true);
    };

    return (
        <>
            <Navbar>
                <Link to={'/home'}>
                    <Button onClick={() => null} state={ButtonState.Active} width='136' height='35'>
                        Home
                    </Button>
                </Link>
                <Link to="/">
                    <Button onClick={() => {
                        console.log('Logging out...');
                        localStorage.removeItem('jwtToken');
                        window.location.reload();
                    }} state={ButtonState.Active} width='136' height='35'>
                        Wyloguj
                    </Button>
                </Link>
            </Navbar>
            <Box>
                <div className="flex flex-col items-center justify-center p-4">
                    <div className='my-2' />
                    <div className='text-3xl text-button-light-blue font-extrabold font-proxima-nova'>Zweryfikuj kod rabatowy</div>
                    <div className='my-16' />
                    <InputField 
                        required={true} 
                        text={'Kod do sprawdzenia'} 
                        onChange={(value: string): void => {
                            setCode(value);
                        }} 
                    />
                    <div className='my-16' />
                    <Button
                        width='300'
                        height='55'
                        onClick={code === '' ? handleEmptyCodeError : handleVerify}
                        state={code === '' ? ButtonState.Unactive : ButtonState.Active}
                    >
                        Sprawdz
                    </Button>
                </div>
            </Box>
            {popupVisible && (
                <PopUp
                    headline={popupMessage.headline}
                    message={popupMessage.message}
                    color={popupMessage.color}
                    progressBarColor={popupMessage.progressBarColor}
                    onClose={() => setPopupVisible(false)}
                />
            )}
        </>
    );
};

export default Verify;
