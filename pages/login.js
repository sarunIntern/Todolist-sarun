import React, { useState } from 'react';
import Swal from 'sweetalert2'
function Login() {
    const [Value, setValue] = useState({})

    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }

    function formsubmit(e) {
        e.preventDefault()
        if (Value.password !== Value.conpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error!!',
                text: 'password not match',
            })
        } else {
            console.log(Value)
            Swal.fire({
                icon: 'success',
                title: 'Success!!',
                text: 'Register complete',
            })
        }
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
                            <input name='password' onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
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