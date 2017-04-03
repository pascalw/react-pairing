import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store";
import './styles/main.scss';

const root = document.getElementById('root')

const renderRoot = function() {
  const App = require('./views').default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , root);
}

renderRoot();
window.addEventListener("hashchange", renderRoot, false);

if (module.hot) {
  module.hot.accept('./views', renderRoot);
}
