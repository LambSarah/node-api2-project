// require your server and launch it here
const server = require('./api/server')
const debug = require('debug')
debug.enable('*')

server.listen(8400, () => {
	console.log('#########--Server runnning on http://localhost:8400--########')
})