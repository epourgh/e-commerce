import React from 'react'
import globalStyles from '../styles/Global.module.scss'
import { Container } from 'semantic-ui-react'


const CategoryPage = ({ match }) => {
    return (
        <Container className={globalStyles.minHeight}>
            category: {match.params.id}
        </Container>
    )
}

export default CategoryPage
