import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CouponsList from '../../components/coupons/CouponsList';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/general/Navbar';
import Button, { ButtonState } from '../../components/general/Button';

interface Coupon {
  id: number;
  title: string;
  description: string;
  lifespanInMinutes: number;
}

const CouponsPage: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const { userId, token } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (userId !== null && token !== null) {
        try {
          const response = await fetch(`http://localhost:3030/branches/${branchId}/coupons`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (Array.isArray(data)) {
            setCoupons(data);
          } else {
            console.error('Unexpected data format:', data);
          }
        } catch (error) {
          console.error('Error fetching coupons:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoupons();
  }, [userId, token, branchId]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <CouponsList coupons={coupons} />
    </>
  );
};

export default CouponsPage;
