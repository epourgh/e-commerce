import React from 'react';
import { Dimmer, Loader, Image, Segment, Message } from 'semantic-ui-react'

interface LoadingReducer {
    loading: boolean;
    error: string | null;
}

interface LoadingProps {
    status: LoadingReducer
}

const Loading: React.FC<LoadingProps> = ({ status }): JSX.Element | null => {

    const { loading, error } = status;

    if (error) {
        <Message negative>
            <Message.Header>We're sorry, there was an issue loading up our content</Message.Header>
            <p>{error}</p>
        </Message>
    }

    if (!loading) {
        return null;
    } else {
        return (
            <Segment>
                <Dimmer active inverted>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>

                <Image src='/images/wireframe/short-paragraph.png' />
                <Image src='/images/wireframe/short-paragraph.png' />
                <Image src='/images/wireframe/short-paragraph.png' />
            </Segment>
        )
    }

}

export default Loading;