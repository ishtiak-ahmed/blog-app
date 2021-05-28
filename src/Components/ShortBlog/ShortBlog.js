import React from 'react';
import { useHistory } from 'react-router';

const ShortBlog = ({ blog }) => {
    const history = useHistory()
    const readFull = () => {
        history.push(`/blog/${blog._id}`)
    }
    return (
        <div className='shortblog'>
            <div className="info">
                <h2>{blog.title}</h2>
                <h5>{blog.author}</h5>
                <p>{blog.content}</p>
                <button onClick={readFull}>Read more</button>
            </div>

            <div>
                <img style={{ maxHeight: '200px' }} src={blog.image} alt="" />
            </div>
        </div>
    );
};

export default ShortBlog;