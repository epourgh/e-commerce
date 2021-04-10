import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { Container, Button, Table, Message } from 'semantic-ui-react'
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
            <h2>Cart:</h2>
            <Table basic='very' celled collapsing>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            {(!cart.length) ? <Message><Message.Header>Empty Cart</Message.Header><p>Your cart is currently empty. Check out the items we have at our store.</p></Message> : ''}
                            <CartItems />
                        </Table.Cell>
                        <Table.Cell className={styles.subtotalTableCell}>
                            <h2>Subtotal({subtotal.count} item{(subtotal.count === 0 || subtotal.count > 1) ? 's' : ''})<b>{(subtotal.cost) ? `: $${subtotal.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</b></h2>
                            <Link to={(subtotal.count === 0) ? '#' : '/cart/shipping/'}>
                                <Button className={styles.checkoutButton} disabled={(subtotal.count === 0) ? true : false}>Checkout</Button>
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Container>
    )
}

export default CartPage; 