import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from 'react-router-dom';
import client from './apollo/client';
import {ApolloProvider} from '@apollo/client';
import './fonts/HWT Unit Gothic W03 722.ttf';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <App/>
                </ApolloProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);