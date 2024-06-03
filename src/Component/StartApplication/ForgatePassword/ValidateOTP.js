import React, { useState } from 'react';
import "./forget.css";
import { useLocation, useNavigate } from 'react-router-dom';

const ValidateOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { email } = state || {};
  console.log("email",email)
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/auth/validateOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid OTP');
      }

      const data = await response.json();
      alert(data.message);

      navigate('/reset-password',{state:{email}});
    } catch (error) {
      console.error("Error:", error);
      alert('Invalid OTP');
    }
  };

  return (
    <div className="requestPass">
      <form className='requestForm' onSubmit={handleSubmit}>
        <h2>Validate OTP</h2>
        <input
          className='inputsForget'
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Validate OTP</button>
      </form>
    </div>
  );
};

export default ValidateOTP;
