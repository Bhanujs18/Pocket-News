import React, { useEffect, useState } from 'react';

const SideBar = ({setData , setShow , setFilterData}) => {
let past = JSON.parse(localStorage.getItem("savedData"))
    const [popup, setpopup] = useState(false);
    let [mdata,setMData] = useState( !past ? [] : past );
    const [selectCat , setSelectCat] = useState();
    const [cdata, setcData] = useState({
        name:"",
        color:'#001f8b',
        initials:""
    })

    const handleData = (e) => {
        e.preventDefault();
        setcData((prev)=>{return {...prev , name: e.target.value }});
        let words = e.target.value.split(' ');
        let first = words[0].charAt(0);
        let second="";
        if(words.length>1){
             second = words[1].charAt(0).toUpperCase();
        }
        setcData((prev)=>{return {...prev , initials: first.toUpperCase()+second}});
    }

   const handleAllData = () =>  {
            setMData((prev)=>{
            return [...prev, cdata]
           })
    }

    useEffect(()=>{
        setData(mdata);
        setFilterData(selectCat)
    },[selectCat])

    useEffect(()=>{
        window.localStorage.setItem("savedData" , JSON.stringify(mdata));
    },[mdata])

    const handleStates = (name) => {
       setSelectCat(name);
       setShow(true);
    }

  return (
    <div className='sidebar'>
        <div className='logo' onClick={()=>setShow(false)}><img src='../assets/logo.png' alt="task"/><h1>Pocket News</h1></div>
        <img className='addButton'  onClick={()=>setpopup(true)} width="50" height="50" src="https://img.icons8.com/ios-filled/50/16008b/add--v1.png" alt="add--v1"/>
        <div className='scroll' >
        {mdata && mdata.map((cur)=>{
        return(
            <div onClick={()=>handleStates(cur.name)} style={{background: `${cur.name}` === selectCat ? "#dcdcdc" : null}}  key={cur.name} className='notesTitleDiv' >
            <p className='pfp' style={{background:`${cur.color}`}}>{cur.initials}</p>
            <p className='notesTitle'>{cur.name}</p>
            </div>
        )})}
        </div>
        {popup ?
        <div className='modalparent'>
        <div className='modalchild'> 
        <div>     
        <p>Create Your Group</p>  
            <label htmlFor='groupName'>Group Name
            <input type='text' value={cdata.name} className='input' id='groupName' onChange={(e)=>handleData(e)} placeholder='Enter group name' />
           </label>
           <label htmlFor='color'>Select Color
            <input type='color' value={cdata.color} className='input' id='color' onChange={(e)=>setcData((prev)=>{return {...prev , color:(e.target.value)}})} placeholder='Enter group name' />
           </label>
           <div style={{display:'flex' , width:'100%' , justifyContent:'end'}}>
           <button className='create' onClick={handleAllData}>Create</button>
           <button onClick={()=>setpopup(false)}>Close</button>
           </div>
           </div>
        </div>
        </div> : null }

    </div>
  )
}

export default SideBar