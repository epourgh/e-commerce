import React from 'react';
import { Container } from 'semantic-ui-react'
import styles from '../styles/Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            Copyright &copy; Store
        </footer>
    )
}

export default Footer
