import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import Icon from "./Icon";

interface PopUpProps {
  headline: string;
  message: string;
  color: string;
  progressBarColor: string;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ 
  headline, 
  message, 
  color,
  progressBarColor,
  onClose 
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const sound1 = new Audio('/sounds/error.mp3');
    const sound2 = new Audio('/sounds/okay.mp3');

    sound1.load();
    sound2.load();

    if (progressBarColor.includes('bg-red-500')) {
      sound1.play().catch(error => console.error('Error playing sound1:', error));
    } else {
      sound2.play().catch(error => console.error('Error playing sound2:', error));
    }

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
  }, [onClose, progressBarColor]);

  const formatMessage = (msg: string) => {
    return msg.split('\n').map((line, index) => (
      <div key={index}>
        <span className={color}>*</span> {line}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-proxima-nova">
      <div className="absolute -inset-10 bg-gray-900 bg-opacity-30 z-40"></div>
      <div className="bg-white p-8 rounded-[50px] shadow-lg relative w-[425px] z-50 text-center">
        <div className="flex justify-between items-center mb-4">
          <Icon name="logo-black" size={75} />
          <button onClick={onClose} className={`text-5xl ${color}`}>
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
            className={`h-1 ${progressBarColor} rounded-full transition-all duration-100`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
