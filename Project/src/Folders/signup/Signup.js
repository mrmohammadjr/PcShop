import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import { signupUser } from "../../redux/action";
const Signup = () => {
  let show = false;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className="lBody">
     <h1>Signup</h1>
    <Formik
      initialValues={{
        username: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Username is required';
        }
        if (!values.mobile) {
          errors.mobile = 'Mobile number is required';
        } else if (!/^\d{11}$/i.test(values.mobile)) {
          errors.mobile = 'Invalid mobile number';
        }
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Confirm password is required';
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
        dispatch(signupUser(values))
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div className="form">
            <label htmlFor="mobile">Mobile</label>
            <Field type="tel" name="mobile" />
            <ErrorMessage name="mobile" component="div" />
          </div>
          <div className="form">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div className="form">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
            <Button variant="warning" type="submit" disabled={isSubmitting}>Signup</Button>
        </Form>
      )}
    </Formik>
        <p>Already have an account? <span style={{color:"#0079FF"}} onClick={()=> navigate("/login")}>Login</span></p>
        {show === true ? (<p>This web application is made by Mohammad Javad Rasooli</p>):(<p></p>)}
  </div>
  );
};
export default Signup;