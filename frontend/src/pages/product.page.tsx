import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Form, Radio, Breadcrumb, Item, Rating, Container, TextArea, Button, Icon, Label, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import styles from '../styles/Product.module.scss'
import globalStyles from '../styles/Global.module.scss'

import { ShopList } from '../state/data-types/index';
import Loading from '../components/loading.component';
import CartSelection from '../components/product/cartSelection.component';
import isEmpty from '../middleware/isEmpty.middleware'

interface ProductProps {
    match: any
}

const ProductPage: React.FC<ProductProps> = ({ match }) => {

    const [reviewRating, setReviewRating] = useState('0');
    const [reviewComment, setReviewComment] = useState('');
    const [rating, setRating] = useState(4.5);
    const [isUserFavorite, setIsUserFavorite] = useState(0);
    const { postReview, checkIfReviewed, fetchProductDetails, getFavoriteById, setFavorite, unsetFavorite } = useActions();

    const [product, setProduct] = useState<ShopList>({
        _id: 0,
        name: '',
        image: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        numFavorites: 0,
        reviews: []
    })

    const [productDetails, userInfo, userFavorite, isReviewed ] = useTypedSelector((state) => [state.productDetails, state.userInfo, state.userFavorite, state.reviewReducer.checkIfUserReviewed]);

    useEffect(() => {
        fetchProductDetails(match.params.id, {}); /* eslint-disable react-hooks/exhaustive-deps */
        getFavoriteById({ productId: match.params.id }, userInfo.data.token); /* eslint-disable react-hooks/exhaustive-deps */
        checkIfReviewed({ productId: match.params.id }, userInfo.data.token)
    }, [])

    useEffect(() => {
        if (!isEmpty(productDetails.data)) {
            console.log(productDetails)
            let data = productDetails.data;
            setProduct(data)
        }
    }, [productDetails])

    useEffect(() => {
        console.log('isReviewed')
        console.log(isReviewed)
    }, [isReviewed])

    useEffect(() => {
        console.log(userFavorite.productPage)
        if (userFavorite.productPage === 'liked') {
            setIsUserFavorite(1)
        } else {
            setIsUserFavorite(0)
        }
    }, [userFavorite])

    const handleReviewSubmission = async () => {
        await postReview({ productId: product._id, rating: reviewRating, comment: reviewComment }, userInfo.data.token)
        await fetchProductDetails(match.params.id, {}); /* eslint-disable react-hooks/exhaustive-deps */
        await checkIfReviewed({ productId: match.params.id }, userInfo.data.token);
    }

    const handleSetFavoriteubmission = async () => {
        await setFavorite({ productId: product._id }, userInfo.data.token);
        await getFavoriteById({ productId: match.params.id }, userInfo.data.token); /* eslint-disable react-hooks/exhaustive-deps */
        await fetchProductDetails(match.params.id, {}); /* eslint-disable react-hooks/exhaustive-deps */
    }

    const handleUnsetFavoriteubmission = async () => {
        await unsetFavorite({ productId: product._id }, userInfo.data.token);
        await getFavoriteById({ productId: match.params.id }, userInfo.data.token); /* eslint-disable react-hooks/exhaustive-deps */
        await fetchProductDetails(match.params.id, {}); /* eslint-disable react-hooks/exhaustive-deps */
    }

    return (
        <Container className={globalStyles.minHeight}>
            <Loading status={productDetails} />
            <br /><br />
            <span className={styles.breadcrumb}>
                <Breadcrumb>
                    <Breadcrumb.Section><Link to='/'>Home</Link></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron' />
                    <Breadcrumb.Section active>{product.name}</Breadcrumb.Section>
                </Breadcrumb>
            </span>

            <br />

            <Item.Group>
                <Item>
                    <Item.Image size='large' src={product.image} />
                    <Item.Content verticalAlign='top'>
                        
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        {product.rating} <Rating icon='star' defaultRating={rating} maxRating={5} disabled /> {rating} {product.numReviews} reviews
                        <h2><b>{product.price}</b></h2>
                        <p>{(product.countInStock > 0) ? 'In Stock' : 'Currently Unavailable'}</p>

                        <CartSelection product={product} /> 
                        <Button as='div' labelPosition='right'>
                            {(isUserFavorite === 1) 
                                ? <Button icon onClick={() => handleUnsetFavoriteubmission()}><Icon name='star' className={globalStyles.starStyle} /></Button> 
                                : <Button icon onClick={() => handleSetFavoriteubmission()}><Icon name='star outline' /></Button>}
                            <Label as='a' basic pointing='left'>
                                {product.numFavorites}
                            </Label>
                        </Button>
                    </Item.Content>
                </Item>
            </Item.Group>

            <br />
            <div className="ui divider"></div>
            <br />
            
            <div className={styles.twoColGrid}>
                <div className={styles.columnA}>
                    {(isReviewed === 'reviewed') ? 
                    <Segment padded='very'>Thank you for reviewing this product!</Segment>
                    :
                    <div>
                        <h3>Leave a Review</h3>
                        <Form onSubmit={() => handleReviewSubmission()}>
                            <Form.Group inline>
                                <Form.Field
                                    control={Radio}
                                    label='Bad'
                                    checked={reviewRating === '1'}
                                    onChange={(e) => setReviewRating('1')}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Poor'
                                    checked={reviewRating === '2'}
                                    onChange={(e) => setReviewRating('2')}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Fair'
                                    checked={reviewRating === '3'}
                                    onChange={(e) => setReviewRating('3')}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Good'
                                    checked={reviewRating === '4'}
                                    onChange={(e) => setReviewRating('4')}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Excellent'
                                    checked={reviewRating === '5'}
                                    onChange={(e) => setReviewRating('5')}
                                />
                            </Form.Group>
                            <Form.Field
                                control={TextArea}
                                onChange={(e) => setReviewComment(e.target.value)}
                                placeholder='Tell us more about you...'
                            />
                            <Form.Field control={Button}>Submit</Form.Field>
                        </Form>
                    </div>
                    }
                </div>
                <div className={styles.columnB}>
                    <h3>Reviews</h3>
                    {(product.reviews.length > 0) ? product.reviews.map((review) => {
                        return (
                            <div>
                                <div className="ui divider"></div>
                                <Rating icon='star' defaultRating={review.rating} maxRating={5} disabled />
                                <p>{review.comment}</p>
                            </div>
                        )
                    }) : <p>There's currently no reviews to show.</p>}
                </div>
            </div>
            <br />
        </Container>
    )
}

export default ProductPage
