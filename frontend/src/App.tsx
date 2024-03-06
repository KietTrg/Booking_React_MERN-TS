// import { useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './page/Register'
import SignIn from './page/SignIn'


const App =()=> {
  return (
   
    <Router>
      <Routes>
        <Route path='/' element={<Layout><p>Home Page</p></Layout>}></Route>
        <Route path='/search' element={<Layout><p>Search Page</p></Layout>}></Route>
        <Route path='/register' element={<Layout>
          <Register/>
        </Layout>}></Route>
        <Route path='/sign-in' element={<Layout>
          <SignIn/>
        </Layout>}></Route>
        <Route path='/*' element={<Navigate to='/'></Navigate>}></Route>
      </Routes>
    </Router>
   
  )
}

export default App
