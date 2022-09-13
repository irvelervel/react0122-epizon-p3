import { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ADD_TO_CART } from '../redux/actions'

// nei componenti a Classe, non si possono usare gli hooks
// si può utilizzare connect per connettere qualsiasi tipo di componente (classe e/o funzione)

// connect crea un HOC -> Higher Order Component
// un HOC è un componente le cui props vengono arricchite
// queste props extra, in redux, saranno i valori che volete leggere e le azioni che volete dispatchare

// lo state è l'oggettone del Redux Store
// si parte da quello per assegnare alle proprietà i valori dal Redux Store
const mapStateToProps = (state) => ({
  // tutto quello che mettiamo qua diverrà una prop per ClassComponent
  cartContent: state.cart.content,
  // ora cartContent è accessibile nel componente tramite this.props.cartContent
})

// mapDispatchToProps è sempre una funzione che torna un oggetto
// le proprietà di questo oggetto finiscono nelle props del componente
const mapDispatchToProps = (dispatch) => ({
  // mapDispatchToProps viene riempito di METODI
  addRandomBookToCart: (randomBook) => {
    // cosa voglio fare quando chiamerò this.props.addRandomBookToCart()
    // probabilmente dispatchare un'azione
    dispatch({
      type: ADD_TO_CART,
      payload: randomBook,
    })
  },
})

class ClassComponent extends Component {
  addRandomBook = async () => {
    try {
      let resp = await fetch(
        'https://striveschool-api.herokuapp.com/food-books'
      )
      if (resp.ok) {
        let books = await resp.json()
        this.props.addRandomBookToCart(
          books[Math.floor(Math.random() * books.length)]
          // aggiunge al carrello un libro a caso dall'array dei libri disponibili
        )
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <h2>How to connect a Class Component to the Redux Store</h2>
            {this.props.cartContent.map((book) => (
              <div key={book.id}>{book.title}</div>
            ))}
            {/* this.props.addRandomBookToCart(randomBook) */}
            <Button onClick={this.addRandomBook}>AGGIUNGI LIBRO RANDOM</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

// connect accetta fino a 2 parametri:
// 1) mapStateToProps -> una funzione che torna un oggetto; le proprietà che inserite in
// quest'oggetto saranno i valori che leggerete dallo store; questi valori arrivano nelle props
// 2) mapDispatchToProps -> una funzione che torna un oggetto: le proprietà che inserite in
// quest'oggetto saranno le azioni che potrete dispatchare da questo componente

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent)
