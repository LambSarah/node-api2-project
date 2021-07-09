// implement your posts router here

const express = require('express')
const Post = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
	Post.find(req.query)
		.then(posts => {
			res.status(200).json(posts)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: '######--Error retrieving the posts--######'
			})
		})
})

router.use(function (req, res, next) {
	res.status(404).send("Sorry can't find that!")
})

module.exports = router