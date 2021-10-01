import axios from 'axios';
import {toast} from 'react-toastify';
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import Nav from './Header';
import veg from '../assets/veg.png'
import nonVeg from '../assets/nonveg.png'
import { addToCart } from '../actions/user_actions';
import {API} from '../config'

const ItemScreen = ({match}) => {

    const [item, setItem] = useState({})
    const prodId = match.params.id
    const {auth} = useSelector((state)=>({...state}))

    const usr_id = auth.usr._id
    const URL = `${API}/${prodId}`

    useEffect(() => {
        let cancel = false;

        axios.get(URL).then((res) => {
            if (cancel) return;
            setItem(res.data);
        });

        return () => { 
            cancel = true;
        }
    });

    const dispatch = useDispatch();
    const addToCartHandler = () => {
        try{
            dispatch(addToCart(prodId, usr_id))
            toast.success('Item added to cart Successfully!', {theme: 'colored'}) 
        } catch(err){
            toast.error('Error. Try again!', {theme:'colored'})
        }
    }

    return (
        <>
            <Nav />
            <div className="text-start mt-3 ms-4">
                &nbsp;<Link to='/'><button style={{color:"white", backgroundColor:"black", border:"1px solid black"}}>Go Home</button></Link><br/>
            </div>
            <div className="text-start mt-3 ms-3">
            <Container fluid={true}>
                <Row>
                    <Col sm={12} md={6} lg={4} >
                        <img src={item.img}  style={{width:"250px", height:"200px"}} className="mt-2" alt={item.itemName} />
                    </Col>
                    <Col sm={12} md={6}>
                        <h3>{item.itemName}</h3>
                        <h5>from {item.rest_name}</h5>
                        <p>{item.itemDesc}</p>
                        <h3>{item.isVeg===true 
                        ? <img src={veg} style={{width:"15px", height:"15px",marginBottom:"5px"}} alt="veg" />
                        : <img src={nonVeg} style={{width:"15px", height:"15px",marginBottom:"5px"}} alt="non veg" />}&emsp;₹{item.itemPrice}&emsp;</h3><br/>
                        <button className="btn btn-success text-light mb-3" onClick={addToCartHandler}>Add to Cart</button><br/>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}

export default ItemScreen