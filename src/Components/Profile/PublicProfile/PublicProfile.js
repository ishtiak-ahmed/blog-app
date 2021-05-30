import React from 'react';

const PublicProfile = (props) => {
    const { user } = props;
    return (
        <div className='profile'>
            <div className="avater">
                <img src={user.photo} alt="" />
            </div>
            <div className="info">
                <h3>{user.fullName}</h3>
                <p><strong>Role:</strong>{user.role}</p>
                <p><strong>Total Blog:</strong> 23</p>
            </div>
        </div>
    );
};

export default PublicProfile;