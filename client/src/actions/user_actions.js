import axios from 'axios';
import {API} from '../config'

export function addToCart(prod_id, usr_id) {

    const req = axios.get(`${API}/addToCart?prodId=${prod_id}&usr_id=${usr_id}`)
        .then((res) =>{ return res.data });
    
    return {
        type: 'ADD_TO_CART',
        payload: req
    }
}

export function decrementCart(prod_id, usr_id) {

    const req = axios.get(`${API}/decrementCart?prodId=${prod_id}&usr_id=${usr_id}`)
        .then((res) =>{ return res.data });
    
    return {
        type: 'DECREMENT_CART',
        payload: req
    }
}

export function removeFromCart(prod_id, usr_id) {

    const req = axios.get(`${API}/removeFromCart?prodId=${prod_id}&usr_id=${usr_id}`)
        .then(res => { return res.data; });
    
    return {
        type: 'REMOVE_FROM_CART',
        payload: req
    }
}
