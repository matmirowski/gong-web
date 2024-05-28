import { useState } from 'react';
import { convertToBase64 } from '../utils/imageUtils';

export const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  return { image, handleImageUpload };
};
