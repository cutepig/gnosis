import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'gnosis/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'unstated';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
