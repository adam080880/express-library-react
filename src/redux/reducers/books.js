const initialState = {
  books: [],
  pageInfo: {},
  isLoading: true
}

const books = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKS': {
      const { pageInfo, books } = action.payload
      return {...initialState, books, pageInfo, ...{isLoading: false}}
    }
    default: {
      return {...state}
    }
  }
}

export default books