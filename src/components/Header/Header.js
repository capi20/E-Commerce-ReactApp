import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { auth } from '../../firebase'

function Header(props) {

    const authHandler = () => {
        if (props.user) {
            auth.signOut()
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo"/>
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <NavLink to={!props.user && "/login"} style={{ textDecoration: 'none' }}>
                    <div className="header__option" onClick={authHandler}>
                        <span className="header__optionTop">Hello {props.user ? props.user.email : 'Guest'}</span>
                        <span className="header__optionBottom">{props.user ? 'Sign out' : 'Sign in'}</span>
                    </div>
                </NavLink>
                <NavLink to={"/orders"} style={{ textDecoration: 'none' }}>
                    <div className="header__option">
                        <span className="header__optionTop">Returns</span>
                        <span className="header__optionBottom">& Orders</span>
                    </div>
                </NavLink>

                <NavLink to="/checkout" style={{ textDecoration: 'none' }}>
                    <div className="header__optionCart">
                        <ShoppingCartIcon className="cartIcon"/>
                        <span className="header__optionBottom header__CartCount">{props.cartItems.length}</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

const mapStatetoProps = state => {
    return {
        cartItems: state.shopping.cart,
        user: state.shopping.user
    }
}

export default connect(mapStatetoProps)(Header)
