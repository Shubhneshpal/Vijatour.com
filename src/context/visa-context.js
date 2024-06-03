import { createContext } from "react";

const VisaContext = createContext({
  travellerData: [],
  setTravellerData: () => {},
  photoUpdater: () => {},
  passportUpdater: () => {},
  OtherUpdater: () => {},
  handlePassportDelete: () => {},
  isLoggedIn: false,
  setLogin: () => {},
  isLoading: false,
  setLoading: () => {},
});

export default VisaContext;
