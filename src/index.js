import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    setTimeout(render);
  });
}

render();

registerServiceWorker();
