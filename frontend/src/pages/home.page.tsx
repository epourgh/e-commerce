import { useTypedSelector } from '../hooks/useTypedSelector';
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions';

import { Container, Header, Segment, Grid, Image } from 'semantic-ui-react'
import globalStyles from '../styles/Global.module.scss'
import styles from '../styles/Home.module.scss'
import { Link } from "react-router-dom";

import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomePage: React.FC = () => {

    const [productList, userInfo] = useTypedSelector((state) => [state.productList, state.userInfo]);
    const { fetchProductList } = useActions();

    useEffect(() => {
        fetchProductList({}); /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    return (
        <Container className={globalStyles.minHeight}>
            <br/>
            <Carousel>
                <div>
                    <img src="/images/electronics-carousal.png" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="/images/beauty-carousal.png" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="/images/toys-carousal.png" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>

            <Segment>
                <Header as='h2'>
                    {(userInfo.data._id) ? <>Welcome, {userInfo.data.username}!</> : <>Sign In</>}
                </Header>
                <p>{(userInfo.data._id) ? <>Take a look at our latest items!</> : <>Thank about signing in or registering with us to take advantage of our deals!</>}</p>
            </Segment>
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
            <br /><br />
        </Container>
    );
}

export default HomePage;


