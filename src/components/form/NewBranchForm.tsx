// TO DO: Form validation

import React, { useState, useEffect } from "react";
import InputField from "../general/InputField";
import Button, { ButtonState } from "../general/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "../general/Dropdown";
import ImageUploadButton from "../general/ImageUploadButton";
import useAuth from "../../hooks/useAuth";

interface Category {
  id: number;
  name: string;
}

const NewBranchForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [buildingNumber, setBuildingNumber] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [lowerPriceRange, setLowerPriceRange] = useState<number>(0);
  const [higherPriceRange, setHigherPriceRange] = useState<number>(0);
  const [distanceFromUniversity, setDistanceFromUniversity] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [openingTime, setOpeningTime] = useState<string>("");
  const [closingTime, setClosingTime] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { userId, token } = useAuth();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleForm = async () => {
    const formData = {
      name,
      slogan,
      description,
      street,
      city,
      buildingNumber,
      phoneNumber,
      image,
      lowerPriceRange,
      higherPriceRange,
      distanceFromUniversity,
      categoryId,
      openingTime,
      closingTime,
    };

    setFormErrors([]);

    try {
      const response = await fetch(
        `http://localhost:3030/owner/${userId}/branches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Nieudane przesłanie formularza:", errorText);
        setFormErrors(["Nieudane przesłanie formularza: " + errorText]);
        return;
      }

      console.log("Formularz przesłany pomyślnie.");
      navigate("/summary");
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      setFormErrors(["Wystąpił nieoczekiwany błąd."]);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3030/categories");
        const data = await response.json();
        setCategories(
          data.map((category: Category) => ({
            id: category.id,
            name: category.name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories.find(
      (category) => category.name === value
    );
    if (selectedCategory) {
      setCategoryId(selectedCategory.id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 space-y-6">
      <p className="text-xl font-bold text-black text-center">
        Zaprezentuj się klientowi. Podziel się informacjami o sobie
        <br />w formularzu zgłoszeniowym.
      </p>
      <div className="bg-black h-0.5 w-full my-3"></div>
      {formErrors.length > 0 && (
        <div className="text-red-500">
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <InputField
        text="Nazwa lokalizacji"
        onChange={setName}
        width={685}
        height={90}
        required={true}
      />
      <InputField
        text="Haslo reklamowe"
        onChange={setSlogan}
        width={685}
        height={90}
        required={true}
      />
      <InputField
        text="Opis lokalizacji"
        onChange={setDescription}
        width={685}
        height={200}
        required={true}
        multiline={true}
      />
      <InputField
        text="Miejscowość"
        onChange={setCity}
        width={685}
        height={90}
        required={true}
      />
      <div className="flex w-full justify-center">
        <InputField
          text="Ulica"
          onChange={setStreet}
          width={300}
          height={90}
          required={true}
        />
        <InputField
          text="Numer budynku"
          onChange={(value) => setBuildingNumber(parseInt(value))}
          width={300}
          height={90}
          required={true}
        />
      </div>
      <ImageUploadButton onImageUpload={setImage} />
      <InputField
        text="Odległość od Politechniki"
        onChange={(value) => setDistanceFromUniversity(parseFloat(value))}
        width={685}
        height={90}
        required={true}
      />
      <InputField
        text="Numer kontaktowy"
        onChange={setPhoneNumber}
        width={685}
        height={90}
        required={true}
      />
      <p className="text-xl font-bold text-black mb-3 text-center">
        Godziny otwarcia:
      </p>
      <div className="flex w-full justify-center">
        <InputField
          text="Od"
          onChange={setOpeningTime}
          width={300}
          height={90}
          required={true}
        />
        <InputField
          text="Do"
          onChange={setClosingTime}
          width={300}
          height={90}
          required={true}
        />
      </div>
      <p className="text-xl font-bold text-black mb-3 text-center">
        Zakres cen:
      </p>
      <div className="flex w-full justify-center">
        <InputField
          text="Od"
          onChange={(value) => setLowerPriceRange(parseFloat(value))}
          width={300}
          height={90}
          required={true}
        />
        <InputField
          text="Do"
          onChange={(value) => setHigherPriceRange(parseFloat(value))}
          width={300}
          height={90}
          required={true}
        />
      </div>
      <Dropdown
        options={categories}
        onSelect={handleCategoryChange}
        placeholder="Wybierz kategorię"
      />
      <Button
        onClick={handleForm}
        state={ButtonState.Active}
        className="mt-4"
        width="430"
        height="75"
        fontSize="32px"
      >
        Potwierdź zgłoszenie
      </Button>
    </div>
  );
};

export default NewBranchForm;
