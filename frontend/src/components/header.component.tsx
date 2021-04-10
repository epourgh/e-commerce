import React, { useEffect } from 'react';
import { Menu, Segment, Icon } from 'semantic-ui-react'
import { faShoppingBag, faUser, faShippingFast, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import styles from '../styles/Header.module.scss'
import { useActions } from '../hooks/useActions';

import { useTypedSelector } from '../hooks/useTypedSelector';


const IsLoggedIn = () => {

    const userInfo = useTypedSelector((state) => state.userInfo.data);
    const { UserLogout } = useActions();

    useEffect(() => {
        console.log(userInfo)
    }, [])

    const logoutHandler = () => {
        console.log('logout')
        UserLogout();
    }

    if (userInfo._id) {
        return (
            <>
                <Menu.Item>
                    <FontAwesomeIcon icon={faShippingFast} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/orders/" replace> Orders</Link>
                </Menu.Item>
                <Menu.Item>
                    <Icon name='star' />&nbsp;&nbsp;<Link to="/user/favorites/" replace> Favorites</Link>
                </Menu.Item>
                <Menu.Item>
                    <FontAwesomeIcon icon={faUser} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/profile" replace> {userInfo.username}</Link>
                </Menu.Item>
                <Menu.Item>
                    <FontAwesomeIcon icon={faSignOutAlt} className={styles.faIcons} />&nbsp;&nbsp;<span className={styles.signout} onClick={() => logoutHandler()}> Sign Out</span>
                </Menu.Item>
                
            </>
        );
    }

    return <Menu.Item><FontAwesomeIcon icon={faUser} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/user/login" replace> Sign In</Link></Menu.Item>;
    
}


const Header = () => {
    return (
        <header className={styles.header} >
            <Segment inverted>
                <Menu inverted secondary>
                    <Menu.Item>
                        <Link to="/" replace>eCommerce</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <FontAwesomeIcon icon={faShoppingBag} className={styles.faIcons} />&nbsp;&nbsp;<Link to="/cart" replace>Cart</Link>
                    </Menu.Item>
                    <IsLoggedIn />
                </Menu>
            </Segment>
        </header>
    )
}

export default Header
