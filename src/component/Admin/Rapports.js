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
  onSnapshot,
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
import { RiAppleLine } from 'react-icons/ri';
import { GiTakeMyMoney } from 'react-icons/gi';
import { MdNewReleases } from 'react-icons/md';
import { BsPatchExclamation } from 'react-icons/bs';
import { BsPatchCheck } from 'react-icons/bs';
import { GiPayMoney } from 'react-icons/gi';

import { FcMoneyTransfer } from 'react-icons/fc';





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

export default function Rapports() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const history = useHistory()
const [RappNT, setRappNT] = useState([]);
const [RappT, setRappT] = useState([]);
const [RappR, setRappR] = useState([]);
const [RappF, setRappF] = useState([]);


const [Remboursee, setRemboursee] = useState([]);
const [Constat, setConstat] = useState([]);
const [Info, setInfo] = useState({});
const [search, setsearch] = useState([]);
const [open, setOpen] = useState(false);
const [openN, setOpenN] = useState(false);
const [openR , setOpenR] = useState(false);
const [openF , setOpenF] = useState(false);




useEffect(() => {
  onAuthStateChanged(auth,async (currentUser) => {
      if (auth.currentUser){
        const infos = await getDoc(doc(db, "Users", currentUser.uid));
        setInfo(infos.data());
        


        //, where("rembourse" , "!=" , true)
        const DD = collection(db, "Rapport");
        const q = query(DD, where("loading", "==", false ));
        onSnapshot(q , (documents) =>{
            let rapp = [];
            documents.forEach((doc)=>{
                var t = new Date(1970, 0, 2); // Epoch
                t.setSeconds(doc.data().DateAc.seconds);
                const t9 = t.toISOString();
                const dateAc = t9.slice(0, 10);

                rapp.push({...doc.data() , ID:doc.id , AC_date:dateAc});
                
            })
            setRappNT(rapp); 
        })

      

        const q2 = query(collection(db, "Rapport"), where("loading", "==", true));
        onSnapshot(q2 , (documents) =>{
            let rapp2 = [];
            documents.forEach((doc)=>{

                var t = new Date(1970, 0, 2); // Epoch
                t.setSeconds(doc.data().DateAc.seconds);
                const t9 = t.toISOString();
                const dateAc = t9.slice(0, 10);

                rapp2.push({...doc.data() , ID:doc.id , AC_date:dateAc});
            })
            setRappT(rapp2); 
        })




        const qR = query(collection(db, "Rapport"), where("loading" , "in" , ['Card' , 'cash']) );
                onSnapshot(qR , (documents) =>{
            let rappR = [];
            documents.forEach((doc)=>{
                var t = new Date(1970, 0, 2); // Epoch
                t.setSeconds(doc.data().DateAc.seconds);
                const t9 = t.toISOString();
                const dateAc = t9.slice(0, 10);

                rappR.push({...doc.data() , ID:doc.id , AC_date:dateAc});
            })
            setRappR(rappR); 
        })



        const qF = query(collection(db, "Rapport"), where("loading" , "==" ,'fait') );
        onSnapshot(qF , (documents) =>{
          let rappF = [];
          documents.forEach((doc)=>{
              var t = new Date(1970, 0, 2); // Epoch
              t.setSeconds(doc.data().DateAc.seconds);
              const t9 = t.toISOString();
              const dateAc = t9.slice(0, 10);

              rappF.push({...doc.data() , ID:doc.id , AC_date:dateAc});
          })
          setRappF(rappF); 
})


      }
      

      });
}, []);




  
  const handlefilterR = (e) => {
    setOpenR(true);
    const searchWord = e.target.value;
    const newfilter = RappR.filter((value) => {
      return (
        value.clientnom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.clientprenom.toLowerCase().includes(searchWord.toLowerCase()) 
      );
    });
    if (searchWord === "") {
      setsearch([]);
      setOpenR(false);
    } else {
      setsearch(newfilter);
    }
  };

  const handlefilterF = (e) => {
    setOpenR(true);
    const searchWord = e.target.value;
    const newfilter = RappF.filter((value) => {
      return (
        value.clientnom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.clientprenom.toLowerCase().includes(searchWord.toLowerCase()) 
      );
    });
    if (searchWord === "") {
      setsearch([]);
      setOpenF(false);
    } else {
      setsearch(newfilter);
    }
  };

  const handlefilterT = (e) => {
    setOpen(true);
    const searchWord = e.target.value;
    const newfilter = RappT.filter((value) => {
      return (
        value.clientnom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.clientprenom.toLowerCase().includes(searchWord.toLowerCase()) 
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
    const newfilter = RappNT.filter((value) => {
      return (
        value.clientnom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.clientprenom.toLowerCase().includes(searchWord.toLowerCase()) 
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
          <Tab label="Non Traitee" {...a11yProps(0)} icon={<BsPatchExclamation color='red' size={23}/>} sx={{fontSize: "11px"}} />
          <Tab label="Traitee" {...a11yProps(1)} icon={<BsPatchCheck color='orange' size={23}/>} sx={{fontSize: "11px"}} />
          <Tab label="A Remboursee" {...a11yProps(2)} icon={<GiPayMoney color='blue' size={23}/>} sx={{fontSize: "11px"}} />
          <Tab label="Reglee" {...a11yProps(3)} icon={<GiTakeMyMoney color='green' size={23}/>} sx={{fontSize: "11px"}}/>
          
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
                    {search.slice(0, 15).map((RappNT,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)} key={RappNT.ID}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    key={RappNT.ID}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {RappNT.clientnom} {RappNT.clientprenom}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{RappNT.marque} : {RappNT.TypeV}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography>
                    L'accident a eu lieu le {RappNT.AC_date}    voiture : {RappNT.marque} {RappNT.TypeV}                       <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappNT.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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
                    
              {RappNT.map((RappNT,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)} key={RappNT.ID}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    key={RappNT.ID}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {RappNT.clientnom} {RappNT.clientprenom}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{RappNT.marque} : {RappNT.TypeV}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography>
                     L'accident a eu lieu le {RappNT.AC_date}   voiture : {RappNT.marque} {RappNT.TypeV}                       <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappNT.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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
                    {search.slice(0, 15).map((RappT,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {RappT.clientnom} {RappT.clientprenom} 
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{RappT.marque} : {RappT.TypeV} </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                            <Typography >
                            L'accident a eu lieu le {RappT.AC_date}    voiture : {RappT.marque} {RappT.TypeV}                      <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappT.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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
                    
              {RappT.map((RappT,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {RappT.clientnom} {RappT.clientprenom} 
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{RappT.marque} : {RappT.TypeV} </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{backgroundColor: "grey"}}>
                    <Typography >
                    L'accident a eu lieu le {RappT.AC_date}    voiture : {RappT.marque} {RappT.TypeV}                      <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappT.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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
                    {search.slice(0, 15).map((RappR,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {RappR.clientnom} {RappR.clientprenom}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{RappR.marque} : {RappR.TypeV}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                          <Typography>
                          Type de paiment : {RappR.loading};
                          L'accident a eu lieu le {RappR.AC_date}  voiture {RappR.marque} {RappR.TypeV}                       <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappR.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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
                    
              {RappR.map((RappR,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {RappR.clientnom} {RappR.clientprenom}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{RappR.marque} : {RappR.TypeV}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                          <Typography>
                            Type de paiment : {RappR.loading};
                          L'accident a eu lieu le {RappR.AC_date}  voiture {RappR.marque} {RappR.TypeV}                       <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappR.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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

      <TabPanel value={value} index={3}>
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
                            onChange={handlefilterF}
                            />





              <Table   size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    
                  </TableRow>
                </TableHead>
                
                <TableBody  >

                {search.length !== 0 && openF == true && (
                  <>
                    {search.slice(0, 15).map((RappF,index) => (
                        
                        <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                         <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {RappF.clientnom} {RappF.clientprenom}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{RappF.marque} : {RappF.TypeV}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                          <Typography>
                          L'accident a eu lieu le {RappF.AC_date}  voiture {RappF.marque} {RappF.TypeV}                       <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappF.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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
                    
              {RappF.map((RappF,index) => (
                  
                  <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {RappF.clientnom} {RappF.clientprenom}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{RappF.marque} : {RappF.TypeV}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: "grey"}}>
                          <Typography>
                          L'accident a eu lieu le {RappF.AC_date}  voiture {RappF.marque} {RappF.TypeV}                       <button className='btnsC' onClick={()=>{ window.open(`Rapport/${RappF.ID}`,'_blanck')}} variant="contained">Visualiser le Rapport</button>
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






