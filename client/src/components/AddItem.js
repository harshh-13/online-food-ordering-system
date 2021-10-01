import Nav from './Header';
import {toast} from 'react-toastify';
import Footer from './Footer';
import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { Button, Input } from 'antd';
import axios from 'axios';
import {API} from '../config'

function AddItem(props) {

    const { TextArea } = Input;

    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState()
    const [img, setImg] = useState('')
    const [type, setType] = useState('Biryani')
    const [isVeg, setIsVeg] = useState(true)
    const [isBest, setIsBest] = useState(true)
    const [rest_name, setRest_name] = useState('')  

    const types = [
        { key: "Biryani", value: "Biryani" },
        { key: "Cake", value: "Cake" },
        { key: "Pizza", value: "Pizza" },
        { key: "Ice Cream", value: "Ice Cream" }
    ]

    const onSubmit = async(e) => {
        e.preventDefault();

        if (!itemName || !itemDesc || !itemPrice || !rest_name || !img ) {
            return toast.error('Fill all the fields first!',{theme:'colored'})
        }

        const variables = { itemName, itemDesc, itemPrice, img, isBest, isVeg, rest_name, type  }

        let res = await axios.post(`${API}/add-item`, variables)
        if(res.data){  
            toast.success('Item Successfully Added!', {theme:'colored'})
        }
        else{
            toast.error('Failed to add Item!', {theme:'colored'})
        }
    }

    return <>
        <Nav/>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Form onSubmit={onSubmit} >
                <label className="mt-3" >Item Name</label>&emsp;
                <Input
                    onChange={(e)=> setItemName(e.target.value)}
                    value={itemName}
                />
                <br /><br />
                <label>Restaurant Name</label>&emsp;
                <Input
                    onChange={(e)=> setRest_name(e.target.value)}
                    value={rest_name}
                />
                <br /><br />
                <label>Type</label>&emsp;
                <select onChange={(e)=> setType(e.target.value)} value={type}>
                    {types.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br /><br />
                <label>Description</label>&emsp;
                <TextArea
                    onChange={(e)=> setItemDesc(e.target.value)}
                    value={itemDesc}
                />
                <br /><br />
                <label>Image URL</label>&emsp;
                <Input
                    onChange={(e)=> setImg(e.target.value)}
                    value={img}
                />
                <br /><br />
                <label>Is Veg?</label>&emsp;
                <select onChange={(e)=> setIsVeg(e.target.value)} value={isVeg}>
                    <option value={true}>True </option>
                    <option value={false}>False </option>
                </select>
                <br /><br />
                <label>Is Best?</label>&emsp;
                <select onChange={(e)=> setIsBest(e.target.value)} value={isBest}>
                    <option value={true}>True </option>
                    <option value={false}>False </option>
                </select>
                <br /><br />
                <label>Price(₹)</label>&emsp;
                <Input
                    onChange={(e)=> setItemPrice(e.target.value)}
                    value={itemPrice}
                    type="number"
                />
                <br /><br />

                <Button onClick={onSubmit} className="btn btn-primary mb-3">
                    Submit
                </Button>
            </Form>

        </div>
        <Footer />
        </>
}

export default AddItem