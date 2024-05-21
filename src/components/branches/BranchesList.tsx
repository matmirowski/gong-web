import React, { useState } from 'react';
import Icon from '../general/Icon';

interface Item {
  name: string;
  address: string;
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
                      <div className="text-black text-lg font-extrabold">{item.address}</div>
                    </div>
                    <div className="flex space-x-10">
                      <Icon withBorder={true} name="icon-discount" size={60} />
                      <Icon withBorder={true} name="icon-camera" size={60} />
                    </div>
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
