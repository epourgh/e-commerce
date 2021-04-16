import { useTypedSelector } from '../hooks/useTypedSelector';
import { Breadcrumb, Step, Container, Icon, Grid } from 'semantic-ui-react'
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
            <Grid>
                <Grid.Column textAlign="center">
                    <Step.Group unstackable>
                        <Step disabled={userId !== 0}>
                            <Icon name='user' />
                            <Step.Content>
                                {(step === 1 || userId !== 0) ? <Step.Title>Login</Step.Title> : <Link to="/user/login"><Step.Title>Login</Step.Title></Link>}
                                <Step.Description>login or register</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step>
                            <Icon name='cart' />
                            <Step.Content>
                                {(step === 2) ? <Step.Title>Cart</Step.Title> : <Link to="/cart/"><Step.Title>Cart</Step.Title></Link>}
                                <Step.Description>Confirm item</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step disabled={!address.length}>
                            <Icon name='plane' />
                            <Step.Content>
                                {(step === 3) ? <Step.Title>Address</Step.Title> : (address.length) ? <Link to="/cart/shipping"><Step.Title>Address</Step.Title></Link> : <Step.Title>Address</Step.Title>}
                                <Step.Description>Confirm address</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step disabled={!address.length}>
                            <Icon name='dollar' />
                            <Step.Content>
                                {(step === 4) ? <Step.Title>Billing</Step.Title> : (address.length) ? <Link to="/cart/payment"><Step.Title>Billing</Step.Title></Link> : <Step.Title>Billing</Step.Title>}
                                <Step.Description>Enter billing information</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step disabled={payment === ''}>
                            <Icon name='info circle' />
                            <Step.Content>
                                {(step === 5) ? <Step.Title>Confirm Order</Step.Title> : (payment !== '') ? <Link to="/cart/order"><Step.Title>Confirm Order</Step.Title></Link> : <Step.Title>Confirm Order</Step.Title>}
                                <Step.Description>Verify order details</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Grid.Column>
            </Grid>

            <br /><br />
        </Container>
    )
}

export default CheckoutSteps