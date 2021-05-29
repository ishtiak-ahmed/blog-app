import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ModifyContext, UserContext } from '../../App';
import Action from '../Action/Action';
import Comment from '../Comment/Comment';
import NewComment from '../Comment/NewComment';
import EditBlog from '../EditBlog/EditBlog';

const FullBlog = () => {
    const history = useHistory()
    const [user] = useContext(UserContext)
    const [modifyCount, setModifyCount] = useContext(ModifyContext)
    const [showEdit, setShowEdit] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [allReply, setAllReply] = useState([])
    const [upVote, setUpVote] = useState([])
    const [downVote, setDownVote] = useState([])
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    useEffect(() => {
        axios(`http://localhost:9717/blog/${id}`)
            .then(data => {
                setAllReply(data.data.reply)
                setDownVote(data.data.downVote)
                setUpVote(data.data.upVote)
                setBlog(data.data)
            })
    }, [id])
    const toggleReply = () => {
        setShowReply(!showReply)
    }
    const addUpVote = () => {
        const newUpVote = [...upVote, user.userName]
        axios.patch(`http://localhost:9717/blogUpVote/${id}`, { upVote: newUpVote })
            .then(data => console.log(data))
        setUpVote([...upVote, user.fullName])
    }
    const addDownVote = () => {
        setDownVote([...downVote, user.fullName])
    }

    const handleDelete = () => {
        const url = `http://localhost:9717/deleteBlog/${blog._id}`
        console.log(url)
        axios.delete(url)
            .then(result => {
                setModifyCount(modifyCount + 1)
                console.log(result)
                history.push('/')
            })
    }

    return (
        <>
            <div className='blog-post'>
                <div >
                    <h2>{blog.title}</h2>
                    <h4>{blog.author} <p>at {blog.time}, {blog.date}</p></h4>
                    <p>{blog.content}</p>
                    {
                        blog.authorId === user.userName ?
                            <>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={() => setShowEdit(!showEdit)}>Edit</button> </>
                            : <></>
                    }
                    <Action action={{ upVote, addUpVote, downVote, addDownVote, toggleReply, allReply }}></Action>
                </div>
                <div>
                    <img src={blog.image} alt="" />
                </div>
                {
                    showEdit ? <EditBlog setShowEdit={setShowEdit} blog={blog}></EditBlog> : <></>
                }
            </div>
            {
                showReply ? <div>
                    <NewComment root={true} setShowReply={setShowReply} parentId={id}></NewComment>
                    {
                        allReply.map(reply => <Comment key={reply} id={reply}></Comment>)
                    }
                </div> : <></>
            }
        </>
    );
};

export default FullBlog;