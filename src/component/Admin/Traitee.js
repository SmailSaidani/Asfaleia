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

export default function Traitee() {

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
      if (auth.currentUser){
       
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
            
        setConstat(cli);


      }else{
        history.push('/')
      }
      });
}, []);



  const [search, setsearch] = useState([]);
  const [open, setOpen] = useState(false);
 

  const handlefilterT = (e) => {
    setOpen(true);
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
          
          

        {/* <Typography variant="h6" component="h5" >Constat deja traiter</Typography> */}
        <div className='RR'> <h2 data-text='Constats Non traitees'>Constats traitees</h2> </div>
        <div className='ConsTab'>

<TableContainer sx={{ height: 300}} component={Paper} style={ulStyle}>
<Search/>
<InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Tapez un nom ..."
                    onChange={handlefilterT}
                    
                    />
      <Table sx={{ minWidth: 400 }}   size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell size="small" align="justify">Client</TableCell>
            <TableCell size="small" align="justify">Adversaire</TableCell>
            <TableCell size="small" align="justify"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


        {search.length !== 0 && open == true && (
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


      {open ? <></> :
      <>
          {Constat.map((Constat) => (
            <TableRow
              key={Constat.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Constat.fullname}
              </TableCell>
              <TableCell align="justify">{Constat.Fname}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} className='btnsC' variant="contained">Visualiser le constat</button></TableCell>
            </TableRow>
          ))}
          </>}

          
        </TableBody>
      </Table>
    </TableContainer>
    </div>

        </Grid>
    
    </>
  );
}