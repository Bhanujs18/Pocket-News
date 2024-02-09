import React from 'react'

const Content = () => {
  return (
    <div  className='content' style={{background:'#dae5f5'}}>
        <div className='contentContainer'>
        <img src='./assets/cover.png'  />
        <h1>Pocket Notes</h1>
        <p style={{fontWeight:'400'}}>Send and receive messages without keeping your phone online.<br />
Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
</div>
<p className='copyright'><img  src="https://img.icons8.com/material-rounded/24/000000/lock--v1.png" alt="lock--v1"/>end-to-end encrypted</p>
    </div>
  )
}

export default Content