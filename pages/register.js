import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { register, contact } from '../function/Auth/Auth';
import Toast from '../Alert/Success'

function Register() {
    const [Value, setValue] = useState({})
    const [Load, setLoad] = useState(false)
    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }
    async function formsubmit(e) {
        e.preventDefault()
        if (Value.password !== Value.conpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password ERROR!!',
                text: 'Your password is not match',
            })
        } else {
            setLoad(true)
            register(Value).then((res) => {
                Toast.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.msg
                })

                contact(res.data.data.user_id, Value).then((res) => {
                    Swal.fire({
                        position: 'top',
                        title: 'Success!',
                        text: "Verifycation link has been send to  " + Value.email,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ตกลง'
                    })
                    setLoad(false)
                }).catch((errs) => {
                    Swal.fire({
                        position: 'top',
                        title: 'Error!',
                        text: errs.response.data,
                        icon: 'error',
                        iconColor: 'Red',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ตกลง'
                    })
                    console.log(errs)
                    setLoad(false)
                })
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
                setLoad(false)
            });
        }
    }
    return (
        <>
            <div className='register-con'>
                <div className='register-content'>
                    <div className='register-text-con'>
                        <div className='register-header'>
                            {Load
                                ? (<div className='register-text'>
                                    Loading...
                                </div>)
                                : (<div className='register-text'>
                                    Register
                                </div>)
                            }
                        </div>
                        <form onSubmit={formsubmit}>
                            <div className="form-group">
                                <label >Email address</label>
                                <input onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                                <small id="emailHelp" className="form-text text-muted">Plsease Enter your email to verify your self</small>
                            </div>
                            <div className="form-group">
                                <label >Username</label>
                                <input onChange={handleChange} name="username" type="text" className="form-control" placeholder="Enter username" required />
                                <small id="emailHelp" className="form-text text-muted">This filed is your name </small>
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input onChange={handleChange} type="password" className="form-control" name="password" placeholder="Password" required />
                            </div>
                            <div className="form-group">
                                <label >Confirm-Password:</label>
                                <input onChange={handleChange} className="form-control" type="password" name="conpassword" placeholder="Confirm Password" required />
                            </div>
                            {Load
                                ? (
                                <div className='register-buttoncon'>
                                    <button type="submit" className="register-button-dis" disabled>Loading..</button>
                                </div>)
                                : (<div className='register-buttoncon'>
                                    <button type="submit" className="register-button" >Submit</button>
                                </div>)
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register