import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Folders/home/Home";
import Cart from "./Folders/cart/Cart";
import Login from "./Folders/login/Login";
import Signup from "./Folders/signup/Signup";
import Producer from "./Folders/producer/Producer";
import Product from "./Folders/product/Product";
import Address from "./Folders/address/Address";
import Check from "./Folders/check/Check";
function Router(){
  return<Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/cart" element={<Cart />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/address" element={<Address />}/>
    <Route path="/check" element={<Check />}/>
    <Route path="/producer" element={<Producer />}/>
    <Route path="/product/:productName" element={<Product />}/>
  </Routes>
}
export default Router;