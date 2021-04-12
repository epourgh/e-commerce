import React from 'react';
import { ShopList } from '../../state/data-types/index';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CartSelection from './cartSelection.component';
import { Image, Header, Grid } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import globalStyles from '../../styles/Global.module.scss'
import styles from '../../styles/Cart.module.scss'

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
        <Grid divided='vertically'>
            {
                cartItemsList.map((item: Product) => {
                    return (
                        <Grid.Row columns={2}>
                            <Grid.Column width={11}>
                                <Header as='h4' image>
                                    <Image src={item.product.image} rounded size='mini' />
                                    <Header.Content>
                                        <b><Link to={`/product/${item.product._id}`}>{item.product.name}</Link></b>
                                        <Header.Subheader>{item.product.price}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <CartSelection product={item.product} qty={item.qty} />
                            </Grid.Column>
                        </Grid.Row>
                    )
                })
            }
        </Grid>
    )

}

export default CartItems; 