import React from 'react'
import {Link} from 'react-router-dom'
import './bootstrap.min.css'
import Err404 from '../assets/Err404.jpg'

const NotFound = () => {
    return (
        <div className="jumbotron d-flex align-items-center min-vh-100">
            <div className="container">
                <img src={Err404} alt="Page Not Found!" /> <br/> <br/>
                <Link to='/'>
                    <button className="btn btn-success mt-2">Go Home</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound