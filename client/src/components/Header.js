import '../App.css'
import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {BiUser, BiHome, BiCart, BiPowerOff, BiLogIn} from 'react-icons/bi';
import {useSelector, useDispatch} from 'react-redux';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

var link = {
    margin:"20px",
    padding:"8px 15px",
    paddingLeft:"10px",
    paddingRight:"10px",
    color:"white",
    textDecoration:"none"
}

var active = {
    color: "#FFB344",
    borderBottom: "2px solid #FFB344"
}

function Header(){
    let history = useHistory()
    const dispatch = useDispatch()

    const {auth} = useSelector((state)=>({...state}))

    const logout = () =>{
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        window.localStorage.removeItem('auth')
        toast.success('Logged Out Successfully!', {theme: 'colored'})       
        history.push('/')
    }

    return  <>
        <nav className="p-2 text-end bg-dark" style={{opacity:"0.9"}}>
            {auth!==null && !auth.usr.isAdmin && (
                <>
                    <NavLink style={link} activeStyle={active} exact to="/"><BiHome/> Home</NavLink>
                    <NavLink  style={link} activeStyle={active} exact to="/cart"><BiCart /> Cart</NavLink>                   
                    <NavLink  style={link} activeStyle={active} exact to="/profile"><BiUser /> {auth.usr.name}</NavLink>
                    <NavLink  style={link} exact to="/" onClick={logout}><BiPowerOff/> Logout</NavLink>                    
                </>
            )}

            {auth!==null && auth.usr.isAdmin && (
                <>                  
                    <NavLink  style={link} activeStyle={active} exact to="/orders">Orders</NavLink>
                    <NavLink  style={link} activeStyle={active} exact to="/add-item">Add Item</NavLink>
                    <NavLink  style={link} exact to="/" onClick={logout}><BiPowerOff/> Logout</NavLink>                    
                </>
            )}

            {auth===null && (
                <>
                    <NavLink style={link} activeStyle={active} exact to="/"><BiHome/> Home</NavLink>
                    <NavLink  style={link} activeStyle={active} exact to="/login"><BiLogIn/> Log In</NavLink>
                </>
            )}      
        </nav>
    </>
}

export default Header;