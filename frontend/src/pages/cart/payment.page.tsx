import { Container, Button } from 'semantic-ui-react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CheckoutSteps from '../../components/checkoutSteps.component'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { useActions } from '../../hooks/useActions';
import globalStyles from '../../styles/Global.module.scss'

import StripeForm from '../../components/payment/stripe.component'
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../components/payment/promise.component';


const PaymentPage = () => {

    const [payment, subtotal, paymentIntent] = useTypedSelector((state) => [state.cart.payment, state.cart.total, state.paymentIntent ]);
    const [paymentType, setPaymentType] = useState('Card')
    const [continueButton, setContinueButton] = useState(false);
    const { SavePaymentMethod } = useActions();

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
        page: 'payment'
    })


    const paymentHandler = () => {
        SavePaymentMethod(paymentType)
    }

    useEffect(() => {
        const shipped = subtotal.count * 4.95;
        const subtotaled = shipped + subtotal.cost;
        const taxed = subtotaled * .0825;

        setOrderSubmitted({
            _id: 0,
            createdAt: '',
            isDelivered: false,
            deliveredAt: null,
            isPaid: false,
            paidAt: '2021-01-01T06:00:00Z',
            orderItems: [
                { _id: 0, name: '' }
            ],
            paymentMethod: payment,
            shippingPrice: shipped,
            taxPrice: taxed,
            totalPrice: subtotaled + taxed,
            page: 'payment'
        })

    }, [])

    useEffect(() => {
        if (paymentIntent.success) {
            setContinueButton(true)
        }
    }, [paymentIntent])
    
    return (
        <Container className={globalStyles.minHeight}>
            <br />
            <CheckoutSteps step={4} />
            <h1>Payment Method</h1>

            <Elements stripe={stripePromise}>
                <StripeForm orderSubmitted={orderSubmitted} />
            </Elements>
            
            <br/>
            <br/>
            {
                (continueButton)
                ?
                <Link to='/cart/order/'>
                    <Button onClick={() => paymentHandler()}>Continue</Button>
                </Link>
                :
                <></>
            }
        </Container>
    )
}

export default PaymentPage
