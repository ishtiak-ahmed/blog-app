import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const NewComment = ({ parentId, setShowReply, root }) => {
    const [user] = useContext(UserContext)
    const [commentText, setComment] = useState('')
    const addComment = (e) => {
        e.preventDefault()
        const comment = {
            _id: `a${new Date().getTime()}`,
            commenter: user.fullName,
            comment: commentText,
            time: (new Date()).toLocaleTimeString,
            date: (new Date()).toLocaleDateString,
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
        console.log('adding to parent reference')
        const uri = root ? `http://localhost:9717/blog/${parent}` : `http://localhost:9717/getComment/${parent}`
        const updateUri = root ? `http://localhost:9717/updateBlogParent/${parent}` : `http://localhost:9717/updateParent/${parent}`;
        axios(uri)
            .then(data => {
                const reply = data.data.reply;
                const newReply = [...reply, child]
                console.log(newReply)
                axios.patch(updateUri, { reply: newReply })
                    .catch(err => console.log(err))
            })
    }

    return (
        <div className='addreply'>
            <form onSubmit={addComment}>
                <p><small>Add a reply</small></p>
                <input type="text" name="comment" onChange={handelChange} />
                <button type='submit'>Reply</button>
            </form>
        </div>
    );
};

export default NewComment;