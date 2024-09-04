export const emailValidate = (values: string) => {
  let errors = '';
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexTwo = /@/;

  if (values.length === 0) {
    errors = 'Email is required!';
  } else if (!regexTwo.test(values)) {
    errors = 'Please include an "@" in your email address';
  } else if (!regex.test(values)) {
    errors = 'Please use a valid email address!';
  } else if (values.length > 30) {
    errors = 'Email address cannot exceed more than 30 characters';
  }
  return errors;
};

export const passwordValidate = (values: string) => {
  let errors = '';

  if (values.length === 0) {
    errors = 'Password is required!';
  }  else if (values.length < 6) {
    errors = 'Password be must be six characters or longer';
  }

  return errors;
};

export const usernameValidate = (values: string) => {
  let errors = '';

  if (values.length === 0) {
    errors = 'Username is required!';
  }  else if (values.length < 5) {
    errors = 'Password be must be five characters or longer';
  }

  return errors;
};
