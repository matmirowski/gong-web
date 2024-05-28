import React, { useEffect, useState } from "react";
import Navbar from "../../components/general/Navbar";
import Button, { ButtonState } from "../../components/general/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Icon from "../../components/general/Icon";
import SizeableBox from "../../components/general/SizeableBox";
import PopUp from "../../components/general/PopUp";
import { convertMetersToKm } from "../../utils/distanceUtils";

export type BranchStatus = "active" | "rejected" | "pending";

interface Branch {
  id: number;
  name: string;
  slogan: string;
  phoneNumber: string;
  description: string;
  image: string;
  priceLow: number;
  priceHigh: number;
  openingTime: string;
  closingTime: string;
  status: BranchStatus;
  address: {
    street: string;
    city: string;
    buildingNumber: number;
    distanceFromUniversity: number;
  };
}

const AdminBranchPage: React.FC = () => {
  const { userId, token } = useAuth();
  const { branchId } = useParams<{ branchId: string }>();
  const [branch, setBranch] = useState<Branch | null>(null);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpMessage, setPopUpMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranch = async () => {
      if (userId !== null && token !== null) {
        try {
          const response = await fetch(
            `http://localhost:3030/branches/${branchId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching branch with ID ${branchId}`);
          }
          const data: Branch = await response.json();
          setBranch(data);
        } catch (error) {
          console.error(`Error fetching branch with ID ${branchId}:`, error);
        }
      }
    };

    fetchBranch();
  }, [userId, token, branchId]);

  const approveBranch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/admin/branches/${branchId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setPopUpMessage(
          "Zaakceptowano zgłoszenie!\nPowitajmy nowego gracza na pokładzie!"
        );
        setShowPopUp(true);
        return;
      }
    } catch (error) {
      setPopUpMessage("Wystąpił nieoczekiwany błąd");
      setShowPopUp(true);
    }
  };

  const rejectBranch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/admin/branches/${branchId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setPopUpMessage("Prawidłowo usunięto zgłoszenie!");
        setShowPopUp(true);
      }
    } catch (error) {
      setPopUpMessage("Wystąpił nieoczekiwany błąd");
      setShowPopUp(true);
    }
  };

  const closePopUp = () => {
    setShowPopUp(false);
    navigate("/admin/branches");
  };

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
          <Link to="/admin/branches">Panel admina</Link>
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
      <SizeableBox>
        <div className="flex flex-col items-center justify-between h-full p-6">
          {branch ? (
            <>
              <div className="flex flex-row items-center justify-between w-full mb-4">
                <div className="flex flex-col items-start text-left space-y-2 max-w-md">
                  <h2 className="text-5xl font-black text-blue-800">
                    {branch.name}
                  </h2>
                  <h3 className="text-3xl font-extrabold text-blue-700">
                    {branch.slogan}
                  </h3>
                </div>
                <div className="flex items-center justify-center ml-4">
                  <img
                    src={
                      branch.image ||
                      "https://cdn.pixabay.com/photo/2017/07/13/19/51/sunset-2501727_960_720.png"
                    }
                    alt="Branch"
                    className="h-[150px] w-[150px] object-cover rounded-[20px]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full mb-4">
                <p className="text-xl font-bold text-gray-700">
                  {branch.description}
                </p>
              </div>
              <div className="flex flex-row items-start justify-center w-full mb-4 space-x-8">
                <div className="space-y-2 text-blue-600">
                  <div className="flex items-center space-x-2">
                    <Icon name="icon-localization" size={24} />
                    <span className="font-extrabold">
                      {branch.address.street} {branch.address.buildingNumber},{" "}
                      {branch.address.city}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="icon-money" size={24} />
                    <span className="font-extrabold">
                      {branch.priceLow} - {branch.priceHigh} zł
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="icon-city" size={24} />
                    <span className="font-extrabold">
                      Odległość od Politechniki Łódzkiej:{" "}
                      {convertMetersToKm(branch.address.distanceFromUniversity)} km
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-blue-600">
                  <div className="flex items-center space-x-2">
                    <Icon name="icon-clock" size={24} />
                    <span className="font-extrabold">
                      {branch.openingTime.substring(0, 5)} -{" "}
                      {branch.closingTime.substring(0, 5)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="icon-phone" size={24} />
                    <span className="font-extrabold">{branch.phoneNumber}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-6 w-full">
                <Button
                  state={ButtonState.Active}
                  width="200"
                  height="50"
                  onClick={() => {}}
                >
                  <Link to="/discount-codes">PRZEGLĄDAJ KODY RABATOWE</Link>
                </Button>
                {branch.status === "pending" && (
                  <>
                    <Button
                      state={ButtonState.Active}
                      width="200"
                      height="50"
                      onClick={approveBranch}
                    >
                      ZAAKCEPTUJ
                    </Button>
                    <Button
                      state={ButtonState.Active}
                      width="200"
                      height="50"
                      onClick={rejectBranch}
                    >
                      USUŃ
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-700">Loading...</p>
          )}
        </div>
        {showPopUp && (
          <PopUp
            headline={popUpMessage}
            message=""
            onClose={closePopUp}
            color="text-green-500"
            progressBarColor="bg-green-500"
          />
        )}
      </SizeableBox>
    </>
  );
};

export default AdminBranchPage;
