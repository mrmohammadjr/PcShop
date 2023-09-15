import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { addPro } from "../../redux/action";
import { delPro } from "../../redux/action";
import { Button, Badge } from "react-bootstrap";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import "./Cart.css";
function Cart() {
  const navigate = useNavigate();
  const [sum, setSum] = useState(0);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartItems);
  console.log()
  const {flag} = useSelector((state)=> state.logClt)
  useEffect(() => {
    const initCart = items.map((item) => ({ product: item.a, qty: item.quantity }));
    setCart(initCart);
    const initSum = items.reduce((acc, item) => acc + item.d * item.quantity, 0);
    setSum(initSum);
    localStorage.setItem("SaveCart", JSON.stringify(items));
  }, [items]);
  const minusBtn = (id) => {
      if (id !== -1) {
        dispatch(delPro(id, items));
        const price = items[id]?.d;
        setSum((l) => l - price);
      }
  }
  const plusBtn = (id) => {
    if (id !== -1) {
      dispatch(addPro(id, items));
      setSum((l) => l + items[id].d);
    }
  };
  return (
    <div className="Cbody">
      <h1>Cart</h1>
      <div className="Cbody">
        {items.map((item,index) => {
          return (
            <div key={item.a} className="items">
              <img src={item.c} className="w-25" alt="img"/>
              <p>Name : {item.b}</p>
              <p>Price : {item.d}</p>
              <div className="btn">
                <Button variant="dark" style={{ padding: "5px", fontSize: "15px" }}
                  onClick={() => minusBtn(index)}>-</Button>
                <Badge bg="dark" style={{padding: "10px",fontSize: "15px",marginRight: "5px",marginLeft: "5px",}}>{item.quantity}</Badge>
                <Button variant="dark" style={{ padding: "5px", fontSize: "15px" }} onClick={() => plusBtn(index)} >+</Button>
              </div>
            </div>
          );
        })}
      </div>
      <div><p>Total Price : {sum}</p></div>
      <div className="sideBtn">
        <Button variant="danger" onClick={() => navigate("/")}>Home</Button>
        <Button variant="success" onClick={() =>{
        {items.length === 0 ? (
          Swal.fire("Cart Is Empty")
        ) : flag === false ? (
          Swal.fire("Login Your Account")
          ) : (
          navigate("/address",{state:{a : sum , b : cart}})
          )}
        }}>Next</Button>
      </div>
    </div>
  );
}
export default Cart;