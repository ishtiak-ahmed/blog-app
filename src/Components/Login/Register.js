import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ModifyContext, UserContext } from '../../App';

const Register = ({ setLoginUser }) => {
    const [user, setUser] = useContext(UserContext)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitRegistration = (data) => {
        console.log(data)
        const newUser = { ...data, spamcount: 0, _id: data.userName }
        axios.post('https://ishtiak-blog.herokuapp.com/register', newUser)
            .then(result => {
                console.log(result)
                if (result.data) {
                    setUser(newUser)
                    history.push('/')
                } else {
                    alert('something went wrong')
                }
            })
    }
    return (
        <div>
            <h2>Register now</h2>
            Already have a account? <button onClick={() => setLoginUser(true)}>Login now</button>
            <form onSubmit={handleSubmit(submitRegistration)}>
                <label htmlFor="">Full name:</label><input {...register("fullName", { required: true })} /> <br />
                {errors.fullName && <span>Name is required</span>} <br />
                <label htmlFor="">userName:</label><input {...register("userName", { required: true })} /> <br />
                {errors.userName && <span>User name is required</span>} <br />
                <label htmlFor="">Email:</label><input {...register("email", { required: true })} /> <br />
                {errors.email && <span>Email is required</span>} <br />
                <span style={{ marginRight: '1em' }}>Role:</span><select {...register('role', { required: true })} >
                    <option value="Blogger">Blogger</option>
                    <option value="Commenter">Commenter</option>
                </select> <br />
                <label htmlFor="">Password:</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.password && <span>Password is required</span>} <br />
                <input type="submit" value='Register' />
            </form>
        </div>
    );
};

export default Register;