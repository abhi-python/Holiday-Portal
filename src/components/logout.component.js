import { UserContext } from "../App";
import { useState, useContext } from "react";
import "./App.css";

function Logout() {
  const { state, dispatch } = useContext(UserContext);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const logout = () => {
    dispatch({ type: "USER", payload: false });
    localStorage.removeItem("token-info");
    setIsLoggedin(false);

  }

  return (
    <>
      <button onClickCapture={logout}></button>
    </>
  );
}

export default Logout;
