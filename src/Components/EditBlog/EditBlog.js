import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ModifyContext } from '../../App';

const EditBlog = ({ blog, setShowEdit }) => {
    const { register, handleSubmit } = useForm();
    const [modifyCount, setModifyCount] = useContext(ModifyContext)

    const updateBlog = (data) => {
        axios.patch(`https://ishtiak-blog.herokuapp.com/updateBlog/${blog._id}`, data)
            .then(res => {
                setModifyCount(modifyCount + 1)
                setShowEdit(false)
            })
    }

    const cancelEdit = () => {
        setShowEdit(false)
    }
    return (
        <div className='editblog'>
            <div>
                <h2>Update Blog</h2>
                <form onSubmit={handleSubmit(updateBlog)}>
                    <span> Title: <br /> <input type="text" defaultValue={blog.title} {...register('title', { required: true })} /></span> <br />
                    Tag: <br /> <input type="text" defaultValue={blog.tag} {...register('tag', { required: true })} /> <br />
                    Content: <br /><textarea type="text" rows="10" defaultValue={blog.content} {...register('content', { required: true })} /> <br />
                    <button type='submit'>Update</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;