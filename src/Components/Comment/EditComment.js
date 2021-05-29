import axios from 'axios';
import React from 'react';

const EditComment = ({ comment, setShowEdit }) => {
    const updateComment = (data) => {
        data.preventDefault()
        const newComment = (data.target[0].value)
        axios.patch(`https://ishtiak-blog.herokuapp.com/updateComment/${comment._id}`, { comment: newComment })
            .then(res => {
                console.log(res)
                setShowEdit(false)
            })
    }
    return (
        <div className='editcomment'>
            <div className="edit-box">
                <h3>Edit Comment</h3>
                <form onSubmit={updateComment}>
                    <textarea name="comment" defaultValue={comment.comment} id="" cols="30" rows="8"></textarea>
                    <input type="submit" value="Update Comment" />
                    <button onClick={() => setShowEdit(false)}>Cancel</button>
                </form>
            </div>

        </div>
    );
};

export default EditComment;