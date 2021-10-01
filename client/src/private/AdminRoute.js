import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const AdminRoute = ({...rest}) => {
    const {auth} = useSelector((state)=>({...state}))
    return auth && auth.token && auth.usr.isAdmin ? <Route {...rest}/> : <Redirect to="/notfound"/>
}

export default AdminRoute