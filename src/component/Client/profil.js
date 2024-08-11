import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import Navbar from './navbar';
import Sidebar from './Sidebar'

import Feed from './Feed';
import { db ,auth, logoutUser  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function Profil() {



 

  const history = useHistory()
  const [ Info ,setInfo]=useState({});



  const rellD = ()=>{
    
  }
  const rellE = ()=>{
   
  }
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (!auth.currentUser){
        history.push('/')
        }else{
          try {
         const infos = await getDoc(doc(db, "Users", currentUser.uid));
         setInfo(infos.data());
        //  console.log(infos.data());
        //  console.log(Info);
         if(infos.data().type == "client"){
             history.push('/profil');
         }
         else if (infos.data().type == 'admin'){
          history.push('/dashboard');
          window.location.reload('/dashboard')
         } 
         else if (infos.data().type == 'expert'){
           history.push('/expert');
           window.location.reload('/expert')
       } 
         } catch (error) {
             console.log(error.message)
         }
        }
        });
    
    
  }, []);

     const [User, setUser] = useState({});

   
    const dec =()=>{
      logoutUser();
    }
    // console.log(auth.currentUser);
 

    return (
        <div>
        <Grid container>
            <Grid className='profresp' item sm={4}><Sidebar/></Grid>
            <Grid item sm={7} xs={12} spacing={2} ><Feed/></Grid>
        
         </Grid> 
         </div>
    )
}


