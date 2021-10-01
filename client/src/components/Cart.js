import React, {useState, useEffect} from 'react';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import {toast} from 'react-toastify';
import {addToCart, removeFromCart, decrementCart} from '../actions/user_actions';
import Nav from './Header';
import axios from 'axios'
import {API} from '../config'
import Footer from './Footer';
import emptyCart from '../assets/emptyCart.png';
import {MdDeleteForever} from 'react-icons/md';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const btn = {
    backgroundColor:"white", 
    border:"none", 
    fontSize:"1.2em"
}

const remove = {
    backgroundColor:"white", 
    border:"none", 
    fontSize:"1.5em"
}

function Cart(){
    const [cartItems, setCartItems] = useState([])
    const {auth} = useSelector((state)=>({...state}))
    const usr_id = auth.usr._id

    useEffect(() => {
        let cancel = false;

        axios.get(`${API}/user?usr_id=${usr_id}`).then((res) => {
            if (cancel) return;
            setCartItems(res.data.cart)
        });
        
        return () => { 
            cancel = true;
        }
    });

    const dispatch = useDispatch();

    return <>
        <Nav />
        <Row className="mt-3" >
          <Col md={8}>
            {cartItems.length === 0 ? <>
                <main style={{minHeight: "80vh"}} >
                    <img 
                        src={emptyCart} alt="Empty Cart" 
                        style={{height:"430px", width:"400px", marginTop:"10px"}} />
                    <h4>Hey {auth.usr.name}! your cart is empty :(</h4>
                </main>    
            </> : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                        <Col md={2} className="d-flex align-items-center" >
                            <Link style={{textDecoration:"none"}} to={`/item/${item.id}`}>
                                <Image src={item.img} alt={item.name} fluid rounded />
                            </Link>
                        </Col>
                        <Col md={3} className="d-flex align-items-center justify-content-center" >
                        <Link style={{textDecoration:"none"}} to={`/item/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-center" >₹{item.price}</Col>
                        <Col md={1} className="d-flex align-items-center" >
                            {item.quantity===1 ? 
                                <button style={btn} disabled>-</button> : 
                                <button style={btn} 
                                onClick={()=>{
                                    try{
                                        dispatch(decrementCart(item.id, usr_id)) 
                                    } catch(err){
                                        toast.error('Error. Try again!', {theme:'colored'})
                                    }
                                }}>
                                    -
                                </button>}    
                        </Col>
                        <Col md={1} className="d-flex align-items-center" >
                            {item.quantity}
                        </Col>                          
                        <Col md={1} className="d-flex align-items-center">
                            <button style={btn} 
                            onClick={()=>{
                                try{
                                    dispatch(addToCart(item.id, usr_id)) 
                                } catch(err){
                                    toast.error('Error. Try again!', {theme:'colored'})
                                }
                            }}>
                                +
                            </button>
                        </Col> 
                        <Col md={1} className="d-flex align-items-center" >
                            <button style={remove} className="text-danger" 
                                onClick={()=>{
                                    try{
                                        dispatch(removeFromCart(item.id, usr_id)) 
                                    } catch(err){
                                        toast.error('Error. Try again!', {theme:'colored'})
                                    }
                                }}>
                                <MdDeleteForever />
                            </button>
                        </Col>                    
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3> total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items </h3>
                  ₹{cartItems
                    .reduce((acc, item) => acc + item.quantity*item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    // onClick={checkoutHandler}
                   >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>)}
        </Row>
        <Footer />
      </>
}

export default Cart;