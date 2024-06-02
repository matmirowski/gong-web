import React, { useState, ReactNode } from "react";
import Icon from "./Icon";

interface CheckboxProps {
  label: ReactNode;
  onChange: (checked: boolean) => void;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  onChange,
  required = false,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <label className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          required={required}
          className="w-6 h-6 border-2 rounded-md appearance-none cursor-pointer border-button-dark-blue bg-transparent checked:bg-transparent relative"
          title=""
        />
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center pb-2">
            <Icon
              name="icon-done"
              size={20}
            />
          </div>
        )}
      </div>
      <span className="text-lg">{label}</span>
    </label>
  );
};

export default Checkbox;
