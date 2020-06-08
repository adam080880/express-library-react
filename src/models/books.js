import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

import qs from 'querystring'

const books = {
  find: (id) => {
    return Axios.get(appUrl(`books/${id}`))
  }
}

export default books
