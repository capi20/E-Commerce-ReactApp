import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers } from 'redux'
import shoppingReducer from './store/reducers/shopping'
import orderReducer from './store/reducers/order'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    shopping: shoppingReducer,
    order: orderReducer
})

const store = createStore(rootReducer, composeEnhancers())

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
    app, 
    document.getElementById('root')
);
registerServiceWorker();
