import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

// import qs from 'querystring'

const genres = {
  get: () => {
    return Axios.get(appUrl(`genre`))
  }
}

export default genres
