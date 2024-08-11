import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { auth, db ,setDoc ,logoutUser ,loginUser } from "../../bdd/firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { NavLink  } from "react-router-dom";

import Sidebar from '../sidebar';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {onAuthStateChanged,sendPasswordResetEmail } from "firebase/auth";
import {doc,getDoc,collection, query, where, getDocs, orderBy} from "firebase/firestore";
import { Cancel, Search } from '@material-ui/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dialog, Grid, makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { AppBar, InputBase, alpha, Avatar, Chip } from '@material-ui/core';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import Link from '@mui/material/Link';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import Paper from '@mui/material/Paper';
import ClipLoader from "react-spinners/ClipLoader";
import { signupUser  } from "../../bdd/firebase";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import validation from "../Client/validation";
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import axios from 'axios';

const ulStyle = { width:'100%'  , backround: "none"}




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
const Gb ={
  boxShadow: '0 3px 5px rgb(192, 193, 194)',
}
const Ce = { marginLeft:'50%'}


export default function Gestion() {
  const [value, setValue] = React.useState(0);
  const [errMd, seterrMd] = useState();
  const [error, seterror] = useState();
  const [errorE, seterrorE] = useState();
  const [confirm , setconfirm] = useState(false);
  const [confirmEx , setconfirmEx] = useState(false);
  const [resetE , setresetE]=useState(false);
  const [admins , setAdmins]=useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [Mdpad , setMdpad]=useState('');
  const [token ,settoken] = useState("");
  const [email ,setemail] = useState("");

  const [NbrEx , setNbrEx] = useState(0);
  const [NbrAd , setNbrAd] = useState(0);
  const [User , setUser] = useState({});
  const [search, setsearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2 ] = useState(false);

  const [Experts, setExperts] = useState([]);

  const [AdminI , setAdminI]=useState({
    nom : '',
    prenom : '',
    agence : '',
    phone : '',
    email : '',
    password : '',
  });

  const [ExpertI , setExpertI]=useState({
    nom : '',
    prenom : '',
    agence : '',
    phone : '',
    email : '',
    password : '',
  })
  const [state ,setstate] = useState(false)

  const toggleBtn =(e) => {
      e.preventDefault();
    setstate(prevState => !prevState) ;
  }

  useEffect(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
          settoken(currentUser.accessToken);
          setemail(currentUser.email);
  
          const user = await getDoc(doc(db , "Users" , currentUser.uid ));
          setUser(user.data());
  
  
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
    
          const q = query(collection(db, "Users"), where("type", "==", 'admin'));
          var adm=[]
  
          const querySnapshot = await getDocs(q);
          var A = 0;
          querySnapshot.forEach((doc) => {
            try {
            A = A + 1;
            adm.push({
              ID :  doc.data().userId,
              fullname : doc.data().nom+" "+doc.data().prenom,
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
              
          setAdmins(adm);
          setNbrAd(A)
          
  
    }, []);

    const handlefilter = (e) => {
      setOpen(true);
      const searchWord = e.target.value;
      const newfilter = admins.filter((value) => {
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
    const handlefilterEx = (e) => {
      setOpen2(true);
      const searchWord = e.target.value;
      const newfilter = Experts.filter((value) => {
        return (
          value.nom.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.prenom.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      if (searchWord === "") {
        setsearch([]);
        setOpen2(false);
      } else {
        setsearch(newfilter);
      }
    };
    
    
  var Exp = [];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const history= useHistory();


     //============================= Controles =========================

     useEffect(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (auth.currentUser){
              const User = await getDoc(doc(db, "Users" , currentUser.uid));
              // if(User.data().type == 'expert'){ 
              // history.push('/expert') ;
              // window.location.reload('/expert');
              // }
              if(User.data().type == 'client'){
               history.push('/profil')
               window.location.reload('/profil');
              }
          }else if (!auth.currentUser){
            history.push('/')
          }
  
          });
      
      
    }, []);

    //  console.log(AdminI);
    //===========================================================================
    const [aja , setAja]=useState(true);
    const [ajb , setAjb]=useState(false);

    const [envoi, setEnvoi] = useState(false);

  // console.log(Experts);

    const handleFormSubmit = async () => {

      if(Mdpad == ''){
        seterrMd('Veillez saisire votre mot de passe !');
      }
      else{
      setconfirm(false);
      setEnvoi(true);
      signupUser(AdminI.email, AdminI.password).then(async(user) => {
          const userId = user._tokenResponse.localId;
          const infouser ={
              nom : AdminI.nom,
              prenom : AdminI.prenom,
              userId :userId,
              email: AdminI.email,
              phone: AdminI.phone,
              agence:AdminI.agence,
              type: "admin",
        
          }
          await setDoc(doc(db , "Users", userId), infouser)
                  .then(()=>{
                      setEnvoi(false);
                      logoutUser();
                      loginUser(User.email, Mdpad).then(async (UserCredential) => {
                        window.location.reload('/dashboard');
                      }).catch((error) => {
                        seterrMd('Une erreur est survenue veuillez vous reconnecter merci 😊')
                        setconfirm(true);
                        alert('Une erreur est survenue veuillez vous reconnecter merci 😊')
                        setTimeout(() => {
                          history.push('/connexion');
                          window.location.reload('/connexion')
                        }, 800);
                        
                      });

                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
         
        })
        .catch((error) => {
          console.log(error.message);
        });
      }

    }
    const AjouteAd = () =>{
      if( AdminI.nom !== '' &&
          AdminI.prenom !== '' &&
          AdminI.agence !== '' &&
          AdminI.phone !== '' &&
          !validation(AdminI).email &&
          !validation(AdminI).password){
            setconfirm(true);
      }else{
        seterror('Vous avez raté quelque champs 🤔')
      }
    }

    const handleFormSubmitEx = async () => {
      setconfirmEx(false)
      setEnvoi(true);
      signupUser(ExpertI.email, ExpertI.password).then(async(user) => {
          const userId = user._tokenResponse.localId;
          const infouser ={
              nom : ExpertI.nom,
              prenom : ExpertI.prenom,
              userId :userId,
              email: ExpertI.email,
              phone: ExpertI.phone,
              agence:ExpertI.agence,
              type: "expert",
              enligne: true,
              nbrV: 0,
          }
          await setDoc(doc(db , "Users", userId), infouser)
                  .then(()=>{
                      setEnvoi(false);
                      logoutUser();
                      loginUser(User.email, Mdpad).then(async (UserCredential) => {
                        window.location.reload('/dashboard');
                      }).catch((error) => {
                        seterrMd('Une erreur est survenue veuillez vous reconnecter merci 😊')
                        setconfirmEx(true);
                        alert('Une erreur est survenue veuillez vous reconnecter merci 😊')
                        setTimeout(() => {
                          history.push('/connexion');
                          window.location.reload('/connexion')
                        }, 800);
                      });
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
         
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    const AjouteEx = () =>{
      if( ExpertI.nom !== '' &&
          ExpertI.prenom !== '' &&
          ExpertI.agence !== '' &&
          ExpertI.phone !== '' &&
          !validation(ExpertI).email &&
          !validation(ExpertI).password){
            setconfirmEx(true);
      }else{
        seterrorE('Vous avez raté quelque champs 🤔')
      }
    }


    
const [values, setValues] = useState({
  password: "",
  password2: "",
});

const [errors, setErrors] = useState({});
const [passwb, setpasswb] = useState(false);


const handlechange = (event) =>{
  setErrors({});
  setpasswb(true);
  setValues({
      ...values,
      [event.target.name]: event.target.value,
  } );
 
      
  
  

};

const goprofil =() => {
  history.push(`/profil`);
  window.location.reload(`/profil`);
}

    const AjouteMdp = () =>{
      if (!validation(values).password && !validation(values).password2 )
      {
      setconfirm(true);
       }
    }

const handleFormSubmitPass = (event) =>{
event.preventDefault();


if (!validation(values).password && !validation(values).password2 )
  {
      let data = {
      idToken: token,
      password: values.password,
      returnSecureToken: true, 
  }
  try {
      console.log(data);
         axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA90T1zNlTE2klpwKX1AsOwKZxaK-xSrsM' , data).then( (res) => {
          logoutUser();
          loginUser(email, values.password).then( () => {
            history.push('/dashboard')
            window.location.reload('/dashboard');
          });
                     
                      
                  }).catch((err) => {
                      console.log(err) 
                      console.log(err.message) 
                      setErrors({message : "Une erreur c'est produit , essayer de se reconnecter SVP ; ou essayer de réinitialiser votre mot de passe avec votre email; Merci 😊"});
                      setconfirm(true);
                      setValues({
                          password: "",
                          password2: "",
                      });
                    });
                

  } catch (error) {
      console.log(error);
  } 
  }


};

function handleReset (e) {
  sendPasswordResetEmail(auth, email).then(() =>{
      setresetE(true);
      setTimeout(() => {
        setconfirm(false);
      }, 5000);
      // window.alert("check your emails");
  }).catch((error) => {
      window.alert("Cet email n'est pas valide");

  })}

  return (
    <>
    <Sidebar />
    <div class="container">
  <div  class="header3-container" >
    
      <div class="header">
    <h1 class="main-heading">{User.nom} {User.prenom}</h1>

    <span class="tag">Tel :{User.phone}</span>
    <br></br>
    <br></br>
    <br></br>
    <span class="tag">Agence :{User.agence}</span>

    <div class="stats"> 
      <span class="stat-module">
        Nombre d'admins : <span class="stat-number">{NbrAd}</span>
      </span>
      <span class="stat-module">
        Nombre d'experts : <span class="stat-number">{NbrEx}</span>
      </span>
  
    </div>
  </div>
    
  

  
</div>

<div class="overlay-header2"></div>

<div class="body">
  <img src="../assets/images/pro3.png" alt="profil pic" class="body-image" />
  <div class="u-clearfix"></div>


  {/* <div class="body-info"></div> */}


  <Box sx={{marginLeft:"5%" , width: '85%' , backgroundColor: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs allowScrollButtonsMobile variant='scrollable' centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Admins" {...a11yProps(0)} />
          <Tab label="Experts" {...a11yProps(1)} />
          <Tab label="Mot de passe" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div class="">

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
      {aja &&
      <div>
        <p>Add Admin </p>
      <AddCircleOutlinedIcon  sx={{fontSize: 50}} color="secondary" onClick={()=>{setAja(false); setAjb(true)}}  style={{ float : "right"}}/> 
      </div>
      }
      {ajb &&
      <div>
      <AssignmentReturnIcon  sx={{fontSize: 50}} color="secondary" onClick={()=>{setAja(true); setAjb(false)}}  style={{ float : "right"}}/> <p>Back To The List </p>
      </div>
      }

      </span>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        background : 'none',
      }}
    >



{aja &&
      
      <TableContainer sx={{ height: 300}}  component={Paper} style={ulStyle}>
      <Table   size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell style={Gb} size="small" align="center">Admin</TableCell>
            <TableCell style={Gb} size="small" align="center">phone</TableCell>
            {/* <TableCell style={Gb} size="small" align="center">Nbr V</TableCell> */}
            <TableCell style={Gb} size="small" align="center"> </TableCell>
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
              {/* <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell> */}
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
              </TableRow>
              
              ))}
          </>


        )}
    

        {open ? <></>:
      <>
        {admins.map((Clients) => (
            <TableRow
              key={Clients.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Clients.fullname}
              </TableCell>
              <TableCell align="justify">{Clients.phone}</TableCell>
              {/* <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell> */}
              <TableCell align="justify">  <button onClick={()=>{window.open(`client/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
            </TableRow>
          ))}
      </>  
      }

        

        </TableBody>
      </Table>
       </TableContainer>

    }

    


{ajb &&
<Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width : '70%'
          }}
        >
         
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
                <Typography variant='overline'>Nom</Typography>
                </Grid>
                <Grid xs={6}>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  onChange={(e)=>{setAdminI({...AdminI, nom:e.target.value}) ; seterror();}}
                  value={AdminI.nom}
                  id="firstName"
                  
                />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
              <Typography variant='overline'>Prenom</Typography>
              </Grid>
              <Grid xs={6}>

                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  onChange={(e)=>{setAdminI({...AdminI, prenom:e.target.value}); seterror();}}
                  value={AdminI.prenom}
                  autoComplete="family-name"
                />

              </Grid>

              </Grid>



              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
                <Typography variant='overline'>N Telephone</Typography>
                </Grid>
                <Grid xs={6}>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  onChange={(e)=>{setAdminI({...AdminI, phone:e.target.value}); seterror();}}
                  value={AdminI.phone}
                  id="firstName"
                  
                />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
              <Typography variant='overline'>Agence</Typography>
              </Grid>
              <Grid xs={6}>

                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={(e)=>{setAdminI({...AdminI, agence:e.target.value}); seterror();}}
                  value={AdminI.agence}
                  name="lastName"
                  autoComplete="family-name"
                />

              </Grid>

              </Grid>
              <Grid item  xs={12}   container>
                <Grid xs={6} >
              <Typography variant='overline'>email</Typography>
              </Grid>
              <Grid xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={(e)=>{setAdminI({...AdminI, email:e.target.value}); seterror();}}
                  value={AdminI.email}
                  name="email"
                  autoComplete="email"
                />
                {validation(AdminI).email && (<p className='error'> {validation(AdminI).email} </p>)}
                </Grid>
              </Grid>
              <Grid item xs={12}  container>
              <Grid xs={6} >
              <Typography variant='overline'>password</Typography>
              </Grid>
              <Grid xs={6}>
                <TextField
                  required
                  name="password"
                  type={state ? "" : "password"}
                  fullWidth
                  onChange={(e)=>{setAdminI({...AdminI, password:e.target.value}); seterror();}}
                  value={AdminI.password}
                  id="password"
                  autoComplete="new-password"
                />
                {state ? <AiOutlineEyeInvisible style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} /> :
                                        <AiOutlineEye style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} />  }
                                    
                                {validation(AdminI).password && (<p className='error'>{validation(AdminI).password}</p>)}

                </Grid>
              </Grid>
             
            </Grid>
            {confirm ? 
            // <p className="succès">L'admin a été ajouté avec succès</p> 
            <Dialog open={confirm} >
            <DialogTitle>Confirmatiom</DialogTitle>
            <DialogContent>
              <DialogContentText>
                veuillez saisire votre mot de passe pour confirmer l'ajout.
              </DialogContentText>
              <TextField
                
                margin="dense"
                id="name"
                label="mot de passe"
                type={state ? "" : "password"}
                fullWidth
                variant="standard"
                value={Mdpad}
                onChange={(e)=>{ setMdpad(e.target.value)}}
              />
              {state ? <AiOutlineEyeInvisible style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} /> :
                                        <AiOutlineEye style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} />  }
            </DialogContent>
            <DialogActions>
              {errMd &&(<p className='error'> {errMd} </p>)}
              <Button sx={{backgroundColor: "skyblue"}} onClick={handleFormSubmit}>Confirmer</Button>
              <Button sx={{backgroundColor: "red"}} onClick={()=>{setconfirm(false)}}>Annuler</Button>
            </DialogActions>
          </Dialog>
            : 
            <></>} 
            
            <button className='btns33' onClick={()=>{AjouteAd()}} type="button" >
                      Ajouter
                        { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
                    </button>
                    {error &&(<p className='error'> {error} </p>)}
            <Grid container justifyContent="flex-end">
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>

}


 
    </Paper></div>
    </TabPanel>

      <TabPanel value={value} index={1}>
       <div class="">

        <Search />
        <InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Cherchez des utilisateur..."
                    onChange={handlefilterEx}
                    />

      <span class="card-more">
      {aja &&
      <div>
        <p>Add Expert </p>
      <AddCircleOutlinedIcon  sx={{fontSize: 50}} color="secondary" onClick={()=>{setAja(false); setAjb(true)}}  style={{ float : "right"}}/> 
      </div>
      }
      {ajb &&
      <div>
      <AssignmentReturnIcon  sx={{fontSize: 50}} color="secondary" onClick={()=>{setAja(true); setAjb(false)}}  style={{ float : "right"}}/> <p>Back To The List </p>
      </div>
      }

      </span>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        background : 'none',
      }}
    >



{aja &&
      
      <TableContainer sx={{ height: 300}}  component={Paper} style={ulStyle}>
      <Table   size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell style={Gb} size="small" align="center">Expert</TableCell>
            <TableCell style={Gb} size="small" align="center">phone</TableCell>
            <TableCell style={Gb} size="small" align="center">Constats attribee</TableCell>
            <TableCell style={Gb} size="small" align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {search.length !== 0 && open2 == true && (
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
              <TableCell align="justify">  <button onClick={()=>{window.open(`Expert/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
              </TableRow>
              
              ))}
          </>
                
   
                
              
         
            

        )}
    

        {open2 ? <></>:
      <>
        {Experts.map((Clients) => (
            <TableRow
              key={Clients.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Clients.fullname}
              </TableCell>
              <TableCell align="justify">{Clients.phone}</TableCell>
              <TableCell style={Ce} align="justify">{Clients.nbrV}</TableCell>
              <TableCell align="justify">  <button onClick={()=>{window.open(`Expert/${Clients.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le profil</button></TableCell>
            </TableRow>
          ))}
      </>  
      }

        

        </TableBody>
      </Table>
       </TableContainer>

    }

    


{ajb &&
<Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width : '70%'
          }}
        >
         
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
                <Typography variant='overline'>Nom</Typography>
                </Grid>
                <Grid xs={6}>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  onChange={(e)=>{setExpertI({...ExpertI, nom:e.target.value}); seterrorE();}}
                  value={ExpertI.nom}
                  id="firstName"
                  
                />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
              <Typography variant='overline'>Prenom</Typography>
              </Grid>
              <Grid xs={6}>

                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  onChange={(e)=>{setExpertI({...ExpertI, prenom:e.target.value}); seterrorE();}}
                  value={ExpertI.prenom}
                  autoComplete="family-name"
                />

              </Grid>

              </Grid>



              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
                <Typography variant='overline'>N Telephone</Typography>
                </Grid>
                <Grid xs={6}>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  onChange={(e)=>{setExpertI({...ExpertI, phone:e.target.value}); seterrorE();}}
                  value={ExpertI.phone}
                  id="firstName"
                  
                />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid xs={6}>
              <Typography variant='overline'>Agence</Typography>
              </Grid>
              <Grid xs={6}>

                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={(e)=>{setExpertI({...ExpertI, agence:e.target.value})}}
                  value={ExpertI.agence}
                  name="lastName"
                  autoComplete="family-name"
                />

              </Grid>

              </Grid>
              <Grid item  xs={12}   container>
                <Grid xs={6} >
              <Typography variant='overline'>email</Typography>
              </Grid>
              <Grid xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={(e)=>{setExpertI({...ExpertI, email:e.target.value}); seterrorE();}}
                  value={ExpertI.email}
                  name="email"
                  autoComplete="email"
                />
                {validation(ExpertI).email &&(<p className='error'> {validation(ExpertI).email}</p>)}
                </Grid>
              </Grid>
              <Grid item xs={12}  container>
              <Grid xs={6} >
              <Typography variant='overline'>password</Typography>
              </Grid>
              <Grid xs={6}>
                <TextField
                  required
                  
                  name="password"
                  type={state ? "" : "password"}
                  fullWidth
                  onChange={(e)=>{setExpertI({...ExpertI, password:e.target.value}); seterrorE();}}
                  value={ExpertI.password}
                  id="password"
                  autoComplete="new-password"
                /> {state ? <AiOutlineEyeInvisible style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} /> :
                                        <AiOutlineEye style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} />  }
                                {validation(ExpertI).password &&(<p className='error'> {validation(ExpertI).password}</p>)}

                </Grid>
              </Grid>
             
            </Grid>
            {confirmEx ? 
            // <p className="succès">L'expert a été ajouté avec succès</p> onClose={()=>{setconfirmEx(false)}}
            <Dialog open={confirmEx} >
            <DialogTitle>Confirmatiom</DialogTitle>
            <DialogContent>
              <DialogContentText>
                veuillez saisire votre mot de passe pour confirmer l'ajout.
              </DialogContentText>
              <TextField
                
                margin="dense"
                id="name"
                label="mot de passe"
                type="password"
                fullWidth
                variant="standard"
                value={Mdpad}
                onChange={(e)=>{ setMdpad(e.target.value)}}
              />
            </DialogContent>
            <DialogActions>
              <Button sx={{backgroundColor: "skyblue"}} onClick={handleFormSubmitEx}>Confirmer</Button>
              <Button sx={{backgroundColor: "red"}} onClick={()=>{setconfirmEx(false)}}>Annuler</Button>

            </DialogActions>
          </Dialog>
            
            : 
            <></>} 
            <button className='btns33' onClick={()=>{AjouteEx()}} type="button" >
                       Ajouter
                        { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
                    </button>
                    {errorE &&(<p className='error'> {errorE} </p>)}
            <Grid container justifyContent="flex-end">
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>

}

 
    </Paper>
    </div>

       
      </TabPanel>


      <TabPanel value={value} index={2}>
       <div class="">
      
            <Grid sm={12} xs={12}  >


            <div  class="headerMd-container" >
    
              <div class="headerMd">
              <div className="">      
                        <Typography align='center'  variant="h4" display="block" gutterBottom={true} > changer votre mot de passe </Typography> 
                        <h3 className="titre">Saisissez votre nouveau mot de passe </h3>
                        <p className="text">Créez un mot de passe d’au moins 8 caractères.
                        Le mot de passe doit inclure au moins 1 lettre, 1 
                        chiffre et 1 caractère spécial (!@#$%^&*)</p>

                       <input className="Input" type= {state ? "text" : "password"} name="password" placeholder="Mot de passe" value={values.password} onChange={handlechange} />
                        <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button>
                        {passwb ? <>{validation(values).password && <p className="error">{validation(values).password}</p>} </>:<></>}



                        <input className="Input1" type= {state ? "text" : "password"} name="password2" placeholder="Confirmation de mot de passe" value={values.password2} onChange={handlechange} />
                         
                            <button className='Btn' onClick={toggleBtn}>
                                    {state ? <AiOutlineEyeInvisible /> :
                                    <AiOutlineEye/>  }
                                </button>
                                {passwb ? <>{validation(values).password2 && <p className="error">{validation(values).password2}</p>} </>:<></>}    


                        {confirm ? 
            // <p className="succès">L'admin a été ajouté avec succès</p> 
            <Dialog open={confirm} >
            <DialogTitle>Confirmatiom</DialogTitle>
            <DialogContent>
            
              <DialogContentText>
                veuillez saisire votre mot de passe actuel.
              </DialogContentText>
              <TextField
                
                margin="dense"
                id="name"
                label="mot de passe"
                type={state ? "" : "password"}
                fullWidth
                variant="standard"
                value={Mdpad}
                onChange={(e)=>{ setMdpad(e.target.value)}}
              />
              {state ? <AiOutlineEyeInvisible style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} /> :
                                        <AiOutlineEye style={{marinLeft: "5px" , marginTop: "5px"}} onClick={toggleBtn} />  }

{errors.message && <p className="error">{errors.message}</p>}

<PopupState variant="popover" popupId="demo-popup-popover" style={{marginTop : "10%"}}>
      {(popupState) => (
        <div>
        <div  style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13}}>
          <span style={{fontSize: 13,color:'#696969'}}>Mot de passe oublié? </span>
          <NavLink  {...bindTrigger(popupState)} to="/Gestion" exact className="">
            <Typography  style={{fontSize: 13, color:"#19A8d9"}}>Réinitialiser</Typography>
          </NavLink>
        </div>

          {/* <Typography variant='overline' {...bindTrigger(popupState)}>
            Mot de passe oubliee?  Reset it here ...
          </Typography> */}
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>  
          {resetE ? 
          <>
          <Card sx={{ marginLeft: "5%", width : '600 px' , height : '500 px'}}>
            <CardContent>
            <Typography  style={{fontSize: 13, color:"#19A8d9"}}>Vérifier votre boîte email, vous trouverez un email de réinitialisation ;</Typography>
            <Typography  style={{fontSize: 13, color:"#19A8d9"}}> N'oubliez pas de vérifiez les spams 😊 .</Typography>

            <CardActions>
      </CardActions>
      </CardContent>
   
    </Card>
          </>
          :
          <>  <Card sx={{  width : '600 px' , height : '500 px'}}>
      <CardContent>
      <input
         className="inputt"
          placeholder="Email..."
          value={email}
        /> 
           <CardActions>
        <Button size="small" onClick={()=>{handleReset()}}> envoyer un email de réinitialisation </Button>
      </CardActions>
      </CardContent>
   
    </Card>
          </>}    
      
        
        </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
            </DialogContent>
            <DialogActions>
              {errMd &&(<p className='error'> {errMd} </p>)}
              <Button sx={{backgroundColor: "skyblue"}} onClick={handleFormSubmitPass}>Confirmer</Button>
              <Button sx={{backgroundColor: "red"}} onClick={()=>{setconfirm(false)}}>Annuler</Button>
            </DialogActions>
          </Dialog>
            : 
            <></>} 
                        <div>
                            <Button variant="contained" sx={{marginTop : '3%'}} onClick={()=>{AjouteMdp()}} >Terminé 
                            {/* { envoi ? <div  >
                                                        <ClipLoader size={15}  />
                                                        </div> 
                                                    : <></>} */}
                            </Button>
                        </div>
            </div>
          </div>

          </div>
            </Grid>
  
       </div>

       
      </TabPanel>
    </Box>
  
</div>

    </div>




    
    </>
  );
}


