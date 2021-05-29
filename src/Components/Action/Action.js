import React from 'react';

const Action = ({ action }) => {
    const { upVote, showReply, addUpVote, downVote, addDownVote, toggleReply, allReply } = action;
    return (
        <div>
            <span>Up Vote: {upVote.length} <button onClick={addUpVote}>+</button></span>
            <span>Down Vote: {downVote.length} <button onClick={addDownVote}>-</button></span>
            <button onClick={toggleReply}>{showReply ? 'Hide Reply' : 'All Reply'} ({allReply.length})</button>

        </div>
    );
};

export default Action;