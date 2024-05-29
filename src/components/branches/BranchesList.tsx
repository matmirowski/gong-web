import React, { useState } from 'react';
import Icon from '../general/Icon';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    buildingNumber: number;
    distanceFromUniversity: number;
  };
}

interface Category {
  category: string;
  items: Item[];
}

interface BranchesListProps {
  categories: Category[];
}

const BranchesList: React.FC<BranchesListProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].category);
  const { userRole } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative bg-light-blue p-5 rounded-[10px] w-[1000px] h-[600px] mx-auto">
        <div className="relative mb-4">
          <div className="absolute -top-20 -left-5 flex justify-center">
            {categories.map((cat) => (
              <div
                key={cat.category}
                className={`px-6 py-4 w-64 text-center cursor-pointer rounded-t-[30px] font-proxima-nova font-extrabold text-2xl ${activeCategory === cat.category ? 'bg-light-blue' : 'bg-not-selected-blue'}`}
                onClick={() => setActiveCategory(cat.category)}
              >
                {cat.category.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-lg mt-2 overflow-y-auto h-[500px]">
          {categories.map((cat) => (
            activeCategory === cat.category && (
              <div key={cat.category}>
                {cat.items.map((item, index) => (
                  <div key={index} className="bg-white flex items-center justify-between p-4 mb-1 border rounded-lg shadow">
                    <div>
                      <div className="text-black text-3xl font-extrabold font-proxima-nova">{item.name}</div>
                      <div className="text-black text-lg font-extrabold">{item.address.city}</div>
                    </div>
                    {userRole === 'owner' ? (
                      <div className="flex space-x-10">
                       <Icon withBorder={true} name="icon-discount" size={60} />
                       <Link to={`/owner/branches/details/${item.id}`}><Icon withBorder={true} name="icon-docs" size={60} /></Link>
                      </div>
                    ) : (
                      <Link to={`/admin/branches/${item.id}`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="80" 
                        height="80" 
                        viewBox="0 0 80 80" 
                        fill="none"
                        style={{ cursor: 'pointer' }} // Add cursor pointer
                      >
                        <rect width="80" height="80" rx="10" fill="#1E56A0"/>
                        <rect x="5" y="5" width="70" height="70" rx="5" fill="white"/>
                        <circle cx="20" cy="60" r="5" fill="#163172"/>
                        <circle cx="20" cy="40" r="5" fill="#163172"/>
                        <circle cx="20" cy="22" r="5" fill="#163172"/>
                        <rect x="35" y="18" width="31" height="9" rx="3" fill="#163172"/>
                        <rect x="35" y="54" width="31" height="9" rx="3" fill="#163172"/>
                        <rect x="35" y="36" width="31" height="9" rx="3" fill="#163172"/>
                      </svg>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesList;
