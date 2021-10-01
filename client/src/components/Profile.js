import React, {useState} from 'react';
import Nav from './Header';
import Footer from './Footer';
import {useSelector} from 'react-redux';
import Home from './Home';
import UserOrders from './UserOrders'

const inputs = {
    margin: "30px",
    padding: "20px",
    backgroundColor: "#52616B",
    borderRadius:"20px",
    color:"white"
}


function Profile(){

    const {auth} = useSelector((state)=>({...state}))
    const [name, setName] = useState(auth.usr.name)
    const [address, setAddress] = useState(auth.usr.address)
    const [phno, setPhno] = useState(auth.usr.phno)
    const [email, setEmail] = useState(auth.usr.email)
    const [pwd, setPwd] = useState('')

    const handleSubmit= async(e)=>{}

    return  <>
        <Nav />
        <main style={{minHeight: "80vh"}}>
        { auth!==null && (
        <>
        <div className="container" style={{padding:"20px"}}>
            <div className="row m-1">
                <div className="col-md-8 my-auto mx-auto"  style={inputs} >
                    <div>
                        <form onSubmit={handleSubmit} >
                            <div className="form-group m-3">
                                <input type="text" 
                                    placeholder="Name"
                                    className="form-control"
                                    onChange={(e)=> setName(e.target.value)}
                                    value={name} required/>
                            </div>
                            <div className="form-group m-3">
                                <input type="tel" 
                                    className="form-control"
                                    onChange={(e)=>setPhno(e.target.value)}
                                    minLength="10"
                                    maxLength="10"
                                    value={phno} required/>
                            </div>
                            <div className="form-group m-3">
                                <input type="text" 
                                    className="form-control"
                                    disabled
                                    onChange={(e)=> setEmail(e.target.value)}
                                    value={email} required/>
                            </div>
                            <div className="form-group m-3">
                                <input type="text" 
                                    placeholder="Address"
                                    className="form-control"
                                    onChange={(e)=> setAddress(e.target.value)}
                                    value={address} required/>
                            </div>
                            <div className = "form-group m-3" >
                                <input type = "password"
                                    className = "form-control"
                                    value={pwd} 
                                    onChange={(e)=> setPwd(e.target.value)}
                                    placeholder = "Update Password" />
                            </div>                            
                            <button type="submit" className="btn btn-primary text-center">Update</button>                            
                        </form>
                    </div>
                </div>
            </div>                                   
        </div>
        <UserOrders />
        </>
    )}
    { auth===null && <Home /> }
    </main>
    <Footer />
    </>
}

export default Profile;