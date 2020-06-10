import Axios from 'axios'

import {
  appUrl,
} from '../configs/app'

import qs from 'querystring'

const transaction = {
  booking: (id, data) => {
    const {promise_returned_at} = data
    return Axios.post(appUrl(`member/transaction`), qs.stringify({
      ...{book_id: id}, ...{promise_returned_at: promise_returned_at}
    }), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  adminTransaction: (params) => {
    return Axios.get(appUrl(`transaction?${params}&limit=5`), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  memberTransaction: (params) => {
    return Axios.get(appUrl(`member/transaction?${params}&limit=5`), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  toBorrow: (id) => {
    return Axios.patch(appUrl(`transaction/borrow/${id}`), {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  toReturn: (id) => {
    return Axios.patch(appUrl(`transaction/return/${id}`), {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  toCancel: (id) => {
    return Axios.patch(appUrl(`transaction/cancel/${id}`), {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
}

export default transaction
