import { Container, Form, Radio, Button } from 'semantic-ui-react'
import CheckoutSteps from '../../components/checkoutSteps.component'
import { Link } from "react-router-dom";
import React, { useState } from 'react'
import { useActions } from '../../hooks/useActions';
import globalStyles from '../../styles/Global.module.scss'

const PaymentPage = () => {

    const [paymentType, setPaymentType] = useState('PayPal')
    const { SavePaymentMethod } = useActions();

    const paymentHandler = () => {
        console.log(paymentType)
        SavePaymentMethod(paymentType)
    }
    
    return (
        <Container className={globalStyles.minHeight}>
            <br />
            <CheckoutSteps step={4} />
            <h1>Payment Method</h1>

            <Form>
                <Form.Field>
                    Selected value: <b>{paymentType}</b>
                </Form.Field>
                <Form.Field>
                    <Radio name='radioGroup' label='PayPal' value='PayPal' checked={paymentType === 'PayPal'} onClick={() => setPaymentType('PayPal')} /> 
                </Form.Field>
                <Form.Field>
                    <Radio name='radioGroup' label='Credit Card' value='Credit Card' checked={paymentType === 'Credit Card'} onClick={() => setPaymentType('Credit Card')} />
                </Form.Field>
            </Form>
            
            <br/>
            <br/>
            <Link to='/cart/order/'>
                <Button onClick={() => paymentHandler()}>Continue</Button>
            </Link>
        </Container>
    )
}

export default PaymentPage
