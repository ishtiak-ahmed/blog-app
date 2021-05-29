import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const ShortBlog = ({ blog }) => {
    const [user] = useContext(UserContext)
    const history = useHistory()
    const readFull = () => {
        history.push(`/blog/${blog._id}`)
    }
    const handleEdit = () => {
        console.log(blog._id)
    }
    const handleDelete = () => {
        console.log(blog._id)
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
                        : <></>
                }
            </div>

            <div>
                <img src={blog.image} alt="" />
            </div>
        </div>
    );
};

export default ShortBlog;