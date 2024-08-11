import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import Navbar from './navbar';
import Sidebar from './Sidebar'

import CarAjout from './ajoutVe';

import { db ,auth, logoutUser  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@mui/material/Fab';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import ArticleIcon from '@mui/icons-material/Article';
import { ExitToApp, Person, Settings ,Delete , CloudDownload} from '@material-ui/icons';
import Box from '@mui/material/Box';

export default function Inajou() {



 

  const history = useHistory()
 

 
//============================= Controles =========================
  
useEffect(async () => {
  onAuthStateChanged(auth, async (currentUser) => {
      if (auth.currentUser){
          const User = await getDoc(doc(db, "Users" , currentUser.uid));
          if(User.data().type == 'admin'){ 
          history.push('/dashboard') ;
          window.location.reload('/dashboard');
          }
          if(User.data().type == 'expert'){
           history.push('/expert')
           window.location.reload('/expert');
          }
      }else if (!auth.currentUser){
        history.push('/')
      }

      });
  
  
}, []);

//===========================================================================
const dec =()=>{
  logoutUser();
  setTimeout(() => {
     window.location.reload(`/`); 
  }, 1000);
  

}
const goprofil =() => {
  history.push(`/profil`);
  window.location.reload(`/profil`);
}

const goConst = () =>{
history.push('/form')
window.location.reload('/form');
}

const gotosett =() => {
  history.push('/settings');
  window.location.reload('/settings');
}
const AjouterV = () =>{
  history.push('/Ajouter')
  window.location.reload('/Ajouter');
}
    return (
        <div>
        <Grid container>
            <Grid  className='profresp' item sm={4} ><Sidebar/></Grid>
            <Grid item sm={8} xs={12} spacing={2}>
            <div className='profresNa' >
        <div className='NavIco'>
        <Box sx={{width: "100%" , '& > :not(style)': { m: 1 }}}>
        <Tooltip title="Profil" placement="Top"   >
        <Fab onClick={goprofil} size='small'  color="inherit" aria-label="add">
        <Person />
        </Fab>
        </Tooltip>

        <Tooltip title="Ajouter Vehicule" placement="Top"   >
        <Fab onClick={AjouterV} size='small'  color='inherit' >
        <TimeToLeaveIcon  />
        </Fab>
        </Tooltip>

        <Tooltip title="Constats" placement="Top"   >
        <Fab onClick={goConst} size='small'  color="inherit" aria-label="add">
        <ArticleIcon />
        </Fab>
        </Tooltip>

        <Tooltip title="Settings" placement="Top"   >
        <Fab onClick={gotosett} size='small'  color="default" aria-label="edit">
        <Settings />
        </Fab>
        </Tooltip>

        <Tooltip  size='small'  title="deconnecter" placement="Top"   >
        <Fab onClick={dec} color="default" aria-label="edit">
        <ExitToApp />
        </Fab>
        </Tooltip>

        </Box>
        </div>
        </div>
              <CarAjout/>
              </Grid>
        
         </Grid> 
         </div>
    )
}


