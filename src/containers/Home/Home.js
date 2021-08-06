import React from 'react'

import './Home.css'
import Product from '../../components/Product/Product'
import homeImage from '../../assets/home.jpg'
import Header from '../../components/Header/Header'
import Aux from '../../hoc/Auxi'

function Home() {
    return (
        <Aux>
            <Header/>
            <div className="home">
                <div className="home__container">
                    <img className="home__image" 
                    src={homeImage}
                    alt="Home" />

                    <div className="home__row">
                        <Product title="The Alchemist"
                                id={1} 
                                price={197.00}
                                image="https://images-na.ssl-images-amazon.com/images/I/410llGwMZGL._SX328_BO1,204,203,200_.jpg"
                                rating={5}/>
                        <Product title="Man's Search For Meaning: The classic tribute to hope from the Holocaust"
                                id={2}  
                                price={174.00}
                                image="https://images-na.ssl-images-amazon.com/images/I/41ZgK6u73qL._SX313_BO1,204,203,200_.jpg"
                                rating={4}/>
                        <Product title="To Kill A Mockingbird: 50th Anniversary Edition: 60th Anniversary Edition"
                                id={3}  
                                price={335.00}
                                image="https://images-na.ssl-images-amazon.com/images/I/51Z9p5AecCL._SX307_BO1,204,203,200_.jpg"
                                rating={4}/>
                    </div>

                    <div className="home__row">
                        <Product title="Attitude Is Everything: Change Your Attitude ... Change Your Life!"
                                id={4} 
                                price={159.00}
                                image="https://images-na.ssl-images-amazon.com/images/I/41F8ATXoMOL._SX317_BO1,204,203,200_.jpg"
                                rating={4}/>
                        <Product title="Ikigai: The Japanese secret to a long and happy life"
                                id={5}  
                                price={317.00}
                                image="https://images-na.ssl-images-amazon.com/images/I/51T8OXMiB5L._SX356_BO1,204,203,200_.jpg"
                                rating={4}/>
                        <Product title="The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life" 
                                id={6}
                                price={322.00}
                                image="https://images-na.ssl-images-amazon.com/images/I/511vJPN7p5L._SX331_BO1,204,203,200_.jpg"
                                rating={5}/>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default Home
