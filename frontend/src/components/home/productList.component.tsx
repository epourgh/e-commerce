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
            <Grid columns={4} divided='vertically'>
                <Grid.Row>
                    {data.map((product: ShopList): JSX.Element | undefined => (
                        <Grid.Column key={product._id}>
                            <Product product={product} />
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        )
    } else {
        return <div></div>;
    }
}

export default ProductList;