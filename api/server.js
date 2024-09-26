// implement your server here
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// require your posts router and connect it here
const postsRouter = require('./posts/posts-router')

const server = express()
const whitelist = ['https://localhost:3000', 'http://localhost:4000']
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}
server.options('*', cors())

server.use(express.json())
server.use(cors())
server.use('/api/posts', postsRouter)
server.use(helmet())

server.get('/', cors(corsOptionsDelegate), (req, res) => {
	res.send(`
	<h2>The Blogger API</h2>
	<p>Welcome to The Blogger API</p>`)
})

module.exports = server


