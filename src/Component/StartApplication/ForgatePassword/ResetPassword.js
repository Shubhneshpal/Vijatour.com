import React, { useState } from 'react';
import "./forget.css";
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { email } = state || {};
  console.log("email",email)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://backend-visa2.vercel.app/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error resetting password');
      }

      setMessage(data.message);
      alert(data.message);

      navigate('/'); // Navigate to login page or any other appropriate page
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
      alert('Error resetting password');
    }
  };

  return (
    <div className="requestPass">
      <form className='requestForm' onSubmit={handleSubmit}>
        <h2>Reset Password</h2>      
        <input
          className='inputsForget'
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <input
          className='inputsForget'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;



// import React, { useState, useEffect } from 'react';
// import "./forget.css";
// import { useLocation, useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//   const navigate = useNavigate();
//  const [email,setEmail] = useState('')
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:4000/api/auth/resetPassword', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, newPassword }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Error resetting password');
//       }

//       setMessage(data.message);
//       alert(data.message);

//       navigate('/'); // Navigate to login page or any other appropriate page
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage(error.message);
//       alert('Error resetting password');
//     }
//   };

//   return (
//     <div className="requestPass">
//       <form className='requestForm' onSubmit={handleSubmit}>
//         <h2>Reset Password</h2>
//         <input
//           className='inputsForget'
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           required
//         />
//         <input
//           className='inputsForget'
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="Enter new password"
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
