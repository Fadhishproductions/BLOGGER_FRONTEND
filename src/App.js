import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Protect from './components/Protect'; 
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Header from './components/Header'
import Register from './screens/Register'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SingleBlogPage from './screens/SingleBlogPage';
import MyBlogsPage from './screens/MyBlogsPage';

const App = () => {
  console.log(process.env)
  return ( <>

    <Router>
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard/>}/>
        <Route path='/blogs/:id' element={<SingleBlogPage/>}/>
        <Route path='/my-blogs'
             element={
            <Protect>
                <MyBlogsPage/> 
            </Protect>
             }
        />
      </Routes>
    </Router>
          </>
  );
};

export default App;
