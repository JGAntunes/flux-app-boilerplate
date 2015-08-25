
import express from 'express'
import compression from 'compression'
import React from 'react'
import { Router } from 'react-router'
import Location from 'react-router/lib/Location'
import routes from 'lib/app/routes'

const server = express()
server.use('/public', express.static('static'))
server.use(compression())

server.use((req, res) => {
  const location = new Location(req.path, req.query)
  Router.run(routes, location, (err, routeState) => {
    if (err) return console.error(err)
    if (!routeState) return res.status(404).end('404')

    const InitialComponent = (
      <Router {...routeState} />
    )
    const componentHTML = React.renderToString(InitialComponent)
    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/public/bundle.js"></script>
      </body>
    </html>
`
    res.end(HTML)
  })
})

const port = process.env.PORT || 3000
server.listen(port)
console.log('Application listening on port ' + port)

export default server
