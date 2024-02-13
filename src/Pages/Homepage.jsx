import React, { useEffect, useState } from 'react';
import SideBar from "../Components/SideBar"
import Content from '../Components/Content';
import LandingPage from '../Components/LandingPage';
import DataCard from '../Components/DataCard';

const Homepage = () => {
 
    const server = JSON.parse(localStorage.getItem('allNotes'));

    const [show,setShow] = useState(false);
    const [data,setData] = useState();
    const [filterData,setFilterData] = useState();
    const [ cdata , setCData] = useState();

    const [storedata , setStoredata] = useState({
        data: "",
        category:"",
    });

    const [serverdata , setServerData] = useState([]);
    const [displaydata , setdisplaydata] = useState( []);

    console.log(displaydata)


useEffect(()=>{
    if(data && filterData){
            const a = data.filter(str => str.name === filterData);
            setCData(a);
    }
    setStoredata({
        data: "",
        category:"",
    })
        },[filterData]);


       const handleStoreData = (e) => {
        setStoredata((prev)=>{return {...prev , data:e.target.value , category: filterData}})
       } 

       const submitdata = () => {
        setServerData((prev)=>{return [...prev, storedata]})
        localStorage.setItem('allNotes' , JSON.stringify(serverdata));
        // const a = serverdata.filter(str=>str.category === filterData);
        // setdisplaydata((prev)=>{return [...prev , a]});
        // console.log(displaydata)
       }

   
  return (
    <div className='container'>


        <SideBar setData={setData}  setFilterData={setFilterData} setShow={setShow} show={show} />


        {show ? 
        <div className='contentDIv' >
        
           <div className='blueRibbon'><div style={{display:'flex' , width:'95%',gap:'1rem' , alignItems:'center'} }>  <p className='pfp' style={{background:`${cdata && cdata[0].color}`,border:'2px white solid' , color:'white'}}>{cdata && cdata[0].initials}</p><p>{cdata && cdata[0].name}</p></div></div>
            
          
          <div>
            {displaydata && displaydata.map((cur,index)=>{
                return (
                    <div className='cardDiv' key={index}>
                        <DataCard data={cur} />
                  </div>
                )
            })}

          </div>
            
            <div className='inputTextDiv'>
             <textarea  value={storedata.data} className='inputText' placeholder='Enter your text here...........'  onChange={(e)=>handleStoreData(e)} />
             <img onClick={()=>submitdata()} className='sendButton'  width="24" height="24" src="https://img.icons8.com/001f8b/material-rounded/24/sent.png" alt="sent"/>
             
             </div>
            </div>
                
                
                :  <LandingPage   />}

    </div>
  )
} 

export default Homepage