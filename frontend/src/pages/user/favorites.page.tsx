import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, Table, Header, Image, Icon, Button, Label } from 'semantic-ui-react'
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
        <Container className={globalStyles.minHeight}>
            <h2>Your favorites:</h2>
            <Table basic='very' celled collapsing>
                <Table.Body>
                    {userFavoritesPage.map((item) => {
                        return (
                            <Table.Row key={item._id} className={globalStyles.itemSpacing}>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={item.image} rounded size='mini' />
                                        <Header.Content>
                                            <b><Link to={`/product/${item._id}`}>{item.name}</Link></b>
                                            <Header.Subheader>{item.price}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button icon onClick={(e) => handleUnfavoriteubmission(e, item._id)}>
                                        <Icon name='star' className={globalStyles.starStyle} />{item._id}
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default FavoritesPage
