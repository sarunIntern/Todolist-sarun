import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Toast from "../../../Alert/Success";
import Swal from "sweetalert2";
import { listnullcategory, todolistadds } from "../../../function/Auth/User";
function todolistadd() {
    const [loading, setLoading] = useState(true);
    const [Cat, setCat] = useState({});
    const [input, setInput] = useState(0);
    const [Value, setValue] = useState({
        category_id:" "
    })
    const [startDate, setStartDate] = useState(Date.now());
    useEffect(() => {
        loaddata();
    }, []);

    function loaddata() {
        listnullcategory(localStorage.getItem("user_id")).then((res) => {
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
    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }
    async function formsubmit(e) {
        e.preventDefault()
        if(Value.category_id == " "){
            Value.category_id = Cat[0].category_id
          }
        todolistadds(localStorage.getItem("user_id"), Value).then((res) => {
            Toast.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data
            })
        }).catch((err) => {
            Swal.fire({
                position: 'top',
                title: 'Error!',
                text: err.response,
                icon: 'error',
                iconColor: 'Red',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            })
            console.log(err)
        });
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
                                <h1>Todolistadd</h1>
                            </div>
                            <div className="usertodolist-card-content">
                                <form onSubmit={formsubmit}>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Todolist name</label>
                                        <input type="text" name="todolist_name" className="form-control" placeholder="Todolist name" required  onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Task list</label>
                                        {input.map((item,index)=>
                                        
                                        <input type="text" name="todolist_name" className="form-control" placeholder="Todolist name" required  onChange={handleChange}/> 
                                        
                                        )      
                                        }

                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Due date</label>
                                        <br />
                                        <input type="date" name='Date' onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Category</label>
                                        <select className="form-select form-select-lg mb-3" name="category_id" aria-label=".form-select-lg example" required onChange={handleChange}>
                                            {Cat.map((item, index) =>
                                                <option key={index} value={item.category_id}>{item.category_name}</option>
                                            )
                                            }
                                        </select>
                                    </div>
                                    <div className='usertodolist-buttoncon'>
                                        <button type="submit" className="usertodolist-button">Submit</button>
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
export default todolistadd;
