import React from "react";
import { Link } from "react-router-dom";
import Button, { ButtonState } from "../components/general/Button";
import Navbar from "../components/general/Navbar";
import AboutUsPageGraphic from "../resources/5.webp";
import SizeableBox from "../components/general/SizeableBox";

const AboutUsPage: React.FC = () => {
  return (
    <>
      <Navbar>
        <Link to="/home">
          <Button
            onClick={() => console.log("Navigating...")}
            state={ButtonState.Active}
            width="136"
            height="35"
          >
            Główna
          </Button>
        </Link>
        <Link to="/sign">
          <Button
            onClick={() => console.log("Navigating...")}
            state={ButtonState.Active}
            width="136"
            height="35"
          >
            Zaloguj
          </Button>
        </Link>
        <Link to="/register">
          <Button
            onClick={() => console.log("Navigating...")}
            state={ButtonState.Active}
            width="136"
            height="35"
          >
            Zarejestruj
          </Button>
        </Link>
      </Navbar>
      <SizeableBox height="600">
        <div className="grid grid-cols-2 items-center justify-center font-proxima-nova">
          <div className="flex flex-col text-t-dark-blue font-proxima-nova text-bold items-center justify-center mt-10">
            <div className="flex flex-col">
              <h2 className="text-5xl font-black text-center">
                Poznaj nas bliżej!
              </h2>
              <p className="text-lg font-bold text-black my-4 pt-2 text-center m-3">
                Nasza aplikacja łączy studentów z najlepszymi miejscami do
                spędzania czasu, jedzenia i relaksu,<br /> a Ty zyskujesz
                nowych klientów dzięki unikalnym kodom rabatowym i benefitom.
                <br /><br />
                <span className="text-t-dark-blue text-3xl font-black text-center">
                  Główne benefity współpracy:
                </span>
                <br />
                <ul className="list-disc list-inside m-4 text-lg font-bold text-black text-base text-start pt-1">
                  <li>Promuj się wśród tysięcy aktywnych studentów.</li>
                  <li>Przyciągaj klientów dzięki unikalnym kodom rabatowym.</li>
                  <li>
                    Zachęcaj do powrotów atrakcyjną ofertą i zyskaj stałych
                    klientów.
                  </li>
                  <li>Zarządzaj promocjami łatwo i intuicyjnie.</li>
                  <li>Zwiększ ruch i obroty oferując studentom zniżki.</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={AboutUsPageGraphic}
              alt="Graphic of kind person holding discount sign"
              className="h-[408px] w-[408px] rounded-[50px]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/">
            <Button
              onClick={() => console.log("Navigating to form...")}
              state={ButtonState.Active}
              width="150"
              height="40"
              fontSize="16px"
            >
              wróć
            </Button>
          </Link>
        </div>
      </SizeableBox>
    </>
  );
};

export default AboutUsPage;
