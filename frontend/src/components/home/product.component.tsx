import React from 'react';
import { Grid, Image, Rating } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { ShopList } from '../../state/data-types/index';
import globalStyles from '../../styles/Global.module.scss'


interface ProductProps {
    product: ShopList
}

const Product: React.FC<ProductProps> = ({ product }): JSX.Element => {
    return (
        <Grid.Column key={product._id} className={globalStyles.card}>
            <Image src={`${product.image}`} wrapped className={globalStyles.imageStyle} />
            <h4>{product.name}</h4>
            <Rating icon='star' defaultRating={product.rating} maxRating={5} disabled /> {product.numReviews} reviews
            <br />

            {(product.countInStock > 0) ? <Link to={`/product/${product._id}`}>Check Out Product</Link> : <span className={globalStyles.alertText}>SOLD OUT</span>}
            <h5 className={globalStyles.fontReduceMargin}>{product.price}</h5>
            {(product.countInStock < 12 && product.countInStock > 0) ? <p className={globalStyles.alertTextSm}>Only {product.countInStock} left!</p> : <></>}            
        </Grid.Column>
    )
}

export default Product;