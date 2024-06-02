import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import InputField from "../../components/general/InputField";
import Button, { ButtonState } from "../../components/general/Button";
import Box from "../../components/general/Box";
import Navbar from "../../components/general/Navbar";
import PopUp from "../../components/general/PopUp";

const NewCouponPage: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const handleAddCoupon = async () => {
    try {
      const errors: string[] = [];
      if (title === "") {
        errors.push("Tytul jest pusty!\n");
      }
      if (description === "") {
        errors.push("Opis jest pusty!");
      }
      if (errors.length > 0) {
        setPopup({ show: true, message: errors.join(""), isError: true });
        return;
      }
      const response = await fetch(
        `http://localhost:3030/branches/${branchId}/coupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
          }),
        }
      );

      if (response.ok) {
        setPopup({ show: true, message: "Dodano kupon !", isError: false });
      } else {
        setPopup({
          show: true,
          message: "Błąd podczas dodawania kuponu: " + (await response.text()),
          isError: true,
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Błąd podczas dodawania kuponu!",
        isError: true,
      });
    }
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
      <Box>
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-button-light-blue font-black text-5xl text-center mb-4">
            Dodaj nowy kupon!
          </h1>
          <p className="text-xl font-bold text-black text-center mb-4">
            Stwórz wyjątkowe oferty promocyjne dla swoich klientów
          </p>
          <div className="bg-black my-3"></div>
          <InputField
            text="Tytul"
            onChange={setTitle}
            width={685}
            height={90}
            required={true}
          />
          <InputField
            text="Opis"
            multiline={true}
            onChange={setDescription}
            width={685}
            height={200}
            required={true}
          />
          <div className="bg-black my-2"></div>
          <div className="flex justify-center mt-4 space-x-4">
            <Link to={`/owner/branches/coupons/${branchId}`}>
              <Button
                className="mt-4"
                state={ButtonState.Active}
                width="180"
                height="55"
                fontSize="28px"
                onClick={function (): void {}}
              >
                Wróć
              </Button>
            </Link>
            <Button
              onClick={handleAddCoupon}
              className="mt-4"
              state={ButtonState.Active}
              width="180"
              height="55"
              fontSize="28px"
            >
              Dodaj
            </Button>
          </div>
        </div>
      </Box>
      {popup.show && (
        <PopUp
          headline={
            popup.isError
              ? "Błąd dodawania kuponu"
              : "Sukces, prawidłowo dodano nowy kupon"
          }
          message={popup.message}
          color={popup.isError ? "text-red-500" : "text-green-500"}
          progressBarColor={popup.isError ? "bg-red-500" : "bg-green-500"}
          onClose={() => setPopup({ show: false, message: "", isError: false })}
        />
      )}
    </>
  );
};

export default NewCouponPage;
