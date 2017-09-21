import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import './index.css'
import AddEventContainer from './containers/AddEventContainer'
import RegisterContainer from './containers/RegisterContainer'
import TimetableContainer from './containers/TimetableContainer'
import LoaderContainer from './containers/LoaderContainer'
import ModalMessageContainer from './containers/ModalMessageContainer'


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <div className="appbar">
            <Link to='/register' 
              className="appbar-link"
            >
              Login
            </Link>
        </div>
        <Route exact path="/" component={TimetableContainer} />
        <Route path="/addevent" component={AddEventContainer} />
        <Route path="/register" component={RegisterContainer} />
        <LoaderContainer />
        <ModalMessageContainer />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
