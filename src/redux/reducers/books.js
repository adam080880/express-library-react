const initialState = {
  books: [],
  pageInfo: {},
  isLoading: true
}

const books = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKS_PENDING': return {...initialState}
    case 'SET_BOOKS_FULFILLED': {
      const { pageInfo, books } = action.payload
      return {...initialState, books, pageInfo, ...{isLoading: false}}
    }
    case 'SET_BOOKS_REJECTED': {
      return {...initialState, ...{isLoading: false}}
    }
    case 'SET_LOADING': {
      return {...initialState, ...{isLoading: action.payload.loading}}
    }
    default: return state
  }
}

export default books