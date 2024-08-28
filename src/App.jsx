import { BrowserRouter , Routes , Route} from 'react-router-dom'
import {Home} from './Compoenets/Home.jsx'
import {Log_in} from './Compoenets/Log_in.jsx'
import {Sign_up} from './Compoenets/Sign_up.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
import { CheckEmail } from './Compoenets/CheckEmail.jsx'
import { OTP } from './Compoenets/OTP.jsx'
import { Reset } from './Compoenets/Reset.jsx'
function App() {

  const GoogleAuthCompnentWrpper = () => {
    return (
      <>
       <GoogleOAuthProvider clientId='1008409683543-ma7qbko5b50d62utbi7sdhe0k3k1ekjr.apps.googleusercontent.com' >
       <Log_in/>
        </GoogleOAuthProvider>
        </>
    )
  }
 
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<GoogleAuthCompnentWrpper/>} />
        <Route path='/signup' element={<Sign_up/>} />
        <Route path='/login/verifyemail' element={<CheckEmail/>} />
        <Route path='/login/verifyemail/checkemail/reset' element={<Reset/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
