import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, Table, Header, Image } from 'semantic-ui-react'
import globalStyles from '../../styles/Global.module.scss'
import styles from '../../styles/Product.module.scss'
import React from 'react'
import { useActions } from '../../hooks/useActions';
import { useState, useEffect } from 'react'
import isEmpty from '../../middleware/isEmpty.middleware'
import { Link } from "react-router-dom";
import moment from 'moment';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const OrdersPage = () => {

    const [userOrdersState, setUserOrdersState] = useState<any>([{
        _id: 0,
        createdAt: '2021-01-01T06:00:00Z',
        isDelivered: false,
        deliveredAt: null,
        isPaid: false,
        paidAt: null,
        orderItems: [
            { _id: 0, name: '', price: 0, image: '', qty: 0, }
        ],
        paymentMethod: '',
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    }])

    const [userInfo, userOrders] = useTypedSelector((state) => [state.userInfo.data, state.userOrders]);
    const { fetchUserOrders } = useActions();

    useEffect(() => {
        console.log('ORDER RESPONSE')
        console.log(userInfo.token)

        fetchUserOrders(userInfo); /* eslint-disable react-hooks/exhaustive-deps */

    }, [])

    useEffect(() => {
        if (typeof userOrders.data === 'undefined') {
            return;
        }
        console.log(userOrders.data)
        if (!isEmpty(userOrders.data)) {
            setUserOrdersState(userOrders.data)
        }
    }, [userOrders])

    return (
        <Container className={globalStyles.minHeight}>
            <br />
            {
                userOrdersState.slice(0).reverse().map((orderContent) => {
                    return (
                        <Table singleLine key={orderContent._id}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <p><b>Order Placed:</b> {moment(orderContent.createdAt).format('llll')}</p>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell><p><b>Delivery Status:</b> {(!orderContent.isPaid)?'Need to pay before item is delivered':(orderContent.isDelivered) ? 'Delivered' : 'In Transit'}</p></Table.HeaderCell>
                                    <Table.HeaderCell><p><Link to={`/user/order/${orderContent._id}`}>Order Details</Link></p></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Header>
                                    {
                                        (orderContent.isPaid) ? 
                                            <Table.Row>
                                                <Table.Cell positive>
                                                    <FontAwesomeIcon icon={faCheckCircle} />&nbsp;&nbsp;
                                                    This order has been marked as paid.
                                                </Table.Cell>
                                                <Table.Cell positive></Table.Cell>
                                                <Table.Cell positive></Table.Cell>
                                            </Table.Row>
                                        : 
                                            <Table.Row>
                                                <Table.Cell negative>
                                                <FontAwesomeIcon icon={faExclamationCircle} />&nbsp;&nbsp; Unpaid:&nbsp;  
                                                    <Link to={`/user/order/${orderContent._id}`}>click here</Link> to pay for the item.
                                                </Table.Cell>
                                                <Table.Cell negative></Table.Cell>
                                                <Table.Cell negative></Table.Cell>
                                            </Table.Row>
                                    }                                
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <ul>
                                            {
                                                orderContent.orderItems.map((item) => {
                                                    return (
                                                        <Table.Row key={item._id} className={styles.cartItemSpacing}>
                                                            <Table.Cell>
                                                                <Header as='h4' image>
                                                                    <Image src={item.image} rounded size='mini' />
                                                                    <Header.Content>
                                                                        <b><Link to={`/product/${item.product}`}>{item.name}</Link></b>
                                                                        <Header.Subheader>{item.price} {(item.qty > 1) ? <>(x{item.qty})</>:<></>}</Header.Subheader>
                                                                    </Header.Content>
                                                                </Header>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    );
                })
            }
            <br />
        </Container>
    )
}

export default OrdersPage
