import { combineReducers,
legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'; 
import { allData,cartItems,logClt,finallPay } from "./reducer"
const reducers = combineReducers({ allData,cartItems,logClt,finallPay });
const loadStorage = JSON.parse(localStorage.getItem("SaveCart")) || [];
const initialState = {cartItems:{ items:[...loadStorage] } }
const middleWare = [thunk];
const store = createStore(reducers,initialState,applyMiddleware(...middleWare));

export default store;