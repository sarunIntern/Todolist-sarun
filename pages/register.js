import React from 'react'
import Header from '../component/Header'
function register() {
    return (
        <div>
            <Header />
            <div className='register-con'>
                <div className='register-content'>
                    <div className='login-header'>
                        <div className='login-text'>
                            Register
                        </div>
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                            <small id="emailHelp" class="form-text text-muted">Plsease Enter your email to verify your self</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                        </div>
                        <div className="form-group">
                                <label >Confirm-Password:</label>
                                <input className="form-control" type="password" name="conpassword" placeholder="Confirm Password" required />
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

export default register