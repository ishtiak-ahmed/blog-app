import React, { useState } from 'react';
import AddBlog from '../AddBlog/AddBlog';
import Pagination from '../Pagination/Pagination';
import ShortBlog from '../ShortBlog/ShortBlog';

const Home = ({ blogList }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)
    const indexOfLastPost = currentPage * 5;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currenPosts = blogList.slice(indexOfFirstPost, indexOfLastPost)
    return (
        <div>
            {
                currenPosts.map(blog => <ShortBlog key={blog._id} blog={blog}></ShortBlog>)
            }
            <Pagination totalPosts={blogList.length} setCurrentPage={setCurrentPage} postPerPage={postPerPage}></Pagination>
        </div>
    );
};

export default Home;