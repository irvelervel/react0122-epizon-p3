// QUI DICHIARO I TYPE COME COSTANTI
// in modo da evitare possibili typos nel loro utilizzo
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'
export const GET_BOOKS_LOADING = 'GET_BOOKS_LOADING'

// UN ACTION CREATOR --> una funzione che torna un'azione
export const addToCartAction = (bookSelected) => ({
  type: ADD_TO_CART, // type è obbligatoria in ogni action
  payload: bookSelected, // payload non è obbligatoria, ma in ogni caso "reale"
  // è necessaria
})

export const addToCartActionWithThunk = (bookSelected) => {
  return (dispatch, getState) => {
    console.log(getState().cart.content.length)
    // ora aggiungiamo il libro al carrello solo se non ci sono già 5 elementi nel carrello
    // e se il libro che stiamo aggiungendo non sia già presente nel carrello
    const stateNow = getState()
    if (
      stateNow.cart.content.length < 5 &&
      stateNow.cart.content.findIndex((book) => book.id === bookSelected.id) ===
        -1
    ) {
      dispatch({
        type: ADD_TO_CART,
        payload: bookSelected,
      }) // il reducer si sveglia solo ora! con il dispatch di UN'AZIONE
    }
  }
}

export const removeFromCartAction = (i) => {
  return {
    type: REMOVE_FROM_CART,
    payload: i,
  }
}

export const setUsernameAction = (username) => ({
  type: SET_USERNAME,
  payload: username,
})

export const getBooksAction = () => {
  // grazie a redux-thunk, che è un middleware GIÀ INTEGRATO nel nostro flow con configureStore()
  // possiamo creare degli action creators che ritornano non solo un'action (un oggetto JS),
  // ma anche una funziona
  return async (dispatch, getState) => {
    // qui possiamo gestire qualsiasi operazione asicrona e, una volta ottenuto il risultato,
    // dispatchare quanto ottenuto
    try {
      dispatch({
        type: GET_BOOKS_LOADING,
      })
      let resp = await fetch(
        'https://striveschool-api.herokuapp.com/food-books'
      )
      if (resp.ok) {
        let fetchedBooks = await resp.json()
        // ora si tratta di dispatchare fetchedBooks come payload di un'action!
        console.log('GETSTATE', getState())
        dispatch({
          type: GET_BOOKS,
          payload: fetchedBooks, // noi dobbiamo fornire al reducer il prodotto finito!
        })
        setTimeout(() => {
          dispatch({
            type: GET_BOOKS_LOADING,
          })
        }, 500)
      } else {
        console.log('error')
        dispatch({
          type: GET_BOOKS_ERROR,
        })
        dispatch({
          type: GET_BOOKS_LOADING,
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_BOOKS_ERROR,
      })
      dispatch({
        type: GET_BOOKS_LOADING,
      })
    }
  }
}
