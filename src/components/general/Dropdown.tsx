import React, { useState } from "react";
import { CSSProperties } from "react";

interface Category {
  id: number;
  name: string;
}

interface DropdownMenuProps {
  options: Category[];
  onSelect: (value: string) => void;
  placeholder?: string;
  width?: number;
  height?: number;
  padding?: number;
}

const Dropdown: React.FC<DropdownMenuProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
  width = 300,
  height = 65,
  padding = 16,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: Category) => {
    setSelectedOption(option.name);
    setIsOpen(false);
    onSelect(option.name);
  };

  const dropdownListStyle: CSSProperties = {
    position: "absolute",
    width: `${width}px`,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    border: "2px solid darkblue",
    borderRadius: "4px",
    marginTop: "2px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#D6E4F0",
  };

  const listItemStyle: CSSProperties = {
    padding: "0 16px",
    height: `${height}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    cursor: "pointer",
    color: "#000",
    fontSize: "18px",
    backgroundColor: "#D6E4F0",
  };

  const selectorStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `${height}px`,
    width: "100%",
    padding: `0 ${padding}px`,
    border: "2px solid darkblue",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#D6E4F0",
  };

  const listItemHoverStyle: CSSProperties = {
    background: "#0000FF20",
  };

  const selectedItemStyle: CSSProperties = {
    background: "rgba(0, 0, 255, 0.1)",
    fontWeight: "bold",
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full font-proxima-nova font-extrabold uppercase"
      style={{ position: "relative" }}
    >
      <div style={{ width: `${width}px`, position: "relative" }}>
        <div
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          style={selectorStyle}
        >
          <span className="text-xl">{selectedOption || placeholder}</span>
          <span className="ml-auto">&#9660;</span>
        </div>
        {isOpen && (
          <ul style={{ ...dropdownListStyle, top: `${height + 2}px` }}>
            {options.map((option) => (
              <li
                key={option.id}
                style={{
                  ...listItemStyle,
                  ...(selectedOption === option.name ? selectedItemStyle : {}),
                }}
                className="cursor-pointer font-proxima-nova"
                onClick={() => handleOptionClick(option)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    listItemHoverStyle.background as string;
                  e.currentTarget.style.color =
                    listItemHoverStyle.color as string;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#D6E4F0";
                  e.currentTarget.style.color = "#000";
                }}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
