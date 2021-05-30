import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ModifyContext, UserContext } from '../../App';
import Action from '../Action/Action';
import { deleteAllComment } from '../BloggerAction/BloggerAction';
import Comment from '../Comment/Comment';
import NewComment from '../Comment/NewComment';
import EditBlog from '../EditBlog/EditBlog';
import Pagination from '../Pagination/Pagination';

const FullBlog = () => {
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)

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
    const currentComment = allReply.slice(((currentPage * 5) - 5), currentPage * 5);
    useEffect(() => {
        axios(`https://ishtiak-blog.herokuapp.com/blog/${id}`)
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
        axios.patch(`https://ishtiak-blog.herokuapp.com/blogUpVote/${id}`, { upVote: newUpVote })
            .then(data => console.log(data))
        setUpVote([...upVote, user.fullName])
    }
    const addDownVote = () => {
        setDownVote([...downVote, user.fullName])
        const newDownVote = [...downVote, user.userName]
        axios.patch(`https://ishtiak-blog.herokuapp.com/updateVote/${id}`, { downVote: newDownVote })
    }

    const handleDelete = () => {
        const url = `https://ishtiak-blog.herokuapp.com/deleteBlog/${blog._id}`
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
        axios.patch(`https://ishtiak-blog.herokuapp.com/updateReplyStatus/${blog._id}`, { replyStatus: replyStatus })
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
                    <h4><Link to={`/profile/${blog.authorId}`}>{blog.author} </Link> <p>at {blog.time}, {blog.date}</p></h4>
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
                    <div className="feature-image">
                        <img src={blog.image} alt="" />
                    </div>

                    <p>{blog.content}</p>
                    <Action action={{ upVote, showReply, addUpVote, downVote, addDownVote, toggleReply, allReply }}></Action>
                </div>
                {
                    showEdit ? <EditBlog setShowEdit={setShowEdit} blog={blog}></EditBlog> : ''
                }
            </div>
            {
                showReply ?
                    <div className='comment-area'>
                        <Pagination postPerPage={5} totalPosts={allReply.length} setCurrentPage={setCurrentPage}></Pagination>
                        {commentStatus ?
                            <NewComment root={true} setShowReply={setShowReply} parentId={id}></NewComment>
                            : ''
                        }
                        {
                            currentComment.map(reply => <Comment parentId={id} commentStatus={commentStatus} key={reply} nested={false} authorId={blog.authorId} id={reply}></Comment>)
                        }
                    </div> : ''
            }
        </>
    );
};

export default FullBlog;