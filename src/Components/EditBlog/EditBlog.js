import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditBlog = ({ blog, setShowEdit }) => {
    const { register, handleSubmit } = useForm();

    const updateBlog = (data) => {
        console.log(data)
        axios.patch(`http://localhost:9717/updateBlog/${blog._id}`, data)
            .then(res => {
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