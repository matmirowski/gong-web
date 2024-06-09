import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import Button, { ButtonState } from "../../components/general/Button";
import useAuth from "../../hooks/useAuth";
import InputField from "../../components/general/InputField";
import PopUp from "../../components/general/PopUp";
import SizeableBox from "../../components/general/SizeableBox";

const Verify: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const [code, setCode] = useState<string>("");
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<{
    headline: string;
    message: string;
    color: string;
    progressBarColor: string;
  }>({
    headline: "",
    message: "",
    color: "",
    progressBarColor: "",
  });
  const { token } = useAuth();

  const handleVerify = async () => {
    if (code === "") {
      setPopupMessage({
        headline: "Błąd",
        message: "Nie podano kodu rabatowego.",
        color: "text-red-500",
        progressBarColor: "bg-red-500",
      });
      setPopupVisible(true);
      return;
    }

    const response = await fetch(
      `http://localhost:3030/branches/${branchId}/coupons/codes/verify?code=${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok && data.type === "success") {
      console.log("Verification successful:", data);
      setPopupMessage({
        headline: "Sukces!",
        message: `\nTytul: ${data.title}\nOpis: ${data.description}`,
        color: "text-green-500",
        progressBarColor: "bg-green-500",
      });
    } else {
      console.error("Verification failed:", data);
      let message = "";
      let color = "text-red-500";
      let progressBarColor = "bg-red-500";

      switch (data.type) {
        case "code-expired":
          message = "Kod wygasł.";
          break;
        case "not-found":
          message = "Nieznaleziono takiego kodu rabatowego.";
          break;
        default:
          message = response.statusText;
      }

      setPopupMessage({
        headline: "Błąd. Kupon niepoprawny!",
        message,
        color,
        progressBarColor,
      });
    }
    setPopupVisible(true);
  };

  return (
    <>
      <Navbar>
        <Button
          onClick={() => console.log("Navigating to home...")}
          state={ButtonState.Active}
          width="136"
          height="35"
        >
          <Link to="/home">Główna</Link>
        </Button>
        <Link to="/">
          <Button
            onClick={() => {
              console.log("Logging out...");
              localStorage.removeItem("jwtToken");
              window.location.reload();
            }}
            state={ButtonState.Active}
            width="136"
            height="35"
          >
            Wyloguj
          </Button>
        </Link>
      </Navbar>
      <SizeableBox>
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-t-dark-blue font-black text-5xl text-center mb-4">
            Zweryfikuj kupon rabatowy
          </h1>
          <div className="my-8" />
          <InputField
            required={true}
            width={685}
            height={90}
            text={"Kod do zweryfikowania"}
            onChange={(value: string): void => {
              setCode(value);
            }}
          />
          <div className="my-8" />
          <div className="flex space-x-4 mt-4">
          <Button
              className="mt-4"
              width="200"
              height="40"
              fontSize="18px"
              onClick={() => window.history.back()}
              state={ButtonState.Active}
            >
              Wróć
            </Button>
            <Button
              className="mt-4"
              width="200"
              height="40"
              fontSize="18px"
              onClick={handleVerify}
              state={ButtonState.Active}
            >
              SPRAWDŹ
            </Button>
          </div>
        </div>
      </SizeableBox>
      {popupVisible && (
        <PopUp
          headline={popupMessage.headline}
          message={popupMessage.message}
          color={popupMessage.color}
          progressBarColor={popupMessage.progressBarColor}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </>
  );
};

export default Verify;
