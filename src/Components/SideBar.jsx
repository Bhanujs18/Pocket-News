import React, { useEffect, useState } from 'react';

const SideBar = ({setData , setShow , setFilterData , show}) => {
let past = JSON.parse(localStorage.getItem("savedData"))
    const [popup, setpopup] = useState(false);
    let [mdata,setMData] = useState( !past ? [] : past );
    const [selectCat , setSelectCat] = useState();
    const [cdata, setcData] = useState({
        name:"",
        color:'#001f8b',
        initials:""
    })

    let [border , setBorder] = useState();

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
           setcData({
            name:"",
            color:"",
            initials:""
        });
        setpopup(false);
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
    <div  className= {show ? 'noshow' : 'sidebar'}>
        <div className='logo' onClick={()=>setShow(false)}><img src='../assets/logo.png' alt="task"/><h1>Pocket Notes</h1></div>
        <img className='addButton'  onClick={()=>setpopup(true)} src="https://img.icons8.com/ios-filled/50/16008b/add--v1.png" alt="add--v1"/>
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
        <div>
        <div className='modalparent' onClick={()=>setpopup(false)}></div>
        <div className='modalchild' onClick={()=>setpopup(true)}> 
            <div className='modalDivs'>     
            <p style={{fontSize:'1.2rem' , fontWeight:800}}>Create Your Group</p>  
            </div>
            <div className='modalDivs'>
            <label className='modalDivs inputDiv'  style={{gap:'1rem' , fontWeight:600}} htmlFor='groupName'>Group Name
            <input type='text' value={cdata.name} className='input' id='groupName' onChange={(e)=>handleData(e)} placeholder='Enter group name' />
           </label>
           </div>
           <div className='modalDivs' >
           <ul className='chooseColors'>
            Choose color : &nbsp;
            <li className={cdata.color === "#b38bfa" ?  "border colorSelector" : "colorSelector"} onClick={(e)=>setcData((prev)=>{return {...prev , color: "#b38bfa"}})}></li>
            <li   className={cdata.color === "#ff79f2" ?  "border colorSelector" : "colorSelector"}onClick={(e)=>setcData((prev)=>{return {...prev , color: "#ff79f2"}})}></li>
            <li className={cdata.color === "#43e6fc" ?  "border colorSelector" : "colorSelector"}  onClick={(e)=>setcData((prev)=>{return {...prev , color: "#43e6fc"}})}></li>
            <li  className={cdata.color === "#f19576" ?  "border colorSelector" : "colorSelector"} onClick={(e)=>setcData((prev)=>{return {...prev , color: "#f19576"}})}></li>
            <li  className={cdata.color === "#0047ff" ?  "border colorSelector" : "colorSelector"} onClick={(e)=>setcData((prev)=>{return {...prev , color: "#0047ff"}})}></li>
            <li  className={cdata.color === "#6691ff" ?  "border colorSelector" : "colorSelector"} onClick={(e)=>setcData((prev)=>{return {...prev , color: "#6691ff"}})}></li>
           </ul>
           </div>
           <div className='modalDivs' style={{display:'flex' , width:'100%' , justifyContent:'end'}}>
           <button className='create' onClick={handleAllData}>Create</button>
           </div>
        </div>
        </div> : null }

    </div>
  )
}

export default SideBar