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
        setPopup({ show: true, message: 'Coupon added!', isError: false });
      } else {
        setPopup({ show: true, message: 'Error adding coupon: ' + (await response.text()), isError: true });
      }
    } catch (error) {
      setPopup({ show: true, message: 'Error adding coupon: ', isError: true });
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
          <Button
            onClick={handleAddCoupon}
            state={ButtonState.Active}
            className="mt-4"
            width="250"
            height="55"
            fontSize="28px"
          >
            Dodaj
          </Button>
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
