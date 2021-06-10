import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { loadBlogCollection, setCurrentUser } from '../../Redux/Actions/Actions';
import AddBlog from '../AddBlog/AddBlog';
import FullBlog from '../FullBlog/FullBlog';
import Home from '../Home/Home';
import Login from '../Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Profile from '../Profile/Profile';

const RouterPage = (props) => {
    const { store, setBlogCollection } = props
    const { currentUser, blogCollection } = store
    useEffect(() => {
        fetch('https://ishtiak-blog.herokuapp.com/getBlogs')
            .then(res => res.json())
            .then(data => {
                setBlogCollection(data)
            }
            )
    }, [setBlogCollection])
    return (
        <Router>
            <header>
                <h2><Link to='/'> Ishtiak blog</Link></h2>
                <div className="user-avater">
                    <img src={currentUser.photo} alt="" /><h5>{currentUser.fullName}</h5>
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
                    <>
                        {
                            currentUser.role === 'Blogger' ?
                                <AddBlog></AddBlog> : ''
                        }
                        <Home blogList={blogCollection}></Home>
                    </>
                </Route>
                <Route path='/login'>
                    <Login setUer={setCurrentUser}></Login>
                </Route>
            </Switch>
        </Router>
    );
};


const mapStateToProps = state => {
    return {
        store: state
    }
}

const mapDispatchToProps = {
    setBlogCollection: loadBlogCollection
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterPage)