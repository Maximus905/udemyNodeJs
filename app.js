const http = require('http')
// const fs = require('fs')
const router = require('./routes')

const server = http.createServer(router)
server.listen(3000)