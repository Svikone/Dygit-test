import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Auth from './components/auth/auth';
import Main from './components/main/main';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './shared/history';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './store/reducers';
import { watchLoadData } from './sagas/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';

const sagaMiidleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiidleware)));
sagaMiidleware.run(watchLoadData)

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/main" component={Main} />
            <Redirect from='/' to='/main/products'/>
          </Switch>
        </div>
      </Router>  
    </Provider>
  );
}

export default App;
