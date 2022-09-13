// questo file si occupa di creare lo store all'avvio dell'applicazione

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bookReducer from '../reducers/bookReducer'
import cartReducer from '../reducers/cartReducer' // basta puntare la cartella
import userReducer from '../reducers/userReducer' // basta puntare la cartella
// dove è contenuto il file index.js

// ora che abbiamo userReducer e cartReducer che mantengono ciascuno una porzione del
// Redux Store, manca solamente come ricombinarli insieme...!

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})

const store = configureStore({
  reducer: bigReducer, // perchè c'è spazio per uno solo!
})

export default store
