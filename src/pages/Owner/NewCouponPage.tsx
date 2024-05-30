import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/general/InputField';
import Button, { ButtonState } from '../../components/general/Button';
import Box from '../../components/general/Box';
import Navbar from '../../components/general/Navbar';
import PopUp from '../../components/general/PopUp';

const NewCouponPage: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [popup, setPopup] = useState({ show: false, message: '', isError: false });

  const handleAddCoupon = async () => {
    try {
      const errors: string[] = [];
      if (title === '') {
        errors.push("Tytul jest pusty!\n");
      }
      if (description === '') {
        errors.push("Opis jest pusty!");
      }
      if (errors.length > 0) {
        setPopup({show: true, message: errors.join(""),isError: true});
        return;
      }
      const response = await fetch(`http://localhost:3030/branches/${branchId}/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      });

      if (response.ok) {
        setPopup({ show: true, message: 'Dodano kupon !', isError: false });
      } else {
        setPopup({ show: true, message: 'Błąd podczas dodawania kuponu: ' + (await response.text()), isError: true });
      }
    } catch (error) {
      setPopup({ show: true, message: 'Błąd podczas dodawania kuponu ! ', isError: true });
    }
  };

  return (
    <>
      <Navbar>
        <Link to={'/home'}>
          <Button onClick={() => null} state={ButtonState.Active} width='136' height='35'>
            Home
          </Button>
        </Link>
        <Button onClick={() => {
          console.log('Logging out...');
          localStorage.removeItem('jwtToken');
          window.location.reload();
        }} state={ButtonState.Active} width='136' height='35'>
          <Link to="/">Wyloguj</Link>
        </Button>
      </Navbar>
      <Box>
        <div className="flex flex-col items-center justify-center p-4">
          <div className='bg-black my-11'></div>
          <text className='text-button-light-blue font-black text-3xl'>Wprowadź prawidłowe dane</text>
          <div className='bg-black my-3'></div>
          <InputField
            text="Tytul"
            onChange={setTitle}
            width={400}
            height={90}
            required={true}
          />
          <InputField
            text="Opis"
            multiline={true}
            onChange={setDescription}
            width={400}
            height={200}
            required={true}
          />
          <div className='bg-black my-2'></div>
          <div className="flex justify-center mt-4 space-x-4">
          <Link to={`/owner/branches/coupons/${branchId}`}>
              <Button 
              className="mt-4"
              width="180"
              height="55"
              fontSize="28px"
              onClick={function (): void { } } 
              state={ButtonState.Active}>Wroc</Button>
            </Link>
          <Button
            onClick={ title === '' || description === '' ? ()=>{setPopup({ show: true, message: 'Uzupelnij dane', isError: true });} : handleAddCoupon}
            state={ title === '' || description === '' ?  ButtonState.Unactive : ButtonState.Active}
            className="mt-4"
            width="180"
            height="55"
            fontSize="28px"
          >
            Dodaj
          </Button>
          </div>
        </div>
      </Box>
      {popup.show && (
        <PopUp
          headline={popup.isError ? "Error" : "Success"}
          message={popup.message}
          color={popup.isError ? "text-red-600" : "text-green-600"}
          progressBarColor={popup.isError ? "bg-red-600" : "bg-green-600"}
          onClose={() => setPopup({ show: false, message: '', isError: false })}
        />
      )}
    </>
  );
};

export default NewCouponPage;
