import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PublicProfile from './PublicProfile/PublicProfile';

const Profile = () => {
    const { userName } = useParams()
    const [profileInfo, setProfileInfo] = useState({})
    useEffect(() => {
        fetch(`https://ishtiak-blog.herokuapp.com/profile/${userName}`, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    setProfileInfo(data)
                } else {
                    alert('something went wrong')
                }
            })
    }, [userName])

    return (
        <>
            <PublicProfile user={profileInfo}></PublicProfile>
        </>
    );
};

export default Profile;