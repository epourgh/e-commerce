import { Container, Button, Form, Message } from 'semantic-ui-react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { useActions } from '../../hooks/useActions';
import globalStyles from '../../styles/Global.module.scss'

import { useHistory } from "react-router-dom";


const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [credentialsAlert, setCredentialsAlert] = useState(null)
    const [userInfo] = useTypedSelector((state) => [state.userInfo.data]);
    const { UserLogin } = useActions();
    let history = useHistory();

    useEffect(() => {
        console.log(userInfo)
        if (userInfo.token !== '') {
            console.log('you are logged in')    
            history.push("/");        
        }
    }, [userInfo])

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(userInfo)
        UserLogin({ email, password })
        setCredentialsAlert(true)
    }

    return (
        <Container className={globalStyles.minHeight}>
            {(credentialsAlert) ? <Message negative>
                <Message.Header>Credentials did not match</Message.Header>
                <p>Wrong User or Password </p>
            </Message>:<></>}
            <h1>Sign In</h1>
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Field>
                <Button type='submit' onClick={(e: any) => submitHandler(e)}>Sign In</Button>
                <p><Link to='/user/register'>Click here to register for an account</Link></p>
            </Form>
        </Container>
    )
}

export default LoginPage
