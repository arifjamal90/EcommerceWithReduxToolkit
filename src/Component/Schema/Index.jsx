import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
  fname: Yup.string().min(3).max(25).required('Please enter your First Name'),
  lname: Yup.string().min(3).max(25).required('Please enter your Last Name'),
  state: Yup.string().min(3).max(25).required('Please enter your State Name'),
  country: Yup.string().min(3).max(25).required('Please enter your Country Name'),
  address: Yup.string().min(10).max(50).required('Please enter your Address Name'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Please enter a valid Phone Number')
    .required('Please enter your Phone Number'),
    zipcode: Yup.string().matches(/^[0-9]{6}$/, 'Please enter a valid zipcode Number')
    .required('please enter your zipcode Number')
});
