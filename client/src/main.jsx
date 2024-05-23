//We are making the redux store available for usage
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js';
//Redux Persist handles the Redux store's storage and retrieval automatically, making state persistence and retrieval easier.
import { Provider } from 'react-redux';
//You should start by wrapping your entire application in a <Provider> component to make the store available throughout the component tree:
//The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.

//With the Redux Persist library, developers can save the Redux store in persistent storage, such as local storage. Therefore, even after refreshing the browser, the site state will be preserved. Redux Persist also includes methods that allow us to customize the state that gets persisted and rehydrated, all with an easily understandable API.


ReactDOM.createRoot(document.getElementById('root')).render(
  //createRoot(rootElement) is a React utility function used to create a react root element, which is a DOM element in which UI components render themselves. It takes as a parameter the root element that should be created.
    <Provider store={store}>
        <App />
    </Provider>
);
