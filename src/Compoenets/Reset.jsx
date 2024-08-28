import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Reset = () => {

      const navigate = useNavigate();
    
     const [data , setdata] = useState({
        password : ""
     })

    const  changedata = (e) => {

        setdata((pre) => {
            return {...pre , [e.target.name] : e.target.value}
        })

    } 

    const  sendata = async(e) => {
        e.preventDefault();
       try {
         const d = await axios.put(`http://localhost:3000/reset/${data.password}`);
         if(d.status === 200){
           alert(`${d.data.message}`)
            navigate('/login')
         }
       } catch (error) {
        console.log(error)
        alert(`${error.response.data.message}`)
       }
    }

  return (
    <>
    <div className="container">
         <div style={{height : '100vh'}} className=" d-flex align-items-center justify-content-center">
         <div class="card" style={{maxHeight  : '18rem'}}>
  <div class="card-header">
    MUI 
  </div>
  <div class="card-body">
    <h6 class="card-text">Reset Your Password</h6>
    <form onSubmit={sendata} >
  <div class="mb-3 my-3">
    <input type="password"  name='password' onChange={changedata}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <button type="submit" class="btn btn-primary">Reset</button>
</form>

  </div>
</div>
         </div>
    </div>
    
    </>
  )
}
