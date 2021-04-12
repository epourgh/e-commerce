import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, Grid, Header, Image, Icon, Button } from 'semantic-ui-react'
import globalStyles from '../../styles/Global.module.scss'
import { useActions } from '../../hooks/useActions';
import { Link } from "react-router-dom";

const FavoritesPage = () => {

    const [userFavoritesPage, setUserFavoritesPage] = useState([]);
    const { getFavorites, unsetFavorite } = useActions();
    const [userInfo, userFavorite] = useTypedSelector((state) => [state.userInfo, state.userFavorite]);

    useEffect(() => {
        getFavorites(userInfo.data.token)
    }, [])

    useEffect(() => {
        if (!userFavorite.all) {
            return;
        }
        console.log('userFavorite.all')
        console.log(userFavorite.all)
        setUserFavoritesPage(userFavorite.all)
    }, [userFavorite])

    const handleUnfavoriteubmission = async (event, productId) => {
        await unsetFavorite({ productId }, userInfo.data.token);
        await getFavorites(userInfo.data.token)
    }

    return (
        <Container text className={globalStyles.minHeight}>
            
            <Grid>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <h2>Your favorites:</h2>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid.Row>

                {userFavoritesPage.map((item) => {
                    return (
                        <Grid.Row key={item._id}>
                            <Grid.Column width={14}>
                                <Grid>
                                    <Grid.Row >
                                        <Grid.Column width={4}>
                                            <Image src={item.image} rounded size='small' verticalAlign='middle' />
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <b><Link to={`/product/${item._id}`}>{item.name}</Link></b>
                                            <p>{item.price}</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Button icon onClick={(e) => handleUnfavoriteubmission(e, item._id)}>
                                    <Icon name='star' className={globalStyles.starStyle} />
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default FavoritesPage
