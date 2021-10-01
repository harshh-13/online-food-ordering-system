import React, {useState, useEffect} from 'react';
import './bootstrap.min.css'
import Nav from './Header';
import Footer from './Footer';
import HomeCarousel from './HomeCarousel';
import axios from 'axios';
import Product from './Product';
import {API} from '../config'
import {Row, Col} from 'react-bootstrap';

function Home(){

    const [items, setItems] = useState([])
    const URL = `${API}/all-items`

    useEffect(() => {
        let cancel = false;

        axios.get(URL).then((res) => {
            if (cancel) return;
            setItems(res.data);
        });

        return () => { 
            cancel = true;
        }
    });


    return  <div >
        <Nav />
        <HomeCarousel />

        <main style={{minHeight: "80vh"}} >
            <Row className="mt-5 mx-5">
                {
                    items.map(itm=>(
                        <Col key={itm._id} sm={12} md={6} lg={4} xl={3}>
                            <Product item = {itm} />
                        </Col>
                    ))
                }
            </Row>
        </main>
        <Footer />
    </div>
}

export default Home;