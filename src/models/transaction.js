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
  }
}

export default transaction
