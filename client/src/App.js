import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {

  const [posts, setPosts] = useState([])

  function getPosts() {
    axios.get('http://localhost:8400/api/posts')
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => console.log(error.message))
  }
  useEffect(() => {
    function getPosts() {
      axios.get('http:://localhost:8400/api/posts')
        .then(response => {
          setPosts(response.data)
        })
        .catch(error => console.log(error.message))
    }

    return getPosts
  }, [])

  return (
    <div className="App">
      <button onClick={getPosts}>Get Posts</button>
      <table>
        <tr>
          <th>Title</th>
          <thead></thead>
        </tr>
        {posts.map(post => {
          return (<div key={post.id}>
            <tr><td><h2>{post.title}</h2></td>
              <td>
                {post.contents}</td></tr>
          </div>)
        })}
      </table>
    </div>
  );
}

export default App;
