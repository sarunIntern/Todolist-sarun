import React from 'react'
import axios from 'axios'
import { listuserID } from '../../../function/User'
import { useRouter } from 'next/router'
function AdmindashboardDetail2({ posts }) {
  console.log(posts)
  return (
    <div className="admindashboard-container">
      <div className="admindashboard-card">
        <div className="admindashboard-card-header">
          <h1>All User Profile</h1>
          <h1>{posts.title}</h1>
        </div>
        <div className="admindashboard-card-content">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Role</th>
                <th scope="col">Create at</th>
                <th scope="col">Last_Login</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item, index) =>
                <tr key={index}>
                  <th>1</th>
                  <td>{item.user_id}</td>
                  <td>{item.user_email}</td>
                  {posts.user_status
                    ? <td>true</td>
                    : <td>false</td>

                  }
                  <td>{item.user_role}</td>
                  <td>{item.user_created_on}</td>
                  <td>{item.last_login}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const result = await listuserID(params.user_id)
  // const result = await listuserID(params.id)
  const posts = await result.data
  return {
    props: {
      posts
    },
  }

}

export default AdmindashboardDetail2