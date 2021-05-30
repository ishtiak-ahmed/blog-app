import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { ModifyContext, UserContext } from '../../App';
const AddBlog = () => {
    const [showForm, setShowForm] = useState(false)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [user] = useContext(UserContext)
    const [imageUrl, setImageUrl] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const addBlog = (blog) => {
        console.log(blog)
        blog.image = imageUrl;
        blog.author = user.fullName;
        blog.authorId = user._id;
        blog.time = (new Date()).toLocaleTimeString()
        blog.date = (new Date()).toLocaleDateString()
        blog.upVote = []
        blog.downVote = []
        blog.reply = []
        axios.post(`https://ishtiak-blog.herokuapp.com/addBlog`, blog)
            .then(data => {
                console.log(data)
                setModifyCount(modifyCount + 1)
            })
    }
    const uploadImage = (e) => {
        console.log(e.target.files[0])
        const imgdata = new FormData()
        imgdata.set('key', "656e2e3b9571e22c6fa6175082a5a794")
        imgdata.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imgdata
        )
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='addblog'>
            <h3 onClick={() => setShowForm(!showForm)}>Write a Blog</h3>
            {
                showForm ?
                    <form onSubmit={handleSubmit(addBlog)}>
                        <p>Title: <br /><input type="text" {...register('title', { required: true })} /></p>
                        {errors.title && <span>Title is required</span>} <br />
                        <p>Tag: <br /><input type="text" {...register('tag', { required: true })} /></p>
                        {errors.tag && <span>Tag is required</span>} <br />
                        <p>Thumbnail: <input type="file" onChange={uploadImage} /></p>
                        <p>Content: <br /><textarea type="text" {...register('content', { required: true })} /></p>
                        {errors.content && <span>User Name is required</span>} <br />
                        <button type='submit'>Publish</button>
                    </form>
                    : ''
            }
        </div>
    );
};

export default AddBlog;