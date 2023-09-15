import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom"
import { sendAdd } from "../../redux/action";
import { Button, Badge,Container } from "react-bootstrap";
import Swal from 'sweetalert2';
import "./Check.css";
function Check() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { items } = useSelector((state) => state.cartItems);
  const { check } = useSelector((state) => state.finallPay);
  const {state} = useLocation()
  console.log(state);
  return(
    <div className="body">
      <h1>Check</h1>
      {check === true ? (
      <Badge bg="success" style={{fontSize:"30px"}}>Completed ☆</Badge>
      ) : (
       <div>
        {items.map((item,index)=>{
        return(
         <Container>
          <div key={item.a} className="det">
            <p>Name : {item.b}</p>
            <p>Count : {item.quantity}</p>
          </div>
         </Container>
        )
      })}
      <>
      <p>TotalPrice : {state.a}</p>
      <p>shippingPrice : 6</p>
      <p>paymentMethod : cash</p>
      <Button onClick={()=> dispatch(sendAdd(state.a,state.b,state.c,state.d))}>End</Button>
      </>
      </div>
      )}

    </div>
    )
}
export default Check;