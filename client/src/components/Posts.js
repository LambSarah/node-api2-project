import React from 'react'

const Posts = props => {
	const { posts } = props
	return (
		<>
			{posts.map(post => {
				return (<>
					<tr><td><h2 key={post.id}>{post.contents}</h2></td>
						<td>
							{post.title}</td></tr>

				</>)
			})}
		</>
	)
}

export default Posts