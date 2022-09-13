import { Component } from 'react'
import { connect } from 'react-redux'

// ESEMPIO DI CONNESSIONE DI COMPONENTE A CLASSE

// connect è una funzione che connette il nostro componente al Redux Store
// accetta fino a due parametri: mapStateToProps e mapDispatchToProps

const mapStateToProps = (state) => {
  return {
    cartLength: state.cart.content.length,
    // ogni proprietà di questo oggetto diventa una prop aggiuntiva del
    // vostro componente
    userName: state.user.name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: () => {
      dispatch({
        type: 'ADD_TO_CART',
      })
    },
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="epizon-footer">
        <span className="text-muted">Epizon {new Date().getFullYear()}©</span>
        <div>
          {this.props.cartLength} - {this.props.userName}
        </div>
      </footer>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)
