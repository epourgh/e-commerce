import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { storeExport } from './state/index';
import 'semantic-ui-css/semantic.min.css';

function importAll(r) {
    return r.keys().map(r);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment     
// @ts-ignore
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/)); 

ReactDOM.render(
    <Provider store={storeExport}>
        <App />
    </Provider>,
    document.getElementById('root')
);
