import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModifyContext, UserContext } from '../../App';
import EditBlog from '../EditBlog/EditBlog';

const ShortBlog = ({ blog }) => {
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [user] = useContext(UserContext)
    const [showEdit, setShowEdit] = useState(false)
    const handleEdit = () => {
        console.log(blog._id)
        setShowEdit(true)
    }
    const handleDelete = () => {
        const url = `https://ishtiak-blog.herokuapp.com/deleteBlog/${blog._id}`
        console.log(url)
        axios.delete(url)
            .then(result => {
                setModifyCount(modifyCount + 1)
                console.log(result)
            })
    }
    return (
        <div className='shortblog'>
            <div className="info">
                <h2><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h2>
                <h5><Link to={`/profile/${blog.authorId}`}>{blog.author}, at {blog.time} {blog.date}</Link></h5>
                <p>{blog.content}</p>
                <button ><Link to={`/blog/${blog._id}`}> Read more </Link></button>
                {
                    blog.authorId === user.userName ?
                        <>
                            <button onClick={handleEdit}>Edit Post</button>
                            <button onClick={handleDelete}>Delete Post</button>
                        </>
                        : ''
                }
            </div>

            <div className='blog-img'>
                <img src={blog.image} alt="" />
            </div>
            {
                showEdit ? <EditBlog setShowEdit={setShowEdit} blog={blog}></EditBlog> : ''
            }
        </div>
    );
};

export default ShortBlog;