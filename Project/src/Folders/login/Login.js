import { useDispatch } from "react-redux";
import { useState } from "react"
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from "../../redux/action";
import * as Yup from 'yup';
import "./Login.css"
function Login() {
  const initialValues = {
    email: '',
    password: ''
  };
  const navigate = useNavigate()
  const [flag,setFlag] = useState(true)
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });
  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    dispatch(loginUser(values,navigate))
    setSubmitting(false);
  };
  const dispatch = useDispatch()
  return(
    <div className="lBody">
      <h1>Login</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form">
            <label htmlFor="email">Email :</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" />
          </div>
          <div className="form">
            <label htmlFor="password">Password :</label>
            <Field type={flag === true ? "password" : "text"} id="password" name="password" />
            {flag === true ? <p onClick={()=> setFlag(false)}>show</p> : <p onClick={()=> setFlag(true)}>hide</p>}
            <ErrorMessage name="password" />
          </div>
          <Button variant="warning" type="submit" disabled={isSubmitting}>Login</Button>
        </Form>
      )}
    </Formik>
    <p>Don't Have An Account? <span style={{color:"#0079FF"}} onClick={()=> navigate("/signup")}>Sign Up</span></p>
    </div>
    )
}
export default Login;