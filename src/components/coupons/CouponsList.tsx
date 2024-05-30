import React, { useState } from 'react';
import Icon from '../general/Icon';
import useAuth from '../../hooks/useAuth';
import PopUp from '../general/PopUp';
import { Link, useParams } from 'react-router-dom';
import Button, { ButtonState } from '../general/Button';

interface Coupon {
  id: number;
  title: string;
  description: string;
  lifespanInMinutes: number;
}

interface CouponsListProps {
  coupons: Coupon[];
}

const CouponsList: React.FC<CouponsListProps> = ({ coupons }) => {
  const { userRole, token } = useAuth();
  const { branchId } = useParams<{ branchId: string }>();
  const [couponList, setCouponList] = useState<Coupon[]>(coupons);
  const [popUp, setPopUp] = useState<{ show: boolean, message: string, color: string, progressBarColor: string }>({
    show: false,
    message: '',
    color: '',
    progressBarColor: ''
  });

  const handleDelete = async (couponId: number) => {
    try {
      const response = await fetch(`http://localhost:3030/branches/${branchId}/coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(couponId)
      if (response.ok) {
        setCouponList(couponList.filter(coupon => coupon.id !== couponId));
        setPopUp({
          show: true,
          message: 'Usunieto Kupon !.',
          color: 'text-green-500',
          progressBarColor: 'bg-green-500'
        });
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setPopUp({
        show: true,
        message: 'Błąd podczas usuwania kuponu:\n' + error,
        color: 'text-red-500',
        progressBarColor: 'bg-red-500'
      });
      console.error('Błąd podczas usuwania kuponu:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative bg-light-blue p-5 rounded-[10px] w-[1000px] h-[600px] mx-auto">
      <div className="text-center text-3xl font-bold mb-4">Kupony</div>
        <div className="p-5 rounded-lg mt-2 overflow-y-auto h-[450px]">
          {couponList.map((coupon) => (
            <div key={coupon.id} className="bg-white flex items-center justify-between p-4 mb-1 border rounded-lg shadow">
              <div>
                <div className="text-black text-3xl font-extrabold font-proxima-nova">{coupon.title}</div>
                <div className="text-black text-lg font-extrabold">{coupon.description}</div>
              </div>
              {userRole === 'owner' && (
                <div className="flex space-x-10" style={{ cursor: 'pointer' }}>
                  <Icon withBorder={true} name="icon-close" size={60} onClick={() => handleDelete(coupon.id)} />
                </div>
              )}
            </div>
          ))}
        </div>
        {userRole === 'owner' && (
          <div className="flex justify-center mt-4 space-x-4">
            <Link to={`/owner/branches`}>
              <Button width='200' onClick={function (): void { } } state={ButtonState.Active}>Wroc</Button>
            </Link>
            <Link to={`/owner/branches/coupons/${branchId}/new`}>
              <Button width='200' onClick={function (): void { } } state={ButtonState.Active}>Dodaj</Button>
            </Link>
          </div>
        )}
      </div>
      
      {popUp.show && (
        <PopUp
          headline='Kupon'
          message={popUp.message}
          color={popUp.color}
          progressBarColor={popUp.progressBarColor}
          onClose={() => setPopUp({ ...popUp, show: false })}
        />
      )}
    </div>
  );
};

export default CouponsList;
