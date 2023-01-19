import React, { useState, useEffect } from "react";
import Toast from "../../../Alert/Success";
import Swal from "sweetalert2";
import { AiOutlinePlus, AiFillDelete, AiFillCaretRight } from "react-icons/ai";
import { requesttokens } from "../../../function/Auth/Auth";
import { listusertodolistid } from "../../../function/Auth/User"
import { useRouter } from "next/router";
import Dropdown from 'react-bootstrap/Dropdown';
import * as moment from 'moment';

function Usertodolist(props) {
    const router = useRouter()
    const { user_id } = router.query
    const [loading, setLoading] = useState(true);
    console.log(props)


    useEffect(() => {
        setLoading(false);
    }, [props]);

    function listtodolist(category_name, todolist_id) {

        router.push(`http://localhost:3000/user/userdashboard/todolist/${todolist_id}`)
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
    function goto() {
        router.push(`http://localhost:3000/user/todolistadd/${user_id}`)
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
                                <h1>All lists</h1>
                            </div>

                            <div className="cat-search-container">
                                <div className="cat-search-container-sub" >
                                    <Dropdown >
                                        <Dropdown.Toggle variant="primary" id="dropdown-cat">
                                            {catText}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="scrollable-menu" id="sss">
                                            {props.categorys.map((item, catindex) =>
                                                <Dropdown.Item id={`category-${catindex+1}`} name={catindex+1} key={catindex} as="button" onClick={() => { setSelect(item.category_id); setDropDownText(item.category_name) }}>{item.category_name}</Dropdown.Item>
                                            )}
                                            <Dropdown.Item id="Category-ALL" as="button"  onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="cat-search-container-sub-1" >
                                    <Dropdown >
                                        <Dropdown.Toggle variant="primary" id="dropdown-status">
                                            {status}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="scrollable-menu">
                                            <Dropdown.Item id="P" as="button" onClick={(id) => { setSelect2("p"); setStatus("Pending") }}>Pending</Dropdown.Item>
                                            <Dropdown.Item id="S" as="button" onClick={(id) => { setSelect2("s"); setStatus("Success") }}>Success</Dropdown.Item>
                                            <Dropdown.Item id="status-ALL" as="button" onClick={(id) => { setSelect2(""); setStatus("ALL") }}>ALL</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="cat-search-container-sub-2" >
                                    <button id='userdashboard-add-btn' type="button" className="button-32" onClick={goto} role="button"><AiOutlinePlus /> Add todolist</button>
                                </div>
                            </div>
                            <div className="usertodolist-card-content">
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
                                                                    :(
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
            )
            }
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
    const result = await listusertodolistid(params.user_id)
    const user = await result.data.user
    const todolists = await result.data.todolists
    const categorys = await result.data.category
    if(user.length > 0 && params.user_id == verify.user_id ){
        return {
            props: {
                todolists: todolists,
                categorys: categorys,
                verify:verify
            },
        }
    }
    return {
        notFound: true
    };
    
    // const verified = await result.data.verified
    // const admin = await result.data.admin
   
}

export default Usertodolist

