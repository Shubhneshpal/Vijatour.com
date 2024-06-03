import React, { useContext, useState } from "react";
import "./TravelerDetails.css";
import { Stepper, Step } from "react-form-stepper";
import { IoMdAddCircle } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { RiInformation2Line } from "react-icons/ri";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import VisaContext from "../../../context/visa-context";
import { validTrevellers } from "../../../util/validation.js";
import Header from "../../Home/Header.jsx";

const TravelerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(VisaContext);
  const { state } = location;
  const { country, futureDate, selectedDate } = state || {};
  const [errors, setErrors] = useState([]);
  const [travelers, setTravelers] = useState([
    {
      name: "",
      lname: "",
      email: "",
      contactNo: "",
      dob: null,
      passportNo: "",
      id: Math.random(),
    },
  ]);

  // console.log(travelers)

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newTravelers = [...travelers];
    newTravelers[index][name] = value;
    setTravelers(newTravelers);
  };

  const DobHandlechange = (date, index) => {
    const newTravelers = [...travelers];
    newTravelers[index].dob = date;
    setTravelers(newTravelers);
  };
  // const ExpectedDHandlechange = (date, index) => {
  //   const newTravelers = [...travelers];
  //   newTravelers[index].expectedDate = date;
  //   setTravelers(newTravelers);
  // };
  const [count, setCount] = useState(1);

  const addPerson = () => {
    setTravelers([
      ...travelers,
      {
        name: "",
        lname: "",
        email: "",
        contactNo: "",
        dob: null,
        expectedDate: null,
        passportNo: "",
        id: Math.random(),
      },
    ]);
    setCount(count + 1);
  };

  const removePerson = (index) => {
    if (travelers.length > 1) {
      const newTravelers = [...travelers];
      newTravelers.splice(index, 1);
      setTravelers(newTravelers);
    }
  };

  const handleSubmitTraveler = async (e) => {
    e.preventDefault();

    // Validate the form data
    const newErrors = validTrevellers(travelers);
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = newErrors.some(
      (personErrors) => Object.keys(personErrors).length > 0
    );

    if (!hasErrors) {
      const id = Math.random();
      const formData = travelers.map((person) => ({
        name: person.name,
        lname: person.lname,
        email: person.email,
        contactNo: person.contactNo,
        dob: person.dob ? person.dob.toISOString().split("T")[0] : null,
        expectedDate: person.expectedDate
          ? person.expectedDate.toISOString().split("T")[0]
          : null,
        passportNo: person.passportNo,
        photo: [],
        passport: [],
        otherDocuments: [],
        id: person.id,
      }));

      console.log(formData);

      try {
        const response = await fetch("https://backend-visa2.vercel.app/api/traveler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Traveler data sent successfully:", data);
          ctx.setTravellerData(data);
          localStorage.setItem("traveller", JSON.stringify(data));
          navigate("/document/", {
            state: { travelers, country, futureDate, selectedDate },
          });
        } else {
          const errorData = await response.json();
          console.error("Failed to send Traveler data:", errorData);
        }
      } catch (error) {
        console.error("Error during send traveler data:", error);
      }

      setTravelers([
        {
          name: "",
          lname: "",
          email: "",
          contactNo: "",
          dob: null,
          expectedDate: null,
          passportNo: "",
        },
      ]);
    }
  };

  // HtmlTooltip style  💯
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      padding: "19px",
    },
  }));

  return (
    <>
     <div className="ViaApply_Header trevellerHead">
        <Header />
      </div>
      <div className="container main_pageLogin">
        <Stepper activeStep={1}>
          <Step label=" Step 1" />
          <Step label=" Step 2" />
          <Step label=" Step 3" />
        </Stepper>
        <div className=" loginForm">
          <div className="row loginform_style">
            <div className="col-md-6 mb-4 custom-col">
              <div className="card ripe-malinka-gradient form-white">
                <div className="card-body">
                  <form>
                    {travelers.map((traveler, index) => (
                      <div key={index}>
                        <h2 className="text-center font-up font-bold  travelHead">
                          Traveller Details <span>{index + 1}</span>
                        </h2>
                        <div className="row ">
                          <div className="md-form mdForm_margin col-lg-6">
                            <input
                              type="text"
                              id={`orangeForm-name-${index}`}
                              className="form-control"
                              placeholder=" First Name"
                              value={traveler.name}
                              name="name"
                              onChange={(e) => handleChange(e, index)}
                            />
                            {errors[index] && errors[index].name && (
                              <p className="style01" style={{fontSize:"14px"}}>{errors[index].name}</p>
                            )}
                          </div>
                          <div className="md-form mdForm_margin col-lg-6">
                            <input
                              
                              type="text"
                              id={`orangeForm-name-${index}`}
                              className="form-control"
                              placeholder=" Last Name"
                              value={traveler.lname}
                              name="lname"
                              onChange={(e) => handleChange(e, index)}
                            />
                            {errors[index] && errors[index].lname && <p className="style01" style={{fontSize:"14px"}}>{errors[index].lname}</p>}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="md-form mdForm_margin col-lg-6">
                            <input
                              
                              type="text"
                              id={`orangeForm-name-${index}`}
                              className="form-control"
                              placeholder=" Email"
                              value={traveler.email}
                              name="email"
                              onChange={(e) => handleChange(e, index)}
                            />
                             {errors[index] && errors[index].email && <p className="style01" style={{fontSize:"14px"}}>{errors[index].email}</p>}
                          </div>
                          <div className="md-form mdForm_margin col-lg-6">
                            <input
                            
                              type="text"
                              id={`orangeForm-name-${index}`}
                              className="form-control"
                              placeholder=" Contact No."
                              value={traveler.contactNo}
                              name="contactNo"
                              onChange={(e) => handleChange(e, index)}
                            />
                            {errors[index] && errors[index].contactNo && <p className="style01" style={{fontSize:"14px"}}>{errors[index].contactNo}</p>}
                          </div>
                        </div>
                        <div className="row datePick0">
                          <div className="md-form mdForm_margin  col-lg-6">
                            <DatePicker
                              className="datetm4"
                              selected={traveler.dob}
                              onChange={(date) => DobHandlechange(date, index)}
                              placeholderText=" DOB"
                              
                            />
                            {errors[index] && errors[index].dob && <p className="style01" style={{fontSize:"14px"}}>{errors[index].dob}</p>}
                          </div>
                          {/* <div className="md-form mdForm_margin col-lg-6">
                            <DatePicker
                            minDate={new Date()}
                              className="datetm4"
                              selected={traveler.expectedDate}
                              onChange={(date) =>
                                ExpectedDHandlechange(date, index)
                              }
                              placeholderText="ExpectedDate"
                              
                            />
                             {errors[index] && errors[index].expectedDate && <p className="style01" style={{fontSize:"14px"}}>{errors[index].expectedDate}</p>}
                          </div> */}
                        </div>
                        <div className="md-form">
                          <input
                            required
                            type="text"
                            id={`orangeForm-name-${index}`}
                            className="form-control"
                            placeholder=" Passport No."
                            value={traveler.passportNo}
                            name="passportNo"
                            onChange={(e) => handleChange(e, index)}
                          />
                           {errors[index] && errors[index].passportNo && <p className="style01" style={{fontSize:"14px"}}>{errors[index].passportNo}</p>}
                        </div>
                        {index === travelers.length - 1 && (
                          <div className=" addPerson01 ">
                            <button
                              type="button"
                              className="btn btn-outline-white waves-effect waves-light"
                              onClick={addPerson}
                            >
                              Add Person <IoMdAddCircle />
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-white waves-effect waves-light"
                              onClick={() => removePerson(index)}
                            >
                              Remove
                            </button>
                            <button
                              className="btn btn-outline-white waves-effect waves-light"
                              onClick={handleSubmitTraveler}
                            >
                              next
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card Amount_cardss">
                <div className="Suggest_animate">
                  <p className="scrolling-text">
                   Note:- Please make sure your travel dates are after visa response or visa appointment dates.
                  </p>
                </div>
                <div className="card-content">
                  <h4>
                    Applicate Date:-{" "}
                    {selectedDate ? (
                      <span className="DestinatioCont">
                        {" "}
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(selectedDate)}{" "}
                      </span>
                    ) : (
                      <span className="DestinatioCont">
                        {" "}
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(new Date())}{" "}
                      </span>
                    )}{" "}
                  </h4>
                  <h4>
                    Destination:-{" "}
                    {country?.name ? (
                      <span className="DestinatioCont">{country.name}</span>
                    ) : (
                      ""
                    )}
                  </h4>
                  <div className="price-I">
                    <h4>
                      Price:-{" "}
                      {country?.price ? (
                        <span className="DestinatioCont">
                          {country.price} \ Per Person
                        </span>
                      ) : (
                        ""
                      )}
                      <span>
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography
                                color="inherit"
                                className="Breckage"
                                style={{ fontWeight: "600" }}
                              >
                                Price Breakage:-
                              </Typography>
                              <h5 className="BrackageCharge" style={{ fontWeight: "400", fontSize:'14px' }}> {country?.PriceBreakage?.para
                                  ? country.PriceBreakage.para
                                  : ""}</h5>
                              <h5
                                className="BrackageCharge"
                                style={{ fontWeight: "500" }}
                              >
                                Authority Fees:-{" "}
                                {country?.PriceBreakage?.AFees
                                  ? country.PriceBreakage.AFees
                                  : ""}
                              </h5>
                              <h5
                                className="BrackageCharge"
                                style={{ fontWeight: "500" }}
                              >
                                Service Fees:-{" "}
                                {country?.PriceBreakage?.SCharge
                                  ? country.PriceBreakage.SCharge
                                  : ""}
                              </h5>
                              <h5 className="h5heading">All the Service charges would be refundable in case of not delivering the visa on time.</h5>
                            </React.Fragment>
                          }
                        >
                          <Button>
                            <RiInformation2Line />
                          </Button>
                        </HtmlTooltip>
                      </span>
                    </h4>
                  </div>
                  <h4>
                    Visa Response Date:-{" "}
                    {futureDate ? (
                      <span className="DestinatioCont">
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(futureDate)}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelerDetails;
