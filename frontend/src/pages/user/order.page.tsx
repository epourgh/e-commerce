import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useActions } from '../../hooks/useActions';
import { Container, Table } from 'semantic-ui-react'
import globalStyles from '../../styles/Global.module.scss'
import isEmpty from '../../middleware/isEmpty.middleware'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';

import StripeForm from '../../components/payment/stripe.component'
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../components/payment/promise.component';

const OrderDetailsPage = ({ match }) => {

    const [orderSubmitted, setOrderSubmitted] = useState<any>({
        _id: 0,
        createdAt: '',
        isDelivered: false,
        deliveredAt: null,
        isPaid: true,
        paidAt: '2021-01-01T06:00:00Z',
        orderItems: [
            { _id: 0, name: '' }
        ],
        paymentMethod: '',
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0.00,
        page: 'order'
    })

    const [refundDetails, setRefundDetails] = useState<any>('')
    const [userInfo, orderDetails] = useTypedSelector((state) => [state.userInfo.data, state.orderDetails.data]);
    const { fetchOrderDetails } = useActions();

    useEffect(() => {
        console.log('setRequestDetails');
        console.log({
            id: 0,
            isAccepted: false,
            isReviewed: false,
            order: 0,
            requestedAt: null,
            storeResponse: null,
        })
        fetchOrderDetails(match.params.id, userInfo); /* eslint-disable react-hooks/exhaustive-deps */
        setRefundDetails({
            id: 0,
            isAccepted: false,
            isReviewed: false,
            order: 0,
            requestedAt: null,
            storeResponse: null,
        })
    }, [])

    useEffect(() => {
        if (typeof orderDetails === 'undefined') {
            return;
        }

        if (!isEmpty(orderDetails.order)) {
            setOrderSubmitted(orderDetails.order)
        }
        if (!isEmpty(orderDetails.refund)) {
            setRefundDetails(orderDetails.refund)
        } else {
            setRefundDetails({
                id: 0,
                isAccepted: false,
                isReviewed: false,
                order: 0,
                requestedAt: null,
                storeResponse: null,
            })
        }
    }, [orderDetails])



    const OrderTable = () => {

            return (
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h3>Receipt</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <p>Items purchased:</p>
                            </Table.Cell>
                            <Table.Cell>
                                <ul>{
                                    orderSubmitted.orderItems.map(orderItem => {
                                        return <li key={orderItem._id}>{orderItem.name}</li>;
                                    })
                                }</ul>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <p>Payment Method:</p>
                            </Table.Cell>
                            <Table.Cell>
                                <p>{orderSubmitted.paymentMethod}</p>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <p>Shipping: </p>
                            </Table.Cell>
                            <Table.Cell>
                                <p>{orderSubmitted.shippingPrice}</p>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <p>Tax:</p>
                            </Table.Cell>
                            <Table.Cell>
                                <p>{orderSubmitted.taxPrice}</p>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <p>Total:</p>
                            </Table.Cell>
                            <Table.Cell>
                                <p>{orderSubmitted.totalPrice}</p>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )
    }

    return (
        <Container className={globalStyles.minHeight}>
            <br />
            <OrderTable />
            {
                (orderSubmitted.isPaid)?
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell positive>
                                    <FontAwesomeIcon icon={faCheckCircle} />&nbsp;&nbsp;
                                    This order has been paid on {moment(orderSubmitted.paidAt).format('llll')}. 
                                    {(refundDetails.requestedAt) 
                                     ? <b>Refund request submitted on {moment(refundDetails.requestedAt).format('llll')}</b> 
                                     : <Link to={`refund/${match.params.id}`}>Request Refund</Link> }
                                </Table.Cell>
                                <Table.Cell positive></Table.Cell>
                                <Table.Cell positive></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                :
                    <Elements stripe={stripePromise}>
                        <StripeForm orderSubmitted={orderSubmitted} />
                    </Elements>

            }

        </Container>
    )
}

export default OrderDetailsPage
