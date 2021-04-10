import React, { useState } from 'react'
import { useActions } from '../../hooks/useActions';
import { Container, Form, Button, TextArea  } from 'semantic-ui-react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import globalStyles from '../../styles/Global.module.scss'

const RefundPage = ({ match }) => {
2
    const [ userInfo ] = useTypedSelector((state) => [ state.userInfo.data ]);
    const [ userComment, setUserComment ] = useState('');
    const { setRefund } = useActions();

    const handleSubmit = () => {
        setRefund({
            orderId: match.params.id,
            userComment
        }, userInfo.token)
    }

    return (
        <Container className={globalStyles.minHeight}>
            <h1>Request Refund</h1>
            <Form onSubmit={() => handleSubmit()}>
                <Form.Field
                    control={TextArea}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Please leave a response on why you're returning this item."
                />
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </Container>
    )
}

export default RefundPage
