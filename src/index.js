import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import I18n from "i18n-js";

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
