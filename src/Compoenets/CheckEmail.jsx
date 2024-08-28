import React, { useState } from 'react'
import {Box, TextField} from '@mui/material'
import axios from 'axios'
import {OTP} from './OTP.jsx'

export const CheckEmail = () => {

    const [data , setdata] = useState({
        email : ""
    });

    const [show  , setshow] = useState(false);
    
    const changedata = (e) => {
        setdata((pre) => {
            return {...pre , [e.target.name] : e.target.value}
        })
    }

    const sendata = async(e) => {
      e.preventDefault();
         try {

             const d = await axios.post('http://localhost:3000/checkemail' ,{
                email : data.email
             })

             if(d.status === 200){
                
                alert(`OTP is Send Your Email : ${d.data.otp}`)
                setshow(true)
             }

         } catch (error) {
          alert(`${error.response.data?.message}`)
            console.log(error)
         }
    }

      return (
    <>
    <div className="container">
         <div style={{height : '100vh'}} className=" d-flex align-items-center justify-content-center">
        
        {show === false ? 
         <div class="card" style={{maxHeight  : '18rem'}}>
  <div class="card-header">
    MUI 
  </div>
  <div class="card-body">
    <h6 class="card-text">Enter Your Email Address to send your OTP </h6>
    <form onSubmit={sendata} >
  <div class="mb-3 my-3">
    <input type="email"  name='email' onChange={changedata}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

  </div>
</div>
   : <OTP /> }
         </div>
    </div>
    
     
    </>
  )
}
