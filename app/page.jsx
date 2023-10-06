"use client"
import { useState, useEffect } from "react"
import axios from 'axios'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";






export default function Home() {
    const [click, setClick] = useState(true);
    const [sidebar, setSidebar] = useState("")
    const [header, setHeader] = useState('NOTEPAD')
    const [darkmode, setDarkmode] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editId, setEditid]= useState()
    const [data, setData]= useState({
       title: '',
       text: ''
     
          })
        
    
      const handleSave = async (e) => {
        e.preventDefault()
        try {
          if (data.title && data.text) {
     
            const response = await axios.patch(`http://localhost:8000/notes/${editId}`, data);
      
            if (response.status === 200) {
              console.log('POST request successful');
            } else {
              console.error('Error making POST request:', response.status);
            }
      
           
            // setNotes([...notes, setData]);
            setData({ text: "", title: "untitled.np" });
            getStoredData();
          } else {
            console.error('Title and text must be provided');
          }
        } catch (error) {
          console.error('Error making POST request:', error);
        }
      };
      
  
    const handleTitleChange = (e) => {
      // Update the title in the state when the input value changes
      setData({ ...data, [e.target.name]: e.target.value })

    };
  
    useEffect(()=>{
      getStoredData();
    },[]);

  
  async function getStoredData(){
    try{
    const response = await axios.get('http://localhost:8000/notes');

    setNotes(response.data)
    }  catch (error) {
        // throw new Error('Cannot fetch data');
        console.error('Error fetching data:', error);
    }// console.log(response);
}
 
   function handleClick(e){
    e.preventDefault()
    setClick(true);
    setHeader('NOTEPAD')
   }
   function handleClick2(e){
    e.preventDefault()
    setClick(false);
    setHeader('PREVIEW')
   }

  return (

  <div className={`flex flex-col min-h-screen w-screen ${darkmode ? 'bg-zinc-900': 'bg-zinc-100'}`}>
      <Navbar setSidebar={setSidebar} sidebar={sidebar}  getStoredData={getStoredData} title={data.title} 
      handleTitleChange={handleTitleChange} handleSave={handleSave} />
 
      <div className="flex">
      <SideBar sidebar={sidebar} darkmode={darkmode} setDarkmode={setDarkmode} notes={notes}  
       getStoredData={getStoredData} setData={setData} data={data} setEditid={setEditid} 
       />
 
       <div className="flex flex-col w-screen h-screen">
     

     
     <div className={`h-8 mt-14  md:mt-20 fixed w-[100%] ${darkmode ? 'bg-zinc-700 text-gray-400': 'bg-zinc-100 text-black'} `}>
        <h1 className={`flex justify-center font-bold  lg:gap-80  md:text-xl    ${sidebar ?'md:mr-32 ml-0 gap-32':'md:ml-7 ml-14 max-[281px]:gap-28 gap-52'} ${darkmode ? 'text-gray-300': 'text-gray-800'}`} > {header}
              <span>
                {click && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="mt-1 w-5 h-5 mr-20" viewBox="0 0 16 16"
                onClick={handleClick2}>
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>}

                {!click && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                className='mt-1 w-5 h-5 mr-20'  viewBox="0 0 16 16"
                onClick={handleClick}>
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                </svg>}
              </span></h1>
      </div>

      <div className="">
      
            {click && <textarea
                  required
                  type="text"
                  id="text"
                  className={` mt-28 max-[500px]:h-[43rem] max-[376px]:h-[31rem] h-[29rem] max-[281px]:mt-28 max-[281px]:h-[28rem] lg:ml-[25%] md:w-[50%] w-[80%] max-[500px]:ml-5 max-[500px]:w-[89%] resize font-mono ml-9 bg-transparent
                  placeholder:italic text-sm p-6 focus:outline-rose-500 ${darkmode ? 'text-gray-400 placeholder:text-rose-500 border-s border-rose-600' : ''}`}
                  placeholder="Enter your text here!!!"
                  name="text"
                  onChange={handleTitleChange}
                  value={data.text}
                />}
            

                {!click && (<div className={`mt-28 max-[500px]:h-[43rem] max-[376px]:h-[31rem]  h-[29rem]  md:w-[50%] w-[80%] max-[500px]:ml-3 
                 max-[281px]:h-[28rem] max-[500px]:w-[94%]  lg:ml-[25%] rounded-ss-2xl rounded-ee-2xl ${darkmode ? 'bg-zinc-800' : 'bg-gray-300'}`} 
                  > 
                
                  <p className={` grayscale backdrop-blur-sm px-10 py-5 justify-center pb-2 overflow-hidden overflow-x-auto overflow-y-auto h-[28rem] max-[500px]:h-[42rem] max-[281px]:h-[27rem] font-semibold ${darkmode ? 'text-gray-300 ': 'text-black '}`}>
                    {data.text}
                  </p>
                    </div>)}
  
        </div>
        </div>
        <Footer />
      </div>
  
   </div>
  )
}
