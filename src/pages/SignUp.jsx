import React from 'react';
import * as auth from '../apis/auth'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {

    const navigate = useNavigate();

    const signUp = (e) =>  {
        e.preventDefault();
        const dto = {
            username: e.target.username.value,
            password: e.target.password.value,
        }
        auth.join(dto);
        console.log();
        navigate("/");
    }

    return (
        <div className="form">
      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={ (e) => signUp(e) }>
        <div>
          <label htmlFor="name">username</label>
          <input
                id="username"
                type="text"
                placeholder="username"
                name="username"
                autoComplete='username'
                required
                />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input
                id="password"
                type="password"
                placeholder="password"
                name="password"
                autoComplete='current-password'
                required
                />
        </div>

        <button className="btn btn--form btn-login" value="Login">
          회원가입
        </button>
      </form>
  </div>
    );
};

export default SignUp;