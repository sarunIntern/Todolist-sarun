import React from 'react'
import axios from 'axios'
function Postlist({posts}) {
  return (
    <>
    <h1>List of POSTs</h1>
      {posts.map((item,index) => 
        <h5>{item.title}</h5>
      )}
    </>
  )
}
export default Postlist

export async function getStaticProps() {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await result.json()
  return {
    props: {
      posts
    },  
  }
}
