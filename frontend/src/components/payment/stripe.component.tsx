import React, { useState, useEffect } from 'react';
import { PaymentRequestButtonElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

interface OrderSubmitted {
    _id: number;
    totalPrice: number;
}

interface StripeFormProps {    
    orderSubmitted: OrderSubmitted;
}

const StripeForm: React.FC<StripeFormProps>  = ({orderSubmitted}) => {

    const [userInfo, paymentIntent, paymentMessage] = useTypedSelector((state) => [state.userInfo.data, state.paymentIntent, state.payment ]);
    const stripe = useStripe();
    const elements = useElements();
    const { setPaymentIntent, putPayment } = useActions();

    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentMethodId, setPaymentMethodId] = useState(null);
    const [paymentRequest, setPaymentRequest] = useState(null);
    
    const ELEMENT_OPTIONS = {
        style: {
            paymentRequestButton: {
                type: 'buy',
                theme: 'dark',
            },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        const consoleRes = (error) ? error : paymentMethod;
        
        setPaymentMethodId(paymentMethod.id)

        setPaymentIntent({
            _id: orderSubmitted._id,
            paymentMethodId: paymentMethod.id,
            totalPrice: orderSubmitted.totalPrice,
            name: userInfo.name,
            email: userInfo.username
        }, userInfo.token)
    };

    const confirmPaymentIntent = async (e) => {
        e.preventDefault();

        putPayment({
            _id: orderSubmitted._id,
            paymentIntentId: paymentIntent.paymentIntentId,
            paymentMethodId: paymentMethodId
        }, userInfo.token)

    };

    
    return (
        <form onSubmit={handleSubmit}>
            {(!paymentMethodId && !paymentMessage.success) ? <><CardElement /><button type="submit" disabled={!stripe}>Pay</button><br /></>:<></>}
            {(paymentMethodId && !paymentMessage.success) ? <button onClick={(e) => confirmPaymentIntent(e)}>Confirm</button>:<></>}
            {(paymentMessage.success)?<p>Successfully paid for product</p>:<></>}
        </form>
    )
}

export default StripeForm;
