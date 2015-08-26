import { Server } from 'hapi'
import config from '../../config'

/**
 * Start Hapi server
 */
const server = new Server()
server.connection(config.server)

server.register([
  { register: require('inert') }
], function (err) {
  if (err) {
    return console.error('==> 🔴  Error registering server plugins')
  }
})

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'dist',
      listing: false
    }
  }
})

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext('onPreResponse', (request, reply) => {
  let allowedStatusCodes = [403, 404]
  if (!request.response.isBoom || allowedStatusCodes.indexOf(request.response.output.statusCode) === -1) {
    return reply.continue()
  }

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Redux real-world example</title>
        <link rel="stylesheet" href="/css/main.css">
      </head>
      <body>
        <div id="root" />
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `

  reply(HTML)
})

server.start(() => {
  console.info('==> ✅  Server is listening')
  console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase())
})

export default server
