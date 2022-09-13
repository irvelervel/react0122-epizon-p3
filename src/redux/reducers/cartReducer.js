// qui andremo a definire la nostra funzione reducer
// il reducer prende lo stato attuale dell'app, controlla l'azione che è
// stata appena dispatchata e genere il nuovo stato dell'applicativo

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'

// ma da dove cominciamo? qual è lo stato iniziale?

// ora dobbiamo "nascondere" le funzionalità del carrello agli utenti non ancora loggati...

const initialState = {
  // questo è lo stato che interessa cartReducer d'ora in poi
  content: [],
}

// il reducer è una PURE FUNCTION
// quindi non possiamo mutare i nostri parametri e non è possibile effettuare operazioni
// NON PREVEDIBILI

const cartReducer = (state = initialState, action) => {
  // da questa funzione, in ogni possibile situazione
  // io devo restituire il NUOVO STATO dell'applicativo
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state, // crea una copia dell'oggetto stato da cui partiamo
        content: [...state.content, action.payload],
        // NON FARE!!! content: state.cart.content.push(action.payload)
        // content: state.cart.content.concat(action.payload),
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((book, i) => i !== action.payload),
        //   content: [
        //     ...state.content.slice(0, action.payload),
        //     ...state.content.slice(
        //       action.payload + 1,
        //       state.content.length
        //     ),
        //   ],
      }

    default:
      return state
    // worst case scenario: torno lo stato come l'ho appena trovato
    // --> senza rompere niente
  }
}

export default cartReducer
