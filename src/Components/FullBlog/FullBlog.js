import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ModifyContext, UserContext } from '../../App';
import Action from '../Action/Action';
import { deleteAllComment } from '../BloggerAction/BloggerAction';
import Comment from '../Comment/Comment';
import NewComment from '../Comment/NewComment';
import EditBlog from '../EditBlog/EditBlog';

const FullBlog = () => {
    const history = useHistory()
    const [user] = useContext(UserContext)
    const [commentStatus, setCommentStatus] = useState(true)
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
                setCommentStatus(data.data.replyStatus)
                setBlog(data.data)
            })
    }, [modifyCount, id])
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
    // Delete All Comment
    const handleAllDelete = () => {
        console.log('deleting all comment')
        deleteAllComment(blog._id)
        setModifyCount(modifyCount + 1)
    }
    // Handle Commenting Status
    const handleCommenting = () => {
        console.log('Toggling reply status')
        const replyStatus = !commentStatus
        setCommentStatus(replyStatus)
        axios.patch(`http://localhost:9717/updateReplyStatus/${blog._id}`, { replyStatus: replyStatus })
            .then(res => {
                setModifyCount(modifyCount + 1)
                console.log(res)
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
                            : ''
                    }
                    {
                        user.role === 'Blogger' ?
                            <>
                                <button onClick={handleCommenting}>{commentStatus ? 'Turn Off Reply' : 'Turn On Reply'}</button>
                                <button onClick={handleAllDelete}>Delete All Comment</button> </> : ''
                    }
                    <Action action={{ upVote, showReply, addUpVote, downVote, addDownVote, toggleReply, allReply }}></Action>
                </div>
                <div>
                    <img src={blog.image} alt="" />
                </div>
                {
                    showEdit ? <EditBlog setShowEdit={setShowEdit} blog={blog}></EditBlog> : ''
                }
            </div>
            {
                showReply ?
                    <div>
                        {commentStatus ?
                            <NewComment root={true} setShowReply={setShowReply} parentId={id}></NewComment>
                            : ''
                        }
                        {
                            allReply.map(reply => <Comment parentId={id} commentStatus={commentStatus} key={reply} id={reply}></Comment>)
                        }
                    </div> : ''
            }
        </>
    );
};

export default FullBlog;