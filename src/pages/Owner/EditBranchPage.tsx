import React from "react";
import EditBranchForm from "../../components/details/EditBranchForm";
import { Link } from "react-router-dom";
import Button, { ButtonState } from "../../components/general/Button";
import Navbar from "../../components/general/Navbar";

const EditBranchPage = () => {
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
      <EditBranchForm />
    </>
  );
};

export default EditBranchPage;
