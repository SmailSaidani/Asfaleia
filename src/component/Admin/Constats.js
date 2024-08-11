import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Traitee from './Traitee';
import Sidebar from '../sidebar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ulStyle = { width:'85%' , marginLeft : '10%' , borderRadius: "10%" ,}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Constats() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const history = useHistory()
const [Constats, setConstats] = useState([]);
const [Remboursee, setRemboursee] = useState([]);
const [Constat, setConstat] = useState([]);
const [Info, setInfo] = useState({});


var cli = [];
var con = [];
var REM = [];


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


        
        const q = query(collection(db, "Constat"), where("loading", "==", true ) , where("rembourse" , "!=" , true));

        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          try {
            // console.log(doc.data()); 
            var t = new Date(1970, 0, 0); // Epoch
            t.setSeconds(doc.data().dateAc.seconds);
            const t9 = t.toISOString();
            const dateAc = t9.slice(0, 10);
          cli.push({
            ID: doc.id,
            Ncontrat :  doc.data().Ncontrat,
            fullname : doc.data().A_nom+' '+doc.data().A_prenom,
            Fname : doc.data().B_nom+' '+doc.data().B_prenom,
            A_nom: doc.data().A_nom,
            A_prenom:doc.data().A_prenom,
            B_nom: doc.data().B_nom,
            B_prenom: doc.data().B_prenom,
            AC_date : dateAc,
            A_CarTyp : doc.data().A_type,
            B_CarTyp : doc.data().B_CarTyp
          });
          
          
          } catch (error) {
            console.log(error);
          }
         
         
        });
            
        setConstats(cli);






        const q2 = query(collection(db, "Constat"), where("loading", "==", false));

        const querySnapshot2 = await getDocs(q2);
        
        querySnapshot2.forEach((doc) => {
          try {
            var t = new Date(1970, 0, 0); // Epoch
           t.setSeconds(doc.data().dateAc.seconds);
           const t9 = t.toISOString();
           const dateAc = t9.slice(0, 10);
          con.push({
            ID: doc.id,
            Ncontrat :  doc.data().Ncontrat,
            fullname : doc.data().A_nom+' '+doc.data().A_prenom,
            Fname : doc.data().B_nom+' '+doc.data().B_prenom,
            A_nom: doc.data().A_nom,
            A_prenom:doc.data().A_prenom,
            B_nom: doc.data().B_nom,
            B_prenom: doc.data().B_prenom,
            AC_date : dateAc,
            A_CarTyp : doc.data().A_type,
            B_CarTyp : doc.data().B_CarTyp

          });
          
          
          } catch (error) {
            console.log(error);
          }
         
         
        });

        setConstat(con);





        const qR = query(collection(db, "Constat"), where("rembourse", "==", true));

        const querySnapshotR = await getDocs(qR);
        
        querySnapshotR.forEach((doc) => {
          try {
            var t = new Date(1970, 0, 0); // Epoch
           t.setSeconds(doc.data().dateAc.seconds);
           const t9 = t.toISOString();
           const dateAc = t9.slice(0, 10);
          REM.push({
            ID: doc.id,
            Ncontrat :  doc.data().Ncontrat,
            fullname : doc.data().A_nom+' '+doc.data().A_prenom,
            Fname : doc.data().B_nom+' '+doc.data().B_prenom,
            A_nom: doc.data().A_nom,
            A_prenom:doc.data().A_prenom,
            B_nom: doc.data().B_nom,
            B_prenom: doc.data().B_prenom,
            AC_date : dateAc,
            A_CarTyp : doc.data().A_type,
            B_CarTyp : doc.data().B_CarTyp

          });
          
          
          } catch (error) {
            console.log(error);
          }
         
         
        });

        
        setRemboursee(REM);
      }
      else{
        history.push('/')
      }

      });
}, []);


 
  const [search, setsearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [openN, setOpenN] = useState(false);
  const [openR , setOpenR] = useState(false);

  
  const handlefilterR = (e) => {
    setOpenR(true);
    const searchWord = e.target.value;
    const newfilter = Remboursee.filter((value) => {
      return (
        value.A_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.A_prenom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_prenom.toLowerCase().includes(searchWord.toLowerCase()) 
      );
    });
    if (searchWord === "") {
      setsearch([]);
      setOpenR(false);
    } else {
      setsearch(newfilter);
    }
  };

  const handlefilterT = (e) => {
    setOpen(true);
    const searchWord = e.target.value;
    const newfilter = Constats.filter((value) => {
      return (
        value.A_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.A_prenom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.B_prenom.toLowerCase().includes(searchWord.toLowerCase()) 
      );
    });
    if (searchWord === "") {
      setsearch([]);
      setOpen(false);
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

      const [expanded, setExpanded] = React.useState(false);

      const handleChange11 = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };


  return (
    <>
    <Sidebar/>
    <Box sx={{marginLeft:"5%" , width: '85%' , backgroundColor: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Non Traitee" {...a11yProps(0)} />
          <Tab label="Traitee" {...a11yProps(1)} />
          <Tab label="Remboursee" {...a11yProps(2)} />
          
        </Tabs>
      </Box>
       
      <TabPanel value={value} index={0}>
          <>
                <div className='ConsTab'>
        
              <TableContainer sx={{ height: 300}} component={Paper} style={ulStyle}>
              <Search/>
              <InputBase
                                  type="text"
                                  name="recherche"
                                  id="recherche"
                                  className='seaInput'
                                  placeholder="Tapez un nom ..."
                                  onChange={handlefilterNT}
                                  
                                  />
              <Table sx={{ minWidth: 400 }}   size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
        
                {search.length !== 0 && openN == true && (
                  <>
                    {search.slice(0, 15).map((Constat,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {Constat.fullname}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{Constat.Fname}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography>
                    L'accident a eu lieu le {Constat.AC_date}    entre une {Constat.A_CarTyp}  et une {Constat.B_CarTyp}                       <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                        
                      
                    ))}
                    
                  </>
                )}


              {openN ? <></> :
              <>
               <Accordion  >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Client
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Adversaire</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                   

                    </Typography>

                  </AccordionDetails>
                </Accordion>
                    
              {Constat.map((Constat,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {Constat.fullname}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{Constat.Fname}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography>
                    L'accident a eu lieu le {Constat.AC_date}    entre une {Constat.A_CarTyp}  et une {Constat.B_CarTyp}                       <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                    
                  ))}
  
              </>
              }
                

           
        
                  
                </TableBody>
              </Table>
            </TableContainer>
            </div>
          </>
      </TabPanel>

      <TabPanel value={value} index={1}>
         <>
        <div className='ConsTab'>
        <TableContainer   sx={{ height: 300}} component={Paper} style={ulStyle}>
        <Search/>
        <InputBase
                            type="text"
                            name="recherche"
                            id="recherche"
                            className='seaInput'
                            placeholder="Tapez un nom ..."
                            onChange={handlefilterT}
                            />





              <Table   size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    
                  </TableRow>
                </TableHead>
                
                <TableBody  >

                {search.length !== 0 && open == true && (
                  <>
                    {search.slice(0, 15).map((Constats,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {Constats.fullname}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{Constats.Fname}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                          <Typography>
                          L'accident a eu lieu le {Constats.AC_date}    entre une {Constats.A_CarTyp}  et une {Constats.B_CarTyp}                       <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                          
                        
                      
                    ))}
                    
                  </>
                )}

                {open ? <></> :
              <>
               <Accordion  >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Client
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Adversaire</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                   

                    </Typography>

                  </AccordionDetails>
                </Accordion>
                    
              {Constats.map((Constat,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {Constat.fullname}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{Constat.Fname}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography >
                    L'accident a eu lieu le {Constat.AC_date}    entre une {Constat.A_CarTyp}  et une {Constat.B_CarTyp}                       <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                    
                  ))}
  
              </>
              }
                </TableBody>
              </Table>
            </TableContainer>
        </div>
        </>
      </TabPanel>

      <TabPanel value={value} index={2}>
         <>
        <div className='ConsTab'>
        <TableContainer   sx={{ height: 300}} component={Paper} style={ulStyle}>
        <Search/>
        <InputBase
                            type="text"
                            name="recherche"
                            id="recherche"
                            className='seaInput'
                            placeholder="Tapez un nom ..."
                            onChange={handlefilterR}
                            />





              <Table   size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    
                  </TableRow>
                </TableHead>
                
                <TableBody  >

                {search.length !== 0 && openR == true && (
                  <>
                    {search.slice(0, 15).map((Remboursee,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {Remboursee.fullname}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{Remboursee.Fname}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                          <Typography>
                          L'accident a eu lieu le {Remboursee.AC_date}    entre une {Remboursee.A_CarTyp}  et une {Remboursee.B_CarTyp}                       <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                          
                        
                      
                    ))}
                    
                  </>
                )}

                {openR ? <></> :
              <>
               <Accordion  >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Client
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Adversaire</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                   

                    </Typography>

                  </AccordionDetails>
                </Accordion>
                    
              {Remboursee.map((Constat,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {Constat.fullname}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{Constat.Fname}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography >
                    L'accident a eu lieu le {Constat.AC_date}    entre une {Constat.A_CarTyp}  et une {Constat.B_CarTyp}                       <button className='btnsC' onClick={()=>{ window.open(`constat/${Constat.ID}`,'_blanck')}} variant="contained">Visualiser le constat</button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                    
                  ))}
  
              </>
              }
                </TableBody>
              </Table>
            </TableContainer>
        </div>
        </>
      </TabPanel>

    </Box>
    
    </>
  );
}






