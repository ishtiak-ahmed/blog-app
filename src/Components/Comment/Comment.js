import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ModifyContext, UserContext } from '../../App';
import Action from '../Action/Action';
import { deleteComment, updateParent } from '../BloggerAction/BloggerAction';
import NewComment from './NewComment';

const Comment = ({ id, parentId, commentStatus }) => {
    const [user] = useContext(UserContext)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
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
                setReply(data.data.reply)
            })
    }, [showReply, id])
    const toggleReply = () => {
        setShowReply(!showReply)
    }
    const addUpVote = () => {
        setUpVote([...upVote, user.fullName])
    }
    const addDownVote = () => {
        setDownVote([...downVote, user.fullName])
    }
    const handleEdit = () => {
        console.log('editing comment')
    }
    const handleDelete = () => {
        console.log('deleteing comment')
        deleteComment(id)
        updateParent(parentId, id)
        setModifyCount(modifyCount + 1)
    }
    return (
        <div className='comment'>
            <p>{commentData.comment}
                {commentData.commenterId === user.userName ?
                    <>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </> : <></>}
            </p>
            <p><strong>{commentData.commenter}</strong>
                <button onClick={() => setSpam(!spam)}>{spam ? 'Remove From Spam' : 'Mark As Spam'}</button>
            </p>
            <Action action={{ upVote, addUpVote, downVote, addDownVote, toggleReply, allReply }}></Action>
            {
                showReply ?
                    <div>
                        {commentStatus ?
                            <NewComment root={false} setShowReply={setShowReply} parentId={id}></NewComment>
                            : <></>
                        }
                        {
                            allReply ? allReply.map(reply => <Comment key={reply} parentId={id} id={reply}></Comment>) : <></>
                        }
                    </div>
                    : <></>
            }
        </div>
    );
};

export default Comment;