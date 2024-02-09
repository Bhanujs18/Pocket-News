import React from 'react';
import SideBar from "../Components/SideBar"
import Content from '../Components/Content';

const Homepage = () => {
  return (
    <div className='container'>
        <SideBar />
        <Content />
    </div>
  )
}

export default Homepage