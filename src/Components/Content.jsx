import React from 'react';

const Content = ({setShow , data}) => {

    console.log("i m data" + data )
  return (
    <div onClick={ ()=>setShow(false)} className='content' style={{background:'#dae5f5'}}>
       
       
          </div>
  )
}

export default Content