import { useTypedSelector } from '../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions';

import { Container, Header, Segment, Grid, Image } from 'semantic-ui-react'
import globalStyles from '../styles/Global.module.scss'
import styles from '../styles/Home.module.scss'
import { Link } from "react-router-dom";

import Flickity from 'react-flickity-component'
import "../../node_modules/flickity/dist/flickity.min.css"; 


const HomePage: React.FC = () => {

    const [productList, userInfo, viewed] = useTypedSelector((state) => [state.productList, state.userInfo, state.viewed]);
    const { fetchProductList } = useActions();

    useEffect(() => {
        console.log(viewed)
        fetchProductList({}); /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const flickityOptions = {
        initialIndex: 0,
        freeScroll: false,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        groupCells: 2,
        autoPlay: 5000,
        pauseAutoPlayOnHover: true,
        fullscreen: false,
        lazyLoad: true,
        fade: true,
        dragThreshold: 10
    }

    return (
        <>
            <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false
            >
                <img src="/images/electronics-carousal.png" />
                <img src="/images/beauty-carousal.png" />
                <img src="/images/toys-carousal.png" />
            </Flickity>
            <Container className={globalStyles.HomeBodyContainer}>
                <br/>
                <Segment>
                    <Header as='h2'>
                        {(userInfo.data._id) ? <>Welcome, {userInfo.data.username}!</> : <>Sign In</>}
                    </Header>
                    <p>{(userInfo.data._id) ? <>Take a look at our latest items!</> : <>Thank about signing in or registering with us to take advantage of our deals!</>}</p>
                </Segment>
                <h3>Shop by category...</h3>
                <Grid relaxed columns={5}>
                    <Grid.Column className={styles.card}>
                        <Link to='./category/1'>
                            <Image src='/images/electronics.png' className={styles.gridImage} />
                            <h5>Electronics</h5>
                        </Link>
                    </Grid.Column>
                    <Grid.Column className={styles.card}>
                        <Link to='./category/2'>
                            <Image src='/images/videogames.png' className={styles.gridImage} />
                            <h5>Video games</h5>
                        </Link>
                    </Grid.Column>
                    <Grid.Column className={styles.card}>
                        <Link to='./category/3'>
                            <Image src='/images/shoes.png' className={styles.gridImage} />
                            <h5>Shoes</h5>
                        </Link>
                    </Grid.Column>
                    <Grid.Column className={styles.card}>
                        <Link to='./category/4'>
                            <Image src='/images/beauty.png' className={styles.gridImage} />
                            <h5>Beauty & Health</h5>
                        </Link>
                    </Grid.Column>
                    <Grid.Column className={styles.card}>
                        <Link to='./category/5'>
                            <Image src='/images/toys.png' className={styles.gridImage} />
                            <h5>Toys & Kids</h5>
                        </Link>
                    </Grid.Column>
                </Grid>
                {
                    (viewed[0].id !== 0) 
                    ?
                    <>
                        <h3>Recently viewed items...</h3>
                        <Grid relaxed columns={5}>
                            {
                                viewed.map((viewedProduct) => {
                                    return (
                                        <Grid.Column className={styles.card}>
                                            <Link to={`./product/${viewedProduct.id}`}>
                                                <Image src={viewedProduct.product.image} className={styles.gridImage} />
                                                <h5>{viewedProduct.product.name}</h5>
                                            </Link>
                                        </Grid.Column>
                                    )
                                })
                            }
                        </Grid>
                    </>
                    :<></>
                }
                <br /><br />
            </Container>
        </>
    );
}

export default HomePage;


