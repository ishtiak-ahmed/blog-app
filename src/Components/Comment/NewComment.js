import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const NewComment = ({ parentId, setShowReply, root }) => {
    const [user] = useContext(UserContext)
    const [commentText, setComment] = useState('')
    const addComment = (e) => {
        e.preventDefault()
        const comment = {
            _id: `${parentId}${new Date().getTime()}`,
            commenter: user.fullName,
            comment: commentText,
            reply: [],
            upVote: [],
            downVote: []
        }
        console.log(comment)
        addParentReference(parentId, comment._id)
        axios.post('http://localhost:9717/addComment', comment)
            .then(res => {
                setShowReply(false)
                // setTimeout(setShowReply(true), 6000)
            })
    }
    const handelChange = (e) => {
        setComment(e.target.value)
    }

    // Add Parent REFERENCE
    const addParentReference = (parent, child) => {
        const uri = root ? `http://localhost:9717/blog/${parent}` : `http://localhost:9717/getComment/${parent}`
        axios(uri)
            .then(data => {
                const reply = data.data.reply;
                const newReply = [...reply, child]
                console.log(newReply)
                axios.patch(`http://localhost:9717/updateParent/${parent}`, { reply: newReply })
                    .catch(err => console.log(err))
            })
    }

    return (
        <div className='addreply'>
            <form onSubmit={addComment}>
                <input type="text" name="comment" onChange={handelChange} />
                <button type='submit'>Reply</button>
            </form>
        </div>
    );
};

export default NewComment;