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

export const UserContext = createContext()
function App() {
  const [user, setUser] = useState({})
  const [blogList, setBlogList] = useState([])
  useEffect(() => {
    fetch('http://localhost:9717/getBlogs')
      .then(res => res.json())
      .then(data => setBlogList(data))
  }, [])
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <header>

          <h2><Link to='/'> Ishtiak blog</Link></h2>
          <div>
            <img src={user.photo} alt="" /><h5>{user.fullName} {user.userName}</h5>
          </div>
        </header>
        <Switch>
          <PrivateRoute path='/blog/:id'>
            <FullBlog></FullBlog>
          </PrivateRoute>
          <Route path='/' exact>
            {
              user.role === 'Blogger' ?
                <AddBlog></AddBlog> : <></>
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
    </UserContext.Provider>
  );
}

export default App;
