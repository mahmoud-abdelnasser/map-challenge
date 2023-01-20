import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import HomeLayout from './layouts/HomeLayout';
import Map from './pages/Map';
import User from './pages/User';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<HomeLayout />}>
          <Route path="/users" >
            <Route index element={<Users />} />
            <Route path=":id" element={<User />} />
          </Route>
          <Route path="/map" element={<Map />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
