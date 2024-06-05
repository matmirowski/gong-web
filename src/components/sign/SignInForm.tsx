import React, { useState, useEffect } from "react";
import InputField from "../general/InputField";
import Button, { ButtonState } from "../general/Button";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../general/PopUp";

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpHeadline, setPopUpHeadline] = useState<string>("");
  const [popUpMessage, setPopUpMessage] = useState<string>("");
  const [popUpColor, setPopUpColor] = useState<string>("text-red-500");
  const [progressBarColor, setProgressBarColor] =
    useState<string>("bg-red-500");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!username) errors.push("Nazwa użytkownika jest wymagana.");
    if (!password) errors.push("Hasło jest wymagane.");
    return errors;
  };

  const handleLogin = async () => {
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

    const loginData = {
      login: username,
      password: password,
    };
    const response = await fetch("http://localhost:3030/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("jwtToken", data.token);
      console.log("JWT Token stored:", localStorage.getItem("jwtToken"));
      setPopUpHeadline("Zalogowano pomyślnie!");
      setPopUpMessage("");
      setPopUpColor("text-green-500");
      setProgressBarColor("bg-green-500");
      setShowPopUp(true);
      setIsSuccessful(true);
    } else {
      console.error("Login failed:", await response.text());
      setPopUpHeadline("Nieprawidłowe dane logowania");
      setPopUpMessage("Sprawdź login i hasło");
      setPopUpColor("text-red-500");
      setProgressBarColor("bg-red-500");
      setShowPopUp(true);
      setIsSuccessful(false);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        console.log("Token present:", token);
      } else {
        console.log("No token found");
      }
    };

    checkToken();
  }, []);

  const closePopUp = () => {
    setShowPopUp(false);
    if (isSuccessful) {
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-black my-11"></div>
      <text className="text-button-light-blue font-black text-3xl">
        Wprowadź prawidłowe dane
      </text>
      <div className="bg-black my-3"></div>
      <InputField
        text="Login"
        onChange={setUsername}
        width={400}
        height={90}
        required={true}
      />
      <InputField
        text="Haslo"
        secret={true}
        onChange={setPassword}
        width={400}
        height={90}
        required={true}
      />
      <Link className="text-button-light-blue font-extrabold underline" to={"/register"}>
        Nie posiadasz konta? Zarejestruj sie!
      </Link>
      <div className="bg-black my-11"></div>
      <Button
        onClick={handleLogin}
        state={ButtonState.Active}
        className="mt-4"
        width="250"
        height="55"
        fontSize="28px"
      >
        Zaloguj
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

export default SignInForm;
