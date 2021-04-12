import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { Product } from '../data-types/index';

const initialState = [{ id: 0, product: { _id: 0, name: '', image: '', description: '', brand: '', category: '', countInStock: 0, rating: 0, numReviews: 0, numFavorites: 0, price: 0, token: '' } }];

const addToLocalStorage = (data) => localStorage.setItem('viewed', JSON.stringify({ data }));

const ViewedPageReducer = (
    state: Product[] = initialState,
    action: Action
): Product[] => {
    switch (action.type) {
        case ActionType.ADD_PAGE_TO_VIEWED:
            let  products = state || [];
            const item = action.payload;

            let productsExist: Product | undefined = (!products.length) ? initialState[0] : products.find((x: Product) => x.id === item.id);
            let itemExists = (!productsExist) ? initialState[0] : productsExist;

            if (itemExists.id !== 0) {
                products = products.filter((x: Product) => x.id !== item.id);
                products.unshift(item)
                addToLocalStorage(products)
                return products;
            } else {
                if (products[0].id === 0) {
                    products.shift();
                }
                products.unshift(item)
                products = (products.length > 5)?products.slice(5):products;
                addToLocalStorage(products)
                return products;
            }
        default:
            return state;
    }
};

export default ViewedPageReducer;