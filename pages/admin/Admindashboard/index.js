import React from 'react'
import { listuser } from '../../../function/User'
import * as moment from 'moment';
function Admindashboard({posts}) {

  function handleChangeRole(e,user_id){ 
    const value = {
      role_id:user_id,
      role:e.target.value
    }
    console.log(value)
  }
  
  const roleData = ["a", "u"];
  return (
    <div className="admindashboard-container">
      <div className="admindashboard-card">
        <div className="admindashboard-card-header">
          <h1>All User Profile</h1>
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
                  <th>{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.user_email}</td>
                  {item.user_status
                    ? <td>true</td>
                    : <td>false</td>

                  }
                  <td>
                  {item.user_role === 'a'
                      ?
                      <select
                        className="form-select"
                        style={{ width: "100px", backgroundColor: "lightgreen" }}
                        defaultValue={item.user_role}
                        onChange={e => handleChangeRole(e, item.user_id)}
                      >
                        {roleData.map((item, index) =>
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )}

                      </select>
                      : (
                      <select
                        className="form-select"
                        style={{ width: "100px", backgroundColor: "lightskyblue" }}
                        defaultValue={item.user_role}
                        onChange={e => handleChangeRole(e, item.user_id)}
                      >
                        {roleData.map((item, index) =>
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )}

                      </select>
                      )
                    }
                    </td>
                  <td>{moment(item.user_created_on).format("lll")}</td>
                  <td>{moment(item.last_login).format("lll")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps() {
  // const result = await fetch('http://127.0.0.1:3000/api/usersapi/user')
  // const result = await listuser()
  // const result = await axios.get('http://127.0.0.1:3000/api/usersapi/user')
  // const result = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const result = await hello()
  const result = await listuser()
  // const res = await fetch('https://final-ccna-backend.vercel.app/Category/category');
  const posts = await result.data

  return {
    props: {
      posts
    },
  }
}
export default Admindashboard