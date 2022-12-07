import React from 'react'
import Header from '../component/Header'
function login() {
    return (
        <div>
            <Header />
            <div className='login-con'>
                <div className='login-content'>
                    <div className='login-header'>
                        <div className='login-text'>
                            Login
                        </div>
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                           
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        {/* <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <div className='register-buttoncon'>
                        <button type="submit" class="register-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default login