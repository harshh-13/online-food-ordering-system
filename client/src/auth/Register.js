import {NavLink, useHistory } from 'react-router-dom';
import React, {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import {toast} from 'react-toastify';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Home from '../components/Home'
import Nav from '../components/Header'

const inputs = {
    margin: "30px",
    padding: "20px",
    backgroundColor: "#716F81",
    borderRadius:"20px",
    color:"white",
    marginLeft: "0px"
}

var link = {
    margin:"20px",
    padding:"10px",
    color:"white",
    textDecoration:"none"
}

export default function Register() {
    const [name, setName] = useState('')
    const [phno, setPhno] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [pwd, setPwd] = useState('')
    let history = useHistory();

    const {auth} = useSelector((state)=>({...state}))

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            await axios.post(`http://localhost:5000/api/register`,{
                name, phno, email, pwd, address, isAdmin:false
            })
            toast.success('Registration Success. Please Login.', {theme:'colored'})
            history.push('/');
        } catch(err){
            console.log(JSON.stringify(err.response))
            if(String(err.response.status)==="400")
                toast.error(err.response.data, {theme:'colored'})
        }
    }

   return <>
        <Nav />
        { auth===null && (
        <div className="Login-bg">
        <div className="container" style={{padding:"20px"}}>
            <div className="row m-1">
                <div className="col-md-8 my-auto mx-auto"  style={inputs} >
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <input type="text" 
                                    placeholder="Enter Full Name" 
                                    className="form-control"
                                    onChange={(e)=> setName(e.target.value)}
                                    value={name} required/>
                            </div>
                            <div className="form-group m-3">
                                <input type="tel" 
                                    minLength="10"
                                    maxLength="10"
                                    placeholder="Enter Phone Number(10 characters)" 
                                    className="form-control"
                                    onChange={(e)=> setPhno(e.target.value)}
                                    value={phno} required/>
                            </div>
                            <div className="form-group m-3">
                                <input type="text" 
                                    placeholder="Enter Address" 
                                    className="form-control"
                                    onChange={(e)=> setAddress(e.target.value)}
                                    value={address} required/>
                            </div>
                            <div className="form-group m-3">
                                <input type="email" 
                                    placeholder="Enter Email" 
                                    className="form-control"
                                    onChange={(e)=> setEmail(e.target.value)}
                                    value={email} required/>
                            </div>
                            <div className = "form-group m-3" >
                                <input type = "password"
                                    className = "form-control"
                                    value={pwd} 
                                    onChange={(e)=> setPwd(e.target.value)}
                                    placeholder = "Enter Password" required/>
                            </div>                            
                            <button type="submit" className="btn btn-primary text-center">Submit</button>                            
                        </form>
                    </div>
                    <div className="m-1 text-center">
                        <NavLink style={link} exact to="/login" >👉Already a User? Log In Here!👈</NavLink>
                    </div>
                </div>
            </div>
                                   
        </div>
            
    </div>)}
    { auth!==null && <Home /> }
    </>
}