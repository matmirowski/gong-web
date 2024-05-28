import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import Icon from "./Icon";

interface PopUpProps {
  headline: string;
  message: string;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ headline, message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const totalTime = 20000;
    const intervalTime = 100; 
    const step = (intervalTime / totalTime) * 100;

    const timer = setTimeout(() => {
      onClose();
    }, totalTime);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevProgress - step;
      });
    }, intervalTime);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose]);

  const formatMessage = (msg: string) => {
    return msg.split('\n').map((line, index) => (
      <div key={index}>
        <span className="text-red-500">*</span> {line}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-proxima-nova">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-30 z-40"></div>
      <div className="bg-white p-8 rounded-[50px] shadow-lg relative w-[425px] z-50 text-center">
        <div className="flex justify-between items-center mb-4">
          <Icon name="logo-black" size={75} />
          <button onClick={onClose} className="text-5xl text-red-500">
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-dark-blue mb-4">
          {headline}
        </h1>
        <pre className="text-t-dark-blue font-bold text-center text-sm whitespace-pre-wrap">
          {formatMessage(message)}
        </pre>
        <div className="w-full mt-4">
          <div
            className="h-1 bg-red-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
