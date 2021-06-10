import './App.css';
import { createContext, useState } from 'react';
import RouterPage from './Components/RouterPage/RouterPage';


export const UserContext = createContext()
export const ModifyContext = createContext()
function App() {
  const [modifyCount, setModifyCount] = useState(0)
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ModifyContext.Provider value={[modifyCount, setModifyCount]}>
        <RouterPage></RouterPage>
      </ModifyContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
