import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { login } from '../function/Auth/Auth'
import Toast from '../Alert/Success'
import { requesttoken } from '../function/Auth/Auth';
import { useRouter } from "next/router";
function Login() {
    const [Value, setValue] = useState({})
 
    const router = useRouter()
    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }
   async function formsubmit(e) {
        e.preventDefault()
            login(Value).then((res) => {
                    Toast.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login success!!'
                    })
                    router.reload()
                    router.replace('/')
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
    const showToken  = async() => {
        const user = await requesttoken()
        console.log(user.data)
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
                            <input name='email' onChange={handleChange} type="email" className="form-control" id="Login-Input_Email" aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input name='password' onChange={handleChange} type="password" className="form-control" id="Login-Input_Password" placeholder="Password" required />
                        </div>
                        {/* <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <div className='register-buttoncon'>
                            <button type="submit" className="register-button"id='Login-Submit'>Submit</button>
                        </div>
                        
                    </form>
                    {/* <div className='register-buttoncon'>
                            <button  className="register-button" onClick={showToken}>Token</button>
                        </div> */}
                </div>
            </div>
        </div>
    )
}
export default Login