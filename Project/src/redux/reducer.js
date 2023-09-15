export const allData = (state = {data:[] ,error:"", loading:false}, { type,payload })=>{
  if(type === "loading"){
    return payload;
  }
  if(type === "success"){
    return payload;
  }
  if(type === "error"){
    return payload;
  }
  if(type === "oneData"){
    return payload;
  }
  return state;
}
export const cartItems = (state = {items:[]}, { type,payload })=>{
  if(type === "add"){
    return payload;
  }
  if(type === "plus"){
    return payload;
  }
  if(type === "minus"){
    return payload;
  }
  if(type === "clear"){
    return payload;
  }
  return state;
}
export const logClt = (state = {flag:false}, { type,payload })=>{
  if(type === "bool"){
    return payload;
  }
  return state;
}
export const finallPay = (state = { check : false }, { type,payload })=>{
  if(type === "true"){
    return payload;
  }
  if(type === "false"){
    return payload;
  }
  return state;
}