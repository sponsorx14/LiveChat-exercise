import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';
import reducers from './reducers';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={FormRegister} />
        <Route path='/' component={FormLogin}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
