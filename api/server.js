// implement your server here
const express = require('express')
// require your posts router and connect it here
const postsRouter = require('./posts/posts-router')

const server = express()

server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
	res.send(`
	<h2>The Blogger API</h2>
	<p>Welcome to The Blogger API</p>`)
})

module.exports = server


