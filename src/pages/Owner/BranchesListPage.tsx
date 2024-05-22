import React, { useEffect, useState } from 'react';
import BranchesList from '../../components/branches/BranchesList';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/general/Navbar';
import Button, { ButtonState } from '../../components/general/Button';
import { Link } from 'react-router-dom';

interface Branch {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    buildingNumber: number;
    distanceFromUniversity: number;
  };
}

const BranchesListPage: React.FC = () => {
  const { userId, token } = useAuth();
  const [activeBranches, setActiveBranches] = useState<Branch[]>([]);
  const [pendingBranches, setPendingBranches] = useState<Branch[]>([]);
  const [rejectedBranches, setRejectedBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBranches = async (status: string, setState: React.Dispatch<React.SetStateAction<Branch[]>>) => {
      if (userId !== null && token !== null) {
        try {
          const response = await fetch(`http://localhost:3030/owner/${userId}/branches?status=${status}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (Array.isArray(data)) {
            setState(data);
          } else {
            console.error('Unexpected data format:', data);
          }
        } catch (error) {
          console.error(`Error fetching ${status} branches:`, error);
        }
      }
    };

    const fetchAllBranches = async () => {
      setLoading(true);
      await Promise.all([
        fetchBranches('active', setActiveBranches),
        fetchBranches('pending', setPendingBranches),
        fetchBranches('rejected', setRejectedBranches),
      ]);
      setLoading(false);
    };

    fetchAllBranches();
  }, [userId, token]);

  const categories = [
    {
      category: 'Aktywne',
      items: activeBranches.map(branch => ({
        name: branch.name,
        address: `${branch.address.street}, ${branch.address.city}, Building No. ${branch.address.buildingNumber}`
      }))
    },
    {
      category: 'Oczekujace',
      items: pendingBranches.map(branch => ({
        name: branch.name,
        address: `${branch.address.street}, ${branch.address.city}, Building No. ${branch.address.buildingNumber}`
      }))
    },
    {
      category: 'Odrzucone',
      items: rejectedBranches.map(branch => ({
        name: branch.name,
        address: `${branch.address.street}, ${branch.address.city}, Building No. ${branch.address.buildingNumber}`
      }))
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar>
      <Button onClick={() => {
                            console.log('Logging out...');
                            localStorage.removeItem('jwtToken');
                            window.location.reload();
                        }} state={ButtonState.Active} width='136' height='35'>
                            <Link to="/">Wyloguj</Link>
                        </Button>
      </Navbar>
      <BranchesList categories={categories} />
    </>
  );
};

export default BranchesListPage;
