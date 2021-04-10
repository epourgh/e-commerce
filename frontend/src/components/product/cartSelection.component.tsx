import React, { useState} from 'react';
import styles from '../../styles/Product.module.scss'
import { Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useActions } from '../../hooks/useActions';
import { ShopList } from '../../state/data-types/index';

interface AddToCart {
    id: number;
    qty: number;
    product: ShopList;
}

interface CartSelection {
    product: ShopList
}

const CartSelection: React.FC<CartSelection> = ({product}): JSX.Element | null => {

    const { cart } = useActions();

    const [qty, setQty] = useState(1);
    const sumInStock = (!product.countInStock) ? 0 : product.countInStock;

    console.log(sumInStock)

    if (sumInStock < 1) {
        return null;
    }

    let menuItems = [];

    for (var stockNum = 0; stockNum < sumInStock + 1 && stockNum < 13; stockNum++) {
        menuItems.push(<option key={stockNum} value={stockNum}>{stockNum}</option>);
    }

    const addToCarthandler: React.FC<AddToCart> = (addProduct):null => {
        if (qty) {
            console.log(qty)
            cart('ADD', addProduct)
        }
        return null;
    }


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQty(parseInt(e.target.value));
    }


    return (
        <>
            <select onChange={handleChange} className={styles.numInStock}>
                <option value="#">Qty</option>
                {menuItems}
            </select>

            <Link to='/cart/'>
                <Button type="button"
                        disabled={!sumInStock} 
                        onKeyPress={() => addToCarthandler({id: product._id, qty, product})}
                        onClick={() => addToCarthandler({id: product._id, qty, product})}
                        >Add to Cart</Button>
            </Link>
        </>
    )
}

export default CartSelection;