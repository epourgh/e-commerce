import React from 'react';
import Product from './product.component';
import { ShopList } from '../../state/data-types/index';
import { Grid } from 'semantic-ui-react'

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
        return <div></div>;
    }
}

export default ProductList;