import { useTypedSelector } from '../hooks/useTypedSelector';
import { Breadcrumb, Container } from 'semantic-ui-react'
import React from 'react';
import styles from '../styles/CheckOutSteps.module.scss'
import { Link } from "react-router-dom";

interface StepsProps {
    step: number; 
}

const CheckoutSteps: React.FC<StepsProps> = ({ step }) => {

    const [userId, address, payment] = useTypedSelector((state) => [state.userInfo.data._id, state.cart.address.address, state.cart.payment]);

    return (
        <Container>
            <Breadcrumb className={styles.breadcrumbLink} >
                <Breadcrumb.Section active={step === 1}>
                    {(step === 1 || userId !== 0) ? <>Login</> : <Link to="/user/login">Login</Link>}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active={step === 2}>
                    {(step === 2) ? <>Cart</> : <Link to="/cart/">Cart</Link>}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active={step === 3}>
                    {(step === 3) ? <>Shipping</> : (address.length) ? <Link to="/cart/shipping">Shipping</Link> : <>Shipping</>}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active={step === 4}>
                    {(step === 4) ? <>Payment</> : (address.length) ? <Link to="/cart/payment">Payment</Link> : <>Payment</>}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active={step === 5}>
                    {(step === 5) ? <>Review</> : (payment !== '') ? <Link to="/cart/order">Review</Link> : <>Review</>}
                </Breadcrumb.Section>
            </Breadcrumb>
        </Container>
    )
}

export default CheckoutSteps