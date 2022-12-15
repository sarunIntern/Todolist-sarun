import React from 'react'
function Login() {
    return (
        <div>
            <div className='login-con'>
                <div className='login-content'>
                    <div className='login-header'>
                        <div className='login-text'>
                            Login
                        </div>
                    </div>
                    <form>
                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
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