import React, { useEffect, useState } from 'react';
import Navbar from '../../components/general/Navbar';
import Button, { ButtonState } from '../../components/general/Button';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Box from '../../components/general/Box';
import Icon from '../../components/general/Icon';

interface Branch {
  id: number;
  name: string;
  slogan: string;
  phoneNumber: string;
  description: string;
  image: string;
  priceLow: number;
  priceHigh: number;
  openingTime: string;
  closingTime: string;
  address: {
    street: string;
    city: string;
    buildingNumber: number;
    distanceFromUniversity: number;
  };
}

const AdminBranchPage: React.FC = () => {
  const { userId, token } = useAuth();
  const { branchId } = useParams<{ branchId: string }>();
  const [branch, setBranch] = useState<Branch | null>(null);

  useEffect(() => {
    const fetchBranch = async () => {
      if (userId !== null && token !== null) {
        try {
          const response = await fetch(`http://localhost:3030/branches/${branchId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error(`Error fetching branch with ID ${branchId}`);
          }
          const data: Branch = await response.json();
          setBranch(data);
        } catch (error) {
          console.error(`Error fetching branch with ID ${branchId}:`, error);
        }
      }
    };

    fetchBranch();
  }, [userId, token, branchId]);

  return (
    <>
      <Navbar>
        <Button
          onClick={() => {
            localStorage.removeItem('jwtToken');
            window.location.reload();
          }}
          state={ButtonState.Active}
          width='136'
          height='35'
        >
          <Link to="/">Wyloguj</Link>
        </Button>
      </Navbar>
      <Box>
        <div className="grid grid-cols-10 grid-rows-13 gap-0 p-6">
          {branch ? (
            <>
              <div className="name col-span-2 col-start-2 row-span-1 text-3xl font-extrabold text-blue-800">
                {branch.name}
              </div>
              <div className="slogan col-span-8 col-start-2 row-span-1 text-xl font-extrabold text-blue-700">
                {branch.slogan}
              </div>
              <div className="col-span-8 col-start-2 row-span-4 flex">
                <div className="description flex-1 text-gray-700">
                  <p className='font-extrabold'>{branch.description}</p>
                </div>
                <div className="image flex-1">
                  <img src={branch.image || "https://cdn.pixabay.com/photo/2017/07/13/19/51/sunset-2501727_960_720.png"} alt="Branch" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
              <div className="details col-span-8 col-start-2 row-span-3 flex flex-col space-y-2 text-blue-600">
                <div className="flex items-center space-x-2">
                  <Icon name="icon-localization" size={24} />
                  <span className='font-extrabold'>{branch.address.street} {branch.address.buildingNumber}, {branch.address.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="icon-money" size={24} />
                  <span className='font-extrabold'>{branch.priceLow} - {branch.priceHigh} zł</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="icon-clock" size={24} />
                  <span className='font-extrabold'>{branch.openingTime.substring(0, 5)} - {branch.closingTime.substring(0, 5)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="icon-phone" size={24} />
                  <span className='font-extrabold'>{branch.phoneNumber}</span>
                </div>
              </div>
              <div className='bg-black my-5 col-span-8 col-start-2'></div>
              <div className="btn1 col-span-2 col-start-2 row-span-1">
                <Button state={ButtonState.Active} width="200" height="50" onClick={() => {}}>
                  <Link to="/discount-codes">PRZEGLĄDAJ KODY RABATOWE</Link>
                </Button>
              </div>
              <div className="btn2 col-span-2 col-start-5 row-span-1">
                <Button state={ButtonState.Active} width="200" height="50" onClick={() => {}}>
                  ZAAKCEPTUJ
                </Button>
              </div>
              <div className="btn3 col-span-2 col-start-8 row-span-1">
                <Button state={ButtonState.Active} width="200" height="50" onClick={() => {}}>
                  USUŃ
                </Button>
              </div>
            </>
          ) : (
            <p className="col-span-10 text-center text-gray-700">Loading...</p>
          )}
        </div>
      </Box>
    </>
  );
};

export default AdminBranchPage;
