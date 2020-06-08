import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

// import qs from 'querystring'

const authors = {
  get: () => {
    return Axios.get(appUrl(`author`))
  }
}

export default authors
