// questo file si occupa di creare lo store all'avvio dell'applicazione

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bookReducer from '../reducers/bookReducer'
import cartReducer from '../reducers/cartReducer' // basta puntare la cartella
import userReducer from '../reducers/userReducer' // basta puntare la cartella
// dove è contenuto il file index.js
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

// ora che abbiamo userReducer e cartReducer che mantengono ciascuno una porzione del
// Redux Store, manca solamente come ricombinarli insieme...!

const persistConfig = {
  key: 'root', // il livello da cui vogliamo cominciare a far persistere i dati
  storage, // come dire --> storage: storage, seleziona lo storage engine da utilizzare
  transforms: [
    // elenco delle trasformazioni (plugin) applicabili a redux-persist
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})

const persistedReducer = persistReducer(persistConfig, bigReducer)
// una versione "persistente" di bigReducer

export const store = configureStore({
  reducer: persistedReducer, // perchè c'è spazio per uno solo!
  // questo risolve l'errore del non-serializable value
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // <-- lo spegne
    }),
})

export const persistor = persistStore(store)
