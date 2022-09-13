import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'

// ora è necessario injectare il nostro store
// all'interno della react-app
import { Provider } from 'react-redux' // libreria di binding
import { store, persistor } from './redux/store'

import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    {/* ora inseriamo un ulteriore layer dentro Redux, per garantire la persistenza */}
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
