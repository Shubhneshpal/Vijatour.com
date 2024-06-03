import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Select from "react-select";
import BackgroundImage from "../images/background-CXhjqumm.jpg";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../countries";
import Regiter from "../StartApplication/Register/Regiter";
import LoginForm from "../StartApplication/Login/LoginForm";
import VisaContext from "../../context/visa-context";

const Header = () => {
  const ctx = useContext(VisaContext);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  // const [defaultLabel, setDefaultLabel] = useState("Please select a country");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [logShow, setLogShow] = useState(false);

  useEffect(() => {
    const countryOptions = countries.map((country) => ({
      label: country.name,
      value: country.id,
    }));
    setCountryList(countryOptions);
  }, []);

  const handleCountrySelect = (selectedOption) => {
    setSelectedCountry(selectedOption);
    navigate(`/visatour/${selectedOption.value}`);
  };

  return (
    <div className="Header">
      <Regiter
        show={show}
        handleLogShow={() => {
          setShow(false);
          setLogShow(true);
        }}
        handleClose={() => {
          setShow(false);
        }}
      />
      <LoginForm
        logShow={logShow}
        handleCloseLog={() => {
          setLogShow(false);
        }}
        handleShow={() => {
          setShow(true);
          setLogShow(false);
        }}
      />
      <div className="nav">
        <h1>
          <Link to={"/"} style={{ color: "white", marginTop: "7px" }}>
            Vijatour
          </Link>
        </h1>
        {!ctx.isLoggedIn && (
          <button
            className="login-btn"
            onClick={() => {
              setShow(true);
              setLogShow(false);
            }}
          >
            login
          </button>
        )}
     <div className="logoutBtn">
     {ctx.isLoggedIn && (
          <button
            className="login-btn"
            onClick={() => {
              ctx.setLogin(false);
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            logout
          </button>
        )}
        {ctx.isLoggedIn && (
          <button
            className="login-btn"
            onClick={() => {
              navigate("/history");
            }}
          >
            history
          </button>
        )}
     </div>
      </div>
      <div className="main-content">
        <h2
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "2.85rem",
            margin: "8px 0px",
          }}
        >
          Get Your Visas Easily with Us
        </h2>
        <div className="buttons">
          <div className="dropdown-btn">
            <Select
              options={countryList}
              value={selectedCountry}
              onChange={handleCountrySelect}
              placeholder={"Please select a country"}
            />
          </div>
        </div>
      </div>
      <div className="image-section">
        <h2
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "1.5rem",
            margin: "30px 0px 8px 0px",
          }}
        >
          Get your tourist visa processed faster and easier by exploring our
          online store
        </h2>
        <div className="header_Img">
          <img src={BackgroundImage} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Header;
