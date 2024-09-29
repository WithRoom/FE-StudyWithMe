import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudyProvider } from './pages/Study/StudyContext';
import SocialKakao from './pages/Home/SocialKakao';
import Home from './pages/Home/Home';
import Redirection from './pages/Home/Redirection';
import StudyGroupList from './pages/Study/StudyGroupList';
import Register from './pages/Register/Register';
import NotFound from './pages/common/NotFound';
import PrivateRoute from './pages/common/PrivateRoute';
import Me from './pages/Home/Me';
import StudyDetail from './pages/Study/StudyDetail';
import StudyList from './pages/Study/StudyList';


const App = () => {
  useEffect(() => {
    const onBeforeUnload = (event) => {
      const isReload = sessionStorage.getItem('isReload');
      if (!isReload) {
        // 브라우저가 닫힐 때만 localStorage 초기화
        localStorage.clear();
      }
    };
  
    // 새로고침 시 sessionStorage에 값을 설정
    const clearLocalStorageOnClose = () => {
      sessionStorage.setItem('isReload', 'true');
    };
  
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('load', clearLocalStorageOnClose);
  
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('load', clearLocalStorageOnClose);
    };
  }, []);
  

  return (
    <StudyProvider>
      <div className='App' style={{ backgroundColor: 'white' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<SocialKakao />} />
            <Route path="/study" element={<PrivateRoute element={StudyGroupList} />} />
            <Route exact path='/kakao/callback' element={<Redirection />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<PrivateRoute element={Me}/>} />
            <Route path="/study/info/detail" element={<StudyDetail />} />
            <Route path="*" element={<NotFound to="/404" />} />
            <Route path="/study/list" element={<StudyList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StudyProvider>
  );
};

export default App;
