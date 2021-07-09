// require your server and launch it here
const server = require('./api/server')

server.listen(4400, () => {
	console.log('#########--Server runnning on http://localhost:4400--########')
})