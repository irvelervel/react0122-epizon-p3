import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Book from './Book'

const BookList = ({ books, changeBook, bookSelected }) => {
  const errorInFetch = useSelector((state) => state.book.error)

  return (
    <div className="mb-3">
      {errorInFetch && <Alert variant="danger">Something went wrong</Alert>}
      {books.map((book) => (
        <Book
          key={book.id}
          book={book}
          changeBook={changeBook}
          bookSelected={bookSelected}
        />
      ))}
    </div>
  )
}

export default BookList
