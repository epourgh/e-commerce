import { useTypedSelector } from '../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions';
import Loading from '../components/loading.component';
import { Container, Header, Segment } from 'semantic-ui-react'
import ProductList from '../components/home/productList.component';
import globalStyles from '../styles/Global.module.scss'

const HomePage: React.FC = () => {

    const [productList, userInfo] = useTypedSelector((state) => [state.productList, state.userInfo]);
    const { fetchProductList } = useActions();

    useEffect(() => {
        fetchProductList({}); /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    return (
        <Container className={globalStyles.minHeight}>
            <br/>
            <Segment>
                <Header as='h2'>
                    {(userInfo.data._id) ? <>Welcome, {userInfo.data.username}!</> : <>Sign In</>}
                </Header>
                <p>{(userInfo.data._id) ? <>Take a look at our latest items!</> : <>Thank about signing in or registering with us to take advantage of our deals!</>}</p>
            </Segment>
        
            <h1>Latest Products</h1>
            <Loading status={{ loading: productList.loading, error: productList.error }} />
            <ProductList props={{ data: productList.data, loading: productList.loading, error: productList.error }} />
        </Container>
    );
}

export default HomePage;


