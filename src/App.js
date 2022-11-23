import React from 'react'
import 'antd/dist/antd.min.css';
import Navbar from './components/navbar'
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import Forms from './components/formlar';
import Hasta from './components/hasta';
import axios from 'axios';

axios.defaults.headers={
  'Authorization': localStorage.getItem("tokenKey"),
}
axios.defaults.baseURL='http://localhost:8080';

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      
    <Route path='/' element={<AppLayout />}>
      <Route index element={<Forms />} />
      <Route path='hasta' element={<Hasta />} />
    </Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;