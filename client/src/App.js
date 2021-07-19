import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './App.css'

import Posts from './components/Posts'
function App() {

  const [posts, setPosts] = useState([])


  function getPosts() {
    axios.get('http://localhost:9400/api/posts')
      .then(response => {
        setPosts(response.data)

      })
      .catch(error => console.log(error.message))
  }
  useEffect(() => {
    function getPosts() {
      axios.get('http:://localhost:9400/api/posts')
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
        <thead>
          <tr>
            <th>Title</th>
            <th>Contents</th>
          </tr>
        </thead>
        <tbody>
          <Posts posts={posts} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
