import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

import qs from 'querystring'

const auth = {
  register: async (data) => {
    const { email, password } = data
    return await Axios.post(appUrl('auth/register'), qs.stringify({ email, password }))
  },
  login: async (data) => {
    const { email, password } = data
    return await Axios.post(appUrl('auth/login'), qs.stringify({ email, password }))
  },
  logout: async () => {
    localStorage.removeItem('token')
  }
}

export default auth