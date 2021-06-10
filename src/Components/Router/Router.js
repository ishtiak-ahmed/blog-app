import React from 'react';

const Router = () => {
    return (
        <Router>
            <header>
                <h2><Link to='/'> Ishtiak blog</Link></h2>
                <div className="user-avater">
                    <img src={user.photo} alt="" /><h5>{user.fullName}</h5>
                </div>
            </header>
            <Switch>
                <PrivateRoute path='/blog/:id'>
                    <FullBlog></FullBlog>
                </PrivateRoute>
                <PrivateRoute path='/profile/:userName'>
                    <Profile></Profile>
                </PrivateRoute>
                <Route path='/' exact>
                    {
                        user.role === 'Blogger' ?
                            <AddBlog></AddBlog> : ''
                    }
                    {
                        currenPosts.map(blog => <ShortBlog key={blog._id} blog={blog}></ShortBlog>)
                    }
                    <Pagination totalPosts={blogList.length} setCurrentPage={setCurrentPage} postPerPage={postPerPage}></Pagination>
                </Route>
                <Route path='/login'>
                    <Login></Login>
                </Route>
            </Switch>
        </Router>
    );
};

export default Router;