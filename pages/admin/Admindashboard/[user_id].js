import React, { useState, useEffect } from 'react'
import { listuserID } from '../../../function/Auth/Admin';
import * as moment from 'moment';
import { changerole, deleteuser } from '../../../function/Auth/Admin';
import { listusertodolistid } from "../../../function/Auth/User"
import { AiFillDelete, AiOutlineEye, AiOutlinePlus, AiFillCaretRight } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import { requesttokens } from '../../../function/Auth/Auth';
//alert
import Swal from 'sweetalert2'
import Confirm from "../../../Alert/Confirm";
import { useRouter } from 'next/router';
function AdmindashboardDetail2(props) {
  const router = useRouter()
  const { user_id } = router.query
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [props]);
  console.log(props)
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
        changerole(props.Token,user_id, value).then((res) => {
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
          (err)
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
        deleteuser(props.Token,user_id).then((res) => {
          Swal.fire({
            title: 'Deleted!!',
            text: res.data,
            icon: 'success'
          })
          router.replace(`http://localhost:3000/admin/Admindashboard`)
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
  function listtodolist(category_name, todolist_id) {
    router.push(`http://localhost:3000/admin/Admindashboard/todolist/${todolist_id}`)
  }

  const [select, setSelect] = useState("");
  const [catText, setDropDownText] = useState("Select Category");
  const filterCategorymList = props.categorys.filter((category) => {
    if (select === "") {
      return category;
    } else {
      return category.category_id === select;
    }
  })
  const [select2, setSelect2] = useState("");
  const [status, setStatus] = useState("Status");
  const filterStatusList = props.todolists.filter((todolist) => {
    if (select2 === "") {
      return todolist;
    } else {
      return todolist.todolist_status === select2;
    }
  })

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
          <>
            <div className="admindashboard-container">
              <div className='admidashboard-sub-container'>
                <div className="admindashboard-card">
                  <div className="admindashboard-card-header">
                    <h1>User {props.posts[0].username} Profile</h1>
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
                          {props.posts.map((item, index) =>
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
                                  ? (
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
                                  )
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
                                  <button type="button" className="btn btn-danger"> <AiFillDelete onClick={() => handleRemove(item.user_id)} /> </button>
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
            <div className="usertodolist-con">
              <div className="usertodolist-con-sub">
                <div className="usertodolist-card ">
                  <div className="usertodolist-card-header">
                    <h1>All lists</h1>
                  </div>
                  <div className="cat-search-container">
                    <div className="cat-search-container-sub" >
                      <Dropdown >
                        <Dropdown.Toggle variant="primary" id="dropdown-cat">
                          {catText}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="scrollable-menu">
                          {props.categorys.map((item, catindex) =>
                            <Dropdown.Item key={catindex} as="button" onClick={(id) => { setSelect(item.category_id); setDropDownText(item.category_name) }}>{item.category_name}</Dropdown.Item>
                          )}
                          <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="cat-search-container-sub-solo" >
                      <Dropdown >
                        <Dropdown.Toggle variant="primary" id="dropdown-cat">
                          {status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="scrollable-menu">
                          <Dropdown.Item as="button" onClick={(id) => { setSelect2("p"); setStatus("Pending") }}>Pending</Dropdown.Item>
                          <Dropdown.Item as="button" onClick={(id) => { setSelect2("s"); setStatus("Success") }}>Success</Dropdown.Item>
                          <Dropdown.Item as="button" onClick={(id) => { setSelect2(""); setStatus("ALL") }}>ALL</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div id='card-content-list' className="usertodolist-card-content">
                    <h1 className="usertodolist-lable-userdashboard-list">List</h1>
                    {filterCategorymList.map((item, index) =>
                      <div key={index} className="usertodolist-list-content">
                        <h4>{item.category_name}<AiFillCaretRight /></h4>
                        {filterStatusList.map((item2, index2) =>
                          item.category_id === item2.fk_category_id
                          && (
                            <div id={`listname${index2 + 1}`} key={index2} onClick={() => listtodolist(item.category_name, item2.todolist_id)} className="usertodolist-list-checkbox">
                              <div className="list-div">
                                <h5>{item2.todolist_name}</h5>
                              </div>
                              <div className="list-div">
                                <div className="list-div-end-con">
                                  <div className="list-div-end">
                                    {item2.todolist_status === "p"
                                      ? <h5 style={{ color: "blue" }}>PENDING</h5>
                                      : <h5 style={{ color: "green" }}>DONE</h5>
                                    }
                                  </div>
                                  <div className="list-div-end">
                                    {item2.todolist_status === 'p'
                                      ? (
                                        <>
                                          {moment(item2.todolist_due).format('ll') > moment(Date.now()).format('ll')
                                            ? (
                                              <h5 style={{ color: "green" }}>⌛Expired {moment(item2.todolist_due).fromNow()}</h5>
                                            )
                                            : (
                                              <h5 style={{ color: "red" }}>🛑Late {moment(item2.todolist_due).fromNow()}</h5>
                                            )
                                          }
                                        </>
                                      )
                                      : (
                                        <h5 style={{ color: "gray" }}>✔️</h5>
                                      )
                                    }

                                  </div>
                                </div>
                              </div>

                            </div>
                          )
                        )
                        }
                        {/* {props.listjoins.map((itme2, index2) => 
                                           item.todolist_id === itme2.fk_todolist_id
                                            && (
                                                
                                                <div key={index2} className="usertodolist-list-checkbox">
                                                    <span>{itme2.lists_text}</span>
                                                </div>
                                            )
                                           
                                        )
                                        } */}

                      </div>
                    )
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export async function getServerSideProps(context) {
  var Token = await context.req.cookies.jwt_token
  const value = {
    Cookie: Token
  }
  const token = await requesttokens(value)
  const verify = await token.data.token
  const { params } = context
  const result = await listuserID(Token,params.user_id)
  const result2 = await listusertodolistid(Token,params.user_id)
  const todolists = await result2.data.todolists
  const categorys = await result2.data.category
  // const result = await listuserID(params.id)
  const posts = await result.data
  if (posts.length > 0) {
    return {
      props: {
        posts: posts,
        todolists: todolists,
        categorys: categorys,
        verify: verify,
        Token:Token
      },
    }
  }
  return {
    notFound: true
  };


}

export default AdmindashboardDetail2