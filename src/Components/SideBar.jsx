import React, { useEffect, useState } from 'react';

const SideBar = () => {

 
    const [popup, setpopup] = useState(false);
    const [cat, setCat] = useState("");
    const [category, setCategory] = useState([]);
    const [selectCat , setSelectCat] = useState();
    const [data, setData] = useState({
        name:"",
        color:'#001f8b',
        initials:""
    })

    const handleData = (e) => {
        setData((prev)=>{return {...prev , name: e.target.value }});
        let words = e.target.value.split(' ');
        let first = words[0].charAt(0);
        let second="";
        if(words.length>1){
             second = words[1].charAt(0).toUpperCase();
        }
        setData((prev)=>{return {...prev , initials: first.toUpperCase()+second}});
    }
    

    const handleCategory = () => {
        if(category.includes(cat)){
            alert("same name detected");
            return;
        }
       setCategory((prev)=>{
        return [...prev, data]
       })
       console.log(data);
    }


  return (
    <div className='sidebar'>
        <h1 style={{textAlign:'center'}}>Pocket News</h1>
        <img className='addButton'  onClick={()=>setpopup(true)} width="50" height="50" src="https://img.icons8.com/ios-filled/50/16008b/add--v1.png" alt="add--v1"/>
        {category && category.map((cur)=>{
        return(
            <div onClick={()=>setSelectCat(cur.name)}  style={{background: `${cur.name}` === selectCat ? "#dcdcdc" : null}}  key={cur.name} className='notesTitleDiv' >
            <p className='pfp' style={{background:`${cur.color}`}}>{cur.initials}</p>
            <p className='notesTitle'>{cur.name}</p>
            </div>
        )})}
        {popup ?
        <div className='modalparent'>
        <div className='modalchild'> 
        <div>     
        <p>Create Your Group</p>  
            <label htmlFor='groupName'>Group Name
            <input type='text' value={cat.name} className='input' id='groupName' onChange={(e)=>handleData(e)} placeholder='Enter group name' />
           </label>
           <label htmlFor='color'>Select Color
            <input type='color' value={cat.color} className='input' id='color' onChange={(e)=>setData((prev)=>{return {...prev , color:(e.target.value)}})} placeholder='Enter group name' />
           </label>
           <div style={{display:'flex' , width:'100%' , justifyContent:'end'}}>
           <button className='create' onClick={handleCategory}>Create</button>
           <button onClick={()=>setpopup(false)}>Close</button>
           </div>
           </div>
        </div>
        </div> : null }

    </div>
  )
}

export default SideBar