import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CheckoutSteps from '../../components/checkoutSteps.component'
import { Container, Button, Grid, Table, Header, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import styles from '../../styles/Order.module.scss'
import globalStyles from '../../styles/Global.module.scss'
import { useActions } from '../../hooks/useActions';


const OrderPage = () => {
    const [token, cart, payment, address, subtotal, paymentIntent] = useTypedSelector((state) => [state.userInfo.data.token, state.cart.product, state.cart.payment, state.cart.address, state.cart.total, state.paymentIntent]);
    const { Order } = useActions();

    const [costRaw, setCostRaw] = useState({ shipping: 0, tax: 0, total: 0})
    const [costStr, setCostStr] = useState({ items: '', shipping: '', tax: '', total: '' })

    const placeOrderHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (!token) {
            return;
        }

        Order({
            paymentMethod: payment,
            itemsPrice: subtotal.cost,
            taxPrice: costRaw.tax,
            shippingPrice: costRaw.shipping,
            totalPrice: costRaw.total,
            shippingAddress: address,
            orderItems: cart,
            paymentIntentId: paymentIntent.paymentIntentId,
            paymentMethodId: paymentIntent.paymentMethodId
        }, token)

    }

    useEffect(() => {
        const shipped = subtotal.count * 4.95;
        const subtotaled = shipped + subtotal.cost;
        const taxed = subtotaled * .0825;

        setCostRaw({ shipping: shipped, tax: taxed, total: subtotaled + taxed })
        setCostStr({ items: `$${subtotal.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 
                     shipping: `$${shipped.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 
                     tax: `$${taxed.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 
                     total: `$${(subtotaled + taxed).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
                    })
    }, [])
    
    return (
        <Container className={globalStyles.minHeight}>
            <br/>
            <CheckoutSteps step={5} />
            <br/>
            <br/>
            <Grid doubling columns={2}>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <h2>Shipping:</h2>
                        <p>{address.address}, {address.city}, {address.country}, {address.postalCode}</p>

                        <hr className={globalStyles.hr} />
                        <h2>Payment Method</h2>
                        <p><b>Method:</b> {payment}</p>

                        <hr className={globalStyles.hr} />
                        <h2>Order Items</h2>
                        <Table basic='very'>
                            <Table.Body>
                                {
                                    cart.map((item) => {
                                        return (
                                            <Table.Row key={item.id}>
                                                <Table.Cell>
                                                    <Header as='h4' image>
                                                        <Image src={item.product.image} rounded size='mini' />
                                                        <Header.Content>
                                                            <b><Link to={`/product/${item.product._id}`}>{item.product.name}</Link></b>
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <p>{item.product.price} {(item.qty > 1) ? <b>x{item.qty}</b> : <></>}</p>
                                                </Table.Cell>
                                            </Table.Row>

                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <h3>Order Summary</h3>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <p>Items:</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{costStr.items}</p>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <p>Shipping: </p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{costStr.shipping}</p>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <p>Tax:</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{costStr.tax}</p>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <p>Total:</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{costStr.total}</p>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        {(!token) ? <Button disabled={!token}>Need to Login to Place Order</Button> : <Link to='/cart/submitted/'><Button className={styles.orderButton} onClick={(e) => placeOrderHandler(e)}>Place Order</Button></Link>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default OrderPage
