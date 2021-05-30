import './App.css';
import { createContext, useEffect, useState } from 'react';
import AddBlog from './Components/AddBlog/AddBlog';
import ShortBlog from './Components/ShortBlog/ShortBlog';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FullBlog from './Components/FullBlog/FullBlog';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';

export const UserContext = createContext()
export const ModifyContext = createContext()
function App() {
  const [modifyCount, setModifyCount] = useState(0)
  const [user, setUser] = useState({})
  const [blogList, setBlogList] = useState([])
  useEffect(() => {
    fetch('https://ishtiak-blog.herokuapp.com/getBlogs')
      .then(res => res.json())
      .then(data => setBlogList(data))
  }, [modifyCount])
  return (
    <UserContext.Provider value={[user, setUser]}>
      <ModifyContext.Provider value={[modifyCount, setModifyCount]}>
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
                blogList.map(blog => <ShortBlog key={blog._id} blog={blog}></ShortBlog>)
              }
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
          </Switch>
        </Router>
      </ModifyContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
