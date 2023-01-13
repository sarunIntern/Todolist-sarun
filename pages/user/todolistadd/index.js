import React, { useState, useEffect } from "react";
import Toast from "../../../Alert/Success";
import Swal from "sweetalert2";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { listcategory, todolistadds, categortyadd, listadds } from "../../../function/Auth/User";

function Todolistadd() {
    const [loading, setLoading] = useState(true);
    const [Cat, setCat] = useState({});
    const [formFields, setFormFields] = useState([
        { input: '' }
    ]);

    const [Value, setValue] = useState({
        category_id: " ",
        Data: []
    })
    const [startDate, setStartDate] = useState(Date.now());
    useEffect(() => {
        loaddata();
    }, []);


    function loaddata() {
        listcategory(localStorage.getItem("user_id")).then((res) => {
            setCat(res.data.catnull)
            console.log(res.data.catnull)
            setLoading(false);
        }).catch((err) => {
            console.log(err.response.data);
        });
        // const jwt = Cookies.get('jwt_token')
        // setData(jwt)
    }
    // function setStartDates(e) {
    //     setStartDate(e.target.value)
    //     console.log(e.target.value)
    // }

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
            Value.category_id = Cat[0].category_id
        }
        let i = 0
        let Bool = false
        todolistadds(localStorage.getItem("user_id"), Value).then((res) => {
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
                listadds(localStorage.getItem("user_id"), Value).then((res) => {
                    Toast.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data
                    })
                    document.getElementById("myForm").reset();
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
            categortyadd(localStorage.getItem("user_id"), payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    console.log('Password', res.data)
                    loaddata()
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
                                        <input type="text" name="todolist_name" className="form-control" placeholder="Todolist name" required onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Click here to add Task list</label><br />
                                        <button type="button" className="button-31" role="button" onClick={increase}><AiOutlinePlus /> add list</button>
                                    </div>
                                    {formFields.map((item, index) =>
                                        <div key={index} className="form-group" style={{ marginTop: '10px' }}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">{index + 1}</span>
                                                </div>
                                                <input required type="text" className="form-control" name={`input`} value={item.input} onChange={(e) => handleFormChange(e, index)} />
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-danger" onClick={() => deleteInput(index)}> <AiFillDelete /> </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    }
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Due date</label>
                                        <br />
                                        <input type="date" name='Date' onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Select Category or add more</label>
                                        <select className="form-select form-select-lg mb-3" name="category_id" aria-label=".form-select-lg example" required onChange={handleChange}>
                                            {Cat.map((item, index) =>
                                                <option key={index} value={item.category_id}>{item.category_name}</option>
                                            )
                                            }
                                        </select>
                                        <button type="button" className="button-32" role="button" onClick={Categortyadd} ><AiOutlinePlus /> Add more category</button>
                                    </div>
                                    <div className='usertodolist-buttoncon'>
                                        <button type="submit" className="usertodolist-button" >Create</button>
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
// export async function getServerSideData() {
//     const token = await requesttoken()
//     const Decode = await token.data
//     // const result = await listnullcategory()
//     // const user = await result.data.user
//     // const verified = await result.data.verified
//     // const admin = await result.data.admin
//     return {
//         props: {
//             Decode:Decode,
//             // verified: verified,
//             // admin: admin
//         },
//     }
// }
export default Todolistadd;
