import React, { useState, useEffect } from "react";
import InputField from "../general/InputField";
import Button, { ButtonState } from "../general/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "../general/Dropdown";
import ImageUploadButton from "../general/ImageUploadButton";
import useAuth from "../../hooks/useAuth";
import PopUp from "../general/PopUp";
import { convertKmToMeters } from "../../utils/distanceUtils";

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
  const [buildingNumber, setBuildingNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [lowerPriceRange, setLowerPriceRange] = useState<string>("");
  const [higherPriceRange, setHigherPriceRange] = useState<string>("");
  const [distanceFromUniversity, setDistanceFromUniversity] =
    useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [openingTime, setOpeningTime] = useState<string>("");
  const [closingTime, setClosingTime] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { userId, token } = useAuth();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpMessage, setPopUpMessage] = useState<string>("");

  const navigate = useNavigate();

  const validatePhoneNumber = (input: string): boolean => {
    const regex = /^\s*\d{9}\s*$/;
    return regex.test(input);
  };

  const validateIsNumber = (input: string): boolean => {
    const regex = /^\d+$/;
    return regex.test(input);
  };

   const validateFloatNumber = (input: string): boolean => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(input);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!name) errors.push("Nazwa lokalizacji jest wymagana.\n");
    if (!slogan) errors.push("Hasło reklamowe jest wymagane.\n");
    if (!description) errors.push("Opis lokalizacji jest wymagany.\n");
    if (!city) errors.push("Miejscowość jest wymagana.\n");
    if (!street) errors.push("Ulica jest wymagana.\n");
    if (!buildingNumber || !validateIsNumber(buildingNumber)) errors.push("Numer budynku jest wymagany i powinien być liczbą.\n");
    if (!distanceFromUniversity || !validateFloatNumber(distanceFromUniversity)) errors.push("Odległość od Politechniki jest wymagana i powinna być liczbą.\n");
    if (!phoneNumber) errors.push("Numer kontaktowy jest wymagany.\n");
    if (!validatePhoneNumber(phoneNumber)) errors.push("Numer kontaktowy jest nieprawidłowy. Powinien zawierać 9 cyfr.\n");
    if (!image) errors.push("Zdjęcie lokalizacji jest wymagane.\n");
    if (!openingTime) errors.push("Godzina otwarcia jest wymagana.\n");
    if (!closingTime) errors.push("Godzina zamknięcia jest wymagana.\n");
    if (!lowerPriceRange || !validateIsNumber(lowerPriceRange) || parseFloat(lowerPriceRange) <= 0)errors.push("Dolny zakres cen musi być większy od 0 i powinien być liczbą.\n");
    if (!higherPriceRange || !validateIsNumber(higherPriceRange) || parseFloat(higherPriceRange) <= 0) errors.push("Górny zakres cen musi być większy od 0 i powinien być liczbą.\n");
    if (parseFloat(lowerPriceRange) > parseFloat(higherPriceRange)) errors.push("Dolny zakres cen nie może być większy od górnego.\n");
    if (!categoryId) errors.push("Wybór kategorii jest wymagany.\n");
    return errors;
  };

  const handleForm = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setPopUpMessage(errors.join(""));
      setShowPopUp(true);
      return;
    }

    const formData = {
      name,
      slogan,
      description,
      street,
      city,
      buildingNumber: parseInt(buildingNumber),
      phoneNumber,
      image,
      lowerPriceRange: parseInt(lowerPriceRange),
      higherPriceRange: parseInt(higherPriceRange),
      distanceFromUniversity: convertKmToMeters(distanceFromUniversity),
      categoryId,
      openingTime,
      closingTime,
    };

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
        console.error("Nieudane przesłanie formularza");
        setPopUpMessage("Nieudane przesłanie formularza.\n");
        setShowPopUp(true);
        return;
      }

      console.log("Formularz przesłany pomyślnie.");
      navigate("/summary");
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      setPopUpMessage("Wystąpił nieoczekiwany błąd.\n");
      setShowPopUp(true);
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

  const closePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 space-y-6">
      <p className="text-xl font-bold text-black text-center">
        Zaprezentuj się klientowi. Podziel się informacjami o sobie
        <br />w formularzu zgłoszeniowym.
      </p>
      <div className="bg-black h-0.5 w-full my-3"></div>
      <InputField
        text="Nazwa lokalizacji"
        onChange={setName}
        width={685}
        height={90}
        required={true}
      />
      <InputField
        text="Slogan reklamowy"
        onChange={setSlogan}
        width={685}
        height={90}
        required={true}
      />
      <InputField
        text="Szczegółowy opis"
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
          onChange={(value) => setBuildingNumber(value)}
          width={300}
          height={90}
          required={true}
        />
      </div>
      <ImageUploadButton onImageUpload={setImage} />
      <InputField
        text="Odległość od Politechniki Łódzkiej (km)"
        onChange={(value) => setDistanceFromUniversity(value)}
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
          onChange={(value) => setLowerPriceRange(value)}
          width={300}
          height={90}
          required={true}
        />
        <InputField
          text="Do"
          onChange={(value) => setHigherPriceRange(value)}
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
        width="430"
        height="75"
        fontSize="32px"
      >
        Potwierdź zgłoszenie
      </Button>
      {showPopUp && (
        <PopUp
          headline="Formularz zawiera błędy. Proszę poprawić poniższe pola:"
          message={popUpMessage}
          onClose={closePopUp}
          color="text-red-500"
          progressBarColor="bg-red-500"
        />
      )}
    </div>
  );
};

export default NewBranchForm;
