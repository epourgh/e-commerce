import React from 'react';
import { Icon, Label, Menu } from 'semantic-ui-react'
import { faShoppingBag, faUser, faShippingFast, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import styles from '../styles/Header.module.scss'
import { useActions } from '../hooks/useActions';
import { UserInfo } from '../state/data-types/index';
import { useState } from 'react'

import { useTypedSelector } from '../hooks/useTypedSelector';
import Hamburger from 'hamburger-react'

const IsLoggedIn: React.FC<{ isOpen: boolean, userInfo: UserInfo }> = ({isOpen, userInfo}) => {
    const { UserLogout } = useActions();


    const logoutHandler = () => {
        console.log('logout')
        UserLogout();
    }

    if (userInfo._id) {
        return (
            <>

                {
                    (isOpen)
                        ?
                        <ul className={styles.isLoggedInMenuItems}>
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
                        </ul>
                        :
                        <></>
                }
                
            </>
        );
    }

    return <li><FontAwesomeIcon icon={faUser} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/login" replace> Sign In</Link></li>;
    
}

const Header = () => {

    const cartCount = useTypedSelector((state) => state.cart.total.count);
    const userInfo = useTypedSelector((state) => state.userInfo.data);
    const [isOpen, setOpen] = useState(false)

    return (
        <header className={styles.header}>
            <ul className={styles.navbar}>
                {
                    (userInfo._id)
                    ?
                    <li className={styles.hamburger} >
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </li>
                    :
                    <></>
                }
                <li>
                    <Link to="/" replace>
                        <img src='./images/circle.jpg' className={styles.logo} />
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
                <IsLoggedIn isOpen={isOpen} userInfo={userInfo} />
            </ul>
        </header>
    )
}

export default Header
