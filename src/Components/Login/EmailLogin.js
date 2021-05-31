import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ModifyContext, UserContext } from '../../App';

const EmailLogin = ({setLoginUser}) => {
    const [user, setUser] = useContext(UserContext)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const submitLogin = (data) => {
        axios.post('https://ishtiak-blog.herokuapp.com/login', data)
            .then(result => {
                console.log(result)
                if (!result.data) {
                    alert('Something went wrong')
                } else {
                    if (result.role === 'Commenter') {
                        if (result.spamcount > 1) {
                            alert('Sorry you are banned from this site for spamming. Contact us if want to comment clean.')
                        } else {
                            setUser(result.data)
                            setModifyCount(modifyCount + 1)
                            history.push('/')
                        }
                    } else {
                        setUser(result.data)
                        history.push('/')
                    }
                }
            })
    }
    return (
        <div>
            <h2>Login With Email and Password</h2>
            Don't have a account? <button onClick={()=>setLoginUser(false)}>Register now</button>
            <form onSubmit={handleSubmit(submitLogin)}>
                <label htmlFor="">Email:</label><input {...register("email", { required: true })} /> <br />
                {errors.email && <span>User Name is required</span>} <br />
                <label htmlFor="">Password:</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.email && <span>User Name is required</span>} <br />
                <input type="submit" value='Login' />
            </form>
        </div>
    );
};

export default EmailLogin;