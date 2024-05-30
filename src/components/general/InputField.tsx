import React, { useState } from 'react';

interface InputFieldProps {
    text: string;
    secret?: boolean;
    multiline?: boolean;
    onChange: (value: string) => void;
    width?: number;
    height?: number;
    padding?: number;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    text,
    secret = false,
    multiline = false,
    onChange,
    width = 687,
    height = 85,
    padding = 16,
    required = false
}) => {
    const [value, setValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div style={{ width: `${width}px`, height: `${height}px`, padding: `${padding}px`, position: 'relative', overflow: 'hidden' }}>
            <div className="relative border-4 border-t-dark-blue rounded-md" style={{ height: '100%' }}>
                {multiline && !secret ? (
                    <textarea
                        value={value}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full h-full px-3 py-2 bg-transparent focus:outline-none text-lg resize-none"
                        placeholder=" "
                    />
                ) : (
                    <input
                        type={secret ? 'password' : 'text'}
                        value={value}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full h-full px-3 py-2 bg-transparent focus:outline-none text-lg"
                        placeholder=" "
                    />
                )}
                <label
                    className={`absolute transition-all text-lg font-bold duration-300 ease-in-out
                                ${value || isFocused ? '-top-7 left-1  text-t-dark-blue' : 'left-3 top-2 text-t-dark-blue'}`}
                    style={{ background: 'transparent', padding: '0 4px', zIndex: 10 }}
                >
                    {text}
                    {required ? <span className="text-red-500">*</span> : <></>}
                </label>
            </div>
        </div>
    );
};

export default InputField;
