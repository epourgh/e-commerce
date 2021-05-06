import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { Container, Table } from 'semantic-ui-react'
import globalStyles from '../../styles/Global.module.scss'
import { Link } from "react-router-dom";
import dotenv from 'dotenv'

const SubmittedPage = ({ match }) => {

    dotenv.config()

    const [token, order] = useTypedSelector((state) => [state.userInfo.data.token, state.order.data]);

    useEffect(() => {
        console.log(token)
        console.log('ORDER RESPONSE')
        console.log(order)
    }, [])
    
    const OrderTable = () => {

        if (order) {
            return (
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h3>Successfully Order Successfully Places!</h3>
                                <p>
                                    <Link to={`/user/order/${order._id}`}>Click here to submit payment</Link>
                                </p>
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <p>Item{(order.orderItems.length > 1)?'s':''} purchased:</p>
                            </Table.Cell>
                            <Table.Cell>
                                <ul>{
                                order.orderItems.map(orderItem => {
                                    return <li key={orderItem.key}>{orderItem.name}</li>;
                                })
                                }</ul>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )
        }

        return null;
    }
    

    return (
        <Container className={globalStyles.minHeight}>
            <br/>
            <OrderTable />
        </Container>
    )
}

export default SubmittedPage
