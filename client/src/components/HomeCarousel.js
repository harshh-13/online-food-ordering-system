import {Carousel} from 'react-bootstrap';
import biryani from '../assets/biryani.jpg'
import pizza from '../assets/pizza.jpg'
import cake from '../assets/cake.jpg'
import React from 'react'

const HomeCarousel = () => {
    return (
        <>
            <Carousel pause='hover' className='bg-dark mx-auto'>
                <Carousel.Item>
                    <img
                        className="d-block w-100" src={biryani}
                        style={{height:"550px", overflow:"hidden"}}
                        alt="Biryani" />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100" src={pizza} 
                    style={{height:"550px", overflow:"hidden"}}
                    alt="Pizza" />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100" src={cake}
                    style={{height:"550px", overflow:"hidden"}}
                    alt="Cake" />                    
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel