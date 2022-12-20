import React, { useState } from 'react';
import Swal from 'sweetalert2'

function Register() {
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
            
            Swal.fire({
                icon: 'success',
                title: 'Success!!',
                text: 'Register complete',
            })
        }
    }

    return (
        <>
            <div className='register-con'>
                <div className='register-content'>
                    <div className='register-text-con'>
                        <div className='register-header'>
                            <div className='register-text'>
                                Register
                            </div>
                        </div>
                        <form onSubmit={formsubmit}>
                            <div className="form-group">
                                <label >Email address</label>
                                <input onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                                <small id="emailHelp" className="form-text text-muted">Plsease Enter your email to verify your self</small>
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input onChange={handleChange} type="password" className="form-control" name="password" placeholder="Password" required />
                            </div>
                            <div className="form-group">
                                <label >Confirm-Password:</label>
                                <input onChange={handleChange} className="form-control" type="password" name="conpassword" placeholder="Confirm Password" required />
                            </div>
                            <div className='register-buttoncon'>
                                <button type="submit" className="register-button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register