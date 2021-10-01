import './App.css'; 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './auth/Register';
import Login from './auth/Login';

import Home from './components/Home';
import AddItem from './components/AddItem';
import Orders from './components/Orders';
import ItemScreen from './components/ItemScreen';
import Profile from './components/Profile';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

import PrivateRoute from './private/PrivateRoute';
import AdminRoute from './private/AdminRoute';

function App() {
  return (
	<div className="App-header">
        <ToastContainer 
            autoClose={1600} 
            hideProgressBar={true} />
	 	<BrowserRouter>
            <Switch>
    	 		<Route exact path="/login" component={Login}/>
    	 		<Route exact path="/register" component={Register}/>
                <Route path="/item/:id" component={ItemScreen}/>
    	 		<Route exact path="/" component={Home}/>

                <AdminRoute exact path="/add-item" component={AddItem}/>
                <AdminRoute exact path="/manage-orders" component={Orders}/>

    	 		<PrivateRoute exact path="/cart" component={Cart}/>
    	 		<PrivateRoute exact path="/profile" component={Profile}/>

                <Route component={NotFound} />
            </Switch>
	 	</BrowserRouter>
	</div> );

}

export default App;
