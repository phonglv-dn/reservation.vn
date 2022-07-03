require('dotenv').config({ path: './config.env' })

const express = require('express')
const http = require('http')
const next = require('next')
const connectDB = require('./server-utils/connectDB')

const app = express()
app.use(express.json())
const server = http.Server(app)
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3001
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

connectDB()

nextApp.prepare().then(() => {
  app.use('/api/auth', require('./api/auth'))
  app.use('/api/admin', require('./api/admin'))
  app.use('/api/cities', require('./api/cities'))
  app.use('/api/hotels', require('./api/hotels'))
  app.use('/api/hotels/rooms', require('./api/rooms'))
  app.use('/api/bookings', require('./api/bookings'))

  app.all('*', (req, res) => handle(req, res))
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Express server running on port ${PORT}`)
  })
})
