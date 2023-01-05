import React, { useState, useEffect } from 'react'
import { listuser } from '../../../function/User'
import * as moment from 'moment';
import { changerole, deleteuser } from '../../../function/Auth/Admin';
import { AiFillDelete } from "react-icons/ai";
//alert
import Swal from 'sweetalert2'
import Confirm from "../../../Alert/Confirm";
import { useRouter } from 'next/router';
function Admindashboard({ posts }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [posts]);

  function refreshdata() {
    setLoading(true);

    router.replace(router.asPath);
  }

  function handleChangeRole(e, user_id) {
    const value = {
      role_id: user_id,
      role: e.target.value
    }
    Confirm.fire({
      title: 'Confirm!!',
      text: "Do you want to change user role ?",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        changerole(user_id, value).then((res) => {
          Swal.fire({
            title: 'Changed!',
            text: res.data,
            icon: 'success'
          })
          refreshdata()
        }).catch((err) => {
          Swal.fire({
            position: 'top',
            title: 'Error!',
            text: err.response.data,
            icon: 'error',
            iconColor: 'Red',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง'
          })
          console.log(err)
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  function handleRemove(user_id) {
    Confirm.fire({
      title: 'Confirm!!',
      text: "Do you want to delete user?",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteuser(user_id).then((res) => {
          Swal.fire({
            title: 'Deleted!!',
            text: res.data,
            icon: 'success'
          })
          refreshdata()
        }).catch((err) => {
          Swal.fire({
            position: 'top',
            title: 'Error!',
            text: err.response.data,
            icon: 'error',
            iconColor: 'Red',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง'
          })
          console.log(err)
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const roleData = ["a", "u"];
  return (
    <>
      {loading == true
        ? (
          <div className='loading-page-container'>
            <div className="loading-page">
              <div id="spinner"></div>
              <h1 style={{ color: 'rgb(30, 109,169)' }}>Loading . . .</h1>
            </div>
          </div>
        )
        : (
          <div className="admindashboard-container">
            <div className="admindashboard-card">
              <div className="admindashboard-card-header">
                <h1>All User Profile</h1>
              </div>
              <div className="admindashboard-card-content">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="admin-thead-con">
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Role</th>
                        <th scope="col">Create at</th>
                        <th scope="col">Last_Login</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((item, index) =>
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className='text-nowrap'>{item.username}</td>
                          <td className='text-nowrap'>{item.user_email}</td>
                          {item.user_status
                            ? <td className='text-nowrap' style={{ color: "Green" }}>true</td>
                            : <td className='text-nowrap' style={{ color: "red" }}>false</td>

                          }
                          <td className='text-nowrap'>
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
                          <td className='text-nowrap'>{moment(item.user_created_on).format("lll")}</td>
                          <td className='text-nowrap'>{moment(item.last_login).format("lll")}</td>
                          <td>
                            <button type="button" className="btn btn-danger"> <AiFillDelete onClick={() => handleRemove(item.user_id)} /> </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      }

    </>
  )
}
export async function getServerSideProps() {
  const result = await listuser()
  const posts = await result.data
  return {
    props: {
      posts
    },
  }
}
export default Admindashboard