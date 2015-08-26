import express from 'express'
import compression from 'compression'

const server = express()
server.use('/public', express.static('static'))
server.use(compression())

server.use((req, res) => {
  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Redux real-world example</title>
      </head>
      <body>
        <div id="root" />
        <script type="application/javascript" src="/public/bundle.js"></script>
      </body>
    </html>
  `
  res.end(HTML)
})

const port = process.env.PORT || 3000
server.listen(port)
console.log('Application listening on port ' + port)

export default server
