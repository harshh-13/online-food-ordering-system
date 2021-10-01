import React from 'react'
import '../App.css'
import './bootstrap.min.css'
import {Card} from 'react-bootstrap';
import veg from '../assets/veg.png'
import nonVeg from '../assets/nonveg.png'
import {Link} from 'react-router-dom';

const title = {
    color:"black",
    textDecoration:"none"
}

const Product = ({item}) => {
    return (
        <>
            <Card className="rounded my-2 mx-1 card" style={{width:"240px"}}>
                <Link to={`/item/${item._id}`} >
                    <Card.Img src={item.img} style={{height:"160px"} } variant="top"/>
                </Link>
                <Card.Body className="m-1 p-1">
                    <Link to={`/item/${item._id}`} style={title}>
                        <Card.Title as='p' className="text-start" style={{minHeight:"70px"}} >
                            <strong>{item.itemName}</strong>
                        </Card.Title> 
                    </Link><hr/>
                    <Card.Text as='h5'>
                    ₹{item.itemPrice}&emsp;&emsp;&emsp;&emsp;{item.isVeg===true
                        ? <img src={veg} style={{width:"15px", height:"15px",marginBottom:"5px"}} alt="veg"/>
                        : <img src={nonVeg} style={{width:"15px", height:"15px",marginBottom:"5px"}} alt="non veg" />}

                    </Card.Text>
                </Card.Body> 
            </Card>
        </>
    )
}

export default Product