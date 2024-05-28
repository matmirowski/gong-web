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
        <Button
          onClick={() => console.log("Navigating to home...")}
          state={ButtonState.Active}
          width="136"
          height="35"
          fontSize="12px"
        >
          <Link to="/home">Strona główna</Link>
        </Button>
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
      <SizeableBox height="1800">
        <NewBranchForm/>
      </SizeableBox>
    </>
  );
};

export default NewBranchFormPage;
