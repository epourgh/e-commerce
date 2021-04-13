import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, Button, Form, Message } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useActions } from '../../hooks/useActions';
import Loading from '../../components/loading.component';
import styles from '../../styles/Global.module.scss'

const ProfilePage = () => {
    const userInfo = useTypedSelector((state) => state.userInfo);
    const [name, setName] = useState(userInfo.data.name)
    const [email, setEmail] = useState(userInfo.data.username)
    const [password, setPassword] = useState('');
    const [passwordRetyped, setPasswordRetyped] = useState('');
    const [message, setMessage] = useState('');
    const { UserProfileEdit } = useActions();


    useEffect(() => {
        console.log(userInfo.data)
    }, [])


    const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

        if (password !== passwordRetyped) {
            setMessage('Passwords do not match.')
            return;
        }

        UserProfileEdit({ name, email, password, token: userInfo.data.token })
    }
    
    return (
        <Container text className={styles.minHeight}>
            <h1>Profile</h1>
            {(userInfo.data._id > 0) ? <h1>SUCCESS!</h1> : <h1></h1>}

            <Loading status={{ loading: userInfo.loading, error: userInfo.error }} />

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
                <Button type='submit' onClick={(e) => submitHandler(e)}>Submit Changes</Button>
            </Form>
        </Container>
    )
}

export default ProfilePage
