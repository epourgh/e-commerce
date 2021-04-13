import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, Button, Form, Message } from 'semantic-ui-react'
import { useActions } from '../../hooks/useActions';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import CheckoutSteps from '../../components/checkoutSteps.component'
import globalStyles from '../../styles/Global.module.scss'

const ShippingPage = () => {

    const cart: any = useTypedSelector((state) => state.cart);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const { SaveAddress } = useActions();

    useEffect(() => {
        setAddress(cart.address.address);
        setCity(cart.address.city);
        setCountry(cart.address.country);
        setPostalCode(cart.address.postalCode);
    }, [])

    const addressHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // e.preventDefault();
        SaveAddress({address: address, city, country, postalCode})
    }

    return (
        <Container text className={globalStyles.minHeight}>
            <br />
            <CheckoutSteps step={3} />

            <h1>Shipping</h1>
            <Form>
                <Form.Field>
                    <label>Address</label>
                    <input placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Field>

                <Form.Field>
                    <label>City</label>
                    <input placeholder='City' type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                </Form.Field>

                <Form.Field>
                    <label>Country</label>
                    <input placeholder='Country' type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Form.Field>

                <Form.Field>
                    <label>Postal Code</label>
                    <input placeholder='Postal Code' type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </Form.Field>
                
                <Link to={(address == '' || city == '' || country == '' || postalCode == '') ? '#' : '/cart/payment/'}>
                   <Button disabled={address == '' || city == '' || country == '' || postalCode == ''} onClick={(e) => addressHandler(e)}>Verify Address</Button>
                </Link>
            </Form>
        </Container>
    )
}

export default ShippingPage
