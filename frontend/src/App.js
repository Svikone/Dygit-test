import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Auth from './components/auth/auth';
import Main from './components/main/main';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './shared/history';
import './App.css';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/main" component={Main} />
          <Redirect from='/' to='/main'/>
        </Switch>
      </div>
    </Router>  
  );
}

export default App;
