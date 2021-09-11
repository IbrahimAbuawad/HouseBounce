import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "../../context/AuthContext";
import logo from "../../assets/large_housebounce_0.png";
import { FiPlusCircle } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";

import "./header.css";
function Header({ logged }) {
  const AuthObject = useContext(Auth);
  let history = useHistory();

  function addProperty() {
    if (!logged) history.push("/signin");
    else {
      history.push("/addproperty");
    }
  }

  return (
    <header id="header">
      <div className="leftSection">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" width="140px" />
        </Link>
        <Link className="leftheaderlinks home" to="/">
          Home
        </Link>
        <Link className="leftheaderlinks" to="/">
          Listings
        </Link>
        <Link className="leftheaderlinks" to="/">
          Property
        </Link>
        <Link className="leftheaderlinks" to="/">
          pages
        </Link>
      </div>
      <div className="rightSection">
        {logged ? (
          <button onClick={AuthObject.signOut} id="signoutbtn">
            signOut
          </button>
        ) : (
          <Link className="signinheader" to="/signin">
            <FiLogIn
              style={{
                position: "relative",
                right: "5px",
              }}
            />
            signIn
          </Link>
        )}
        {AuthObject.role === "admin" ? (
          <></>
        ) : (
          <button onClick={addProperty} id="addproperty">
            <FiPlusCircle
              className="plus"
              size="15px"
              style={{
                position: "relative",
                bottom: "1px",
                right: "5px",
                color: "#44ac5a",
                backgroundColor: "white",
                borderRadius: "50px",
              }}
            />
            Add Property
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
