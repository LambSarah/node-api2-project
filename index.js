// require your server and launch it here
require('dotenv').config()
const server = require('./api/server')
const debug = require('debug')
debug.enable('*')

const port = process.env.PORT || 9400
server.listen([port, () => {
	console.log(`#########--Server runnning on http://localhost:${port}--########`)
})