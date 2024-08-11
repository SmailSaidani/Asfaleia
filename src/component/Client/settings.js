import React, { useEffect } from 'react'
import '../../index.css'
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useState } from 'react';
import validation from "./validation";
import axios from 'axios';
import { NavLink  } from "react-router-dom";

import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import { loginUser  } from "../../bdd/firebase";

import Sidebar from './Sidebar'

import { db, auth ,logoutUser } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import { getDoc,doc } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Dialog } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import ArticleIcon from '@mui/icons-material/Article';
import { ExitToApp, Person, Settings ,Delete , CloudDownload} from '@material-ui/icons';
import LockIcon from '@mui/icons-material/Lock';

export default function SettingsP() {
let history = useHistory();


const [state ,setstate] = useState(false);
const [token ,settoken] = useState("");
const [email ,setemail] = useState("");
const [Mdpad , setMdpad]=useState('');
const [errMd, seterrMd] = useState();


useEffect(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
            
          settoken(currentUser.accessToken);
          setemail(currentUser.email);
        }

        });
    
    
  }, []);

    
const toggleBtn =(e) => {
    e.preventDefault();
  setstate(prevState => !prevState) ;
}


const [values, setValues] = useState({
    password: "",
    password2: "",
});

const [errors, setErrors] = useState({});
const [passwb, setpasswb] = useState(false);
const [confirm , setconfirm] = useState(false);


const handlechange = (event) =>{
    setErrors({});
    setpasswb(true);
    setValues({
        ...values,
        [event.target.name]: event.target.value,
    } );
   
        
    
    

};



const AjouteMdp = () =>{
  if (!validation(values).password && !validation(values).password2 )
  {
  setconfirm(true);
   }
}

const handleFormSubmit = (event) =>{
event.preventDefault();


if (!validation(values).password && !validation(values).password2 )
    {
        let data = {
        idToken: token,
        password: values.password,
        returnSecureToken: true, 
    }
    try {
        
           axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA90T1zNlTE2klpwKX1AsOwKZxaK-xSrsM' , data).then( (res) => {

            window.location.reload('/profil');
            loginUser(email, data.password).then( () => {
            history.push('/profil');
            window.location.reload('/profil');
            });
                       
                        
                    }).catch((err) => {
                        console.log(err) 
                        console.log(err.message) 
                        setErrors({message : "Une erreur c'est produit , essayer de se reconnecter SVP ; ou essayer de réinitialiser votre mot de passe avec votre email; Merci 😊"});
                        
                      });
                  
 
    } catch (error) {
        console.log(error);
    } 
    }
// if (!errors.password2 && !errors.password && !errors.code){
   


// }else{
//     setValues({
//         password: "",
//         password2: "",
//     });
// }

};


const [resetE , setresetE]=useState(false);
   
function handleReset (e) {
  
  sendPasswordResetEmail(auth, email).then(() =>{
      setresetE(true);
      // window.alert("check your emails");
  }).catch((error) => {
      window.alert("Cet email n'est pas valide");
  })}
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
            <Grid className='profresp' item sm={4} ><Sidebar/></Grid>


            <Grid item sm={7} xs={12} spacing={2}>
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
            <section class="subscribe_section layout_padding">
            <div class="container" style={{ borderRadius: "15px 70px" , width: "80%" ,height: "60%" , marginTop: "-4%"}}>
            
            <div class="box">
            <div class="row">
            <div class="col-md-8 mx-auto">
            <div class="subscribe_form ">

            <div className="contenu">
                        
                        
                        <Typography align='center'  variant="h5" display="block" gutterBottom={true} ><LockIcon /> changer votre mot de passe </Typography> 
                        <h3 className="titre">Saisissez votre nouveau mot de passe </h3>
                        <p className="text">Créez un mot de passe d’au moins 8 caractères.
                        Le mot de passe doit inclure au moins 1 lettre, 1 
                        chiffre et 1 caractère spécial (!@#$%^&*)</p>
                       {/*<input className="Input" type="password" name="email"  placeholder="Nouveau mot de passe  " />*/ } 
                       <input className="Input" type= {state ? "text" : "password"} name="password" placeholder="Mot de passe" value={values.password} onChange={handlechange} />

                                <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button>
                        {passwb ? <>{validation(values).password && <p className="error">{validation(values).password}</p>} </>:<></>}
                         {/* {errors.password && <p className="error">{errors.password}</p>}     */}


                        {/* <input className="Input1" type="password" name="email"  placeholder="Confirmer mot de passe  " /> */}

                        <input className="Input1" type= {state ? "text" : "password"} name="password2" placeholder="Confirmation de mot de passe" value={values.password2} onChange={handlechange} />
                         
                            <button className='Btn' onClick={toggleBtn}>
                                    {state ? <AiOutlineEyeInvisible /> :
                                    <AiOutlineEye/>  }
                                </button>
                                {passwb ? <>{validation(values).password2 && <p className="error">{validation(values).password2}</p>} </>:<></>}    

                        {/* {errors.password2 && <p className="error">{errors.password2}</p>}  */}


                        <div>
                            
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
              <Button sx={{backgroundColor: "skyblue"}} onClick={handleFormSubmit}>Confirmer</Button>
              <Button sx={{backgroundColor: "red"}} onClick={()=>{setconfirm(false)}}>Annuler</Button>
            </DialogActions>
          </Dialog>
            : 
            <></>} 
                            <Button variant="contained" sx={{marginTop : '3%'}} onClick={()=>{AjouteMdp()}}>Terminé </Button>
                            {errors.message && <p className="error">{errors.message}</p>}

                            <PopupState variant="popover" popupId="demo-popup-popover" style={{marginTop : "10%"}}>
      {(popupState) => (
        <div>
        <div  style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13}}>
          <span style={{fontSize: 13,color:'#696969'}}>Mot de passe oublié? </span>
          <NavLink  {...bindTrigger(popupState)} to="/settings" exact className="">
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

                        </div>
            </div>

            </div>
            </div>
            </div>
            </div>


            </div>
             </section>


            </Grid>
        
         </Grid> 

           
        </div>


    )
}
