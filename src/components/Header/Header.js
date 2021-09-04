import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { auth } from '../../firebase'
import logo from '../../assets/logo.png'

function Header(props) {

    const authHandler = () => {
        if (props.user) {
            auth.signOut()
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src={logo} alt="amazon logo"/>
            </Link>

            <form action="#" className="header__search">
                    <input type="text" className="header__searchInput" placeholder="Search books"/>
                    <SearchIcon className="header__searchIcon" />
            </form>

            <div className="header__nav">
                <NavLink to={!props.user && "/login"} style={{ textDecoration: 'none' }}>
                    <div className="header__option" onClick={authHandler}>
                        <span className="header__optionTop">Hello {props.user ? props.user.email : 'Guest'}</span>
                        <span className="header__optionBottom">{props.user ? 'Sign out' : 'Sign in'}</span>
                    </div>
                </NavLink>
                <NavLink to={"/orders"} style={{ textDecoration: 'none' }}>
                    <div className="header__option">
                        <span className="header__optionTop">Your</span>
                        <span className="header__optionBottom">Orders</span>
                    </div>
                </NavLink>

                <NavLink to="/checkout" style={{ textDecoration: 'none' }}>
                    <div className="header__optionCart">
                        <ShoppingCartIcon className="cartIcon"/>
                        <span className="header__optionBottom header__CartCount">{props.totalItems}</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Header
