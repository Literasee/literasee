const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise

const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/literasee'

function open(callback) {
  const _open = (resolve, reject) => {
    mongoose
      .connect(uri)
      .connection.on('error', function(err) {
        console.error.bind(console, 'connection error:')
        reject(err)
      })
      .once('open', function() {
        console.log('Connected to database at %s', uri)
        resolve(mongoose.connection)
      })
  }

  return new Promise(_open).nodeify(callback)
}

function close(callback) {
  const _close = (resolve, reject) => {
    mongoose.disconnect(function() {
      console.log('Disconnected from database at %s', uri)
      resolve(mongoose.connection)
    })
  }

  return new Promise(_close).nodeify(callback)
}

module.exports = { open, close }
