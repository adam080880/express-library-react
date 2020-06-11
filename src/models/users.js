import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

import qs from 'querystring'

const authors = {
  get: (param) => {
    return Axios.get(appUrl(`user?limit=5&${param}`), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  toggleRole: (id) => {
    return Axios.patch(appUrl(`user/toggle/role/${id}`), {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
}

export default authors
