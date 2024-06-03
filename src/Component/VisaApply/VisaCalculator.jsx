import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { countries } from "../countries";
import { Typography } from "@mui/material";
import './visaApply.css'

const VisaCalcultor = () => {  
    const [country, setCountry] = useState("");
    const [flight, setFlight] = useState(false);
    const [hotel, setHotel] = useState(false);
    const [days, setDays] = useState(0);
    const [rupees, setRupees] = useState(0);
    const [error, setError] = useState(" ");

    const handleIncrement = () => {
      setDays(days + 1);
      setError(""); // Clear the error if user increments days
    };

    
    const handleDecrement = () => {
      if (days > 0) {
        setDays(days - 1);
      }
    };

    const submitHandler = () => { 
      if (!country) {
        setError("Please select a country");
        return;
      }

      if (days < 1) {
        setError("Please select a minimum number of days");
        setRupees(0); // Reset rupees if there's an error
        return;
      }

      const selectedCountry = countries.find((count) => count.name === country);
      console.log(selectedCountry);
      let updatedRupees = selectedCountry.general;
      if (hotel) {
        updatedRupees += selectedCountry.hotel;
      }
      if (days > 0) {       
        updatedRupees *= days;
      }
      if (flight) {
        updatedRupees += selectedCountry.flight;
      }
      updatedRupees += parseInt(selectedCountry.price);
      setRupees(updatedRupees);
    };

    return (
      <>
        <div className="container calculator_container">
          <Container style={{ padding: "20px", boxSizing: "border-box" }}>
            <div className="shoseCountry">
              <div xs={5} md={5} style={{ fontSize: "16px", fontWeight: "400" }}>
                Choose Country
              </div>
              <div>
                <Form.Select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setError(""); 
                  }}
                >
                  <option value={""}>Choose Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="shoseCountry">
              <div xs={7} md={7} style={{ fontSize: "16px", fontWeight: "400" }}>
                Flight Booking Already Done ?
              </div>
              <div xs={5} md={5}>
                <input
                  type="radio"
                  name="flight"
                  id=""
                  className="flight_radio"
                  onChange={(e) => {
                    setFlight(false);
                  }}
                />
                <span className="flight_radio_text">Yes</span>
                <input
                  type="radio"
                  name="flight"
                  id=""
                  className="flight_radio"
                  onChange={() => {
                    setFlight(true);
                  }}
                />
                <span className="flight_radio_text">No</span>
              </div>
            </div>
            <div className="shoseCountry">
              <div xs={7} md={7} style={{ fontSize: "16px", fontWeight: "400" }}>
                Hotel Booking Already Done ?
              </div>
              <div xs={5} md={5}>
                <input
                  type="radio"
                  name="hotel"
                  id=""
                  className="flight_radio"
                  onChange={() => {
                    setHotel(false);
                  }}
                />
                <span className="flight_radio_text">Yes</span>
                <input
                  type="radio"
                  name="hotel"
                  id=""
                  className="flight_radio"
                  onChange={() => {
                    setHotel(true);
                  }}
                />
                <span className="flight_radio_text">No</span>
              </div>
            </div>
            <div className="shoseCountry">
              <div xs={7} md={7} style={{ fontSize: "16px", fontWeight: "400" }}>
                Number of Traveling Days
              </div>
              <div xs={5} md={5}>
                <div className="incree-decreeButton">
                  <span className="quantity-picker">
                    <button onClick={handleDecrement}>-</button>
                    <span>{days}</span>
                    <button onClick={handleIncrement}>+</button>
                  </span>
                </div>
              </div>
            </div>
            <Typography component={"p"} align="center">
              <Button className="calculate_submit_btn" onClick={submitHandler}>
                Submit
              </Button>
            </Typography>
            {error ? (
              <Typography component={"p"} style={{ color: "red", fontSize: "16px", marginTop: "20px", textAlign:'center' }}>
                {error}
              </Typography>
            ) : (
              rupees !== 0 && (
                <Typography
                className="ppppp"
                  component={"p"}
                  style={{ marginTop: "20px", fontSize: "20px" }}
                >
                  Your Bank Should Have Minimum Balance of <span>₹{rupees}</span> Per Person
                  At The
                  
                  Time Of Visa Application
                </Typography>
              )
            )}
          </Container>
        </div>
      </>
    );
};

export default VisaCalcultor;
 






 
 
 // import React, { useState } from "react";
// import { Container, Row, Col, Form } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { countries } from "../countries";
// import { Typography } from "@mui/material";
// import './visaApply.css'

// const VisaCalcultor = () => {  
//     const [country, setCountry] = useState("");
//     const [flight, setFlight] = useState(false);
//     const [hotel, setHotel] = useState(false);
//     const [days, setDays] = useState(0);
//     const [rupees, setRupees] = useState(0);

//     const handleIncrement = () => {
//       setDays(days + 1);
//     };
//     const handleDecrement = () => {
//       if (days > 0) {
//         setDays(days - 1);
//       }
//     };
//     const submitHandler = () => { 
      

//       const selectedCountry = countries.find((count) => count.name === country);
//       console.log(selectedCountry);
//       let updatedRupess = selectedCountry.general;
//       if (hotel) {
//         updatedRupess += selectedCountry.hotel;
//       }
//       if (days >= 0) {       
//         updatedRupess *= days;
//       }
//       if (flight) {
//         updatedRupess += selectedCountry.flight;
//       }
//       updatedRupess += parseInt(selectedCountry.price);
//       setRupees(updatedRupess);
//     };

   
  
  
  
//   return (
//     <>
//       <div className="container calculator_container">
//         <Container style={{ padding: "20px", boxSizing: "border-box" }}>
//           <div className="shoseCountry">
//             <div xs={5} md={5} style={{ fontSize: "16px", fontWeight: "400" }}>
//               Choose Country
//             </div>
//             <div>
//               <Form.Select
//                 value={country}
//                 onChange={(e) => {
//                   setCountry(e.target.value);
//                 }}
//               >
//                 <option value={""}>Choose Country</option>
//                 {countries.map((country) => (
//                   <option key={country.id} value={country.name}>
//                     {country.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </div>
//           </div>
//           <div className="shoseCountry">
//             <div xs={7} md={7} style={{ fontSize: "16px", fontWeight: "400" }}>
//               Flight Booking Already Done ?
//             </div>
//             <div xs={5} md={5}>
//               <input
//                 type="radio"
//                 name="flight"
//                 id=""
//                 className="flight_radio"
//                 onChange={(e) => {
//                   setFlight(false);
//                 }}
//               />
//               <span className="flight_radio_text">Yes</span>
//               <input
//                 type="radio"
//                 name="flight"
//                 id=""
//                 className="flight_radio"
//                 onChange={() => {
//                   setFlight(true);
//                 }}
//               />
//               <span className="flight_radio_text">No</span>
//             </div>
//           </div>
//           <div className="shoseCountry">
//             <div xs={7} md={7} style={{ fontSize: "16px", fontWeight: "400" }}>
//               Hotel Booking Already Done ?
//             </div>
//             <div xs={5} md={5}>
//               <input
//                 type="radio"
//                 name="hotel"
//                 id=""
//                 className="flight_radio"
//                 onChange={() => {
//                   setHotel(false);
//                 }}
//               />
//               <span className="flight_radio_text">Yes</span>
//               <input
//                 type="radio"
//                 name="hotel"
//                 id=""
//                 className="flight_radio"
//                 onChange={() => {
//                   setHotel(true);
//                 }}
//               />
//               <span className="flight_radio_text">No</span>
//             </div>
//           </div>
//           <div className="shoseCountry">
//             <div xs={7} md={7} style={{ fontSize: "16px", fontWeight: "400" }}>
//             Number of Traveling Day
//             </div>
//             <div xs={5} md={5}>
//               {/* <input
//                 type="number"
//                 value={days}
//                 onChange={(e) => {
//                   setDays(e.target.value);
//                 }}
//               /> */}
//               <div className="incree-decreeButton ">
//                       <span className="quantity-picker">
//                         <button onClick={handleDecrement}>-</button>
//                         <span>{days}</span>
//                         <button onClick={handleIncrement}>+</button>
//                       </span>
//                     </div>
//             </div>
//           </div>
//           <Typography component={"p"} align="center">
//             <Button className="calculate_submit_btn" onClick={submitHandler}>
//               Submit
//             </Button>
//           </Typography>
//           {rupees !== 0 && (
//             <Typography
//               component={"p"}
//               style={{ marginTop: "20px", fontSize: "20px" }}
//             >
//               Your Bank should have minimum balance of ₹{rupees} rupees at the
//               time of Visa Application
//             </Typography>
//           )}
//         </Container>
//       </div>
//     </>
//   );
// };

// export default VisaCalcultor;
