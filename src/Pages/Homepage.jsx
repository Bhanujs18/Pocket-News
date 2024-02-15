import React, { useEffect, useState } from 'react';
import SideBar from "../Components/SideBar"
import Content from '../Components/Content';
import LandingPage from '../Components/LandingPage';
import DataCard from '../Components/DataCard';

const Homepage = () => {
 
    let server = JSON.parse(localStorage.getItem('allNotes'));

    const date = new Date();
    const Hour = date.getHours();
    const AmPm = Hour > 12 ? "PM" : "AM";
    const Min = date.getMinutes();
    const Day = date.getDate();
    const Year = date.getFullYear();
    const Month = date.getMonth() + 1;

    const [show,setShow] = useState(false);
    const [data,setData] = useState();
    const [filterData,setFilterData] = useState();
    const [ cdata , setCData] = useState();
const [allNotes , setAllNotes] = useState(server ? server : []);
    const [storedata , setStoredata] = useState({
        data: "",
        category:"",
    });
    const [displaydata , setdisplaydata] = useState([]);

useEffect(()=>{
    if(data && filterData){
            const a = data.filter(str => str.name === filterData);
            if(a){
            setCData(a);
            }
    }
    setStoredata({
        data: "",
        category:"",
        time:"",
    })

    storedata.name ? setAllNotes((prev)=>{return[...prev , storedata]}) : null;
        },[filterData]);


       const handleStoreData = (e) => {
        setStoredata((prev)=>{return {...prev , data:e.target.value , category: filterData , time: Day + " - " + Month + " - " + Year + " · " + Hour + " : " + Min + " " + AmPm}})
       } 

       const submitdata = () => {
        setAllNotes((prev)=>{return[...prev , storedata]});
        setStoredata({
          data: "",
          category:"",
          time:"",
      });}


       useEffect(()=>{
        const a = allNotes.filter(str=>str.category === filterData);
        if(a.length>0){
        setdisplaydata(a);
        }
        else{
          setdisplaydata([])
        }
        localStorage.setItem('allNotes' , JSON.stringify(allNotes));
       },[filterData , allNotes])
     

  return (
    <div className='container'>


        <SideBar setData={setData}  setFilterData={setFilterData}  setShow={setShow} />


        {show ? 
        <div className='contentDIv' >
        
           <div className='blueRibbon'><div style={{display:'flex' , width:'95%',gap:'1rem' , alignItems:'center'} }>  <p className='pfp' style={{background:`${cdata && cdata[0].color}`,border:'2px white solid' , color:'white'}}>{cdata && cdata[0].initials}</p><p>{cdata && cdata[0].name}</p></div></div>
            
          
          <div className='notesDiv'>
            {displaydata.length > 0  ?  displaydata.map((cur,index)=>{
                return (
                    <div className='cardDiv' key={index}>
                     <DataCard data={cur} />
                  </div>
                )
            }) : <p className='noNotes'>No Notes Added</p>}

          </div>
            
            <div className='inputTextDiv'>
             <textarea  value={storedata.data} className='inputText' placeholder='Enter your text here...........'  onChange={(e)=>handleStoreData(e)} />
             {storedata.data.length>0 ?
             <img onClick={()=>submitdata()} className='sendButton'  width="24" height="24" src="https://img.icons8.com/001f8b/material-rounded/24/sent.png" alt="sent"/>
             : null}
             </div>
            </div>
                
                
                :  <LandingPage   />}

    </div>
  )
} 

export default Homepage