import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

import qs from 'querystring'

const genres = {
  get: () => {
    return Axios.get(appUrl(`genre`))
  },
  post: (data) => {
    return Axios.post(appUrl(`genre`), qs.stringify(data), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  patch: (data) => {
    const {name} = data
    return Axios.patch(appUrl(`genre/${data.id}`), qs.stringify({name}), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  delete: (id) => {
    return Axios.delete(appUrl(`genre/${id}`), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
}

export default genres
