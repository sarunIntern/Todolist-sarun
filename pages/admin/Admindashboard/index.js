import React, { useState, useEffect } from 'react'
import { listusers } from '../../../function/Auth/Admin';
import * as moment from 'moment';
import { changerole, deleteuser } from '../../../function/Auth/Admin';
import { requesttokens } from '../../../function/Auth/Auth';
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { BsFillPersonFill, BsCheckLg } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
//alert
import Swal from 'sweetalert2'
import Confirm from "../../../Alert/Confirm";
import { useRouter } from 'next/router';
function Admindashboard(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  console.log(props)
  useEffect(() => {
    setLoading(false);
  }, [props]);

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
        changerole(props.token, user_id, value).then((res) => {
          Swal.fire({
            title: 'Changed!',
            text: res.data,
            icon: 'success'
          })
          refreshdata()
        }).catch((err) => {
          Swal.fire({
            position: 'top',
            title: 'Error!!',
            text: err.response,
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
        deleteuser(props.token, user_id).then((res) => {
          Swal.fire({
            title: 'Deleted!!',
            text: res.data,
            icon: 'success'
          })
          refreshdata()
        }).catch((err) => {
          Swal.fire({
            position: 'top',
            title: 'Error!!',
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

  function handleInfo(user_id) {
    router.push(`http://localhost:3000/admin/Admindashboard/${user_id}`)
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
            <div className='admidashboard-sub-container'>
              <div className='admindashboard-user-sub-container'>

                <div className='admindashboard-usercount'>
                  <div className="admindashboard-usercard-header">
                    <h1>User count</h1>
                  </div>
                  <div className='admindashboard-usercard-subheader'>
                    <div className="admindashboard-usercard-header-part-user">
                      <BsFillPersonFill />
                    </div>
                    <div className="admindashboard-usercard-header-part-admin">
                      <RiAdminFill />
                    </div>
                  </div>
                  <div className='admindashboard-usercard-subheader'>
                    <div className="admindashboard-usercard-sub-header-two-user">
                      <div>Have {props.users.length} user</div>
                    </div>
                    <div className="admindashboard-usercard-sub-header-two-admin">
                      <div>Have {props.admin.length} admin</div>
                    </div>
                  </div>
                </div>

                <div className='admindashboard-usercount'>
                  <div className="admindashboard-usercard-header">
                    <h1>User verify count</h1>
                  </div>
                  <div className='admindashboard-usercard-subheader'>
                    <div className="admindashboard-usercard-header-part-verify">
                      <BsCheckLg />
                    </div>
                  </div>
                  <div className='admindashboard-usercard-subheader'>
                    <div className="admindashboard-usercard-sub-header-two-verify-true">
                      <div>{props.verified.length} verification</div>
                    </div>
                    <div className="admindashboard-usercard-sub-header-two-verify">
                      <div>{props.users.length - props.verified.length} Not verification</div>
                    </div>
                  </div>
                </div>

              </div>
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
                          <th scope="col">Function</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.users.map((item, index) =>
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
                                  id={`admin-role-${index + 1}`}
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
                                    id={`admin-role-${index + 1}`}
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
                              <div className='admindashboard-function'>
                                <div className='admindashboard-function-con'>
                                  <button type="button" className="btn btn-danger"> <AiFillDelete onClick={() => handleRemove(item.user_id)} /> </button>
                                </div>
                                <div className='admindashboard-function-con'>
                                  <button id={`admin-seeuser-btn-${index + 1}`} type="button" className="btn btn-secondary"> <AiOutlineEye onClick={() => handleInfo(item.user_id)} /> </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      }

    </>
  )
}

export async function getServerSideProps(context) {
  const Token = await context.req.cookies.jwt_token
  const value = {
    Cookie: Token
  }
  const request = await requesttokens(value)
  const token = await request.data.token

  const result = await listusers(Token)
  const users = await result.data.users
  const verified = await result.data.verified
  const admin = await result.data.admin

  const posts = await result.data
  // if (posts.length > 0) {
  return {
    props: {
      token: token,
      posts: posts,
      users: users,
      verified: verified,
      admin: admin
    },
  }
  // }
}
export default Admindashboard