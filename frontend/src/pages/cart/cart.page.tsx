import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { Container, Button, Message, Grid } from 'semantic-ui-react'
import styles from '../../styles/Cart.module.scss'
import globalStyles from '../../styles/Global.module.scss'

import { Link } from "react-router-dom";
import CartItems from '../../components/cart/cartItems.component'
import CheckoutSteps from '../../components/checkoutSteps.component'

const CartPage = () => {

    const [cart, subtotal] = useTypedSelector((state) => [state.cart.product, state.cart.total]);

    useEffect(() => {
        console.log(cart)
    }, [])

    return (
        <Container className={globalStyles.minHeight}>
            <br />

            <CheckoutSteps step={2} />
            <Grid celled='internally'>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <h1>Cart:</h1>
                        {(!cart.length) 
                            ? <Message><Message.Header>Empty Cart</Message.Header><p>Your cart is currently empty. Check out the items we have at our store.</p></Message> 
                            : <CartItems />}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h2>Subtotal({subtotal.count} item{(subtotal.count === 0 || subtotal.count > 1) ? 's' : ''})<b>{(subtotal.cost) ? `: $${subtotal.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</b></h2>
                        <Link to={(subtotal.count === 0) ? '#' : '/cart/shipping/'}>
                            <Button className={styles.checkoutButton} disabled={(subtotal.count === 0) ? true : false}>Checkout</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default CartPage; 