import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModifyContext, UserContext } from '../../App';
import Action from '../Action/Action';
import { deleteComment, updateNested, markAsSpam, removeFromSpam, updateParent } from '../BloggerAction/BloggerAction';
import EditComment from './EditComment';
import NewComment from './NewComment';

const Comment = ({ id, parentId, commentStatus, nested }) => {
    const [user] = useContext(UserContext)
    const [topCommenter, setTopCommenter] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [spam, setSpam] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [commentData, setCommnetData] = useState({})
    const [allReply, setReply] = useState([])
    const [upVote, setUpVote] = useState([])
    const [downVote, setDownVote] = useState([])
    useEffect(() => {
        axios(`https://ishtiak-blog.herokuapp.com/getComment/${id}`)
            .then(data => {
                setCommnetData(data.data)
                setReply(data.data.reply)
            })
    }, [showReply, id, modifyCount])
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
        setShowEdit(!showEdit)
    }
    const handleDelete = () => {
        console.log('deleteing comment')
        deleteComment(id)
        if (nested) {
            console.log('deleting nested reply')
            updateNested(parentId, id)
        } else {
            updateParent(parentId, id)
        }
        setModifyCount(modifyCount + 1)
        setShowReply(false)
    }
    const handleSpammer = () => {
        if (spam) {
            removeFromSpam(commentData.commenterId)
        } else {
            markAsSpam(commentData.commenterId)
        }
        setSpam(!spam)
    }
    return (
        <div className='comment'>
            <p>{commentData.comment}
                {commentData.commenterId === user.userName ?
                    <>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </> : ''}
            </p>
            {
                showEdit ? <EditComment setShowEdit={setShowEdit} comment={commentData}></EditComment> : ''
            }
            <p><strong><Link to={`/profile/${commentData.commenterId}`}>{commentData.commenter}</Link> </strong>
                {
                    user.role === 'Blogger' ?
                        <>
                            <button onClick={handleSpammer}>{spam ? 'Remove From Spam' : 'Mark As Spam'}</button>
                            <button onClick={() => setTopCommenter(!topCommenter)}>{topCommenter ? 'Remove From Top Commenter' : 'Mark As Top Commenter'}</button>
                        </> : ''
                }
            </p>
            <Action action={{ upVote, addUpVote, downVote, addDownVote, toggleReply, allReply }}></Action>
            {
                showReply ?
                    <div>
                        {commentStatus ?
                            <NewComment root={false} setShowReply={setShowReply} parentId={id}></NewComment>
                            : ''
                        }
                        {
                            allReply ? allReply.map(reply => <Comment key={reply} nested={true} parentId={id} id={reply}></Comment>) : ''
                        }
                    </div>
                    : ''
            }
        </div>
    );
};

export default Comment;