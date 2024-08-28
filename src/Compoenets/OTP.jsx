import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './OTP.css'

export const OTP = () => {

    const navigate = useNavigate();

    const [otp , setotp] = useState(new Array(4).fill(""));

    const otpchange = (index , e) => {

        setotp([...otp.map((d, idx) => (idx === index ? e.target.value : d))]);

        
    }

    const otpback = (e) => {
    
        if(e.key === 'Backspace'){
            e.target.previousSibling.focus();
        }else{
            e.target.nextSibling.focus();
        }
    }

    const sendata = async(e) => {
        e.preventDefault();
        try {
            const d = await axios.post(`http://localhost:3000/checkotp/${otp.join("")}`)
            if(d.status === 200){
                alert("OTP is valid")
                 navigate('/login/verifyemail/checkemail/reset')
            }
        } catch (error) {
            alert(`${error.response.data?.message}`)
            console.log(error)
        }
       
    }

  return (
    <div className="container">
    <div style={{height : '100vh'}} className=" d-flex align-items-center justify-content-center">
    <div class="card" style={{maxHeight  : '18rem'}}>
<div class="card-header">
MUI 
</div>
<div class="card-body">
<h6 class="card-text">Enter Your OTP to Reset Your Password </h6>
<form onSubmit={sendata} >
<div class=" d-flex  mb-3 my-3">
    {otp.map(( dt , index) => {
        return (
            <>
            <input onChange={(e) => otpchange(index , e) } onKeyUp={(e) => otpback(e)} maxLength={1} style={{ width : '50px' , height : '50px' , textAlign : 'center' , fontWeight : 'bold' , fontSize : '15px'}} key={index} type="number"  name={`email${index}`}   class="form-control mx-2" id={`exampleInputEmail${index}`} aria-describedby={`emailHelp${index}`}/>
            </>
        )
    })}

</div>
<button type="submit" class="btn btn-primary">Send</button>
</form>

</div>
</div>
    </div>
</div>
  )
}
