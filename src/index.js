import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose, combineReducers }  from 'redux'
import buggerBuilderReducer from './store/reducers/buggerBuilder';
import orderReducer from './store/reducers/order'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  buggerBuilder : buggerBuilderReducer,
  order : orderReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();
