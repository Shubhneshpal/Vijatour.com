import React, { useContext, useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import "./mainDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { RiInformation2Line } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Stepper, Step } from "react-form-stepper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import VisaContext from "../../../context/visa-context";
import Header from "../../Home/Header";



const MainDetails = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { state } = loc;
  const {
    travelers = [],
    country = {},
    futureDate,
    selectedDate,
  } = state || {};

  const [dummyPrice] = useState(100);
  const [countryPrice, setCountryPrice] = useState(0);
  const [addOnPrices, setAddOnPrices] = useState({
    flight: 0,
    hotel: 0,
    itinerary: 0,
    coverLetter: 0,
  });
  const [addedAddOns, setAddedAddOns] = useState({
    flight: false,
    hotel: false,
    itinerary: false,
    coverLetter: false,
  });

  // State to store data to be posted
  const [postData, setPostData] = useState([]);

  // Context api
  const context = useContext(VisaContext);

  useEffect(() => {
    const traveller = localStorage.getItem("traveller");
    const t = JSON.parse(traveller);
    if (t) {
      context.setTravellerData(t);
    }
  }, []);

  useEffect(() => {
    if (country.price) {
      const initialPrice = Number(country.price) * travelers.length;
      setCountryPrice(initialPrice);
    }
  }, [country.price, travelers.length]);

  useEffect(() => {
    const data = travelers.map((traveler, index) => ({
      name: traveler.name,
      lname: traveler.lname,
      selectedDate: selectedDate
        ? new Date(selectedDate).toISOString()
        : new Date().toISOString(),
      futureDate: futureDate ? new Date(futureDate).toISOString() : "",
      countryName: country.name,
      countryPrice: countryPrice,
    }));
    setPostData(data);
  }, [travelers, selectedDate, futureDate, country.name, countryPrice]);

  const handleAddButtonClick = (addOnType, amount, event) => {
    event.preventDefault();
    const priceToAdd = travelers.length * amount;
    setCountryPrice((prevPrice) => prevPrice + priceToAdd);
    setAddOnPrices((prevState) => ({
      ...prevState,
      [addOnType]: prevState[addOnType] + priceToAdd,
    }));
    setAddedAddOns((prevState) => ({ ...prevState, [addOnType]: true }));
  };

  const handleRemoveButtonClick = (addOnType, amount, event) => {
    event.preventDefault();
    const priceToSubtract = travelers.length * amount;
    setCountryPrice((prevPrice) => prevPrice - priceToSubtract);
    setAddOnPrices((prevState) => ({
      ...prevState,
      [addOnType]: prevState[addOnType] - priceToSubtract,
    }));
    setAddedAddOns((prevState) => ({ ...prevState, [addOnType]: false }));
  };


// *************+++++++************
  // const handlePayment = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/api/userHistoryData",
  //       postData
  //     );
  //     alert("User Data save successfully");
  //     navigate("/history");
  //     // window.location.href('/history')
  //     console.log("Data saved successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };

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




  const amount = 500;
const currency = "INR";
const receiptId = "qwsaq1";

const paymentHandler = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:4000/order", {
      method: "POST",
      body: JSON.stringify({
        amount: amount * 100, // amount in the smallest currency unit
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server error: ${errorData.error}`);
    }
    const order = await response.json();
    console.log(order);
    var options = {
      key: "rzp_test_kFx5oPtvIppXhS", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits
      currency: order.currency,
      name: "Acme Corp", // your business name
      description: "Test Transaction",
      image: "../../images/australia_11zon.jpg", // your business logo
      order_id: order.id, // Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        const validateRes = await fetch("http://localhost:4000/order/validate", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        name: "Sp Singh", // your customer's name
        email: "themigrationschool@gmail.com",
        contact: "9000000000", // Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log('Error Code:', response.error?.code);
      console.log('Description:', response.error?.description);
      console.log('Source:', response.error?.source);
      console.log('Step:', response.error?.step);
      console.log('Order ID:', response.error?.metadata?.order_id);
      console.log('Payment ID:', response.error?.metadata?.payment_id);
      alert('Oops, something went wrong with the payment.');
    });

    rzp1.open();
  } catch (error) {
    console.error('Error during payment handling:', error);
    alert(`Error during payment handling: ${error.message}`);
  }
}; 



  // PaymentGateWay
  // const checkoutHandler = async () => {
  //   try {
  //     const responseKey = await axios.get("http://localhost:4000/api/getkey");
  
  //     const respnseData  = await axios.post("http://localhost:4000/api/checkout", {
  //       amount: countryPrice
  //     });
  //     console.log("respnseData.data.amount",respnseData.data.amount)
  //     console.log("responseKey.data.key",responseKey.data.key)
  //     console.log("respnseData.data.id",respnseData.data.id)
  
  //     const options = {
  //       key:responseKey.data.key,
  //       amount: respnseData.data.amount, // Use the correct amount field
  //       currency: "INR",
  //       name: "6 Pack Programmer",
  //       description: "Tutorial of RazorPay",
  //       image: "https://avatars.githubusercontent.com/u/25058652?v=4",
  //       order_id:  respnseData.data.id, // Use the correct order ID field
  //       callback_url: "http://localhost:4000/api/paymentverification",
  //       prefill: {
  //         name: "Gaurav Kumar",
  //         email: "gaurav.kumar@example.com",
  //         contact: "9999999999"
  //       },
  //       notes: {
  //         "address": "Razorpay Corporate Office"
  //       },
  //       theme: {
  //         "color": "#121212"
  //       }
  //     };
  //     const razor = new window.Razorpay(options);
  //     razor.open();
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //   }
  // };

  return (
    <>
       <div className="ViaApply_Header trevellerHead">
        <Header />
      </div>
      <div className="">
        <Stepper activeStep={3}>
          <Step label=" Step 1" />
          <Step label=" Step 2" />
          <Step label=" Step 3" />
        </Stepper>
      </div>
      <div>
        <div className="addOnsFullPage">
          <div className="FormMain">
            <form className="mainformAdd">
              <h2>Add Ons</h2>
              <p>
                No. Of Travelers{" "}
                <span style={{ color: "black", fontWeight: "600" }}>
                  {travelers.length}{" "}
                </span>
              </p>
              <div className="DummyFlightTicket">
                <h5>
                  Dummy Flight Ticket Price{" "}
                  <strong>
                    <BsCurrencyRupee /> {dummyPrice * travelers.length}
                  </strong>{" "}
                </h5>
                <button
                  onClick={(event) =>
                    handleAddButtonClick("flight", dummyPrice, event)
                  }
                  disabled={addedAddOns.flight}
                  style={addedAddOns.flight ? { display: "none" } : {}}
                >
                  Add
                </button>
                <button
                  onClick={(event) =>
                    handleRemoveButtonClick("flight", dummyPrice, event)
                  }
                  disabled={!addedAddOns.flight}
                  style={
                    !addedAddOns.flight
                      ? { display: "none" }
                      : { backgroundColor: "blue", color: "white" }
                  }
                >
                  Remove
                </button>
              </div>
              <div className="DummyFlightTicket">
                <h5>
                  Dummy Hotel Booking Price{" "}
                  <strong>
                    <BsCurrencyRupee /> {dummyPrice * travelers.length}
                  </strong>{" "}
                </h5>
                <button
                  onClick={(event) =>
                    handleAddButtonClick("hotel", dummyPrice, event)
                  }
                  disabled={addedAddOns.hotel}
                  style={addedAddOns.hotel ? { display: "none" } : {}}
                >
                  Add
                </button>
                <button
                  onClick={(event) =>
                    handleRemoveButtonClick("hotel", dummyPrice, event)
                  }
                  disabled={!addedAddOns.hotel}
                  style={
                    !addedAddOns.hotel
                      ? { display: "none" }
                      : { backgroundColor: "blue", color: "white" }
                  }
                >
                  Remove
                </button>
              </div>
              <div className="DummyFlightTicket">
                <h5>
                  Itinerary{" "}
                  <strong>
                    <BsCurrencyRupee /> {dummyPrice * travelers.length}
                  </strong>{" "}
                </h5>
                <button
                  onClick={(event) =>
                    handleAddButtonClick("itinerary", dummyPrice, event)
                  }
                  disabled={addedAddOns.itinerary}
                  style={addedAddOns.itinerary ? { display: "none" } : {}}
                >
                  Add
                </button>
                <button
                  onClick={(event) =>
                    handleRemoveButtonClick("itinerary", dummyPrice, event)
                  }
                  disabled={!addedAddOns.itinerary}
                  style={
                    !addedAddOns.itinerary
                      ? { display: "none" }
                      : { backgroundColor: "blue", color: "white" }
                  }
                >
                  Remove
                </button>
              </div>
              <div className="DummyFlightTicket">
                <h5>
                  Cover Letter{" "}
                  <strong>
                    <BsCurrencyRupee /> {dummyPrice * travelers.length}
                  </strong>{" "}
                </h5>
                <button
                  onClick={(event) =>
                    handleAddButtonClick("coverLetter", dummyPrice, event)
                  }
                  disabled={addedAddOns.coverLetter}
                  style={addedAddOns.coverLetter ? { display: "none" } : {}}
                >
                  Add
                </button>
                <button
                  onClick={(event) =>
                    handleRemoveButtonClick("coverLetter", dummyPrice, event)
                  }
                  disabled={!addedAddOns.coverLetter}
                  style={
                    !addedAddOns.coverLetter
                      ? { display: "none" }
                      : { backgroundColor: "blue", color: "white" }
                  }
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
          <div className="ReviewPayment">
            <form className="mainformAdd">
              <h2>Review Payment</h2>
              <div>
                {context.travellerData.map((Tdata, inde) => (
                  <div className="DummyFlightTicket">
                    <h5>
                      Name Of Traveler{" "}
                      <span
                        style={{
                          fontWeight: "500",
                          marginLeft: "5px",
                          color: "red",
                        }}
                      >
                        {inde + 1}
                      </span>{" "}
                    </h5>
                    <span className="DestinatioCont" key={inde}>
                      {Tdata.name} {Tdata.lname}{" "}
                    </span>
                  </div>
                ))}
              </div>
              <div className="DummyFlightTicket">
                <h5>Date Of Application</h5>
                <span>
                  {selectedDate ? (
                    <span className="DestinatioCont">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(selectedDate))}
                    </span>
                  ) : (
                    <span className="DestinatioCont">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date())}
                    </span>
                  )}
                </span>
              </div>
              <div className="DummyFlightTicket">
                <h5>Destination</h5>
                <span className="DestinatioCont">{country.name}</span>
              </div>
              <div className="DummyFlightTicket">
                <h5>Response Date By</h5>
                <span>
                  {futureDate ? (
                    <span className="DestinatioCont">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(futureDate))}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="DummyFlightTicket">
                <h5>Total Price</h5>
                <span className="DestinatioCont">
                  {" "}
                  {countryPrice}
                  <span>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography
                            color="inherit"
                            className="Breckage"
                            style={{ fontWeight: "600" }}
                          >
                            Total Price
                          </Typography>
                          <h5
                            className="BrackageCharge"
                            style={{
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span> Dummy Flight Ticket Price</span>
                            <span className="DestinatioCont">{addOnPrices.flight}</span>
                          </h5>
                          <h5
                            className="BrackageCharge"
                            style={{
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>Dummy Hotel Booking Price</span>
                            <span className="DestinatioCont">{addOnPrices.hotel}</span>
                          </h5>
                          <h5
                            className="BrackageCharge"
                            style={{
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>Itinerary</span>
                            <span className="DestinatioCont">{addOnPrices.itinerary}</span>
                          </h5>
                          <h5
                            className="BrackageCharge"
                            style={{
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>Cover Letter</span>
                            <span className="DestinatioCont">{addOnPrices.coverLetter} </span>
                          </h5>
                          <h5
                            className="BrackageCharge"
                            style={{
                              fontWeight: "500",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>Visa Price </span>
                            <span className="DestinatioCont">{country.price * travelers.length} </span>
                          </h5>
                        </React.Fragment>
                      }
                    >
                      <Button className="i_iconButton">
                        <RiInformation2Line />
                      </Button>
                    </HtmlTooltip>
                  </span>
                </span>
              </div>
            </form>
            <div className="PaymentBtn">
              <button className="btn" onClick={paymentHandler} >
                Pay Now
              </button>
            </div>
          </div>
        </div>     
      </div>
    </>
  );
};

export default MainDetails;
