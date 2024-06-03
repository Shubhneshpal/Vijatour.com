import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./document.css";
import { Stepper, Step } from "react-form-stepper";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
// import { FaPlus } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import VisaContext from "../../../context/visa-context";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../Home/Header";
import MyLoader from "../../Loader/MyLoader";

const Document = () => {
  useEffect(() => {
    const traveller = localStorage.getItem("traveller");
    const t = JSON.parse(traveller);
    if (t) {
      ctx.setTravellerData(t);
    }
  }, []);
  const location = useLocation();
  const { state } = location;
  const { travelers, country, futureDate, selectedDate } = state || {};

  // const { id } = useParams();
  const ctx = useContext(VisaContext);
  // console.log("ctx", ctx);
  const navigate = useNavigate();
  const [fileForms, setFileForms] = useState(
    travelers
      ? [...Array(travelers.length).keys()].map((i) => ({ id: i + 1 }))
      : []
  );

  const [photos, setPhotos] = useState([]); // Initialize as an array
  const [passport, setPassport] = useState([]);
  const [otherDoc, setOtherDoc] = useState([]);

  const photoInputRefs = useRef([]);
  const passportInputRefs = useRef([]);
  const otherDocInputRefs = useRef([]);

  // console.log("passportName", passportName);

  const handlePhotoUpload = async (index, e) => {
    e.preventDefault();
    ctx.setLoading(true);
    const selectedPhoto = photos[index];
    // console.log(photos);
    // return
    if (!selectedPhoto) {
      alert("Please select a photo to upload.");
      return;
    }
    const fd = new FormData();
    fd.append("file", selectedPhoto);
    try {
      const response = await fetch("https://backend-visa2.vercel.app/api/upload/photo", {
        method: "post",
        body: fd,
      });
      const dd = await response.json();
      // console.log(dd);
      if (dd.success) {
        alert("Photo uploaded successfully!!!");
      }
      if (dd.fileName && dd.originalname) {
        // console.log("hello");
        ctx.setLoading(false);
        ctx.photoUpdater({
          filename: dd.fileName,
          originalname: dd.originalname,
          id: index,
        });
        if (photoInputRefs.current[index]) {
          console.log("photoInputRefs.current[index]",photoInputRefs.current[index])
          // passportInputRefs.current[index].value = "";
          photoInputRefs.current[index].value = "";
        }
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during photo upload:", error);
    }
  };

  const handlePhotoChange = (index, e) => {
    const file = e.target.files[0];
    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      newPhotos[index] = file;
      return newPhotos;
    });
  };

  const handlePassportChange = (index, e) => {
    const file = e.target.files[0];
    setPassport((prevPassport) => {
      const newPassport = [...prevPassport];
      newPassport[index] = file;
      return newPassport;
    });
  };

  const handleUploadPassport = async (index, e) => {
    e.preventDefault();
    ctx.setLoading(true);
    const selectedPassport = passport[index];
    if (!selectedPassport) {
      alert("Please select a passport to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file2", selectedPassport);
    try {
      const response = await fetch(
        "https://backend-visa2.vercel.app/api/upload/passport",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        ctx.setLoading(false);
        alert("Passport uploaded successfully!!!");
        if (passportInputRefs.current[index]) {
          passportInputRefs.current[index].value = "";
        }
        setPassport((prevPassport) => {
          const newPassport = [...prevPassport];
          newPassport[index] = null;
          return newPassport;
        });
        if (data.fileName && data.originalname) {
          // setPassportName((prev) => {
          //   const datas = [...prev];
          //   datas.push({
          //     filename: data.fileName,
          //     originalname: data.originalname,
          //   });
          //   return datas;
          // });
          ctx.passportUpdater({
            filename: data.fileName,
            originalname: data.originalname,
            id: index,
          });
        }
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during passport upload:", error);
    }
  };

  const handleOtherDocChange = (index, e) => {
    const file = e.target.files[0];
    setOtherDoc((prevPassport) => {
      const newOtherDoc = [...prevPassport];
      newOtherDoc[index] = file;
      return newOtherDoc;
    });
  };

  // handleUload OtherDoc Api

  const handleUploadOtherDoc = async (index, e) => {
    e.preventDefault();
    ctx.setLoading(true);
    const selectedOtherDoc = otherDoc[index];
    if (!selectedOtherDoc) {
      alert("Please select a passport to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file3", selectedOtherDoc);
    try {
      const response = await fetch(
        "https://backend-visa2.vercel.app/api/upload/otherDoc",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        ctx.setLoading(false);
        alert("OtherDoc uploaded successfully!!!");
        if (otherDocInputRefs.current[index]) {
          otherDocInputRefs.current[index].value = "";
        }
        setOtherDoc((prevOtherDoc) => {
          const newOtherDoc = [...prevOtherDoc];
          newOtherDoc[index] = null;
          return newOtherDoc;
        });
        if (data.fileName && data.originalname) {
          ctx.OtherUpdater({
            filename: data.fileName,
            originalname: data.originalname,
            id: index,
          });
        }
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during OtherDoc upload:", error);
    }
  };

  // upload filename and info

  const handleSaveAllFileNameMongo = async (e) => {
    e.preventDefault();
    ctx.setLoading(true);
    let newDataArray = ctx.travellerData.reduce(function (arr, obj) {
      let newObj = {};
      for (let key in obj) {
        newObj[key] = obj[key];
      }

      arr.push(newObj);
      return arr;
    }, []);
    const newData = JSON.stringify(newDataArray);
    console.log(newData);
    try {
      const response = await fetch(
        "https://backend-visa2.vercel.app/api/submit-application",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: newData,
        }
      );

      if (response.ok) {
        ctx.setLoading(false);
        const data = await response.json();
        console.log("Traveler data send successfully:", data);
        // alert("Application Submitted");
        navigate("/MainDetails", {
          state: { travelers, country, futureDate, selectedDate },
        });
        // navigate("/document", { state: { travelers } }); // Pass travelers state
      } else {
        ctx.setLoading(false);
        const errorData = await response.json();
        console.error("Failed to send Traveler data user:", errorData);
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during send traveler data:", error);
    }
  };
  // handle Delete Api

  const handleDeletePassport = async (nameToDelete) => {
    ctx.setLoading(true);
    try {
      const response = await fetch(
        "https://backend-visa2.vercel.app/api/delete/passport",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: nameToDelete }),
        }
      );
      const data = await response.json();
      if (data.success) {
        ctx.setLoading(false);
        // setPassportName((prevNames) =>
        //   prevNames.filter((name) => name.originalname !== nameToDelete)
        // );
        ctx.handlePassportDelete(nameToDelete);
        alert("Deleted");
      } else {
        ctx.setLoading(false);
        alert("Failed to delete the passport from the database.");
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during passport deletion:", error);
    }
  };
  const handlerDeletePhoto = async (nameToDelete) => {
    ctx.setLoading(true);
    try {
      const response = await fetch(
        "https://backend-visa2.vercel.app/api/delete/passport",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: nameToDelete }),
        }
      );
      const data = await response.json();
      if (data.success) {
        ctx.setLoading(false);
        // setPassportName((prevNames) =>
        //   prevNames.filter((name) => name.originalname !== nameToDelete)
        // );
        ctx.handlePhotoDelete(nameToDelete);
        alert("Deleted");
      } else {
        ctx.setLoading(false);
        alert("Failed to delete the passport from the database.");
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during passport deletion:", error);
    }
  };
  const handlerOtherDelete = async (nameToDelete) => {
    ctx.setLoading(true);
    try {
      const response = await fetch(
        "https://backend-visa2.vercel.app/api/delete/passport",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: nameToDelete }),
        }
      );
      const data = await response.json();
      if (data.success) {
        ctx.setLoading(false);
        ctx.handleOtherDelete(nameToDelete);
        alert("Deleted");
      } else {
        ctx.setLoading(false);
        alert("Failed to delete the passport from the database.");
      }
    } catch (error) {
      ctx.setLoading(false);
      console.error("Error during passport deletion:", error);
    }
  };

  // Conditional rendering if travelers is not present
  if (!travelers) {
    return <div>No travelers data found</div>;
  }

  return (
    <>
      <div className="ViaApply_Header trevellerHead">
        <Header />
        {ctx.isLoading && <MyLoader />}
      </div>
      <div className="container main_pageLogin">
        <Stepper activeStep={2}>
          <Step label=" Step 1" />
          <Step label=" Step 2" />
          <Step label=" Step 3" />
        </Stepper>
        <div className="loginForm11">
          <div className="row loginform_style documentFile11">
            <div className="card ripe-malinka-gradient form-white">
              <form onSubmit={handleSaveAllFileNameMongo}>
                <div className="card-body">
                  {ctx.travellerData.map((data, index) => (
                    <div key={index}>
                      <h2 className="text-center font-up font-bold py-2 travelHead">
                        Upload Documents
                      </h2>
                      <div className="travellarppp">
                        <p>
                          Traveller{" "}
                          <span>
                            <h4>{index + 1}</h4>
                          </span>
                        </p>
                      </div>
                      <div className="row">
                        <div className="md-form mdForm_margin col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            value={data.name}
                            disabled
                          />
                        </div>
                        <div className="md-form mdForm_margin col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={data.lname}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="md-form mdForm_margin col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={data.email}
                            disabled
                          />
                        </div>
                        <div className="md-form mdForm_margin col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Passport No."
                            value={data.contactNo}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="photoName">
                        <div className="uplodFile">
                          <Form.Group
                            as={Col}
                            controlId={`formFile-passport-${index}`}
                            className="col_ChoosePhoto"
                          >
                            <Form.Label className="lableOfLabele">
                              Choose Passport
                            </Form.Label>
                            <Form.Control
                              onChange={(e) => handlePassportChange(index, e)}
                              name="file"
                              type="file"
                              size="lg"
                              accept="application/pdf"
                              className="uplodFileINput"
                              ref={(el) =>
                                (passportInputRefs.current[index] = el)
                              }
                            />
                          </Form.Group>
                          <button
                            onClick={(e) => handleUploadPassport(index, e)}
                            type="button"
                            className="btn btn-outline-white waves-effect waves-light"
                          >
                            Upload
                          </button>
                        </div>
                        <div className="getPhoto">
                          {data.passport.length > 0 && (
                            <>
                              {data.passport.map((name, ind) => (
                                <p className="photoName_ooo" key={ind}>
                                  {name.filename}{" "}
                                  <CiCircleRemove
                                    key={ind}
                                    onClick={() =>
                                      handleDeletePassport(name.originalname)
                                    }
                                  />
                                </p>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="photoName">
                        <div className="uplodFile">
                          <Form.Group
                            as={Col}
                            controlId={`formFile-photo-${index}`}
                            className="col_ChoosePhoto"
                          >
                            <Form.Label className="lableOfLabele">
                              Choose Photo
                            </Form.Label>
                            <Form.Control                              
                              onChange={(e) => handlePhotoChange(index, e)}
                              name="file"
                              type="file"
                              size="lg"
                              accept="image/png, image/jpeg"
                              ref={(el) => (photoInputRefs.current[index] = el)}
                            />
                          </Form.Group>
                          <button
                            type="button"
                            className="btn btn-outline-white waves-effect waves-light"
                            onClick={(e) => handlePhotoUpload(index, e)}
                          >
                            Upload
                          </button>
                        </div>
                        <div className="getPhoto">
                          {data.photo.length > 0 && (
                            <>
                              {data.photo.map((name, ind) => (
                                <p className="photoName_ooo" key={ind}>
                                  {name.filename}{" "}
                                  <CiCircleRemove
                                    key={ind}
                                    onClick={() =>
                                      handlerDeletePhoto(name.originalname)
                                    }
                                  />
                                </p>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="photoName">
                        <Col className="uplodFile buttonmanyDoc mb-3">
                          <Form.Group
                            as={Col}
                            className="col_ChoosePhoto"
                            controlId={`formFile-other-${index}`}
                          >
                            <Form.Label className="lableOfLabele">
                              Other Document
                            </Form.Label>
                            <Form.Control
                              ref={(el) =>
                                (otherDocInputRefs.current[index] = el)
                              }
                              onChange={(e) => handleOtherDocChange(index, e)}
                              name="file"
                              type="file"
                              size="lg"
                              accept="application/pdf"
                            />
                          </Form.Group>
                          <button
                            type="button"
                            className="btn btn-outline-white waves-effect waves-light wave_light1"
                            onClick={(e) => handleUploadOtherDoc(index, e)}
                          >
                            Upload
                          </button>
                        </Col>
                        <div className="getPhoto">
                          {data.otherDocuments.length > 0 && (
                            <>
                              {data.otherDocuments.map((name, ind) => (
                                <p className="photoName_ooo" key={ind}>
                                  {name.filename}{" "}
                                  <CiCircleRemove
                                    key={ind}
                                    onClick={() =>
                                      handlerOtherDelete(name.originalname)
                                    }
                                  />
                                </p>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="fullSubmit">
                  <button
                    type="submit"
                    className="btn btn-outline-white waves-effect waves-light importantBtn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center btnBack1">
              <Link to={"/TravelDetails"}>
                <button className="btn btn-primary btn_primarybtn backBtn">
                  <IoIosArrowDropleft />
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Document;
