// qui andremo a definire la nostra funzione reducer
// il reducer prende lo stato attuale dell'app, controlla l'azione che è
// stata appena dispatchata e genere il nuovo stato dell'applicativo

import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from '../actions'

// ma da dove cominciamo? qual è lo stato iniziale?

// ora dobbiamo "nascondere" le funzionalità del carrello agli utenti non ancora loggati...

const initialState = {
  stock: [], // qui dentro salverò lo user name in modo da sbloccare all'utente
  // le funzionalità del cart
  loading: false,
  error: false,
}

// il reducer è una PURE FUNCTION
// quindi non possiamo mutare i nostri parametri

const bookReducer = (state = initialState, action) => {
  // da questa funzione, in ogni possibile situazione
  // io devo restituire il NUOVO STATO dell'applicativo
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        stock: action.payload, // action.payload è l'array di books preso dalle API
      }

    case GET_BOOKS_ERROR:
      return {
        ...state,
        error: true,
      }

    case GET_BOOKS_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }

    default:
      return state
    // worst case scenario: torno lo stato come l'ho appena trovato
    // --> senza rompere niente
  }
}

export default bookReducer
