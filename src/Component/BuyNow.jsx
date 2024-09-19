import React, { useState } from 'react';
import { useFormik } from 'formik';
import { SignUpSchema } from './Schema/Index';
import { database } from './Firebase'; 
import { ref, push } from "firebase/database";

const initialValue = {
  fname: '',
  lname: '',
  zipcode: '',
  state: '',
  country: '',
  address: '',
  mobile: ''
};

const BuyNow = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: initialValue,
    validationSchema: SignUpSchema,
    onSubmit: async (values, actions) => {
      await addDataHandle(values); // Pass form values to the addDataHandle function
      actions.resetForm();
    }
  });

  const addDataHandle = async (values) => { // Accept values as an argument
    const { fname, lname, zipcode, state, country, address, mobile } = values;

    try {
      const response = await push(ref(database, 'Records'), {
        fname, lname, zipcode, state, country, address, mobile
      });

      if (response) {
        alert("Data Stored Succesfully!");
        setSubmittedData(prevData => [...prevData, values]);
      }
    } catch (error) {
      console.error("Error storing data:", error);
      alert("Error storing data");
    }
  };

  return (
    <div className='mt-16 w-[40%] m-auto border-2 border-black px-2 rounded-lg'>
      <h1 className='py-3 text-xl font-semibold text-center'>Fill Information</h1>
      <form onSubmit={handleSubmit} className='py-2'>
        <div className='flex justify-between'>
          <label className='w-[40%] px-2 py-1 font-semibold'>FirstName</label>
          <label className='w-[44%] px-2 py-1 font-semibold'>LastName</label>
        </div>
        <div className='flex justify-between my-1'>
          <div className='w-full'>
            <input
              type="text"
              name="fname"
              placeholder="Enter Your First Name"
              className='w-[90%] border-2 border-black rounded-md px-2 py-1'
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fname && touched.fname ? (
              <p className="form_error text-danger text-red-700">{errors.fname}</p>
            ) : null}
          </div>
          <div className='w-full text-end'>
            <input
              type="text"
              name="lname"
              placeholder="Enter Your Last Name"
              className='w-[90%] border-2 border-black rounded-md px-2 py-1'
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lname && touched.lname ? (
              <p className="form_error text-danger pr-2 text-red-700">{errors.lname}</p>
            ) : null}
          </div>
        </div>
        <label className='py-2 font-semibold'>ZipCode</label>
        <input
          type="number"
          name="zipcode"
          placeholder="Enter Your ZipCode"
          className='w-full border-2 border-black rounded-md px-2 py-1'
          value={values.zipcode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.zipcode && touched.zipcode ? (
          <p className="form_error text-danger text-red-700">{errors.zipcode}</p>
        ) : null}
        <label className='py-2 font-semibold'>State</label>
        <input
          type="text"
          name="state"
          placeholder="Enter Your State Name"
          className='w-full border-2 border-black rounded-md px-2 py-1'
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.state && touched.state ? (
          <p className="form_error text-danger text-red-700">{errors.state}</p>
        ) : null}
        <label className='py-2 font-semibold'>Country</label>
        <input
          type="text"
          name="country"
          placeholder="Enter Your Country Name"
          className='w-full border-2 border-black rounded-md px-2 py-1'
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.country && touched.country ? (
          <p className="form_error text-danger text-red-700">{errors.country}</p>
        ) : null}
        <label className='py-2 font-semibold'>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter Your Address"
          className='w-full border-2 border-black rounded-md px-2 py-1'
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.address && touched.address ? (
          <p className="form_error text-danger text-red-700">{errors.address}</p>
        ) : null}
        <label className='py-2 font-semibold'>Mobile Number</label>
        <input
          type="number"
          name="mobile"
          placeholder="Enter Your Mobile Number"
          className='w-full border-2 border-black rounded-md px-2 py-1'
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.mobile && touched.mobile ? (
          <p className="form_error text-danger text-red-700">{errors.mobile}</p>
        ) : null}
        <div className='text-center pt-2 flex'>
          <button>Go To Back</button>
          <button
            type="submit"
            className='border-2 border-black px-4 rounded-lg bg-gray-300 font-semibold py-1' >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyNow;
