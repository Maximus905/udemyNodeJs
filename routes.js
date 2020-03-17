const fs = require('fs')
const requestHandler = (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-type', 'text/html')
    res.write('<html>')
    res.write('<header><title>My page</title></header>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">submit</button></form></body>')
    res.write('</html>')
    return res.end()
  }
  if (req.url === '/message' && req.method === "POST") {
    const body = []
    req.on('data', chunk => {
      body.push(chunk)
    })
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      console.log(message)
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
    
  }
  res.setHeader('Content-type', 'text/html')
  res.write('<html>')
  res.write('<header><title>My page</title></header>')
  res.write('<body><h1>Hello from my app!</h1></body>')
  res.write('</html>')
  res.end()
}
module.exports = requestHandler
