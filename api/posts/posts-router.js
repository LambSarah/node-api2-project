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
			res.status(500).json({ message: "The posts information could not be retrieved" })
		})
})

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			post ? res.status(200).json(post) : res.status(404).json({ message: "The post with the specified ID does not exist" })
		}).catch(err => {
			console.log(err)
			res.status(500).json({ message: 'The post information could not be retrieved' })
		})
})

router.post('/', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		res.status(400).json({
			message: "Please provide title and contents for the post"
		})
	} else {
		const { title, contents } = req.body
		Post.insert({ title, contents })
			.then(postId => {
				Post.findById(postId)
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({
					message: "There was an error while saving the post to the database"
				})
			})
			.then(post => {
				res.status(201).json(post)
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({
					message: "There was an error while saving the post to the database"
				})
			})
	}
})


router.put('/:id', (req, res) => {
	const changes = req.body;
	if (!changes.title || !changes.contents) {
		res.status(400).json({ message: "Please provide title and contents for the post" })
	} else {
		Post.update(req.params.id, changes)
			.then(count => {
				if (count) {
					Post.findById(req.params.id)
						.then(post => {
							res.status(200).json(post);
						})
						.catch(error => {
							console.log(error)
							res.status(404).json({ message: "The post with the specified ID does not exist" });

						})
				} else {
					res.status(404).json({ message: "The post with the specified ID does not exist" });
				}
			}).catch(error => {
				console.log(error);
				res.status(500).json({
					message: 'Error updating the post',
				});
			});
	}
})


router.delete('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(postToDelete => {
			Post.remove(req.params.id)
				.then(count => {
					if (count == 0) {
						res.status(404).json({ message: "The post with the specified ID does not exist" })
					} else {
						res.status(200).json(postToDelete)
					}
				})
				.catch(error => {
					console.log(error)
					res.status(500).json({ message: "The post could not be removed" })

				})
		}
		)
})
//Returns an **array of all the comment objects** associated with the post with the specified id 
router.get('/:id/comments', async (req, res) => {
	try {
		const { id } = req.params
		const comments = await Post.findPostComments(id)
		if (comments.length) {
			res.status(200).json(comments)
		} else {
			res.status(404).json({ message: "The post with the specified ID does not exist" })
		}
	} catch (err) {
		res.status(500).json({ message: "The comments information could not be retrieved" })

	}

})
module.exports = router