import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ModifyContext, UserContext } from '../../App';

const NewComment = ({ parentId, setShowReply, root }) => {
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [user] = useContext(UserContext)
    const [commentText, setComment] = useState('')
    const addComment = (e) => {
        e.preventDefault()
        const comment = {
            _id: `a${new Date().getTime()}`,
            commenter: user.fullName,
            commenterId: user.userName,
            comment: commentText,
            time: (new Date()).toLocaleTimeString,
            date: (new Date()).toLocaleDateString,
            reply: [],
            upVote: [],
            downVote: []
        }
        addParentReference(parentId, comment._id)
        axios.post('https://ishtiak-blog.herokuapp.com/addComment', comment)
            .then(res => {
                setShowReply(false)
                setModifyCount(modifyCount + 1)
            })
    }
    const handelChange = (e) => {
        setComment(e.target.value)
    }

    // Add Parent REFERENCE
    const addParentReference = (parent, child) => {
        console.log('adding to parent reference')
        const uri = root ? `https://ishtiak-blog.herokuapp.com/blog/${parent}` : `https://ishtiak-blog.herokuapp.com/getComment/${parent}`
        const updateUri = root ? `https://ishtiak-blog.herokuapp.com/updateBlogParent/${parent}` : `https://ishtiak-blog.herokuapp.com/updateParent/${parent}`;
        axios(uri)
            .then(data => {
                const reply = data.data.reply;
                const newReply = [...reply, child]
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