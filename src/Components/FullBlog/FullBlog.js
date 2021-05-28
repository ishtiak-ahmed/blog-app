import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comment from '../Comment/Comment';

const FullBlog = () => {
    const [showReply, setShowReply] = useState(false)
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    useEffect(() => {
        axios(`http://localhost:9717/blog/${id}`)
            .then(data => setBlog(data.data[0]))
    }, [id])
    const toggleReply = () => {
        setShowReply(!showReply)
    }
    return (
        <>
            <div className='comment' style={{ display: 'flex' }}>
                <div>
                    <h2>{blog.title}</h2>
                    <h4>{blog.author}</h4>
                    <p>{blog.content}</p>

                    {/* <span>UpVote: {blog.upVote.length}</span> */}
                    {/* <span>DownVote: {blog.downVote.length}</span> */}
                    <button onClick={toggleReply}>Reply</button>
                </div>
                <div>
                    <img src={blog.image} alt="" />
                </div>
            </div>
            {
                showReply ? <Comment id='coomment-1'></Comment> : <></>
            }
        </>
    );
};

export default FullBlog;