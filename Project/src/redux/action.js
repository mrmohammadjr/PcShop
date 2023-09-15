 import axios from "axios";
//home
export const getData = (setPagination) => async(dispatch,getState) => {
    try {
      dispatch({type: "loading",payload: {data:[] ,error:"", loading:true}})
      const {data} = await axios.get(`http://kzico.runflare.run/product/`)
      let help = {}
      data.map((item, index) => {
        help[item.name] = []
        return "a"
      })
      data.map((item, index) => {
        help[item.name] = [...help[item.name], item]
        return "a"
      })
      let result = Object.entries(help).map(([id,value])=>{
        return (id,value[0])
        })
        let arrayP = []
        for (let i = 0; i < result.length / 10; i++) {
          arrayP.push(i + 1)
        }
        setPagination(arrayP)
      dispatch({type: "success",payload: {data:[...result] , error:"", loading:false}})
    } catch (error) {
      dispatch({type: "error",payload: {data:[], error:error.message ,loading:false}})
    }
  }
  //product
  export const oneData = (nameId) => async(dispatch,getState) => {
    try {
      dispatch({type: "loading",payload: {data:[] , error:"", loading:true}})
      const {data} = await axios.get(`http://kzico.runflare.run/product/${nameId}`)
      let array = []
      array.push(data)
      dispatch({type: "success",payload: {data:[...array] , error:"", loading:false}})
    } catch (error) {
      dispatch({type: "error",payload: {data:[], error:error.message ,loading:false}})
    }
  }
export const getPro = (a,b,c,d) => (dispatch,getState) => {
  let product = getState().cartItems.items
  product.push({a,b,c,d,quantity:1})
  let help = {}
      product.map((item, index) => {
        help[item.b] = []
        return "a"
      })
      product.map((item, index) => {
        help[item.b] = [...help[item.b], item]
        return "a"
      })
      let result = Object.entries(help).map(([id,value])=>{
        return (id,value[0])
        })
  dispatch({type: "add",payload: {items:[...result]}})
}
export const addPro = (select,items) => (dispatch,getState) => {
  let product = getState().cartItems.items
  product[select].quantity ++
  localStorage.setItem("SaveCart",JSON.stringify(items))
  dispatch({type: "plus",payload: {items:[...product]}})
}
export const delPro = (select,items) => (dispatch,getState) => {
  let product = getState().cartItems.items;
    product[select].quantity --;
    if (product[select].quantity === 0) {
      product.splice(select,1)
    }
    localStorage.setItem("SaveCart",JSON.stringify(items))
  dispatch({type: "minus",payload: {items:[...product]}})
}
export const loginUser = (loginRe, nav) => async(dispatch,getState) => {
  localStorage.setItem("userForm",JSON.stringify(loginRe))
  try {
    dispatch({type: "bool",payload: {flag: false}})
      const {data} = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email: loginRe.email,
          password: loginRe.password,
        }
      )
      console.log(data);
      dispatch({type: "bool",payload: {flag: true}})
      localStorage.setItem("UserInfo",JSON.stringify(data))
      setTimeout(function() {
        nav("/")
      }, 800);
  } catch (error) {
      console.log(error);
  }
}
export const signupUser = (signupRe) => async(dispatch,getState) => {
    //console.log(signupRe);
    try {
      dispatch({type: "bool",payload: {flag: false}})
      const {data} = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: signupRe.username,
          email: signupRe.email,
          password: signupRe.password,
          mobile: signupRe.mobile,
        }
      )
      dispatch({type: "bool",payload: {flag: true}})
      console.log(data);
    } catch (error) {
      console.log(error);
    }
}
export const logOut = () => (dispatch,getState) => {
  localStorage.removeItem("UserInfo"); 
  localStorage.removeItem("userForm"); 
  localStorage.removeItem("SaveCart"); 
  dispatch({type: "bool",payload: {flag: false}})
  dispatch({type: "clear",payload: {items:[]}})
  setTimeout(()=> window.location.reload(true), 800);
}
export const loginAuto = (loader,Swal) => async(dispatch,getState) => {
  console.log(getState());
  if (loader === null) {
    Swal.fire({ title: 'Login Your Account', showClass: { popup: 'animate__animated animate__fadeInDown' }, hideClass: { popup: 'animate__animated animate__fadeOutUp' } })
  }else{
    try {
      dispatch({type: "bool",payload: {flag: false}})
      const {data} = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email: loader.email,
          password: loader.password,
        }
      )
      dispatch({type: "bool",payload: {flag: true}})
      localStorage.setItem("UserInfo",JSON.stringify(data))
      console.log(data);
      if (data.status === 200) localStorage.removeItem("SaveCart");
    } catch (error) {
      console.log(error)
    }
  }
}
export const sendAdd = (sum,cart,add,token) => async(dispatch,getState) => {
  let ab = ["cash",6]
        try {
      dispatch({type: "false",payload: {check: false}})
    const data = await axios.post("http://kzico.runflare.run/order/submit",
        {
          orderItems: cart,
          shippingAddress: {
            address: add.address,
            city: add.city,
            postalCode: add.postalCode,
            phone: add.phoneNumber,
          },
          paymentMethod: ab[0],
          shippingPrice: ab[1],
          totalPrice: sum,
        },
        {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        }
      )
      dispatch({type: "true",payload: {check: true}})
      dispatch({type: "clear",payload: {items:[]}})
      console.log(data);
  } catch (e) {
    dispatch({type: "false",payload: {check: false}})
    console.log(e)
  }
}