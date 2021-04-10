import React from 'react';
import { ShopList } from '../../state/data-types/index';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CartSelection from './cartSelection.component';
import { Image, Header, Table } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import globalStyles from '../../styles/Global.module.scss'

interface Product {
    id: number;
    qty: number;
    product: ShopList;
}

interface CartItemsProps {
    cartItemsList: Product[];
}


const CartItems: React.FC= (): JSX.Element | null => {

    const [cartItemsList] = useTypedSelector((state) => [state.cart.product]);

    console.log(cartItemsList)

    if (!cartItemsList.length) {
        return null;
    }

    return (
        <Table basic='very' celled collapsing>
            <Table.Body>
                {
                    cartItemsList.map((item: Product) => {
                        return (
                            <Table.Row key={item.id} className={globalStyles.itemSpacing}>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Image src={item.product.image} rounded size='mini' />
                                            <Header.Content>
                                                <b><Link to={`/product/${item.product._id}`}>{item.product.name}</Link></b>
                                                <Header.Subheader>{item.product.price}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <CartSelection product={item.product} qty={item.qty} />
                                    </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )

}

export default CartItems; 