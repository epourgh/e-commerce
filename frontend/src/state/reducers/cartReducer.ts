import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { Product, SampleCartReducer } from '../data-types/index';

const initialState = {
    product: [{ id: 0, qty: 0, product: { _id: 0, name: '', image: '', description: '', brand: '', category: '', countInStock: 0, rating: 0, numReviews: 0, numFavorites: 0, price: 0, token: '' } }],
    total: {
        count: 0,
        cost: 0
    },
    address: { address: '', city: '', country: '', postalCode: '' },
    payment: ''
}



const addToLocalStorage = (data) => localStorage.setItem('cart', JSON.stringify({ data }));

const CartReducer = (
    state: SampleCartReducer = initialState,
    action: Action
): SampleCartReducer => {
    switch (action.type) {
        case ActionType.CART_ADD:
            const product = state.product || [];
            const item = action.payload;

            const dummyTemplate = initialState.product[0];
            let productsExist: Product | undefined = (!product.length) ? dummyTemplate : product.find((x: Product) => x.id === item.id);
            let itemExists = (!productsExist) ? dummyTemplate : productsExist;
            let [itemTotalCount, itemTotalCost] = [item.qty, (item.product.price * item.qty)];

            if (itemExists.id !== 0) {
                itemTotalCount -= itemExists.qty;
                itemTotalCost -= (itemExists.product.price * itemExists.qty);
            }

            const total = {
                count: state.total.count + itemTotalCount,
                cost: state.total.cost + itemTotalCost
            }
 
            if (itemExists.id !== 0 && item.qty > 0) {

                let data = {
                    ...state,
                    product: product.map((x: Product) => x.id === itemExists.id ? item : x),
                    total
                }
                addToLocalStorage(data)
                
                return data;

            } else if (itemExists.id !== 0) {
                let data = {
                    ...state,
                    product: product.filter((x: Product) => x.id !== itemExists.id),
                    total
                }
                addToLocalStorage(data)
                return data;
            } else {
                let data = {
                    ...state,
                    product: [...product, item],
                    total
                }
                addToLocalStorage(data)
                return data;
            }
        case ActionType.SAVE_ADDRESS:
            let savedAddress = {
                ...state,
                address: action.payload
            }
            addToLocalStorage(savedAddress)
            return savedAddress;
        case ActionType.SAVE_PAYMENT_METHOD:
            let savedPaymentMethod = {
                ...state,
                payment: action.payload
            }
            addToLocalStorage(savedPaymentMethod)
            return savedPaymentMethod;
        case ActionType.CART_CLEAR:
            let savedCartClear = {
                ...state,
                product: [],
                total: initialState.total
            }
            addToLocalStorage(savedCartClear)
            return savedCartClear;
        default:
            return state;
    }
};

export default CartReducer;