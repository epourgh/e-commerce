import React from 'react';
import styles from '../../styles/Product.module.scss';
import { Button, Table } from 'semantic-ui-react';
import { useActions } from '../../hooks/useActions';
import { ShopList } from '../../state/data-types/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'


interface AddToCart {
    id: number;
    qty: number;
    product: ShopList;
}

interface CartSelection {
    product: ShopList;
    qty: number;
}

const CartSelection: React.FC<CartSelection> = ({ product, qty }): JSX.Element | null => {

    const { cart } = useActions();

    const sumInStock = (!product.countInStock) ? 0 : product.countInStock;

    if (sumInStock < 1) {
        return null;
    }

    let menuItems = [];

    for (var stockNum = 0; stockNum < sumInStock + 1 && stockNum < 13; stockNum++) {
        menuItems.push(<option key={stockNum} value={stockNum} >{stockNum}</option>);
    }

    const addToCarthandler: React.FC<AddToCart> = (addProduct): null => {
        if (qty) {
            cart('ADD', addProduct)
        }
        return null;
    }


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        addToCarthandler({ id: product._id, qty: parseInt(e.target.value), product })
    }


    return (
        <>
                <select onChange={handleChange} className={styles.numInStock} defaultValue={qty}>
                    {menuItems}
                </select>
                <Button onClick={() => addToCarthandler({ id: product._id, qty: 0, product })}><FontAwesomeIcon icon={faTrash} className={styles.faIcons} /></Button>
        </>
    )
}

export default CartSelection;