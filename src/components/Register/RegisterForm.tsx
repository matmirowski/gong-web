import React, { useState } from "react";
import InputField from "../general/InputField";
import Button, { ButtonState } from "../general/Button";
import Checkbox from "../general/Checkbox";
import PopUp from "../general/PopUp";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [acceptedRODO, setAcceptedRODO] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpHeadline, setPopUpHeadline] = useState<string>("");
  const [popUpMessage, setPopUpMessage] = useState<string>("");
  const [popUpColor, setPopUpColor] = useState<string>("text-red-500");
  const [progressBarColor, setProgressBarColor] =
    useState<string>("bg-red-500");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!username) errors.push("Nazwa użytkownika jest wymagana.");
    if (!email || !validateEmail(email)) errors.push("Prawidłowy email jest wymagany.");
    if (!password) errors.push("Hasło jest wymagane.");
    if (password && !validatePassword(password)) errors.push("Hasło musi mieć co najmniej 8 znaków, w tym jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.");
    if (password !== confirmPassword) errors.push("Wprowadzone hasła nie są ze sobą spójne.");
    if (!acceptedRODO) errors.push("Musisz zaakceptować politykę RODO.");
    return errors;
  };

  const handleRegister = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setPopUpHeadline("Formularz zawiera błędy. Proszę poprawić poniższe pola:");
      setPopUpMessage(validationErrors.join("\n"));
      setPopUpColor("text-red-500");
      setProgressBarColor("bg-red-500");
      setShowPopUp(true);
      setIsSuccessful(false);
      return;
    }

    const registerData = {
      login: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3030/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setPopUpHeadline("Rejestracja zakończona sukcesem");
        setPopUpMessage("");
        setPopUpColor("text-green-500");
        setProgressBarColor("bg-green-500");
        setShowPopUp(true);
        setIsSuccessful(true);
      } else {
        console.error("Registration failed:", await response.json());
        setPopUpHeadline("Rejestracja nieudana");
        setPopUpMessage("Użytkownik o takich danych już istnieje. Skorzystaj z innego loginu oraz emailu.");
        setPopUpColor("text-red-500");
        setProgressBarColor("bg-red-500");
        setShowPopUp(true);
        setIsSuccessful(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setPopUpHeadline("Błąd serwera");
      setPopUpMessage("Nie można połączyć się z serwerem. Spróbuj ponownie później.");
      setPopUpColor("text-red-500");
      setProgressBarColor("bg-red-500");
      setShowPopUp(true);
      setIsSuccessful(false);
    }
  };

  const closePopUp = () => {
    setShowPopUp(false);
    if (isSuccessful) {
      navigate("/sign");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-black my-3"></div>
      <span className="text-button-light-blue font-black text-3xl">
        Wprowadź prawidłowe dane
      </span>
      <div className="bg-black my-2"></div>
      <InputField
        text="Login"
        onChange={setUsername}
        width={400}
        height={90}
        required={true}
      />
      <InputField
        text="Email"
        onChange={setEmail}
        width={400}
        height={90}
        required={true}
      />
      <InputField
        text="Hasło"
        secret={true}
        onChange={setPassword}
        width={400}
        height={90}
        required={true}
      />
      <InputField
        text="Powtórz hasło"
        secret={true}
        onChange={setConfirmPassword}
        width={400}
        height={90}
        required={true}
      />
      <div className="bg-black my-1"></div>
      <Checkbox
        label={
          <span>
            Akceptuję{" "}
            <a
              href="/GONG-RODO-policy.pdf"
              target="_blank"
              className="text-blue-500 underline"
            >
              politykę RODO
            </a>
          </span>
        }
        onChange={setAcceptedRODO}
        required={true}
      />
      <div className="bg-black my-1"></div>
      <Button
        onClick={handleRegister}
        state={ButtonState.Active}
        className="mt-2"
        width="250"
        height="55"
        fontSize="28px"
      >
        Zarejestruj
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
  );
};

export default RegisterForm;
