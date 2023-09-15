import React,{ useEffect } from "react"
import {useSelector, useDispatch} from "react-redux";
import { oneData } from "../../redux/action";
import { getPro,getData } from "../../redux/action";
import { useParams,useNavigate } from "react-router-dom"
import {Button,Card,Spinner,Badge} from 'react-bootstrap';
import "./Product.css"
function Product() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {data,loading,error} = useSelector((state)=> state.allData)
  const {productName} = useParams()
  console.log();
  useEffect(()=>{
    dispatch(oneData(productName.split("-")[1]))
  },[])
  return(
    <div className="body">
      <h1>Product</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Badge bg="danger">{error}</Badge>
      ) : (
        <div style={{display:"flex",justifyContent:"center"}}>
          {data.map((item,index)=>{
            return(
          <Card style={{margin:"10px",width:"90%"}} key={item._id}>
      <Card.Header>{item.brand}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={item.image} style={{width:"80%",height:"auto",padding:"5px"}} className="container"/>
        <Card.Title>Name : {item.name}</Card.Title>
        <Card.Text>Description : {item.description}</Card.Text>
        <Card.Text>Rate : {item.rating}</Card.Text>
        <Card.Text>Price : {item.price}</Card.Text>
        <Card.Text>Count : {item.countInStock}</Card.Text>
        <Button variant="warning" onClick={()=>{
          dispatch(getPro(item._id,item.name,item.image,item.price))
          navigate("/cart")
        }}>Add To Cart</Button>
      </Card.Body>
    </Card>
            )
          })}
        </div>
      )}
    </div>
    )
}
export default Product;