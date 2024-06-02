import React from "react";
import Box from "../../components/general/Box";
import Button, { ButtonState } from "../../components/general/Button";
import { Link } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import NewBranchInfoPageGraphic from "../../resources/3.webp";

const NewBranchInformationPage = () => {
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
          <div className="flex flex-col text-t-dark-blue font-proxima-nova text-bold items-center justify-center my-20">
            <div className="flex flex-col">
              <h2 className="text-3xl font-black text-center">
                TWOJA SZANSA NA
                <br />
                ROZKWIT W GONG!
              </h2>
              <p className="text-xl font-bold text-black m-4 text-center">
                Z wypełnionym formularzem zgłoszeniowym, Twoje usługi trafiają
                prosto do zainteresowanych klientów. Umożliwiamy Ci skuteczne
                dotarcie do tych, którzy szukają właśnie tego, co masz do
                zaoferowania. Wzrost zainteresowania to dopiero początek. Zostań
                częścią naszej drużyny!
              </p>
              <span className="flex justify-center my-3.5">
              <Link to="/form">
                <Button
                  onClick={() => console.log("Navigating to form...")}
                  state={ButtonState.Active}
                  width="430"
                  height="75"
                  fontSize="24px"
                >
                    Dodaj nowe <br></br>zgłoszenie
                </Button>
                </Link>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={NewBranchInfoPageGraphic}
              alt="Graphic of kind person holding discount sign"
              className="h-[408px] w-[408px] rounded-[50px]"
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default NewBranchInformationPage;
