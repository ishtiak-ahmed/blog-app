import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comment from '../Comment/Comment';
import NewComment from '../Comment/NewComment';

const FullBlog = () => {
    const [showReply, setShowReply] = useState(false)
    const [allReply, setAllReply] = useState([])
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    useEffect(() => {
        axios(`http://localhost:9717/blog/${id}`)
            .then(data => {
                setAllReply(data.data.reply)
                setBlog(data.data)
            })
    }, [id])
    const toggleReply = () => {
        setShowReply(!showReply)
    }
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div>
                    <h2>{blog.title}</h2>
                    <h4>{blog.author}</h4>
                    <p>{blog.content}</p>
                    <p>{allReply.length}</p>

                    {/* <span>UpVote: {blog.upVote.length}</span> */}
                    {/* <span>DownVote: {blog.downVote.length}</span> */}
                    <button onClick={toggleReply}>Reply</button>
                </div>
                <div>
                    <img src={blog.image} alt="" />
                </div>
            </div>
            <div>
                <NewComment root={true} setShowReply={setShowReply} parentId={id}></NewComment>
                {
                    allReply.map(reply => <Comment key={reply} id={reply}></Comment>)
                }
            </div>
        </>
    );
};

export default FullBlog;