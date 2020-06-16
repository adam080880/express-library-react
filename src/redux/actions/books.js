export const setBooks = data => ({
  type: 'SET_BOOKS',
  payload: {
    books: data.books,
    pageInfo: data.pageInfo
  }
})