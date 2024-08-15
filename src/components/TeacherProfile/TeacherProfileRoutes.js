import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Layout from './Layout'
import MyTution from './MyTution'
import MyProfile from './MyProfile'
import MyReview from './MyReview'
import AddTution from './AddTution'

const TeacherProfileRoutes = () => {
  return (
    <Layout>
        <Routes>
            <Route index path="/myaccount" element={<MyProfile/>}/>
            <Route index path="/myaccount/myprofile" element={<MyProfile/>}/>
            <Route path="/myaccount/mytuitions" element={<MyTution/>}/>
            <Route path="/myaccount/myreview" element={<MyReview/>}/>
            <Route path="/myaccount/addtution" element={<AddTution/>}/> 
        </Routes>
    </Layout>
  )
}

export default TeacherProfileRoutes