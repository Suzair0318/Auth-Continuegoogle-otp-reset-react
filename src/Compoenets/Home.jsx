import React , {useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link as L, useNavigate} from 'react-router-dom'
import axios from 'axios';

export const Home = () => {
  const navItems = ['Home', 'About', 'Contact'];
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const verifytoken = async() => {
    console.log(localStorage.getItem('auth_token'))
        try {
            let a = await axios.post("http://localhost:3000/verify_token" , {
               
            } , {
              headers : {
                auth_token : localStorage.getItem('auth_token')
              }
            });
      
            console.log(a.data)
        } catch (error) {
           console.log(error)
           navigate('/login')
        }
  }

  useEffect(() => {
      verifytoken()
  },[])

  return (
    <>
  <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {  sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          
              <L to={'/'} ><Button   sx={{ color: '#fff' }}>
                Home
              </Button></L>
              <L to={'/login'}><Button   sx={{ color: '#fff' }}>
                Login
              </Button></L>
              <L to={'/signup'}><Button  sx={{ color: '#fff' }}>
                Signup
              </Button></L>
          </Box>
        </Toolbar>
      </AppBar>
      
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
      
          }}
        > 
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' , width : "100vw"}}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        
           <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={'Login'} />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={'Signup'} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
        </Drawer>
      </nav>
    
    </Box>
    <Box my={10}>
       <h1 >Welcome Mui </h1>
    </Box>
    </>
  )
}
