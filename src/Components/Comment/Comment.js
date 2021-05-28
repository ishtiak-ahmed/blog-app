import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewComment from './NewComment';

const Comment = ({ id }) => {
    const [showReply, setShowReply] = useState(false)
    const [commentData, setCommnetData] = useState({})
    useEffect(() => {
        axios(`http://localhost:9717/getComment/${id}`)
            .then(data => setCommnetData(data.data))
    }, [id])
    const toggleReply = () => {
        setShowReply(!showReply)
    }
    return (
        <div className='comment'>
            <h2>{commentData.comment}</h2>
            <button onClick={toggleReply}>Reply</button>
            {
                showReply ?
                    <div>
                        <NewComment></NewComment>
                        {
                            commentData.reply.map(reply => <Comment key={reply} id={reply}></Comment>)
                        }
                    </div>
                    : <></>
            }
        </div>
    );
};

export default Comment;