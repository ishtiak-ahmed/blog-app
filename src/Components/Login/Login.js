import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { ModifyContext, UserContext } from '../../App';
import { googleLogin } from './Config/LoginManager';
import { useForm } from "react-hook-form";
import EmailLogin from './EmailLogin';
import Register from './Register';

const Login = () => {
    const [loginUser, setLoginUser] = useState(false)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [user, setUser] = useContext(UserContext)
    const [newUser, setNewUser] = useState({})
    const [registerForm, setRegisterForm] = useState(false)
    let history = useHistory();
    let location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleLogin = () => {
        googleLogin()
            .then(res => {
                const email = res.email;
                fetch('https://ishtiak-blog.herokuapp.com/users', {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ "email": email })
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            console.log(user)
                            if (result.role === 'Commenter') {
                                if (result.spamcount > 1) {
                                    alert('Sorry you are banned from this site for spamming. Contact us if want to comment clean.')
                                } else {
                                    setUser({ ...result, userName: result._id })
                                    setModifyCount(modifyCount + 1)
                                    history.push(from)
                                }
                            }
                            else {
                                setUser({ ...result, userName: result._id })
                                setModifyCount(modifyCount + 1)
                                history.push(from)
                            }

                        } else {
                            setNewUser({ fullName: res.displayName, email: res.email, photo: res.photoURL })
                            setRegisterForm(true)
                        }
                    })
            })
    }
    const onSubmit = data => {
        const user = { ...newUser, role: data.role, _id: data.userName, spamcount: 0 }
        fetch('https://ishtiak-blog.herokuapp.com/createUser', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    setUser(user)
                    setModifyCount(modifyCount + 1)
                    history.push(from)
                }
            })
    }
    const Form = () => {
        return (
            <div className="registration-form">
                <h4>{newUser.fullName}, set a role and username.</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">User Name:</label><input {...register("userName", { required: true })} /> <br />
                    {errors.userName && <span>User Name is required</span>} <br />
                    <label htmlFor="">Role:</label>
                    <select {...register('role', { required: true })} >
                        <option value="Blogger">Blogger</option>
                        <option value="Commenter">Commenter</option>
                    </select> <br />
                    <input type="submit" value='Register' />
                </form>
            </div>
        )
    }

    return (
        <div className='login'>
            <h2>Ishtiak Blog</h2>
            {
                registerForm ? <Form></Form> :
                    <>
                        <h4>You need to login before reading blog here.</h4>
                        <button onClick={handleLogin}>Login With Google Account</button>
                    </>
            }
            {
                loginUser ?
                    <EmailLogin setLoginUser={setLoginUser}></EmailLogin> :
                    <Register setLoginUser={setLoginUser}></Register>
            }
        </div>
    );
};

export default Login;