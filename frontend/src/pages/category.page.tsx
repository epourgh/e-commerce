import { useTypedSelector } from '../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions';
import Loading from '../components/loading.component';
import { Container, Header, Segment } from 'semantic-ui-react'
import ProductList from '../components/home/productList.component';
import globalStyles from '../styles/Global.module.scss'



const CategoryPage = ({ match }) => {

    const [productList, userInfo] = useTypedSelector((state) => [state.productList, state.userInfo]);
    const { fetchProductListByCategory } = useActions();

    useEffect(() => {
        fetchProductListByCategory({ id: match.params.id }); /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    return (
        <Container className={globalStyles.minHeight}>
            <br />
            <h1>Latest Products</h1>
            <Loading status={{ loading: productList.loading, error: productList.error }} />
            <ProductList props={{ data: productList.data, loading: productList.loading, error: productList.error }} />
        </Container>
    )
}

export default CategoryPage
