import React from 'react'
import axios from 'axios'
function Post({posts}) {
  return (
    <>
    <h1>List of POSTs</h1>
        <h5>{posts.title}</h5>
    </>
  )
}
export default Post

export async function getStaticPaths(){
    return{
        paths: [
            {
                params:{postsid: '1'}
            },
            {
                params:{postsid: '2'}
            },
            {
                params:{postsid: '3'}
            },
        ],fallback: false,
    }
}

export async function getStaticProps(context) {
  const { params } = context
  const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postsid}`)
  const posts = await result.json()
  return {
    props: {
      posts
    },  
  }
}
