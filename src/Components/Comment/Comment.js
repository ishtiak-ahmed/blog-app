import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Action from '../Action/Action';
import NewComment from './NewComment';

const Comment = ({ id, commentStatus }) => {
    const [user] = useContext(UserContext)
    const [spam, setSpam] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [commentData, setCommnetData] = useState({})
    const [allReply, setReply] = useState([])
    const [upVote, setUpVote] = useState([])
    const [downVote, setDownVote] = useState([])
    useEffect(() => {
        axios(`http://localhost:9717/getComment/${id}`)
            .then(data => {
                setCommnetData(data.data)
                const replies = data.data.reply
                let sorted = []
                replies.forEach(reply => {
                    sorted.unshift(reply)
                });
                console.log(sorted)
                setReply(sorted)
            })
    }, [showReply])
    const toggleReply = () => {
        setShowReply(!showReply)
    }
    const addUpVote = () => {
        setUpVote([...upVote, user.fullName])
    }
    const addDownVote = () => {
        setDownVote([...downVote, user.fullName])
    }
    return (
        <div className='comment'>
            <p>{commentData.comment}</p>
            <p><strong>{commentData.commenter}</strong>
                <button onClick={() => setSpam(!spam)}>{spam ? 'Remove From Spam' : 'Mark As Spam'}</button>
            </p>
            <Action action={{ upVote, addUpVote, downVote, addDownVote, toggleReply, allReply }}></Action>
            {
                showReply ?
                    <div>
                        {commentStatus ?
                            <NewComment root={true} setShowReply={setShowReply} parentId={id}></NewComment>
                            : <></>
                        }
                        {
                            allReply.map(reply => <Comment key={reply} id={reply}></Comment>)
                        }
                    </div>
                    : <></>
            }
        </div>
    );
};

export default Comment;