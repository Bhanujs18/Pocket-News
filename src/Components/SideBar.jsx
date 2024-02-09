import React, { useState } from 'react';

const SideBar = () => {

    const [category, setCategory] = useState([]);
    const [popup, setpopup] = useState(false);
    const [cat, setCat] = useState();

  return (
    <div className='sidebar'>
        <h1 style={{textAlign:'center'}}>Pocket News</h1>
        <img className='addButton'  onClick={()=>setpopup(true)} width="50" height="50" src="https://img.icons8.com/ios-filled/50/16008b/add--v1.png" alt="add--v1"/>
        {category && category.map((cur)=>{
        return(
            <p>{cur}</p>
        )})}
        {popup ?
        <div className='modalparent'>
        <div className='modalchild'>        
            <label htmlFor='groupName'>Group Name
            <input className='input' id='groupName' onChange={(e)=>setCat(e.target.value)} placeholder='Enter group name' />
           </label>
           <button onClick={(e)=>setCategory((prev) => [...prev ,  cat])}>Add</button>
           <button onClick={()=>setpopup(false)}>Close</button>
        </div>
        </div> : null }

    </div>
  )
}

export default SideBar