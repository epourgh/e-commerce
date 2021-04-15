import React from 'react';
import { Icon, Label, Menu } from 'semantic-ui-react'
import { faShoppingBag, faUser, faShippingFast, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import styles from '../styles/Header.module.scss'
import { useActions } from '../hooks/useActions';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { ReactSVG } from 'react-svg'

const IsLoggedIn = () => {

    const userInfo = useTypedSelector((state) => state.userInfo.data);
    const { UserLogout } = useActions();

    const logoutHandler = () => {
        console.log('logout')
        UserLogout();
    }

    if (userInfo._id) {
        return (
            <>
                <li>
                    <FontAwesomeIcon icon={faShippingFast} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/orders/" replace> Orders</Link>
                </li>
                <li>
                    <Icon name='star' />&nbsp;&nbsp;<Link to="/user/favorites/" replace> Favorites</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUser} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/profile" replace> {userInfo.username}</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignOutAlt} className={styles.faIcons} />&nbsp;&nbsp;<span className={styles.signout} onClick={() => logoutHandler()}> Sign Out</span>
                </li>
                
            </>
        );
    }

    return <li><FontAwesomeIcon icon={faUser} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/login" replace> Sign In</Link></li>;
    
}


const Header = () => {

    const cartCount = useTypedSelector((state) => state.cart.total.count);

    return (
        <header className={styles.header}>
            <ul className={styles.navbar}>
                <li>
                    <Link to="/" replace>
                        <img src='./images/circle.png' className={styles.logo} />
                    </Link>
                </li>
                <li>
                    <Link to="/cart" replace>
                        {
                            (cartCount)
                            ?
                            <Menu compact  className={styles.cartMenuItemStyle}>
                                <Menu.Item as='a'>
                                    <FontAwesomeIcon icon={faShoppingBag} className={styles.faIcons} />&nbsp;&nbsp;
                                    Cart&nbsp;
                                    <Label color='orange' floating className={styles.floatingCartTotalCount}>
                                        { cartCount }
                                    </Label>
                                </Menu.Item>
                            </Menu>
                            :
                            <>
                                <FontAwesomeIcon icon={faShoppingBag} className={styles.faIcons} /> &nbsp;&nbsp;
                                Cart
                            </>
                        }
                    </Link>
                </li>
                <IsLoggedIn />
            </ul>
        </header>
    )
}

export default Header
