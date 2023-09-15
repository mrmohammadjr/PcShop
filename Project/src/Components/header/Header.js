import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom';
import React,{ useEffect } from "react"
import {useSelector, useDispatch} from "react-redux";
import { loginAuto,logOut } from "../../redux/action";
function Header() {
  const dispatch = useDispatch()
    const {items} = useSelector((state)=> state.cartItems)
    const {flag} = useSelector((state)=> state.logClt)
    const navigate = useNavigate()
    const res = JSON.parse(localStorage.getItem("userForm"));
    useEffect(()=>{
     dispatch(loginAuto(res,Swal))
    },[])
  return (
    <Navbar bg="light" expand="md">
      <Container>
          <Navbar.Brand onClick={()=> navigate("/")}>Pc Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {items.length === 0 ? (
            <Nav.Link onClick={()=> navigate("/cart")}><span class="material-symbols-outlined">shopping_cart</span></Nav.Link>
          ) : (
            <Nav.Link onClick={()=> navigate("/cart")}><span class="material-symbols-outlined">add_shopping_cart</span></Nav.Link>
          )}
            <Nav.Link onClick={()=> navigate("/producer")}>Producer</Nav.Link>
            {flag === true && res !== null ? (
                <NavDropdown
                    title={res.email}
                  >
                    <NavDropdown.Item onClick={()=> navigate("/producer")}>Your Account</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=> dispatch(logOut())}>
                      Log Out
                    </NavDropdown.Item>
                    </NavDropdown>
            ) : (
              <Nav.Link onClick={()=> navigate("/login")}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;