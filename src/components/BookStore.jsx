import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction } from '../redux/actions'

const BookStore = () => {
  // const [books, setBooks] = useState([])
  const [bookSelected, setBookSelected] = useState(null)

  const dispatch = useDispatch()

  const booksInStock = useSelector((state) => state.book.stock)

  useEffect(() => {
    // componentDidMount
    dispatch(getBooksAction())
  }, [])

  const changeBook = (book) => setBookSelected(book)

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          books={booksInStock}
        />
      </Col>
      <Col lg={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore
