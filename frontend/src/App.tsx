import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/home.page'));
const CategoryPage = lazy(() => import('./pages/category.page'));
const ProductPage = lazy(() => import('./pages/product.page'));
const CartPage = lazy(() => import('./pages/cart/cart.page'));
const ShippingPage = lazy(() => import('./pages/cart/shipping.page'));
const OrderPage = lazy(() => import('./pages/cart/order.page'));
const SubmittedPage = lazy(() => import('./pages/cart/submitted.page'));
const PaymentPage = lazy(() => import('./pages/cart/payment.page'));
const LoginPage = lazy(() => import('./pages/user/login.page'));
const RegisterPage = lazy(() => import('./pages/user/register.page'));
const ProfilePage = lazy(() => import('./pages/user/profile.page'));
const UserOrders = lazy(() => import('./pages/user/orders.page'));
const OrderDetailsPage = lazy(() => import('./pages/user/order.page'));
const RefundPage = lazy(() => import('./pages/user/refund.page'));
const FavoritesPage = lazy(() => import('./pages/user/favorites.page'));
const Header = lazy(() => import('./components/header.component'));
const Spacing = lazy(() => import('./components/spacing.component'));
const Footer = lazy(() => import('./components/footer.component'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Spacing />
                    <Route path='/' component={HomePage} exact />
                    <Route path='/category/:id' component={CategoryPage} exact />
                    <Route path='/product/:id' component={ProductPage} exact />
                    <Route path='/cart' component={CartPage} exact />
                    <Route path='/cart/shipping' component={ShippingPage} exact />
                    <Route path='/cart/order' component={OrderPage} exact />
                    <Route path='/cart/submitted' component={SubmittedPage} exact />
                    <Route path='/cart/payment' component={PaymentPage} exact />
                    <Route path='/user/login' component={LoginPage} exact />
                    <Route path='/user/register' component={RegisterPage} exact />
                    <Route path='/user/profile' component={ProfilePage} exact />
                    <Route path='/user/orders' component={UserOrders} exact />
                    <Route path='/user/order/:id' component={OrderDetailsPage} exact />
                    <Route path='/user/order/refund/:id' component={RefundPage} exact />
                    <Route path='/user/favorites' component={FavoritesPage} exact />
                <Footer />
            </Suspense>
        </Router>
    );
}

export default App;