import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, { useState } from 'react'
import { Container, Button, Form, Message } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import { useActions } from '../../hooks/useActions';
import globalStyles from '../../styles/Global.module.scss'

const RegisterPage = () => {
    const userInfo = useTypedSelector((state) => state.userInfo);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetyped, setPasswordRetyped] = useState('');
    const [message, setMessage] = useState('');
    const { UserRegistration } = useActions();


    const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

        if (password !== passwordRetyped) {
            setMessage('Passwords do not match.')
            return;
        }

        UserRegistration({ name, email, password })    
    }

    return (
        <Container className={globalStyles.minHeight}>
            <h1>Registration</h1>
            {(userInfo.data._id > 0) ? <h1>SUCCESS!</h1> : <></>}
            {(message !== '') ? <Message.Header>{message}</Message.Header> : <></>}
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Retype Password</label>
                    <input placeholder='Password' type='password' value={passwordRetyped} onChange={(e) => setPasswordRetyped(e.target.value)} required />
                </Form.Field>
                <Button type='submit' onClick={(e) => submitHandler(e)}>Register</Button>
                <p><Link to='/user/login'>Return back to login page</Link></p>
            </Form>
        </Container>
    )
}

export default RegisterPage
