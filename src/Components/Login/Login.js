import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { googleLogin } from './Config/LoginManager';
import { useForm } from "react-hook-form";

const Login = () => {
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
                fetch('http://localhost:9717/users', {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ "email": email })
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            const userName = result._id;
                            const role = result.role;
                            const photo = result.photo;
                            const email = result.email;
                            const fullName = result.fullName;
                            setUser({ userName, role, photo, fullName, email })
                            history.push(from)

                        } else {
                            setNewUser({ fullName: res.displayName, email: res.email, photo: res.photoURL })
                            setRegisterForm(true)
                        }
                    })
            })
    }
    const onSubmit = data => {
        const user = { ...newUser, role: data.role, _id: data.userName }
        fetch('http://localhost:9717/createUser', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    setUser(user)
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
            <h2>Felicity Blog</h2>
            {
                registerForm ? <Form></Form> :
                    <>
                        <h4>You need to login before reading blog here.</h4>
                        <button onClick={handleLogin}>Login With Google Account</button>
                    </>
            }
        </div>
    );
};

export default Login;