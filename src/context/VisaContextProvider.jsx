import React, { useState } from "react";
import VisaContext from "./visa-context";

const VisaContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [traveller, setTraveller] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoading = (value) => {
    setIsLoading(value);
  };
  const setLogin = (value) => {
    setIsLoggedIn(value);
  };
  const setTravellerData = async (data) => {
    // console.log(data.id);
    setLoading(true);
    const response = await fetch("https://backend-visa2.vercel.app/api/getTraveller", {
      method: "POST",
      body: JSON.stringify({ id: data.id }),
      headers: {
        "content-type": "application/json",
      },
    });
    const datas = await response.json();
    // console.log(datas);
    if (datas) setTraveller(datas[0].data);
    setLoading(false);
  };
  const photoUpdater = (comingPhoto) => {
    // console.log(comingPhoto);
    // return
    setTraveller((prev) => {
      const existingData = [...prev];
      existingData[comingPhoto.id].photo.push({
        filename: comingPhoto.filename,
        originalname: comingPhoto.originalname,
      });
      return existingData;
    });
  };
  const passportUpdater = (comingPhoto) => {
    // console.log(comingPhoto);
    // return
    setTraveller((prev) => {
      const existingData = [...prev];
      existingData[comingPhoto.id].passport.push({
        filename: comingPhoto.filename,
        originalname: comingPhoto.originalname,
      });
      return existingData;
    });
  };
  const OtherUpdater = (comingPhoto) => {
    // console.log(comingPhoto);
    // return
    setTraveller((prev) => {
      const existingData = [...prev];
      existingData[comingPhoto.id].otherDocuments.push({
        filename: comingPhoto.filename,
        originalname: comingPhoto.originalname,
      });
      return existingData;
    });
  };
  const handlePassportDelete = (name) => {
    // console.log(name);
    setTraveller((prev) => {
      const existingData = [...prev];
      const p = existingData.find((item) => {
        return item.passport.find((i) => {
          return i.originalname === name;
        });
      });
      // console.log(p);
      const indexP = existingData.findIndex((ff) => {
        return ff === p;
      });
      // console.log("indexing of p", indexP);
      const ss = p.passport.find((i) => {
        return i.originalname === name;
      });

      const filteredData = p.passport.filter((a) => {
        return a !== ss;
      });
      // console.log("fultered dta", filteredData);
      p.passport = filteredData;
      // console.log(p);
      existingData[indexP] = p;
      // console.log(existingData);
      return existingData;
    });
  };
  const handlePhotoDelete = (name) => {
    // console.log(name);
    setTraveller((prev) => {
      const existingData = [...prev];
      console.log(existingData)
      const p = existingData.find((item) => {
        return item.photo.find((i) => {
          return i.originalname === name;
        });
      });
      console.log(p);
      const indexP = existingData.findIndex((ff) => {
        return ff === p;
      });
      console.log("indexing of p", indexP);
      const ss = p.photo.find((i) => {
        return i.originalname === name;
      });
      const filteredData = p.photo.filter((a) => {
        return a !== ss;
      });
      console.log("fultered dta", filteredData);
      p.photo = filteredData;
      console.log(p);
      existingData[indexP] = p;
      console.log(existingData);
      return existingData;
    });
  };
  const handleOtherDelete = (name, ind) => {
    setTraveller((prev) => {
      const existingData = [...prev];
      const p = existingData.find((item) => {
        return item.otherDocuments.find((i) => {
          return i.originalname === name;
        });
      });
      // console.log(p);
      const indexP = existingData.findIndex((ff) => {
        return ff === p;
      });
      // console.log("indexing of p", indexP);
      const ss = p.otherDocuments.find((i) => {
        return i.originalname === name;
      });
      const filteredData = p.otherDocuments.filter((a) => {
        return a !== ss;
      });
      // console.log("fultered dta", filteredData);
      p.otherDocuments = filteredData;
      // console.log(p);
      existingData[indexP] = p;
      // console.log(existingData);
      return existingData;
    });
  };
  // console.log(isLoggedIn);
  console.log(traveller);
  console.log(isLoading);
  const ctxValue = {
    setTravellerData,
    travellerData: traveller,
    photoUpdater,
    passportUpdater,
    OtherUpdater,
    handlePassportDelete,
    handleOtherDelete,
    handlePhotoDelete,
    isLoggedIn,
    setLogin,
    isLoading,
    setLoading,
  };
  return (
    <VisaContext.Provider value={ctxValue}>{children}</VisaContext.Provider>
  );
};
export default VisaContextProvider;
