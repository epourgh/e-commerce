import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/home.page';
import CategoryPage from './pages/category.page';
import ProductPage from './pages/product.page';
import CartPage from './pages/cart/cart.page';
import ShippingPage from './pages/cart/shipping.page';
import OrderPage from './pages/cart/order.page';
import SubmittedPage from './pages/cart/submitted.page';
import PaymentPage from './pages/cart/payment.page';
import LoginPage from './pages/user/login.page';
import RegisterPage from './pages/user/register.page';
import ProfilePage from './pages/user/profile.page';
import UserOrders from './pages/user/orders.page';
import OrderDetailsPage from './pages/user/order.page';
import RefundPage from './pages/user/refund.page';
import FavoritesPage from './pages/user/favorites.page';
import Header from './components/header.component';
import Spacing from './components/spacing.component';
import Footer from './components/footer.component';

const App: React.FC = () => {
    return (
        <Router>
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
        </Router>
    );
}

export default App;