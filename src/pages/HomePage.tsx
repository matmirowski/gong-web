import React from "react";
import Box from "../components/general/Box";
import Button, { ButtonState } from "../components/general/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/general/Navbar";
import HomePageGraphic from "../resources/1.webp";

const HomePage = () => {
  return (
    <>
      <Navbar>
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
          <Link to="/">Wyloguj</Link>
        </Button>
      </Navbar>
      <Box>
        <div className="grid grid-cols-2 items-center justify-center h-full">
          <div className="flex flex-col text-t-dark-blue font-proxima-nova text-bold items-center justify-center my-20">
            <span className="my-3.5">
              <Button
                onClick={() => console.log("Navigating...")}
                state={ButtonState.Active}
                width="430"
                height="75"
                fontSize="24px"
              >
                <Link to="/information">
                  Dodaj nowe <br></br>zgłoszenie
                </Link>
              </Button>
            </span>
            <span className="my-3.5">
              <Button
                onClick={() => console.log("Navigating...")}
                state={ButtonState.Active}
                width="430"
                height="75"
                fontSize="24px"
              >
                <Link to="/owner/branches">
                  Zarządzaj <br></br>zgłoszeniami
                </Link>
              </Button>
            </span>
            <span className="my-3.5">
              <Button
                onClick={() => console.log("Navigating...")}
                state={ButtonState.Active}
                width="430"
                height="75"
                fontSize="24px"
              >
                <Link to="/">Weryfikuj kod rabatowy</Link>
              </Button>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={HomePageGraphic}
              alt="Graphic of various people engaging in creative activities such as playing instruments, dancing, and working on laptops."
              className="h-[408px] w-[408px] rounded-[50px]"
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
