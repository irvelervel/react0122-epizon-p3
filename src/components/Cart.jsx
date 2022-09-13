import { useEffect } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCartAction } from '../redux/actions'

const Cart = () => {
  const cartContent = useSelector((state) => state.cart.content)
  // cartContent ora è l'array di prodotti nel carrello
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isUserLoggedin = !!useSelector((state) => state.user.name)
  // se name è '', isUserLoggedin diventa false
  // se name non è '', isUserLoggedin diventa true

  console.log('isUserLoggedin', isUserLoggedin)

  useEffect(() => {
    if (!isUserLoggedin) {
      navigate('/')
    }
  }, [])

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cartContent.map((book, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => {
                  dispatch(removeFromCartAction(i)) // dispatch di un'azione
                }}
              >
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold mb-3 ml-4">
          TOTAL:{' '}
          {cartContent.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
          $
        </Col>
      </Row>
    </Row>
  )
}

export default Cart
