import React,{ useState,useEffect } from "react"
import {Card,Pagination,Spinner,Badge} from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import { getData } from "../../redux/action";
import {useNavigate} from 'react-router-dom';
import "./Home.css"
function Home() {
  const [paginate,setPaginate] = useState([])
  const [page,setPage] = useState(1)
  const [sort,setSort] = useState("")
  const {data,loading,error} = useSelector((state)=> state.allData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(getData(setPaginate))
  },[]);
  return(
    <div className="body">
    <select onChange={(e)=> setSort(e.target.value)} className="sort">
        <option value="d">Default</option>
        <option value="h">Highest</option>
        <option value="l">Lowest</option>
        <option value="a">A-Z</option>
        <option value="z">Z-A</option>
        <option value="KB">Keyboard</option>
        <option value="MS">Mouse</option>
      </select>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? 
      (<Badge bg="danger">{error}</Badge>) 
      : (
      <div className="product container">
      {data.sort((x,y)=>{
      console.log(x.name,x.category ,"-",y.name, y.category);
        switch (sort) {
          case 'h':
            return x.price - y.price
          case 'l':
            return y.price - x.price
          case 'KB':
            return y.category.toLowerCase().includes("keyboard")
          case 'MS':
            return y.category.toLowerCase().includes("mouse")
          case 'a':
            return x.name.localeCompare(y.name)
          case 'z':
            return y.name.localeCompare(x.name)
          case 'd':
            return x.price
        }
      }).slice((page - 1) * 10, page * 10).map((item,index)=>{
        return(
          <div style={{padding:"4px"}}>
                <Card onClick={()=> navigate(`/product/${item.name}-${item._id}`)} style={{height: "90%",margin:"1px"}}>
        <Card.Img variant="top" src={item.image} style={{width:"90%",height:"35%",padding:"5px"}} className="container"/>
        <Card.Body>
          <Card.Text>
            <p style={{fontWeight:"bold"}}>{item.name}</p>
            <p>{item.price}</p>
            {item.countInStock === 0 ? <p style={{color:"red"}}>End</p> : <p>{item.countInStock}</p>}
            <p>{item.rating}</p>
          </Card.Text>
        </Card.Body>
      </Card>
          </div>
        )
      })}
      </div>
      )}
      <Pagination className="page">
        {paginate.map((item,index)=>{
          return(
          <Pagination.Item key={index} onClick={()=> setPage(item)}>{item}</Pagination.Item>
          )
        })}
      </Pagination>
    </div>
    )
}
export default Home