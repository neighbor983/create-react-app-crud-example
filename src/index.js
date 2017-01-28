import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import {createStore, applyMiddelware} from 'redux';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'; 
import {Provider} from 'react-redux';
import './index.css';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddelware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
