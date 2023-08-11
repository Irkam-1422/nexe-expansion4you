import '../App.css';
import { AuthContext } from '../context/AuthContex';
import { useAuth } from '../hooks/auth.hook';
import { useRoutes } from '../rotes';
import { AppRoutes } from './AppRoutes';

function App() {
  const {token,login,logout,userId} = useAuth() 
  const isAuthentificated = !!token
  const routes = useRoutes(isAuthentificated)
  return (
    <AuthContext.Provider value={{token,login,logout,userId,isAuthentificated}}> 
      <div className="App" style={{overflowX: 'hidden'}}>
        {/* <AppRoutes/> */}
        {routes}
      </div> 
    </AuthContext.Provider>
  );
}

export default App;
