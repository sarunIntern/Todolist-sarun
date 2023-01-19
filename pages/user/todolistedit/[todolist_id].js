import React, { useState, useEffect } from "react";
import Toast from "../../../Alert/Success";
import Confirm from "../../../Alert/Confirm"
import Swal from "sweetalert2";
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { todlistedit, todolisteditname, todolisteditduedate, todolisteditcategory, categortyadd, categortyeditname, categorydelete 
,listaddsone,listdeletesone,listeditone} from "../../../function/Auth/User";

import { requesttokens } from "../../../function/Auth/Auth";
import { useRouter } from "next/router";
import * as moment from 'moment';
function Todolistedit(props) {
    const [loading, setLoading] = useState(true);

    const [catfk, setCatfk] = useState({ category_id: null, fk_user_id: null, });
    const [formFields, setFormFields] = useState([{ input: '' }]);
    const router = useRouter()
    const { todolist_id } = router.query
    const user_id = props.todolists[0].fk_todolist_user_id

    const [Value, setValue] = useState({})

    console.log(props)
    useEffect(() => {
        setFormFields(props.lists)
        setLoading(false)
    }, [props]);

    function refreshdata() {
        setLoading(true);
        setCatfk({ category_id: null, fk_user_id: null, })
        router.replace(router.asPath);
    }

  async function increase() {
        const { value: Text } = await Swal.fire({
            title: 'List add',
            input: 'text',
            inputLabel: 'Input list text',
            inputPlaceholder: 'List text',
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green',
        })
        if (Text) {
            const payload = {
                lists_text:Text
            }
            listaddsone(todolist_id,payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    refreshdata()
                }).catch(err => {
                    console.log(err.response)
                })
        }
        // let object = {
        //     input: '',
        // }
        // setFormFields([...formFields, object])
    }

    const deleteInput = (index,lists_id) => {
        Confirm.fire({
            title: 'Confirm!!',
            text: "Do you want to delete list task ?",
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                listdeletesone(lists_id).then((res) => {
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
        // let data = [...formFields];
        // data.splice(index, 1)
        // setFormFields(data)
    }

    async function editlists(lists_id){
        const { value: Text } = await Swal.fire({
            title: 'List edit ',
            input: 'text',
            inputLabel: 'Input list text',
            inputPlaceholder: 'List text',
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green',
        })
        if (Text) {
            const payload = {
               lists_text: Text
            }
            listeditone(lists_id, payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    refreshdata()
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }

    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }

    const Categortyadd = async (id) => {
        const { value: Name } = await Swal.fire({
            title: 'Category add ',
            input: 'text',
            inputLabel: 'Input category name',
            inputPlaceholder: 'Category name',
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green',
        })
        if (Name) {
            const payload = {
                category_name: Name
            }
            categortyadd(user_id, payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    console.log('Value', res.data)
                    refreshdata()
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }

    function editname(event, todolist_id) {
        if (Value.todolist_name === undefined) {
            // console.log(props.todolists[0].todolist_name, todolist_id)
            Swal.fire({
                title: 'Error!',
                text: "Please input name",
                icon: 'warning'
            })
        } else {
            // console.log(Value.todolist_name, todolist_id)
            const value = {
                todolist_name: Value.todolist_name
            }
            Confirm.fire({
                title: 'Confirm!!',
                text: "Do you want to edit todolist name ?",
                icon: 'warning',
            }).then((result) => {
                if (result.isConfirmed) {
                    todolisteditname(todolist_id, value).then((res) => {
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
    }

    function editduedate(todolist_id) {
        if (Value.Date === undefined) {
            Swal.fire({
                title: 'Error!',
                text: "Please input date",
                icon: 'warning'
            })
        } else {
            const value = {
                Date: Value.Date
            }
            Confirm.fire({
                title: 'Confirm!!',
                text: "Do you want to edit todolist due date ?",
                icon: 'warning',
            }).then((result) => {
                if (result.isConfirmed) {
                    todolisteditduedate(todolist_id, value).then((res) => {
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
    }
    function categoryeditselect(category_id, fk_user_id) {
        console.log(category_id, fk_user_id)
        setCatfk({ category_id: category_id, fk_user_id: fk_user_id })
    }
    async function categoryedit() {
        console.log(catfk.category_id, catfk.fk_user_id)
        const { value: Name } = await Swal.fire({
            title: 'Category Edit ',
            input: 'text',
            inputLabel: 'Input category name',
            inputPlaceholder: 'Category name',
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green',
        })
        if (Name) {
            const payload = {
                category_name: Name
            }
            categortyeditname(catfk.category_id, payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    refreshdata()
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }

    async function Categorydelete() {
        Confirm.fire({
            title: 'Confirm!!',
            text: "Do you want to delete category ?",
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                categorydelete(catfk.category_id).then((res) => {
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
    function editcategory() {
        const value = {
            category_id: catfk.category_id
        }
        Confirm.fire({
            title: 'Confirm!!',
            text: "Do you want to delete category ?",
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                todolisteditcategory(todolist_id, value).then((res) => {
                    Swal.fire({
                        title: 'Changed!!',
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
                                <h1>Create a todolist</h1>
                            </div>
                            <div className="usertodolist-card-content" style={{ maxHeight: "1000px" }}>
                                <form id="myForm">
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Todolist name</label>
                                        <div className="input-group mb-3">
                                            <input type="text" name="todolist_name" defaultValue={props.todolists[0].todolist_name} className="form-control" placeholder="Todolist name" required onChange={handleChange} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-secondary" onClick={(e) => editname(e, props.todolists[0].todolist_id)}> <AiFillEdit /> </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Click here to add Task list</label><br />
                                        <button id="todolistedit-list-btn" type="button" className="button-31" role="button" onClick={increase}><AiOutlinePlus /> add list</button>
                                    </div>
                                    {formFields.map((item, index) =>
                                        <div key={index} className="form-group" style={{ marginTop: '10px' }}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                <button type="button" className="btn btn-secondary" onClick={()=>editlists(item.lists_id)}> <AiFillEdit /> </button>
                                                </div>
                                                <input id="myForm" required type="text" className="form-control" name={`input`} disabled value={item.lists_text} />
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-danger" onClick={() => deleteInput(index,item.lists_id)}> <AiFillDelete /> </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    }
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Due date now is {moment(props.todolists[0].todolist_due).format('L')}</label>
                                        <br />
                                        <input type="date" name='Date' onChange={handleChange} required />
                                        <div className='usertodolist-buttoncon-duedate'>
                                            <button type="button" className="usertodolist-button-duedate" onClick={() => editduedate(props.todolists[0].todolist_id)}><AiFillEdit /> Edit Due date</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Select Category or add more</label>
                                        <br />
                                        <label className="usertodolist-lable">Your current category is '{props.categoryname[0].category_name}'</label>
                                        <select className="form-select form-select-lg mb-3 " size="5" name="category_id" aria-label=".form-select-lg example" required onChange={handleChange}>
                                            {props.category.map((item, index) =>
                                                <option key={index} onClick={() => categoryeditselect(item.category_id, item.fk_user_id)}>{item.category_name}</option>
                                            )
                                            }
                                        </select>
                                        {(Value.category_id !== undefined)
                                            && (
                                                <>
                                                    {catfk.fk_user_id !== null
                                                        ? (
                                                            <div className='usertodolist-buttoncon-duedate'>
                                                                <button type="button" className="usertodolist-button-category" onClick={categoryedit}><AiFillEdit /> Edit Category {Value.category_id}</button>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <button type="button" className="usertodolist-button-duedate-delete" onClick={Categorydelete} > <AiFillDelete /> Delete category {Value.category_id}</button>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <button type="button" className="usertodolist-button-category-confirm" onClick={editcategory} > Change category to {Value.category_id}</button>
                                                            </div>
                                                        )
                                                        : (
                                                            <div className='usertodolist-buttoncon-duedate'>
                                                                <button type="button" className="usertodolist-button-category-confirm" onClick={editcategory} > Change category to {Value.category_id}</button>
                                                            </div>
                                                        )
                                                    }

                                                </>
                                            )
                                        }

                                        <button type="button" className="button-32" role="button" onClick={Categortyadd} ><AiOutlinePlus /> Add more category</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export async function getServerSideProps(context) {
    var Token = await context.req.cookies.jwt_token
    const value = {
        Cookie: Token
    }
    const token = await requesttokens(value)
    const verify = await token.data.token
    const { params } = context
    const result = await todlistedit(params.todolist_id)
    const category = await result.data.category
    const todolists = await result.data.todolists
    const lists = await result.data.lists
    const categoryname = await result.data.categoryname
    if (todolists.length > 0 && todolists[0].fk_todolist_user_id == verify.user_id) {
        return {
            props: {
                category: category,
                todolists: todolists,
                lists: lists,
                categoryname: categoryname,
                verify:verify
    
            },
        }
    }
    return {
        notFound: true
    };

   
}
export default Todolistedit;
