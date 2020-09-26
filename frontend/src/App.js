import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import history from './shared/history';
import rootReducer from './store/reducers';
import watchLoadData from './sagas/sagas';
import './App.css';
import Natification from './shared/natification';
import Navigation from './components/navigation/Navigation';

const sagaMiidleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiidleware)),
);
sagaMiidleware.run(watchLoadData);

function App() {
  return (
    <Provider store={store}>
      <Natification />
      <Router history={history}>
        <Navigation />
      </Router>
    </Provider>
  );
}

export default App;
