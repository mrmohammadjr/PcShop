import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector,useDispatch } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom"
import { sendAdd } from "../../redux/action";
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import "./Address.css"
function Address() {
  const dispatch = useDispatch()
  const location = useLocation()
  const {state} = useLocation()
  console.log(state);
  let token = "defaultToken";
const users = localStorage.getItem("UserInfo");
if (users !== null) {
  const userInfo = JSON.parse(users);
  if (userInfo.hasOwnProperty("user") && userInfo.user.hasOwnProperty("token")) {
    token = userInfo.user.token;
    }
  }
  const navigate = useNavigate()
  return (
   <div className="Abody">
    <Formik
      initialValues={{ address: '', city: '', postalCode: '', phoneNumber: '' }}
      validate={values => {
        const errors = {};
        if (!values.address) {
          errors.address = 'Required';
        }
        if (!values.city) {
          errors.city = 'Required';
        }
        if (!values.postalCode) {
          errors.postalCode = 'Required';
        }
        if (!values.phoneNumber) {
          errors.phoneNumber = 'Required';
        } else if (!/^\d+$/.test(values.phoneNumber)) {
          errors.phoneNumber = 'Invalid';
          }
        return errors;
      }}
      onSubmit={(values,{ setSubmitting }) =>{
          //dispatch(sendAdd(state.a,state.b,values,token))
          navigate("/check",{state:{a : state.a , b : state.b , c : values , d : token}})
      }}>
      {({ isSubmitting }) => (
        <Form className="Abody">
          <label htmlFor="address">Address:</label>
          <Field type="text" name="address" />
          <ErrorMessage name="address" />
          <label htmlFor="city">City:</label>
          <Field type="text" name="city" />
          <ErrorMessage name="city" />
          <label htmlFor="postalCode">Postal Code:</label>
          <Field type="text" name="postalCode" />
          <ErrorMessage name="postalCode" />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <Field type="text" name="phoneNumber" />
          <ErrorMessage name="phoneNumber" />
          <Button variant="warning" type="submit">Next</Button>
        </Form>
      )}
    </Formik>
   </div>
  );
}
export default Address;