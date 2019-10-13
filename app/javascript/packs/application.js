// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux'
import store, { history } from "./redux/store";
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Header />
      <Sidebar />
      <div className="main">
        <Switch>
          <Route exact path="/tasks" component={Tasks} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  rootElement
)
