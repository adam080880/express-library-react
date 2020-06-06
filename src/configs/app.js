const name = 'express library'
const appUrl = (uri) => `http://192.168.0.8:8080/${uri}`

const template = (status, data, o = {}) => {
  return {
    status,
    data,
    ...o
  }
}

const app = {
  name, appUrl, template
}

module.exports = app