import React, { useState } from 'react';
import {Box, CssBaseline , TextField, Typography , Button, Divider, speedDialActionClasses} from '@mui/material';
import Google from  "../assests/goo.png";
import {useGoogleLogin} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { blue } from '@mui/material/colors';

export const Log_in = () => {

  const navigate = useNavigate();

  const [data , setdata] = useState({
      email : '',
      password : ''
  });

  const changedata = (e) => {
       setdata((pre) => {
        return {...pre , [e.target.name] : e.target.value}
       })
  }

  const senddata = async(e) =>  {
     e.preventDefault();
     try {
        const d = await axios.post('http://localhost:3000/login' , {
           email : data.email,
           password  : data.password
        })

        if(d.status === 200){
          localStorage.setItem('auth_token' , d.data.auth_token)
           alert('Login Succesfull')
           navigate('/')
        }
     } catch (error) {
      console.log(error)
     }
  }

  const googleAuthLogin = async(GoogleLoginResult) => {
    try {
       
        if(GoogleLoginResult.code){
          const googleauth = await axios.get(`http://localhost:3000/auth/google?code=${GoogleLoginResult.code}`)
            localStorage.setItem('auth_token' , googleauth.data.auth_token )
            navigate('/')
        }
    } catch (error) {
        console.log("Google login error :" , error)
    }
  }

  const googlelogin = useGoogleLogin({
     onSuccess : googleAuthLogin,
     onError : googleAuthLogin,
     flow : 'auth-code'
  })

  return (
    
    <>
    <CssBaseline/>
     <Box display={'flex'} flexDirection={'column'}  justifyContent={'center'} alignItems={'center'} sx={{ backgroundColor : '#f0f4f9' , height : "100vh"}} >
       <form onSubmit={senddata}>
         <Box position={'relative'} display={'flex'} width={'80%'} height={'60vh'} borderRadius={5} sx={{ backgroundColor : 'white'}} >
              <Box  width={'100%'} >
                  <Box  mt={4} mx={4} sx={{ color : 'orange'}} >
                    <img src={Google} alt='image' style={{backgroundColor : '#f0f4f9' }} width={'200px'} height={'100px'} /> 
                  </Box>
                  <Typography variant='h4' ml={5} mr={10} >Log In Your Google Account</Typography>
              </Box>
              <Box  width={'100%'} pt={5}>
                <Box my={3} mx={3}>
              <TextField  fullWidth name='email' onChange={changedata}  id="outlined-basic" label="Email" variant="outlined" />    
                </Box>
                <Box mx={3}>
              <TextField fullWidth name='password' onChange={changedata}  id="outlined-basic" label="Password" variant="outlined" />   
                </Box>
                <Box sx={{   bottom : 25 , left : 350 , '&:hover' : { 
                     cursor :"pointer" , color : blue[700] , textDecoration : "underline"
                }}} position={'absolute'} >
                <a onClick={() => navigate('/login/verifyemail')}  >Forget Password?</a>
                </Box>
              
                <Box position={'absolute'}sx={{ bottom : 20 , right : 20}} >
                <Button type='submit'  sx={{borderRadius : 5}} variant="contained">Log In</Button>
                </Box>
                 <Box mx={3} my={2} display={'flex'} alignItems={'center'} >
                 <Divider sx={{ width : '48%'}} />
                   <Typography variant='p' sx={{ mx : 1}} >or</Typography>
                   <Divider sx={{ width : '45%'}} />
                 </Box>
                 <Box my={2} mx={3} >
                <Button onClick={googlelogin}  fullWidth sx={{borderRadius : 2 }} color='warning' variant="contained">Continue With Google</Button>
                </Box>
              </Box>
         </Box>
         <Box my={1} sx={{ color : "grey"}}  display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'80%'} > 
             <Box>
              English (Unites-States) 
             </Box>
             <Box display={'flex'} >
                <Box mx={1}>Help</Box>
                <Box mx={1}>privacy</Box>
                <Box mx={1}>terms</Box>
             </Box>
         </Box>
         </form>
     </Box>
    
    </>
  )
}
