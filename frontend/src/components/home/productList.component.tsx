import React from 'react';
import Product from './product.component';
import { ShopList } from '../../state/data-types/index';
import { Grid, Message } from 'semantic-ui-react'

interface ItemListReducer {
    data: ShopList[];
    loading: boolean;
    error: string | null;
}

interface ItemListProps {
    props: ItemListReducer
}

const ProductList: React.FC<ItemListProps> = ({ props }): JSX.Element => {
    const { data, loading, error } = props;

    if (!error && !loading && data.length) {
        return (
            <Grid doubling columns={3}>
                {data.map((product: ShopList): JSX.Element | undefined => (
                    <Product product={product} />
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid>
                <Grid.Column textAlign="center">
                    <Message
                        icon='list alternate'
                        header='Category is Empty'
                        content='This category is currently inventory. Check again with us soon, inventory is in the process of being restocked!' info
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

export default ProductList;