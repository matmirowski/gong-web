import React, { useState } from "react";
import InputField from "../general/InputField";
import Button, { ButtonState } from "../general/Button";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../general/Box";
import useAuth from "../../hooks/useAuth";
import PopUp from "../general/PopUp";

const EditBranchForm: React.FC = () => {
  const [slogan, setSlogan] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpHeadline, setPopUpHeadline] = useState<string>("");
  const [popUpMessage, setPopUpMessage] = useState<string>("");
  const [popUpColor, setPopUpColor] = useState<string>("text-red-500");
  const [progressBarColor, setProgressBarColor] =
    useState<string>("bg-red-500");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const { branchId } = useParams<{ branchId: string }>();
  const { userId, token } = useAuth();

  const navigate = useNavigate();

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!slogan) errors.push("Slogan reklamowy jest wymagany.");
    if (!description) errors.push("Szczegółowy opis jest wymagany.");
    return errors;
  };

  const handleEdit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setPopUpHeadline(
        "Formularz zawiera błędy. Proszę poprawić poniższe pola:"
      );
      setPopUpMessage(validationErrors.join("\n"));
      setPopUpColor("text-red-500");
      setProgressBarColor("bg-red-500");
      setShowPopUp(true);
      setIsSuccessful(false);
      return;
    }

    const editData = { slogan, description };
    try {
      const response = await fetch(
        `http://localhost:3030/owner/${userId}/branches/${branchId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );
      if (response.ok) {
        setPopUpHeadline("Edycja zakończona sukcesem.");
        setPopUpMessage("");
        setPopUpColor("text-green-500");
        setProgressBarColor("bg-green-500");
        setShowPopUp(true);
        setIsSuccessful(true);
      } else {
        const errorMessage = await response.text();
        console.error("Edit failed:", errorMessage);
        setPopUpHeadline("Edycja nie powiodła się.");
        setPopUpMessage(errorMessage || "Spróbuj ponownie później.");
        setPopUpColor("text-red-500");
        setProgressBarColor("bg-red-500");
        setShowPopUp(true);
        setIsSuccessful(false);
      }
    } catch (error) {
      console.error("Edit failed:", error);
      setPopUpHeadline("Edycja nie powiodła się.");
      setPopUpMessage("Spróbuj ponownie później.");
      setPopUpColor("text-red-500");
      setProgressBarColor("bg-red-500");
      setShowPopUp(true);
      setIsSuccessful(false);
    }
  };

  const closePopUp = () => {
    setShowPopUp(false);
    if (isSuccessful) {
      navigate(-1);
    }
  };

  return (
    <Box>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-button-light-blue font-black text-5xl text-center mb-4">
          Witaj w edytorze zgłoszeń!
        </h1>
        <p className="text-xl font-bold text-black text-center mb-4">
          Daj się poznać na nowo klientom! <br />
          Stwórz nowy wspaniały opis i slogan.
        </p>
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
        <Button
          onClick={handleEdit}
          state={ButtonState.Active}
          className="mt-4"
          width="250"
          height="55"
          fontSize="28px"
        >
          Zatwierdź
        </Button>
        {showPopUp && (
          <PopUp
            headline={popUpHeadline}
            message={popUpMessage}
            onClose={closePopUp}
            color={popUpColor}
            progressBarColor={progressBarColor}
          />
        )}
      </div>
    </Box>
  );
};

export default EditBranchForm;
