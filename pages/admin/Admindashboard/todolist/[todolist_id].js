import React, { useState, useEffect } from "react";
import Toast from "../../../../Alert/Success";
import Swal from "sweetalert2";
import { AiFillEdit,AiOutlinePlus,AiFillCaretRight } from "react-icons/ai";
import { listusertodolistid2, Listchangestatus, todolistlistchangestatus } from "../../../../function/Auth/User"
import { useRouter } from "next/router";
import { requesttokens } from "../../../../function/Auth/Auth";
function Todolistadmin(props) {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    var listcount = 0
    console.log(props)
    useEffect(() => {
        setLoading(false);
    }, [props]);

    function todolistchange(todolist_id) {
        setLoading(true)
        const value = {
            Value: "s"
        }
        todolistlistchangestatus(todolist_id, value).then((res) => {
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
    function lispluse(){
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
            Listchangestatus(lists_id, value).then((res) => {
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
            Listchangestatus(lists_id, value).then((res) => {
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
                                {props.todolists.map((item2, index2) =>
                                    <div key={index2} className="usertodolist-list-content">
                                        <h4>{item2.todolist_name}<AiFillCaretRight /></h4>
                                        {props.lists.map((item, index) =>
                                            <div key={index} className="form-check">
                                                {item.lists_status === 'p'
                                                    ? (
                                                        
                                                        <>
                                                            <input disabled className="form-check-input" value={item.lists_text} type="checkbox"  />
                                                            <label >{item.lists_text}</label>
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            {lispluse()}
                                                            <input disabled checked className="form-check-input" value={item.lists_text} type="checkbox" />
                                                            <label className="checked-item" >{item.lists_text}</label>
                                                            
                                                        </>
                                                    )
                                                }
                                            </div>
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
    const value ={
        Cookie:Token
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
    if(todolists.length > 0){
        return {
            props: {
                todolists: todolists,
                lists: lists,
                category: category,
                verify:verify
            },
        }
    }
    return {
        notFound: true
    };
    
   
}


export default Todolistadmin