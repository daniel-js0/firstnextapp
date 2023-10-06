"use client"
import { useEffect, useState } from "react"
import axios from 'axios'





const SideBar = ({sidebar, darkmode, setDarkmode, notes, getStoredData, setData, data, setEditid}) => {

 const [active, setActive] = useState(null)

   
  async function handleEdit (id){
    try{
    const response = await axios.get(`http://localhost:8000/notes/${id}`);
    // console.log(response)
    setData({...data,title: response.data.title, text: response.data.text})
    // handleDelete(id);
   setActive(id)
    }  catch (error) {
        // throw new Error('Cannot fetch data');
        console.error('Error fetching data:', error);
    }// console.log(response);
    
  }

  


useEffect(()=>{
  axios.get('http://localhost:8000/notes')
  .then(res => setData(res.data)).catch(err => console.log(err))

},[])


    function  handleAdd (){
      MakePostRequest();
      getStoredData();
      }

const postEndpoint = "http://localhost:8000/notes";
const MakePostRequest = async () => {
  try {
  const postData = {title:data.title, text:data.text}
  const response = await axios.post(postEndpoint, postData);
  setData({ text: "", title: "untitled.np" })
  if (response.status === 201) { // Check for a successful POST request (replace 201 with the appropriate status code)
    console.log('POST request successful');

  } else {
    console.error('Error making POST request:', response.status);
  }
} catch (error) {
  console.error('Error making POST request:', error);
}
}
  
  function handleToggle() {
    setDarkmode(!darkmode);
  }


  const handleDelete = async (id) => {
    try{
    const response = await axios.delete(`http://localhost:8000/notes/${id}`)
    if (response.status === 200) { 
      console.log('Delete request successful');
  
    } 
  } catch (error){
    if (error.response) {
      // The request was made, and the server responded with a status code
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log('Request made, but no response received:', error.request);
    } else {
      // Something else happened while setting up the request
      console.log('Error during request setup:', error.message);
    }}
    getStoredData();

}
  return (
    <>
    {sidebar && (<div className="lg:w-[20%] md:w-[50%] max-[600px]:w-[80%] max-[376px]:h-[50.9rem]  h-screen bg-zinc-800   z-10">
        <h1 className="px-3 font-semibold text-slate-300 py-7 md:text-lg text-xs md:ml-6 lg:ml-0">MY DOCUMENTS</h1>
        
        
        <button className='flex bg-rose-500 md:py-2 max-[600px]:py-2 max-[281px]:py-0  max-[281px]:px-0 md:px-7 max-[600px]:px-1 max-[600px]:ml-3 max-[281px]:ml-1  mt-4  rounded-md md:ml-9 lg:ml-3 ml-1'
        onClick={handleAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
            className="md:w-8 md:h-8 max-[600px]:w-5 max-[600px]:h-5 max-[600px]:mt-[1.5%] max-[281px]:hidden 
             text-gray-50">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <p className='ml-1 mt-1 text-white max-[600px]:ml-0 max-[600px]:mt-0 max-[600px]:px-1 max-[281px]:px-6'>Add Document</p>
            </button>

         {notes.map((note, id) => 
                  (<div key={id} className='flex mt-1 mb-1 cursor-pointer'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"viewBox="0 0 16 16"
                     className={`md:ml-4 ml-1 md:h-5 md:w-5 w-3 h-3 md:flex hidden  text-white max-[281px]:mt-5 ${sidebar ? 'mt-7':'md:mt-[7.2%] mt-[8%]'}`}>
                     <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM7 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V9.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9s1.54-1.274 1.639-1.208zM5 11h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
                      </svg>
                     <h1 key={id} className={`font-bold ml-2  mt-7 ${active === note.id ? 'text-rose-500' : 'text-gray-300'}`}>{note.title}</h1>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                     className={`text-rose-500 ml-2 mt-7 rounded-md  md:h-6 md:w-6 w-5 h-5 py-1 px-1 ${active === note.id ? 'hidden': 'bg-gray-300'}`} viewBox="0 0 16 16"
                     onClick={() => 
                      {handleEdit(note.id)
                      setEditid(note.id) }
                     }>
                     <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                     </svg>
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"
                     className="lg:mt-[11.8%] bg-rose-500 rounded-md text-gray-100 px-1 py-1 ml-2  md:w-7 md:h-7 h-5 w-5 mt-7"
                     onClick={() => handleDelete(note.id)}>
                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                     </svg>
                    </div>
                    
                    ))}








                  <div className="flex fixed bottom-14  md:ml-14 ml-7" >
                    
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   className="mt-4 mr-2 w-5 h-5 text-slate-400" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/> <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
                  </svg>
                
                    <label  className="relative">
                    <input type= "checkbox"
                    className={`cursor-pointer appearance-none mt-3.5 h-6 rounded-full w-14  ${darkmode ? 'bg-gray-400': 'bg-rose-500'}`} />
                
                {!darkmode ? (<span onClick={handleToggle} className="cursor-pointer bg-white w-5 h-5 mr-0.5 mt-4 rounded-full transition-transform duration-300 transform absolute end-0"></span>) :
                
                    (<span onClick={handleToggle}  className="cursor-pointer bg-white w-5 h-5 ml-0.5 mt-4 rounded-full transition-transform duration-300 transform absolute start-0"></span>)}
                    </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                    className="mt-4 ml-2 w-6 h-6 text-slate-400" viewBox="0 0 16 16">
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                      </svg>
                
                    </div> 






    </div>)}
    </>
  )
}

export default SideBar