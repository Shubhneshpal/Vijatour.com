

//  Register form validation******/////

export const validateFormRegister = (RegformData) => {
    const errors = {};
  
    // name
    if (!RegformData?.name?.trim()) {
      errors.name = 'Name is require *';
    }
  
    //Last name
    if (!RegformData?.lname?.trim()) {
      errors.lname = 'Last Name is require *';
    }
  
    //  email
    if (!RegformData?.email?.trim()) {
      errors.email = 'Email is require *';
    } else if (!isValidEmail(RegformData.email)) {
      errors.email = 'Invalid email address *';
    }
  
    //  password
    if (!RegformData.password || !validatePassword(RegformData.password)) {
      errors.password = 'Fill minimum 6 characters  *';
    }   
    return errors;
  };
 // Validate Email 💯
 const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};
// const Email = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 
// export const emailValidation = email => Email.test(email);
// Validate password 💯
export const validatePassword = (password) => {
  const hasAlphanumeric = /[a-zA-Z0-9]/.test(password);
  return password.length >= 6 && hasAlphanumeric; 
};

  //  Login form validation******/////

export const validateFormLogin = (loginData) => {
    const errors = {};
  
    // Validate email
    if (!loginData?.email?.trim()) {
      errors.email = 'Email is required *';
    } else if (!isValidEmail(loginData.email)) {
      errors.email = 'Invalid email address *';
    }
    // Validate password
    if (!loginData.password || !validatePassword(loginData.password)) {
      errors.password = 'Fill minimum 6 characters *';
    }
    return errors;
  };



  export const validTrevellers = (travelers) => {
    const errors = travelers.map((person) => {
      const personErrors = {};
  
      if (!person.name) {
        personErrors.name = "First name is required";
      }
  
      if (!person.lname) {
        personErrors.lname = "Last name is required";
      }
  
      if (!person.email) {
        personErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(person.email)) {
        personErrors.email = "Email address is invalid";
      }
  
      if (!person.contactNo) {
        personErrors.contactNo = "Contact number is required";
      }
  
      if (!person.dob) {
        personErrors.dob = "Date of birth is required";
      }
  
      if (!person.expectedDate) {
        personErrors.expectedDate = "Expected date is required";
      }
  
      if (!person.passportNo) {
        personErrors.passportNo = "Passport number is required";
      }
  
      return personErrors;
    });
  
    return errors;
  };
  