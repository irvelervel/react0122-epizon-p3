import { Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUsernameAction } from '../redux/actions'

const CartIndicator = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formValue, setFormValue] = useState('')

  const cartLength = useSelector((state) => state.cart.content.length)
  const userName = useSelector((state) => state.user.name)
  // cartLength inizialmente è 0, ma rispecchierà in qualsiasi momento
  // la lunghezza di cart.content

  const booksLoading = useSelector((state) => state.book.loading)

  // const entireState = useSelector(state => state)
  // approccio funzionante ma scomodo e fornisce a CartIndicator
  // anche informazioni che non gli interessano

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('stiamo inviando il form')
    // qua dobbiamo dispatchare un'azione per utilizzare formValue come payload
    dispatch(setUsernameAction(formValue))
  }

  return (
    <div className="ml-auto mt-3 mb-4">
      {userName ? (
        <>
          <span></span>
          <span className="mr-2">Hello, {userName}!</span>
          <Button color="primary" onClick={() => navigate('/cart')}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <>
          {booksLoading && <Spinner animation="border" variant="success" />}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Log in here"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </>
      )}
    </div>
  )
}

export default CartIndicator
