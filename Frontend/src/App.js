import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginContextProvider from './context/LoginContext';
import { useCallback, useState } from 'react';
import Main from './components/Main';
import Connect from './components/Connect';
import MyHeroes from './components/MyHeroes';


function App() {
  console.dir(process.env);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(()=> {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(()=> {
    setIsLoggedIn(false);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <LoginContextProvider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
          <Layout>
            <Routes>
              <Route path='/' element={<Main></Main>}></Route>
              <Route path='/connect' element={<Connect></Connect>}></Route>
              <Route path='/myHeroes' element={<MyHeroes></MyHeroes>}></Route>
             
            </Routes>
          </Layout>
        </LoginContextProvider>
        
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;

// <Route path='*' element={<NotFound />} />
