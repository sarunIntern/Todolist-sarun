import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { login } from '../function/Auth/Auth'
import Toast from '../Alert/Success'
function Login() {
    const [Value, setValue] = useState({})
    const [Data, setData] = useState({})
    console.log(Data)
    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }
    function formsubmit(e) {
        e.preventDefault()
            login(Value).then((res) => {
                    Toast.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login success!!'
                    })
                    setData(res.data)
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
    return (
        <div>
            <div className='login-con'>
                <div className='login-content'>
                    <div className='login-header'>
                        <div className='login-text'>
                            Login
                        </div>
                    </div>
                    <form onSubmit={formsubmit}>
                        <div className="form-group">
                            <label >Email address</label>
                            <input name='email' onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input name='password' onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                        </div>
                        {/* <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <div className='register-buttoncon'>
                            <button type="submit" className="register-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login