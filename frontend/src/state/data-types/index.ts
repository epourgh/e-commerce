export interface UserInfo { _id: number, name: string, username: string, token: string, 
                            id?: number, usernmae?: string, email?: string, isAdmin?: boolean, cuid?: string};

export interface Review { comment: string; createdAt: string; name: string; product: number; rating: number; user: number; _id: number; }

export interface ShopList { _id: number, createdAt: string, name: string, image: string, description: string, brand: string, category: string, countInStock: number, rating: number, numReviews: number, numFavorites: number, price: number, reviews?: Review[] };

export interface Address { address: string, city: string, country: string, postalCode: string };

export interface Product {
    id: number;
    qty?: number;
    product: ShopList;
}

export interface Total {
    count: number;
    cost: number;
}

export interface SampleCartReducer {
    product: Product[];
    total: Total;
    address: Address;
    payment: string;
}

export interface SampleCartReducer {
    product: Product[];
    total: Total;
    address: Address;
    payment: string;
}

export interface SampleOrderReducer {
    createdAt: string,
    isDelivered: boolean,
    deliveredAt: string | null,
    isPaid: boolean,
    paidAt: string | null,
    paymentMethod: string,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    shippingAddress: {
        address: string,
        city: string,
        postalCode: string,
        country: string
    },
    orderItems: Product[];
}

export interface SampleRefundReducer {
    orderId: number,
    userComment: string
}

export interface SampleFavoriteReducer {
    productId: number,
}

export interface SampleProductReducer {
    productId: number,
    userComment: string
}

export interface SamplePaymentIntentReducer {
    _id: number,
    paymentMethodId: string,
    name: string,
    email: string,
    totalPrice: number,
}

export interface SamplePaymentReducer {
    _id: number,
    paymentIntentId: string,
    paymentMethodId: string,
}

export interface SampleReviewReducer {
    productId: string,
    review: string,
    comment: string,
}