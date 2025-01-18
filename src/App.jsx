import React from 'react';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
      <Routes>
        <Route path = "/" element = {<Body />}>
        <Route path = "/" element = {<UserForm />} />
        <Route path = "/admin" element = {<AdminDashboard />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
