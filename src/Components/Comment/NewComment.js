import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const NewComment = ({ parentId }) => {
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
    }
    const handelChange = (e) => {
        setComment(e.target.value)
    }
    return (
        <div>
            <form onSubmit={addComment}>
                <input type="text" name="comment" onChange={handelChange} />
                <button type='submit'>Reply</button>
            </form>
        </div>
    );
};

export default NewComment;