import '../form.css'
import React, { useEffect, useState } from 'react';
import { useHistory  } from 'react-router-dom/cjs/react-router-dom.min';
import { db, auth  } from "../../bdd/firebase";
import {onAuthStateChanged, } from "firebase/auth";
import {doc,getDoc,collection, query, where, getDocs, orderBy} from "firebase/firestore";
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';


import 'react-pro-sidebar/dist/css/styles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@material-ui/core/Box';

import { styled } from '@mui/material/styles';

import { IoIosPeople } from 'react-icons/io';
import EngineeringIcon from '@mui/icons-material/Engineering';


import { IoLogoModelS } from "react-icons/io";
import { IoIosPaper } from 'react-icons/io';
import { IoIosImages } from 'react-icons/io';



import Sidebar from '../sidebar';



import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';




const ulStyle = { width:'100%'  , backround: "none"}
const clients = { marginTop:'10%'}
const Ce = { marginLeft:'50%'}
const Gb ={
  boxShadow: '0 3px 5px rgb(192, 193, 194)',
}




const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function Dashboard() {


  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    

    const history = useHistory();
 
    const [Info, setInfo] = useState({});

    const [NbrCl , setNbrCl] = useState(0);
    const [NbrEx , setNbrEx] = useState(0);
    const [NbrCon , setNbrCon] = useState(0);

    const [Clients, setClients] = useState([]);
    const [Experts, setExperts] = useState([]);
    const [User, setUser] = useState({});
    const [demandes , setDemandes]=useState([]);
    const [Rapport , setRapport]=useState([]);
    const [MiseAJ , setMiseAJ]=useState([]);

    const [search, setsearch] = useState([]);
    const [search2, setsearch2] = useState([]);
    const [usersugges, setusersugges] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2 ] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    var rap = [];
    var MAj = [];
    var dmd = [];
    var cli = [];
    var Exp = [];
    


    useEffect(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (auth.currentUser){

          setUser(currentUser);

          const infos = await getDoc(doc(db, "Users", currentUser.uid));
          setInfo(infos.data());
          
          //================ demandes=================
          const q7 = query(collection(db, "Demandes"));

          const querySnapshot7 =  await getDocs(q7);
          querySnapshot7.forEach((doc) => {

          dmd.push({
            
            ID : doc.id,
            TypeV:doc.data().TypeV,
            annes:doc.data().annes,
            caross:doc.data().caross,
            charge :doc.data().charge,
            energie :doc.data().energie,
            garanties :doc.data().garanties,
            
            ind  :doc.data().ind,
            type :doc.data().type,
            val :doc.data().val,
            imma :doc.data().imma,
            immaP :doc.data().immaP,
            marque :doc.data().marque,
            nom :doc.data().nom,
            numS :doc.data().numS,
            place :doc.data().place,
            poids :doc.data().poids,
            puiss :doc.data().puiss,
            type :doc.data().type,
            user :doc.data().user,
            valeur :doc.data().valeur,
            userPr : doc.data().userPr,
            userN: doc.data().userN,
            userPhone : doc.data().userPhone
            
          })
        });
        
          setDemandes(dmd);


        //====================== rapports ==============

        
        const R = query(collection(db, "Rapport"));

        const querySnapshotR =  await getDocs(R);
        querySnapshotR.forEach((doc) => {

        rap.push({
          ...doc.data(),
          ID: doc.id,
        })

      });
      
        setRapport(rap);

      //==========================   Mise a jour Photos ===========================
        
      const MJ = query(collection(db, "imagesMaj"));

      const querySnapshotMJ =  await getDocs(MJ);
      querySnapshotMJ.forEach((doc) => {

      MAj.push({
        ...doc.data(),
        ID: doc.id,
      })

    });
    
    setMiseAJ(MAj);

        //==============================  clients   ====================================


          
          const q = query(collection(db, "Users"), where("type", "==", 'client'));

          const querySnapshot = await getDocs(q);
          var D = 0;
          querySnapshot.forEach((doc) => {
            try {
            D = D+1;
            
            cli.push({
              ID :  doc.data().userId,
              fullname : doc.data().fullname,
              nom : doc.data().nom,
              prenom : doc.data().prenom,
              email : doc.data().email,
              phone : doc.data().phone,
              nbrV : doc.data().nbrV,
            });
            
            
            } catch (error) {
              console.log(error);
            }
     
          });
              
          setClients(cli);
          setusersugges(cli);
          setNbrCl(D);


      //============= constatss ===================================
          const q2 = query(collection(db, "Constat"));

          const querySnapshot2 = await getDocs(q2);
          
          var C = 0;
          querySnapshot2.forEach((doc) => {
           C = C+ 1;
          });

          setNbrCon(C);


        //=======================   experts ===============================
          const Ex = query(collection(db, "Users"), where("type", "==", 'expert'), orderBy("nbrV" , "asc"));

          const querySnapshotEx = await getDocs(Ex);
          var E = 0;
          querySnapshotEx.forEach((doc) => {
            try {
            
             E = E+1;

            Exp.push({
              ID :  doc.data().userId,
              fullname : doc.data().nom+' '+doc.data().prenom,
              nom : doc.data().nom,
              prenom : doc.data().prenom,
              email : doc.data().email,
              phone : doc.data().phone,
              nbrV : doc.data().nbrV,
            });
            
            
            } catch (error) {
              console.log(error);
            }
           
           
          });
              
          setExperts(Exp);
          setNbrEx(E);

          }

          });
      
      
    }, []);



    const handlefilter = (e) => {
      setOpen(true);
      const searchWord = e.target.value;
      const newfilter = usersugges.filter((value) => {
        return (
          value.nom.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.prenom.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      if (searchWord === "") {
        setsearch([]);
        setOpen(false);
      } else {
        setsearch(newfilter);
      }
    };
 
 
    
    const handlefilterE = (e) => {
      setOpen2(true);
      const searchWord = e.target.value;
      const newfilter = Experts.filter((value) => {
        return (
          value.nom.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.prenom.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      if (searchWord === "") {
        setsearch2([]);
        setOpen2(false);
      } else {
        setsearch2(newfilter);
      }
    };
 

    const handlefilterD = (e) => {
      setOpen3(true);
      const searchWord = e.target.value;
      const newfilter = demandes.filter((value) => {
        return (
          value.userN.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.userPr.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.marque.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.nom.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      if (searchWord === "") {
        setsearch([]);
        setOpen3(false);
      } else {
        setsearch(newfilter);
      }
    };
    
  
    const handlefilterR = (e) => {
      setOpen4(true);
      const searchWord = e.target.value;
      const newfilter = Rapport.filter((value) => {
        return (
          value.clientnom.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.clientprenom.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.marque.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.TypeV.toLowerCase().includes(searchWord.toLowerCase())  ||
          value.expertNom.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.expertPrenom.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      if (searchWord === "") {
        setsearch([]);
        setOpen4(false);
      } else {
        setsearch(newfilter);
      }
    };

    const handlefilterIm = (e) => {
      setOpen5(true);
      const searchWord = e.target.value;
      const newfilter = MiseAJ.filter((value) => {
        return (
          value.userN.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.userPr.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.marque.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.nom.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      if (searchWord === "") {
        setsearch([]);
        setOpen5(false);
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
                  else if(User.data().type == 'client'){
                  
                    // history.replace('/profil')
                    
                   history.push('/profil')
                 window.location.reload('/profil');
                  }
              }else if (!auth.currentUser){
                history.push('/')
                window.location.reload('/');
              }
      
              });
          
          
        }, []);
    
    
        //===========================================================================


    const cardStyle = { marginTop:'10%'}
    return (

      <div>
        <Sidebar/>
      <div class="container">
  <div  class="header2-container" >
    {/* <img src="assets/images/jeune.webp" alt="" class="header-image" /> */}
    <div class="header">
      <h1 class="main-heading">{Info.nom} {Info.prenom}</h1>
      <span class="tag">Tel :{Info.phone}</span>
      <br>
      </br>
      <br>
      </br>
      
      <span class="tag">Agence :{Info.agence}</span>
      <div class="stats">
        <span class="stat-module">
          Nombre Totale de clients : <span class="stat-number">{NbrCl}</span>
        </span>
        
        <span class="stat-module">
          Nombre Totale d'Experts : <span class="stat-number">{NbrEx}</span>
        </span>
        <span class="stat-module">
          Constats en cours : <span class="stat-number">{NbrCon}</span>
        </span>
      </div>
    </div>
  </div>
  
  <div class="overlay-header2"></div>
  
  <div class="body">
    <img src="assets/images/pro3.png" alt="profil pic" class="body-image" />

    

    <div class="u-clearfix"></div>


   


    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList allowScrollButtonsMobile variant='scrollable'sx={{width: "60%"}} onChange={handleChange} aria-label="tous les champs">
            <Tab icon={<IoIosPeople size={23} />} sx={{fontSize: "11px"}} label="Clients" value="1" />
            <Tab icon={<EngineeringIcon  />} sx={{fontSize: "11px"}} label="Experts" value="2" />
            <Tab icon={<IoLogoModelS size={23}/>} sx={{fontSize: "11px"}} label="Demandes D'ajout" value="3" />
            <Tab icon={<IoIosPaper size={23}/>} sx={{fontSize: "11px"}} label="Rapports" value="4" />
            <Tab icon={<IoIosImages size={23}/>} sx={{fontSize: "11px"}} label="Mise a jours images" value="5" />
            
        
          </TabList>
        </Box>
        <TabPanel value="1"><div class="">
        <Search/>
        <InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Cherchez des utilisateur..."
                    onChange={handlefilter}
                    />






      <span class="card-more">
      

      </span>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        background : 'none',
      }}
    >
      <TableContainer sx={{ height: 300}} className='tabR' component={Paper} style={ulStyle}>
      <Table   size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell style={Gb} size="medium" align="center">fullname</TableCell>
            <TableCell style={Gb} size="medium" align="center">phone</TableCell>
            <TableCell style={Gb} size="medium" align="center">Nbr V</TableCell>
            <TableCell style={Gb} size="medium" align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {search.length !== 0 && open == true && (
          <>
                  {search.slice(0, 15).map((Clients) => (
                    
              <TableRow
              key={Clients.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {Clients.nom} {Clients.prenom}
              </TableCell>
              <TableCell align="justify">{Clients.phone}</TableCell>
              <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
              </TableRow>
              
              ))}
          </>
                
   
                
              
         
            

        )}

        {open ? <></>:
      <>
        {Clients.map((Clients) => (
            <TableRow
              key={Clients.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Clients.nom} {Clients.prenom}
              </TableCell>
              <TableCell align="justify">{Clients.phone}</TableCell>
              <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
            </TableRow>
          ))}
      </>  
      }

        

        </TableBody>
      </Table>
       </TableContainer>

        {/* ---------------------debut de classe ecran petit d'affichage clinets --------------------------- */}


       <TableContainer className='tabD' component={Paper} style={ulStyle}>
      <Table   size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell style={Gb} size="medium" align="center">fullname</TableCell>
            <TableCell style={Gb} size="medium" align="center">Nbr V</TableCell>
            <TableCell style={Gb} size="medium" align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {search.length !== 0 && open == true && (
          <>
                  {search.slice(0, 15).map((Clients) => (
                    
              <TableRow
              key={Clients.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {Clients.nom} {Clients.prenom}
              </TableCell>
            
              <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
              </TableRow>
              
              ))}
          </>
        )}

        {open ? <></>:
      <>
        {Clients.map((Clients) => (
            <TableRow
              key={Clients.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Clients.nom} {Clients.prenom}
              </TableCell>
              <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
            </TableRow>
          ))}
      </>  
      }

        </TableBody>
      </Table>
       </TableContainer>

        {/* ---------------------fin de classe ecran petit d'affichage clinets --------------------------- */}
 
    </Paper></div>
    </TabPanel>


      <TabPanel value="2"><div class="">

            
            <Search/>
            <InputBase
                        type="text"
                        name="recherche"
                        id="recherche"
                        className='seaInput'
                        placeholder="Cherchez des utilisateur..."
                        onChange={handlefilterE}
                        />
            
            <Paper
            sx={{
              p: 2,
              margin: 'auto',
              flexGrow: 1,
              background : 'none',
            }}
          >
            <TableContainer sx={{ height: 300}} className='tabR' component={Paper} style={ulStyle}>
            <Table   size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow >
                  <TableCell style={Gb} size="medium" align="center">fullname</TableCell>
                  <TableCell style={Gb} size="medium" align="center">phone</TableCell>
                  <TableCell style={Gb} size="medium" align="center">Nbr constats</TableCell>
                  <TableCell style={Gb} size="medium" align="center"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              {search2.length !== 0 && open2 == true && (
          <>
                  {search2.slice(0, 15).map((Experts) => (
                    
              <TableRow
              key={Experts.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {Experts.fullname}
              </TableCell>
              <TableCell align="justify">{Experts.phone}</TableCell>
              <TableCell style={Ce} align="justify">{Experts.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Experts.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
              </TableRow>
              
              ))}
          </>
                
   
                
              
         
            

        )}

        {open2 ? <></>:
        <>
         {Experts.map((Experts) => (
                  <TableRow
                    key={Experts.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {Experts.fullname}
                    </TableCell>
                    <TableCell align="justify">{Experts.phone}</TableCell>
                    <TableCell style={Ce} align="justify">{Experts.nbrV}</TableCell>
                    {/* <TableCell align="justify">{Experts.ID}</TableCell> */}
                    <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Experts.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
                  </TableRow>
                ))}
        </>
        }

               
              </TableBody>
            </Table>
            </TableContainer>

        {/* ---------------------debut de classe ecran petit d'affichage experts --------------------------- */}


       <TableContainer className='tabD' component={Paper} style={ulStyle}>
      <Table   size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell style={Gb} size="medium" align="center">fullname</TableCell>
            <TableCell style={Gb} size="medium" align="center">Nbr constats</TableCell>
            <TableCell style={Gb} size="medium" align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


        {search2.length !== 0 && open2 == true && (
          <>
                  {search2.slice(0, 15).map((Experts) => (
                    
              <TableRow
              key={Experts.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {Experts.fullname}
              </TableCell>
              <TableCell style={Ce} align="justify">{Experts.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Experts.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
              </TableRow>
              
              ))}
          </>
                
   
                
              
         
            

        )}

        {open2 ? <></>:
        <>
         {Experts.map((Experts) => (
                  <TableRow
                    key={Experts.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {Experts.fullname}
                    </TableCell>
                    
                    <TableCell style={Ce} align="justify">{Experts.nbrV}</TableCell>
                    {/* <TableCell align="justify">{Experts.ID}</TableCell> */}
                    <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Experts.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
                  </TableRow>
                ))}
        </>
        }
        </TableBody>
      </Table>
       </TableContainer>

        {/* ---------------------fin de classe ecran petit d'affichage experts --------------------------- */}
          

      
          </Paper></div>
          </TabPanel>



    <TabPanel value='3'>
    <Search/>
        <InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Tapez un nom ..."
                    onChange={handlefilterD}
                    />
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        background : 'none',
      }}
    >
      <TableContainer sx={{ height: 300}}  component={Paper} style={ulStyle}>
      <Table   size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell style={Gb} size="medium" align="center">fullname</TableCell>
            <TableCell style={Gb} size="small" align="center">Voiture</TableCell>
            <TableCell style={Gb} size="medium" align="center"> Rediger CVT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {search.length !== 0 && open3 == true && (
          <>
                  {search.slice(0, 15).map((D) => (
                    
                    <TableRow
                    key={D.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {D.userPr} {D.userN}
                    </TableCell>
                    <TableCell align="justify"> {D.marque} : {D.nom} </TableCell>
                    <TableCell style={Ce} align="justify"><button onClick={()=>{window.open(`cft/${D.ID}`, '_blank')}}  className='btnsC' variant="contained">Fiche De Visite Technique</button></TableCell>
                  </TableRow>
              
              ))}
          </>
                
   
                
              
         
            

        )}

        {open3 ? <></> :
         <>
          {demandes.map((D) => (
            <TableRow
              key={D.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {D.userPr} {D.userN}
              </TableCell>
              <TableCell align="justify"> {D.marque} : {D.nom} </TableCell>
              <TableCell style={Ce} align="justify"><button onClick={()=>{window.open(`cft/${D.ID}`, '_blank')}}  className='btnsC' variant="contained">Fiche De Visite Technique</button></TableCell>
            </TableRow>
          ))}
         </>
         }

         
        </TableBody>
      </Table>
       </TableContainer>
</Paper>
    </TabPanel> 


    <TabPanel value="4">
      <div>
      <Search/>
        <InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Tapez un nom ..."
                    onChange={handlefilterR}
                    />



      <TableContainer sx={{ height: 300}}  component={Paper} style={ulStyle}>
            <Table   size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow >
                  <TableCell style={Gb} size="medium" align="center">Client</TableCell>
                  <TableCell style={Gb} size="medium" align="center">Expert</TableCell>
                  <TableCell style={Gb} size="medium" align="center">Voiture</TableCell>
                  <TableCell style={Gb} size="medium" align="center"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

            
              {search.length !== 0 && open4 == true && (
          <>
                  {search.slice(0, 15).map((D) => (
                    
                    <TableRow
                    key={D.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {D.clientnom} {D.clientprenom}
                    </TableCell>
                    <TableCell align="justify"> {D.expertNom} : {D.expertPrenom} </TableCell>
                    <TableCell align="justify"> {D.marque} : {D.TypeV} </TableCell>
                    <TableCell style={Ce} align="justify"><button onClick={()=>{window.open(`Rapport/${D.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le Rapport</button></TableCell>
                  </TableRow>
              
              ))}
          </>
           )}

        {open4 ? <></> :
         <>
        
        
         {Rapport.map((Rapport) => (
                  <TableRow
                    key={Rapport.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {Rapport.clientnom} {Rapport.clientprenom}
                    </TableCell>
                    <TableCell align="justify">{Rapport.expertNom} {Rapport.expertPrenom}</TableCell>
                    <TableCell style={Ce} align="justify">{Rapport.marque} =&gt; {Rapport.TypeV} </TableCell>
                    {/* <TableCell align="justify">{Rapport.ID}</TableCell> */}
                    <TableCell align="justify">  <button onClick={()=>{window.open(`Rapport/${Rapport.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le Rapport</button></TableCell>
                  </TableRow>
                ))}
        </>
        }

               
              </TableBody>
            </Table>
            </TableContainer>
      </div>

       {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none' }}>
      
        <ListItem
          key={value}
          disableGutters
        >
          
          <ListItemText 
          primary={` ${value.nomeAd} ${value.prenomAd}`}
          secondary={`voiture: ${value.CarMarqu}`} />
          <Button variant="outlined" onClick={()=>{history.push(`/constat/${value.ID}`)
                                          window.location.reload(`/constat/${value.ID}`);}}>verifier rapport
          </Button>
          {value.loading ? <>
            <IconButton aria-label="comment">
              <DoneOutlineTwoToneIcon color="success" />
            </IconButton></> : 
            <>
            <IconButton aria-label="comment">
              <Clear color="Error" />
            </IconButton>
            </>}
          
            
        </ListItem>
     
    </List> */}
    </TabPanel>

    <TabPanel value="5">
      <div>
      <Search/>
        <InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Tapez un nom ..."
                    onChange={handlefilterIm}
                    />



      <TableContainer sx={{ height: 300}}  component={Paper} style={ulStyle}>
            <Table   size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow >
                  <TableCell style={Gb} size="medium" align="center">Client</TableCell>
                  <TableCell style={Gb} size="medium" align="center">Voiture</TableCell>
                  <TableCell style={Gb} size="medium" align="center"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

            
              {search.length !== 0 && open5 == true && (
          <>
                  {search.slice(0, 15).map((D) => (
                    
                    <TableRow
                    key={D.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {D.clientnom} {D.clientprenom}
                    </TableCell>
                    <TableCell align="justify"> {D.expertNom} : {D.expertPrenom} </TableCell>
                    <TableCell align="justify"> {D.marque} : {D.TypeV} </TableCell>
                    <TableCell style={Ce} align="justify"><button onClick={()=>{window.open(`Rapport/${D.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le Rapport</button></TableCell>
                  </TableRow>
              
              ))}
          </>
           )}

        {open5 ? <></> :
         <>
        
        
         {MiseAJ.map((MiseAJ) => (
                  <TableRow
                    key={MiseAJ.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {MiseAJ.userN} {MiseAJ.userPr}
                    </TableCell>
                    <TableCell style={Ce} align="justify">{MiseAJ.marque} =&gt; {MiseAJ.TypeV} </TableCell>
                    <TableCell align="justify">  <button onClick={()=>{window.open(`Mise-a-jour/${MiseAJ.ID}`, '_blank')}}  className='btnsC' variant="contained">Details...</button></TableCell>
                  </TableRow>
                ))}
        </>
        }

               
              </TableBody>
            </Table>
            </TableContainer>
      </div>

      
    </TabPanel>
   
</TabContext>
</Box>
    
  </div>
  
      </div>
      </div>
    )
}