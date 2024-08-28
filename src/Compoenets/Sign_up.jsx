import React, { useState } from 'react'
import {Box, Button, CssBaseline, Typography} from '@mui/material'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import './Sign_up.css'
import { blue, orange, red } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Sign_up = () => {

  const navigate = useNavigate();

  const [data , setdata] = useState({
    username : '',
    email : '',
    password : ''
  })

   const datachange =  (e) => {
           setdata((pre) => {
              return  {...pre , [e.target.name]  : e.target.value}
           })
   }

   const sendata = async(e) => {
    e.preventDefault();
    try {
      const d = await axios.post('http://localhost:3000/register' , {
        username : data.username,
        email : data.email,
        password : data.password
      })
       console.log(d)
      if(d.status === 200){
          alert('User register Succefully')
          navigate('/')
      }
      
    } catch (error) {
         console.log(error)
    }
   
   }

  return (
     <>
     <CssBaseline />
     <form onSubmit={sendata}  >
     <Box className='back'  display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100vh'} >
           <Box   width={400} borderRadius={3} sx={{backgroundColor : 'white'}}   >
               <Typography variant='h5' my={5} fontFamily={'monospace'} fontWeight={'bolder'} textAlign={'center'}>Create Account</Typography>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                <FormControl variant="standard" >
   
        <InputLabel htmlFor="input-with-icon-adornment" sx={{fontWeight : 'bold' , color : 'black'  , mb : 4 , mx : 4 }} >
           User name
        </InputLabel>
        <Input 
          name='username'
          onChange={datachange}
          sx={{mx : 4 ,  pb : 1}}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          }
        />
        
      </FormControl >
      <FormControl variant="standard" sx={{mt : 3}} >
        <InputLabel htmlFor="input-with-icon-adornment" sx={{fontWeight : 'bold' , color : 'black' ,   mb : 4 , mx : 4 }} >
          Email
        </InputLabel>
        <Input 
        name='email'
        onChange={datachange}
          sx={{mx : 4 ,  pb : 1}}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <EmailOutlinedIcon />
            </InputAdornment>
          }
        />
        
      </FormControl>
      <FormControl variant="standard" sx={{mt : 3}} >
        <InputLabel htmlFor="input-with-icon-adornment" sx={{fontWeight : 'bold' , color : 'black'  , mb : 4 , mx : 4 }} >
        Password
        </InputLabel>
        <Input 
        name='password'
        onChange={datachange}
          sx={{mx : 4 ,   pb : 1} }
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <HttpsOutlinedIcon  />
            </InputAdornment>
          }
        />
        
      </FormControl>
       
        <Box my={2} mx={4}>
             <Button className='btn' type='submit'  sx={{borderRadius : 5}} variant='contained' fullWidth >Sign up</Button>
        </Box>
      
        <Typography variant='p' fontSize={12} textAlign={'center'} >Or Sign Up Using</Typography>

         <Box mt={2} mb={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
         <FacebookRoundedIcon sx={{ color : blue[600] , mx : 1 , fontSize : 36}}/>
             <GoogleIcon sx={{ color : 'white' , fontSize : 30 ,  borderRadius : 5 , backgroundColor : red[500] , padding : '3px' }} />
             <TwitterIcon  sx={{ color : 'white' , fontSize : 30 ,  borderRadius : 5 , backgroundColor : blue[500] , padding : '3px' , mx : 1 }}/>
            </Box>
      
             
                </Box>
           </Box>
          
     </Box>
     </form>
    </>
  )
}
