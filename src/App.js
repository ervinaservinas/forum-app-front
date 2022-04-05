import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './context/UserContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Toolbar from './components/Toolbar';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import ForumPage from './pages/ForumPage';
import TopicPage from './pages/TopicPage';
import Logout from './components/Logout';


function App() {
  const [getUser, setUser] = useState(null)
  const [allFavorites, setAllFavorites] = useState([])
  if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }
  return (
      <div>
        <BrowserRouter>
          <UserContext.Provider value={{ getUser, setUser, allFavorites, setAllFavorites }}>
            <Toolbar />
            <Routes>

              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/*' element={<ForumPage />} />
              <Route path='/favorites' element={<FavoritesPage />} />
              <Route path='/tema/:id' element={<TopicPage />} />
              <Route path='/logout' element={<Logout />} />

            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
  );
}

export default App;
