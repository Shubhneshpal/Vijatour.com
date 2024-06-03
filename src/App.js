import "./App.css";
import Home from "./Component/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisaApplyPage from "./Component/VisaApply/VisaApplyPage";
// import LoginForm from './Component/StartApplication/LoginForm';
import TravelerDetails from "./Component/StartApplication/travelerDetail/TravelerDetails.jsx";
import Document from "./Component/StartApplication/SubmitDocument/Document";
import AboutUs from "./Component/Footer/AboutUs.jsx";
import Privacy from "./Component/Footer/Privacy.jsx";
import TravelerVlogs from "./Component/TravelerVlog/TravelerVlogs.jsx";
import RequestResetPassword from "./Component/StartApplication/ForgatePassword/RequestResetPassword.js";
import ValidateOTP from "./Component/StartApplication/ForgatePassword/ValidateOTP.js";
import ResetPassword from "./Component/StartApplication/ForgatePassword/ResetPassword.js";
import { useContext, useEffect, useState } from "react";
import MainDetails from "./Component/StartApplication/MainDetail/MainDetails.jsx";
import History from "./Component/ClintHitory/History.jsx";
import VisaContext from "./context/visa-context.js";
// import { Provider } from 'react-redux';
// import { store } from "./redux/store/store.jsx";

function App() {
  const [token, setToken] = useState(null);
  const ctx = useContext(VisaContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      ctx.setLogin(true);
    }
  }, []);
return(
  <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visatour/:id" element={<VisaApplyPage />} />

      <Route path="/TravelDetails" element={<TravelerDetails />} />
      <Route path="/document" element={<Document />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/travelervlogs" element={<TravelerVlogs />} />
      <Route path="/MainDetails" element={<MainDetails />} />
      <Route path="/history" element={<History />} />
      <Route
        path="/request-reset-password"
        element={<RequestResetPassword />}
      />
      <Route
        path="/validate-otp"
        element={<ValidateOTP onOTPValidated={setToken} />}
      />
      <Route path="/reset-password" element={<ResetPassword token={token} />} />
    </Routes>
  </BrowserRouter>
  </>
)

}

export default App;
