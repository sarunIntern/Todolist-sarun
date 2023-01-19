import React, { useState, useEffect } from "react";
import Toast from "../../../Alert/Success";
import Swal from "sweetalert2";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { listcategory, todolistadds, categortyadd, listadds } from "../../../function/Auth/User";
import { requesttokens } from "../../../function/Auth/Auth";
import { useRouter } from "next/router";
function Todolistaddid(props) {

    const [loading, setLoading] = useState(true);
    const [formFields, setFormFields] = useState([
        { input: '' }
    ]);

    const router = useRouter()
    const { user_id } = router.query

    const [Value, setValue] = useState({
        category_id: " ",
        Data: []
    })

    console.log(Value)
    useEffect(() => {
        setLoading(false)
    }, [props]);

    function refreshdata() {
        setLoading(true);

        router.replace(router.asPath);
    }

    function increase() {
        let object = {
            input: '',
        }
        setFormFields([...formFields, object])
    }

    const deleteInput = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }
    async function formsubmit(e) {
        e.preventDefault()
        if (Value.category_id == " ") {
            Value.category_id = props.category[0].category_id
        }
        let i = 0
        let Bool = false
        todolistadds(user_id, Value).then((res) => {
            while (true) {
                if (i === formFields.length) {
                    console.log([Value.Data])
                    Bool = true
                    break;
                } else {
                    Value.Data[i] = [formFields[i].input, res.data.todolist_id]
                    i += 1;
                }
            }
            if (Bool === true) {
                listadds(user_id, Value).then((res) => {
                    Toast.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data
                    })
                    document.getElementById("myForm").reset();
                    setFormFields([{ input: '' }])
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
                });
            }

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
        });

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
                                <form id="myForm" onSubmit={formsubmit}>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Todolist name</label>
                                        <input id="todolistadd-todolistname-input" type="text" name="todolist_name" className="form-control" placeholder="Todolist name" required onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Click here to add Task list</label><br />
                                        <button id="todolistdd-list-btn" type="button" className="button-31" role="button" onClick={increase}><AiOutlinePlus /> add list</button>
                                    </div>
                                    {formFields.map((item, index) =>
                                        <div key={index} className="form-group" style={{ marginTop: '10px' }}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">{index + 1}</span>
                                                </div>
                                                <input id={`todolistadd-addinput-${index+1}`} required type="text" className="form-control" name={`input`} value={item.input} onChange={(e) => handleFormChange(e, index)} />
                                                {formFields.length > 1
                                                    ? (
                                                        <div className="input-group-append">
                                                            <button id={`todolistadd-deleteinput-${index+1}`} type="button" className="btn btn-danger" onClick={() => deleteInput(index)}> <AiFillDelete /> </button>
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">//</span>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    )
                                    }
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Due date</label>
                                        <br />
                                        <input id="todolistadd-date" type="date" name='Date' onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Select Category or add more</label>
                                        <select className="form-select form-select-lg mb-3 " size="5" name="category_id" aria-label=".form-select-lg example" required onChange={handleChange}>
                                            {props.category.map((item, index) =>
                                                <option id={`todolistadd-category-${index+1}`} key={index} value={item.category_id}>{item.category_name}</option>
                                            )
                                            }
                                        </select>
                                        <button type="button" className="button-32" role="button" onClick={Categortyadd} ><AiOutlinePlus /> Add more category</button>
                                    </div>
                                    <div className='usertodolist-buttoncon'>
                                        <button id="todolistadd-confirm-btn" type="submit" className="usertodolist-button" >Create</button>
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
    const cat = await listcategory(params.user_id)
    const category = await cat.data.catnull
    // const result = await listnullcategory()
    // const user = await result.data.user
    // const verified = await result.data.verified
    // const admin = await result.data.admin
    if (category.length > 0 && params.user_id == verify.user_id) {
        return {
            props: {
                category: category,
                verify: verify
                // verified: verified,
                // admin: admin
            },
        }
    }
    return {
        notFound: true
    };

}
export default Todolistaddid;
