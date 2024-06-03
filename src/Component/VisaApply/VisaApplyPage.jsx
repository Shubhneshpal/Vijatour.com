import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import "./visaApply.css";
import Header from "../Home/Header";
import DatePicker from "react-datepicker";
import Accordion from "react-bootstrap/Accordion";
import "react-datepicker/dist/react-datepicker.css";
import { countries } from "../countries";
import CardMedia from "@mui/material/CardMedia";
import { FaHandPointRight, FaRupeeSign } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Regiter from "../StartApplication/Register/Regiter.jsx";
import LoginForm from "../StartApplication/Login/LoginForm.jsx";
import Footer from "../Footer/Footer.jsx";
import VisaCalcultor from "./VisaCalculator.jsx";
import VisaContext from "../../context/visa-context.js";

const VisaApplyPage = () => {
  const ctx = useContext(VisaContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [futureDate, setFutureDate] = useState(null);
  const [country, setCountry] = useState(null);
  const [show, setShow] = useState(false);
  const [logShow, setLogShow] = useState(false);
  const [check, setCheck] = useState(false);
  // const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseLog = () => {
    setLogShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setLogShow(false);
  };

  const handleLogShow = () => {
    setShow(false);
    setLogShow(true);
  };

  useEffect(() => {
    const selectedCountry = countries.find(
      (country) => country.id === parseFloat(id)
    );
    setCountry(selectedCountry);
    if (selectedCountry) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + selectedCountry.days);
      setFutureDate(futureDate);
    }
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const futureDate = new Date(date);
    futureDate.setDate(futureDate.getDate() + country.days);
    setFutureDate(futureDate);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleStartApplication = () => {
    if (ctx.isLoggedIn) {
      navigate("/TravelDetails", {
        state: { country, futureDate, selectedDate },
      });
      return;
    }
    handleShow();
  };

  return (
    <>
      <div className="ViaApply_Header">
        <Header />
      </div>
      {country && (
        <div className="main-wrapper-visaPage">
          <div className="CountryName">{country.name}</div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 ">
                <div className="collumPadding">
                  <div className="card visaCard1">
                    <div className="card-img">
                      <h3 className="img-content">{country.tag}</h3>
                      <CardMedia
                        image={process.env.PUBLIC_URL + country.pic}
                        component="img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="Accordian_Box">
                    <div className=" visaCard_content">
                      <p>
                        <span>Notice:</span> {country.notice}
                      </p>
                      <h4>Documents required</h4>
                    </div>
                    {country.docs.map((document, index) => (
                      <div className="accordian11" key={index}>
                        <Accordion defaultActiveKey={["0"]}>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>{document}</Accordion.Header>
                            <Accordion.Body></Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="collumPadding">
                  <div className="heading55">
                    <h5>Please Select a Date</h5>
                    <hr className="border_bottom" />
                  </div>
                  <div className="datePIcker">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      inline
                      minDate={new Date()}
                    />
                  </div>
                  <hr className="border_top" />
                  <div className="slectDate001">
                    <h4>Your Selected Date</h4>
                    <h6>
                      {selectedDate ? (
                        <span className="placeholder-text">
                          {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(selectedDate)}
                        </span>
                      ) : (
                        <span className="placeholder-text11">
                          {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(new Date())}
                        </span>
                      )}
                    </h6>
                  </div>
                  <hr className="border_bottom" />

                  <div className="slectDate25">
                    <h4>Visa Response Date</h4>
                    <h6>
                      <span className="placeholder-text">
                        {futureDate
                          ? new Intl.DateTimeFormat("en-GB", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }).format(futureDate)
                          : ""}
                      </span>
                    </h6>
                  </div>

                  <hr className="border_top" />
                  <div className="incree-decreeButton ">
                    <h4 className="quantity_text mr-5">Number Of Trevellers</h4>
                    <span className="quantity-picker">
                      <button onClick={handleDecrement}>-</button>
                      <span>{quantity}</span>
                      <button onClick={handleIncrement}>+</button>
                    </span>
                  </div>

                  <hr className="border_top" />
                  <div className="visa_colorBox">
                    <div className="cost122">
                      <h5>Your Visa in just </h5>
                      <h5>
                        <FaRupeeSign /> {country.price * quantity}
                      </h5>
                    </div>
                    <hr className="border_bottom01" />
                    <div>
                      <p>
                        Minimum cost from $1,848.96 plus your chosen plan costs
                        over 36 months. Price may increase annually in July by
                        CPI.
                      </p>
                    </div>
                  </div>
                  <hr className="border_bottom" />
                  <div className="slectDate25">
                    <h4>
                      <MdOutlineVerifiedUser /> Bank Balance Calculator{" "}
                    </h4>
                    <div className="checkTotalAmount">
                      <Form.Check
                        aria-label="option 1"
                        onClick={() => setCheck(!check)}
                      />
                      <label htmlFor="#" className="labeCheck">
                        Ideal Bank Balance At The Time Of Filing Visa
                      </label>
                    </div>
                  </div>
                  <div className="visacalc">{check && <VisaCalcultor />}</div>

                  <div className="text-center">
                    <button
                      className="btn btn-primary btn_primarybtn"
                      onClick={handleStartApplication}
                    >
                      Start Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Regiter
        show={show}
        handleClose={handleClose}
        handleLogShow={handleLogShow}
        selectedDate={selectedDate}
        country={country}
        futureDate={futureDate}
      />
      <LoginForm
        logShow={logShow}
        handleShow={handleShow}
        handleCloseLog={handleCloseLog}
        selectedDate={selectedDate}
        country={country}
        futureDate={futureDate}
      />
      <Footer />
    </>
  );
};

export default VisaApplyPage;
