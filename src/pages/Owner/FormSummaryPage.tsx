import React from "react";
import { Link } from "react-router-dom";
import Box from "../../components/general/Box";
import Button, { ButtonState } from "../../components/general/Button";
import Navbar from "../../components/general/Navbar";
import SummaryGrapgic from "../../resources/4.webp";

const FormSummaryPage = () => {
  return (
    <>
      <Navbar>
      <Link to="/home">
        <Button
          onClick={() => console.log("Navigating to home...")}
          state={ButtonState.Active}
          width="136"
          height="35"
        >
          Główna
        </Button>
        </Link>
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
        <div className="grid grid-cols-2 items-center justify-center h-full">
          <div className="flex flex-col text-t-dark-blue font-proxima-nova items-center justify-center">
            <h2 className="pb-20 text-3xl font-black text-center leading-tight">
              TWOJE ZGŁOSZENIE OCZEKUJE NA AKCEPTACJE.<br></br> GRATULACJE!
            </h2>
            <Link to="/home">
              <Button
              onClick={() => console.log("Navigating...")}
              state={ButtonState.Active}
              width="430"
              height="75"
              fontSize="24px"
            >
              Strona główna
            </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={SummaryGrapgic}
              alt="Graphic of person giving thumbs up"
              className="h-[408px] w-[408px] rounded-[50px]"
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default FormSummaryPage;
