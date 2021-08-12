import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Home.css'
import Product from '../../components/Product/Product'
import homeImage from '../../assets/home.jpg'
import Header from '../../components/Header/Header'
import Aux from '../../hoc/Auxi'
import axios from '../../axios-orders'
import * as actionTypes from '../../store/actionTypes'
import Spinner from '../../components/Spinner/Spinner'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class Home extends Component {
    state = {
        books: [],
        error: false
    }
    
    componentDidMount () {
        this.setBooks()

        setTimeout(() => {
            if (this.props.hasPurchased) {   
                this.props.orderInit()
                this.props.setCart()
            }
        }, 2000)
    }

    setBooks = () => {
        axios.get('/books.json')
            .then(response => {
                this.setState({books: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    render () {
        let books = this.state.error ? <p>Books can't be loaded!</p> : <Spinner/>
        let orderConfirm = null

        if (Object.keys(this.state.books).length > 0) {
            books = (
                
                    <div className="home__container">
                        <img className="home__image" 
                        src={homeImage}
                        alt="Home" />
    
                        <div className="home__row">
                            {
                                Object.keys(this.state.books).map(book => {
                                    return <Product title={this.state.books[book].title}
                                            key={this.state.books[book].id}
                                            id={this.state.books[book].id} 
                                            price={parseFloat(this.state.books[book].price)}
                                            image={this.state.books[book].image}
                                            rating={parseFloat(this.state.books[book].rating)}
                                            clicked={this.props.onItemAdded}/>
                                })
                            }  
                        </div>
                    </div>
            )
            
            orderConfirm = (
                <div className="orderConfirm"
                    style={{
                        transform: this.props.hasPurchased ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.hasPurchased ? '1' : '0'
                    }}>
                    <CheckCircleIcon className="orderConfirm__Icon"/>
                    Your order has been placed!
                </div>
            )
        }
        return (
            <Aux>
                <Header totalItems={this.props.totalItems} user={this.props.user}/>
                <div className="home">
                    {orderConfirm}
                    {books}
                </div>               
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        hasPurchased: state.order.purchased,
        totalItems: state.shopping.count,
        user: state.shopping.user
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        orderInit: () => dispatch({type: actionTypes.ORDER_INIT}),
        setCart: () => dispatch({type: actionTypes.SET_CART}),
        onItemAdded: (itemAdded) => dispatch({type: actionTypes.ADD_TO_CART, item: itemAdded})
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home)
