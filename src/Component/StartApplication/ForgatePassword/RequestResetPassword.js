import React, { useState } from 'react';
import "./forget.css";
import { useNavigate } from 'react-router-dom';

const RequestResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/auth/requestPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error requesting password reset');
      }

      const data = await response.json();
      alert(data.message);

      // After successful request, navigate to the next step
      navigate('/validate-otp', { state: { email } });
    } catch (error) {
      console.error("Error:", error);
      alert('Error requesting password reset');
    }
  };

  return (
    <div className="requestPass">
      <form className='requestForm' onSubmit={handleSubmit}>
        <h2>Request Password Reset</h2>
        <input
          className='inputsForget'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default RequestResetPassword;
