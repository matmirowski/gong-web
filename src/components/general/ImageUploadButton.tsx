// src/components/ImageUploadButton.tsx

import React, { useState } from "react";
import { convertToBase64 } from "../../utils/imageUtils";

interface ImageUploadButtonProps {
  onImageUpload: (base64Image: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onImageUpload,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImagePreview(base64);
      onImageUpload(base64);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <span className="bg-gradient-to-r from-button-light-blue to-button-dark-blue text-white rounded-[10px] px-5 py-2.5 font-bold uppercase cursor-pointer outline-none transition-filter duration-300 ease-in-out hover:brightness-90 flex items-center justify-center">
          Upload Image
        </span>
      </label>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-4 w-32 h-32 object-cover"
        />
      )}
    </div>
  );
};

export default ImageUploadButton;
