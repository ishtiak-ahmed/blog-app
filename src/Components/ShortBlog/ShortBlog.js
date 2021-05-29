import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ModifyContext, UserContext } from '../../App';
import EditBlog from '../EditBlog/EditBlog';

const ShortBlog = ({ blog }) => {
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [user] = useContext(UserContext)
    const [showEdit, setShowEdit] = useState(false)
    const history = useHistory()
    const readFull = () => {
        history.push(`/blog/${blog._id}`)
    }
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
                <h2>{blog.title}</h2>
                <h5>{blog.author} </h5>
                <p>{blog.content}</p>
                <button onClick={readFull}>Read more</button>
                {
                    blog.authorId === user.userName ?
                        <>
                            <button onClick={handleEdit}>Edit Post</button>
                            <button onClick={handleDelete}>Delete Post</button>
                        </>
                        : ''
                }
            </div>

            <div>
                <img src={blog.image} alt="" />
            </div>
            {
                showEdit ? <EditBlog setShowEdit={setShowEdit} blog={blog}></EditBlog> : ''
            }
        </div>
    );
};

export default ShortBlog;