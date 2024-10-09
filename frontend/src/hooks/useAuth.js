import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoggedInContext } from "@/context/LoggedInContext";

const useAuth = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    const forceLogin = true;

    if (!isLoggedIn) {
      toast.error(
        "Err: invalid auth_token, User is not logged in, redirecting...."
      );
      if (forceLogin) {
        navigate("/login");
      }
      return;
    }

    const authToken = localStorage.getItem("auth_token");

    axios
      .get(import.meta.env.VITE_API_URL + "/users/me", {
        headers: { authorization_token: "Bearer " + authToken },
      })
      .then((response) => {
        setUserData(response?.data?.user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        if (forceLogin) {
          toast.error(
            `${error.response.status} ${error.response.data.message} redirecting to login page..`
          );
          navigate("/login");
        }
      });
  }, [isLoggedIn, navigate, setIsLoggedIn]);

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    toast.warning("Logged out");
    navigate("/");
  };

  return { userData, handleLogOut };
};

export default useAuth;