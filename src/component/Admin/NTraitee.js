import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import Navbar from './navbar';


import {
    Switch
} from 'react-router-dom'
import { db ,auth, logoutUser  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const ulStyle = { width:'85%' , marginLeft : '10%' , borderRadius: "10%" ,backgroundColor: "#a7e7fc"}

export default function NTraitee() {

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const history = useHistory()
const [User, setUser] = useState({});
const [Clients, setClients] = useState([]);
const [Constat, setConstat] = useState([]);

const [client, setclient] = useState({});
const [Info, setInfo] = useState({});
const [Uiid, setUiid] = useState();


var cli = [];
var con = [];
useEffect(() => {
  onAuthStateChanged(auth,async (currentUser) => {
      if (!auth.currentUser){
       history.push('/')
      }
      });
}, []);
onAuthStateChanged(auth, async (currentUser) => {
if (auth.currentUser){
    // setUser(currentUser);
        const infos = await getDoc(doc(db, "Users", currentUser.uid));
        setInfo(infos.data());
        if(Info.type == "client"){
          history.push('/profil');
        }
        else if(Info.type == "expert"){
          history.push('/expert');
        }


        
        const q = query(collection(db, "Constat"), where("loading", "==", true));

        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          try {
            // console.log(doc.data()); 
          
          cli.push({
            ID: doc.id,
            Ncontrat :  doc.data().Ncontrat,
            fullname : doc.data().A_nom+' '+doc.data().A_prenom,
            Fname : doc.data().B_nom+' '+doc.data().B_prenom,
            A_nom: doc.data().A_nom,
            A_prenom:doc.data().A_prenom,
            B_nom: doc.data().B_nom,
            B_prenom: doc.data().B_prenom,
          });
          
          
          } catch (error) {
            console.log(error);
          }
         
         
        });
            
        setClients(cli);






        const q2 = query(collection(db, "Constat"), where("loading", "==", false));

        const querySnapshot2 = await getDocs(q2);
        
        querySnapshot2.forEach((doc) => {
          try {
            // console.log(doc.data()); 
          con.push({
            ID: doc.id,
            Ncontrat :  doc.data().Ncontrat,
            fullname : doc.data().A_nom+' '+doc.data().A_prenom,
            Fname : doc.data().B_nom+' '+doc.data().B_prenom,
            A_nom: doc.data().A_nom,
            A_prenom:doc.data().A_prenom,
            B_nom: doc.data().B_nom,
            B_prenom: doc.data().B_prenom,
          });
          
          
          } catch (error) {
            console.log(error);
          }
         
         
        });

        setConstat(con);
        // console.log(Constat);


      }
        
  });

 
  const dec =()=>{
    logoutUser();
    setTimeout(() => {
       window.location.reload(`/`); 
    }, 1000);
    

  }

  const [search, setsearch] = useState([]);
  const [usersugges, setusersugges] = useState([]);
  const [open, setOpen] = useState(false);
  const [openN, setOpenN] = useState(false);

  const handlefilterT = (e) => {
    setOpen(true);
    const searchWord = e.target.value;
    const newfilter = Clients.filter((value) => {
      return (
        value.A_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.A_prenom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_prenom.toLowerCase().includes(searchWord.toLowerCase()) 
      );
    });
    if (searchWord === "") {
      setsearch([]);
    } else {
      setsearch(newfilter);
    }
  };


  const handlefilterNT = (e) => {
    setOpenN(true);
    const searchWord = e.target.value;
    const newfilter = Constat.filter((value) => {
      return (
        value.A_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.A_prenom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_prenom.toLowerCase().includes(searchWord.toLowerCase()) 
      );
    });
    if (searchWord === "") {
      setsearch([]);
      setOpenN(false);
    } else {
      setsearch(newfilter);
    }
  };

  

       //============================= Controles =========================

       useEffect(async () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
                const User = await getDoc(doc(db, "Users" , currentUser.uid));
                if(User.data().type == 'expert'){ 
                history.push('/expert') ;
                window.location.reload('/expert');
                }
                if(User.data().type == 'client'){
                 history.push('/profil')
                 window.location.reload('/profil');
                }
            }else if (!auth.currentUser){
              history.push('/')
            }
    
            });
        
        
      }, []);
  
  
      //===========================================================================

  return (
    <>
    
    <Grid  sm={12} xs={12}>
        {/* <Typography variant="h6" component="h5" >Listes des Constats Non traitees</Typography> */}
        <div className='hh'> <h2 data-text='Constats Non traitees'>Constats Non traitees</h2> </div>
        <div className='ConsTab'>
        <TableContainer   sx={{ height: 300}} component={Paper} style={ulStyle}>
        <Search/>
        <InputBase
                            type="text"
                            name="recherche"
                            id="recherche"
                            className='seaInput'
                            placeholder="Tapez un nom ..."
                            onChange={handlefilterNT}
                            />





              <Table   size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell size="small" align="justify">Client</TableCell>
                    <TableCell size="small" align="justify">Adversaire</TableCell>
                    <TableCell size="small" align="justify"></TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody  >

                {search.length !== 0 && openN == true && (
                  <>
                    {search.slice(0, 15).map((Constat) => (
                        
                        <TableRow
                        className='ConsT'
                        key={Constat.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {Constat.fullname}
                        </TableCell>
                        <TableCell align="justify">{Constat.Fname}</TableCell>
                        <TableCell align="justify">  <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button></TableCell>
                      </TableRow>
                        
                      
                    ))}
                    
                  </>
                )}


              {openN ? <></> :
              <>
              {Constat.map((Constat) => (
                  
                    <TableRow
                      className='ConsT'
                      key={Constat.ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {Constat.fullname}
                      </TableCell>
                      <TableCell align="justify">{Constat.Fname}</TableCell>
                      <TableCell align="justify">  <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button></TableCell>
                    </TableRow>
                    
                  ))}
              </>
              }
                
                </TableBody>
              </Table>
            </TableContainer>
        </div>

           

        </Grid>
    
    </>
  );
}