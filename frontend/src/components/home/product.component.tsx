import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { ShopList } from '../../state/data-types/index';
import styles from '../../styles/Global.module.scss'


interface ProductProps {
    product: ShopList
}

const Product: React.FC<ProductProps> = ({ product }): JSX.Element => {
    return (
        <Card className={styles.cardMinHeight}>
            <Image src={`${product.image}`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Description>
                    <Card.Meta>
                            <Rating icon='star' defaultRating={product.rating} maxRating={5} disabled /> {product.numReviews} reviews
                    </Card.Meta>

                    {(product.countInStock > 0) ? <Link to={`/product/${product._id}`}>Check Out Product</Link> : <span className={styles.alertText}>SOLD OUT</span>}
                    <h3 className={styles.fontReduceMargin}>{product.price}</h3>
                    {(product.countInStock < 12 && product.countInStock > 0) ? <p className={styles.alertTextSm}>Only {product.countInStock} left!</p> : <></>}
                    
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Product;