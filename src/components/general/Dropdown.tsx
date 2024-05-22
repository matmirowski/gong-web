import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface DropdownProps {
  options: Category[];
  onChange: (value: Category) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(
      (option) => option.name === event.target.value
    );
    if (selectedOption) {
      setSelectedValue(event.target.value);
      onChange(selectedOption);
    }
  };
  return (
    <div className="w-[685px] rounded-[10px] px-5 py-2.5 font-bold transition-filter duration-300 ease-in-out hover:brightness-90 flex items-center justify-center">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full h-[75px] text-center rounded-[10px] text-[32px] bg-gradient-to-r from-button-light-blue to-button-dark-blue text-white border-transparent focus:border-white uppercase"
      >
        <option value="" disabled className="text-white uppercase">
          Kategorie
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.name}
            className="bg-button-dark-blue text-white hover:bg-light-blue hover:text-t-dark-blue border-b border-white"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
