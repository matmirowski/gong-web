import React from "react";
import Button, { ButtonState } from "../../components/general/Button";
import { Link } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import SizeableBox from "../../components/general/SizeableBox";
import NewBranchForm from "../../components/form/NewBranchForm";

const NewBranchFormPage = () => {
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
      <SizeableBox height="1800">
        <NewBranchForm/>
      </SizeableBox>
    </>
  );
};

export default NewBranchFormPage;
