import { useTypedSelector } from '../hooks/useTypedSelector';
import React, { useState, useEffect } from 'react'
import { useActions } from '../hooks/useActions';
import Loading from '../components/loading.component';
import { Container, Button, Message, Grid } from 'semantic-ui-react'
import ProductList from '../components/home/productList.component';
import globalStyles from '../styles/Global.module.scss'

const CategoryPage = ({ match }) => {

    const [productList, userInfo] = useTypedSelector((state) => [state.productList, state.userInfo]);
    const { fetchProductListByCategory } = useActions();
    const [loadProductsCount, setLoadProductsCount] = useState(3)

    useEffect(() => {
        fetchProductListByCategory({ id: match.params.id, loadProductsCount }); /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    useEffect(() => {
        console.log(productList.data)
    }, [productList])

    const ViewMoreOrders = (e) => {
        e.preventDefault();
        setLoadProductsCount(loadProductsCount + 3)
        fetchProductListByCategory({ id: match.params.id, loadProductsCount: loadProductsCount + 3 }); /* eslint-disable react-hooks/exhaustive-deps */
    }

    return (
        <Container className={globalStyles.minHeight}>
            <br />
            <h1>Latest Products</h1>
            <Loading status={{ loading: productList.loading, error: productList.error }} />
            <ProductList props={{ data: productList.data, loading: productList.loading, error: productList.error }} />
                <Grid>
                    <Grid.Column textAlign="center">
                    {
                        (productList.data.length < 3)
                        ?
                        <></>
                        :
                        (
                        (!productList.isEndOfFeed) 
                        ?
                        <Button onClick={(e) => ViewMoreOrders(e)}>View More Products</Button>        
                        :  
                        <Message
                            icon='list alternate'
                            header='No More to Show'
                            content='These are all the products we have displayed in this category. If you need assistance looking for an order, let us know.' info
                        />
                        )
                    }
                    </Grid.Column>
                </Grid>
        </Container>

)
}

export default CategoryPage
