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
import Tasks from './components/Tasks'
import Task from './components/Task'
import App from './components/App'
import FlashMessages from './components/FlashMessages'

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} >
      <ConnectedRouter history={history}>
		    <App history={history} />
		  	<FlashMessages />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  rootElement
)
