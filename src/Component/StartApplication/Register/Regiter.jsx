import React, { useContext, useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validateFormRegister } from "../../../util/validation";
import Modal from "react-bootstrap/Modal";
import VisaContext from "../../../context/visa-context";

const Regiter = ({
  handleLogShow,
  show,
  handleClose,
  country = "",
  futureDate = "",
  selectedDate = "",
}) => {
  const ctx = useContext(VisaContext);
  const [errors, setErrors] = useState({});
  const [isLogin, setisLogin] = useState(false);

  const navigate = useNavigate();
  const [RegformData, setRegformData] = useState({
    name: "",
    lname: "",
    email: "",
    Cname: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegformData({ ...RegformData, [name]: value });
  };

  // Register Form Api Calling 💯
  const handleSubmitRigister = async (e) => {
    e.preventDefault();
    const newErrors = validateFormRegister(RegformData);
    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      const formData = {
        name: RegformData.name,
        lname: RegformData.lname,
        email: RegformData.email,
        Cname: RegformData.Cname,
        password: RegformData.password,
      };
      try {
        const response = await fetch("https://backend-visa2.vercel.app/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User registered successfully:", data);
          // setisLogin(true);
          if (country !== "" && futureDate !== "" && selectedDate !== "") {
            navigate("/TravelDetails", {
              state: { country, futureDate, selectedDate },
            });
          } // Directly navigate to the TravelDetails route
          ctx.setLogin(true);
          handleClose()
        } else {
          const errorData = await response.json();
          console.error("Failed to register user:", errorData);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }

      setRegformData({
        name: "",
        lname: "",
        email: "",
        Cname: "",
        password: "",
      });
    } else {
      console.log("Form validation failed");
    }
    return isValid;
  };
  // Register Form Api Calling 💯

  return (
    <>
      {/* <div className="Register_Modal"> */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <div className="googleLogin11">
          <Modal.Header closeButton className="crossButton">
            <div className="loginHead">
              <h2>Register</h2>
            </div>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="googleLogin">
            <p>Create Your Account</p>
            <form method="POST">
              <div className="input_group mb-4">
                <div className="row">
                  <div className="col-lg-6 fName">
                    <input
                      className="inputPass55"
                      onChange={handleChange}
                      type="text"
                      placeholder="First Name"
                      name="name"
                      value={RegformData.name}
                    />
                    {errors.name && <p className="style01">{errors.name}</p>}
                  </div>
                  <div className="col-lg-6 lName">
                    <input
                      className="inputPass55"
                      onChange={handleChange}
                      type="text"
                      placeholder="Last Name"
                      name="lname"
                      value={RegformData.lname}
                    />
                    {errors.lname && <p className="style01">{errors.lname}</p>}
                  </div>
                </div>
              </div>
              <div className="input_group mb-4">
                <input
                  className="inputPass"
                  onChange={handleChange}
                  type="text"
                  placeholder="Company Name (Optional)"
                  name="Cname"
                  value={RegformData.Cname}
                />
              </div>
              <div className="input_group mb-4">
                <input
                  className="inputPass"
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={RegformData.email}
                />
                {errors.email && <p className="style01">{errors.email}</p>}
              </div>
              <div className="input_group mb-4">
                <input
                  className="inputPass"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="password"
                  value={RegformData.password}
                />
                {errors.password && (
                  <p className="style01">{errors.password}</p>
                )}
              </div>

              <button
                className="btn56"
                type="submit"
                onClick={handleSubmitRigister}
              >
                Register
              </button>
            </form>
            <div className="bottomLi">
              <div className="bottomLine">
                <span>OR</span>
              </div>
            </div>
            <div className="signupButtons">
              <Link className="btn" onClick={handleLogShow}>
                Already Have An Account? Sign In
              </Link>
            </div>
            <div className="provacyPage">
              <p>
                By Signing In, You Agree To Our
                <Link>{"  "} Terms And Conditions</Link> And Acknowledge That
                You Have Read Our <Link>{"  "} Privacy Policy.</Link>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* </div> */}
    </>
  );
};

export default Regiter;
