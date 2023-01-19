import React, { useState, useEffect } from "react";
import Toast from "../../../../Alert/Success";
import Swal from "sweetalert2";
import { AiFillEdit, AiOutlinePlus, AiFillCaretRight } from "react-icons/ai";
import { listusertodolistid2, Listchangestatus, todolistlistchangestatus } from "../../../../function/Auth/User"
import { useRouter } from "next/router";
import { requesttokens } from "../../../../function/Auth/Auth";
function Todolistcategory(props) {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    var listcount = 0
  
    useEffect(() => {
        setLoading(false);
    }, [props]);

    function todolistchange(todolist_id) {
        setLoading(true)
        const value = {
            Value: "s"
        }
        todolistlistchangestatus(props.Token,todolist_id, value).then((res) => {
            Toast.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data
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
    function lispluse() {
        listcount += 1
    }
    function refreshdata() {
        setLoading(true);
        router.replace(router.asPath);
    }

    const handleCheck = (event, lists_id) => {
        setLoading(true)
        if (event.target.checked) {
            const value = {
                Value: "s"
            }
            Listchangestatus(props.Token,lists_id, value).then((res) => {
                Toast.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data
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
        } else {
            const value = {
                Value: "p"
            }
            Listchangestatus(props.Token,lists_id, value).then((res) => {
                Toast.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data
                })
                if (props.todolists[0].todolist_status !== 'p') {
                    todolistlistchangestatus(props.todolists[0].todolist_id, value).then((res) => {
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
    }
    function goto() {
        router.push(`/user/todolistedit/${props.todolists[0].todolist_id}`)
    }
    return (
        <>
            {loading == true ? (
                <div className="loading-page-container">
                    <div className="loading-page">
                        <div id="spinner"></div>
                        <h1 style={{ color: "rgb(30, 109,169)" }}>Loading . . .</h1>
                    </div>
                </div>
            ) : (
                <div className="usertodolist-con">
                    <div className="usertodolist-con-sub">
                        <div className="usertodolist-card ">
                            <div className="usertodolist-card-header">
                                <h1>{props.category[0].category_name}</h1>
                            </div>
                            <div className="usertodolist-card-content">
                                <h1 className="usertodolist-lable-userdashboard-list">List</h1>
                                <br />
                                <button type="button" className="button-32" onClick={goto} role="button"><AiFillEdit /> Edit </button>
                                {props.todolists.map((item2, index2) =>
                                    <div key={index2} className="usertodolist-list-content">
                                        <h4>{item2.todolist_name}<AiFillCaretRight /></h4>
                                        {props.lists.map((item, index) =>
                                            <div  key={index} className="form-check">
                                                {item.lists_status === 'p'
                                                    ? (

                                                        <>
                                                            <input id={`checkbox-${index + 1}`} className="form-check-input" value={item.lists_text} type="checkbox" onChange={(event) => handleCheck(event, item.lists_id)} />
                                                            <label >{item.lists_text}</label>
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            {lispluse()}
                                                            <input id={`checkbox-${index + 1}`} checked className="form-check-input" value={item.lists_text} type="checkbox" onChange={(event) => handleCheck(event, item.lists_id)} />
                                                            <label className="checked-item" >{item.lists_text}</label>

                                                        </>
                                                    )
                                                }
                                            </div>
                                        )
                                        }
                                        {listcount === props.lists.length
                                            && (
                                                <>
                                                    {props.todolists[0].todolist_status === 's'
                                                        ? (
                                                            <div className='listsubmit-buttoncon'>
                                                                <button disabled className="listsubmit-button" id='listsubmit-Submit' onClick={() => todolistchange(item2.todolist_id)} >This list is already complete!!</button>
                                                            </div>
                                                        )
                                                        :(
                                                            <div className='listsubmit-buttoncon'>
                                                                <button className="listsubmit-button" id='listsubmit-Submit' onClick={() => todolistchange(item2.todolist_id)} >Complete!!</button>
                                                            </div>
                                                        )
                                                    }

                                                </>
                                            )

                                        }

                                    </div>

                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
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
    const result = await listusertodolistid2(Token,params.todolist_id)
    const todolists = await result.data.todolists
    const category = await result.data.category
    const lists = await result.data.lists
    // const verified = await result.data.verified
    // const admin = await result.data.admin
    if (todolists.length > 0 && todolists[0].fk_todolist_user_id == verify.user_id) {
        return {
            props: {
                todolists: todolists,
                lists: lists,
                category: category,
                verify: verify,
                Token:Token
            },
        }
    } return {
        notFound: true
    };
}


export default Todolistcategory