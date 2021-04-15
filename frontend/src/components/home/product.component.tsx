import React from 'react';
import { Grid, Image, Rating, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { ShopList } from '../../state/data-types/index';
import globalStyles from '../../styles/Global.module.scss'


interface ProductProps {
    product: ShopList
}

const isNewlyPublishedItem = (time: string): boolean => {
    const x = new Date();
    const cutOffDate: Date = new Date(x.setDate(1))
    const setTimeDate: Date = new Date(time)

    return setTimeDate > cutOffDate;
}

const Product: React.FC<ProductProps> = ({ product }): JSX.Element => {

    
    return (
        <Grid.Column key={product._id} className={globalStyles.card}>

            {
                (isNewlyPublishedItem(product.createdAt))
                ?
                <Image label={{
                    as: 'a',
                    color: 'teal',
                    content: 'New',
                    icon: 'tag',
                    ribbon: true,
                }} src={`${product.image}`} wrapped className={globalStyles.imageStyle} />
                :
                <Image src={`${product.image}`} wrapped className={globalStyles.imageStyle} />

            }
        
            <h4>{product.name}</h4>
            {(product.countInStock > 0) ? <Link to={`/product/${product._id}`}>Check Out Product</Link> : <Label as='a' basic color='red' pointing>SOLD OUT</Label>}
            <br /><br />
            <Rating icon='star' defaultRating={product.rating} maxRating={5} disabled /> {product.numReviews} reviews
            <h5 className={globalStyles.fontReduceMargin}>{product.price}</h5>
            {(product.countInStock < 12 && product.countInStock > 0) ? <Label as='a' color='red'>Only {product.countInStock} left!</Label> : <></>}            
        </Grid.Column>
    )
}

export default Product;