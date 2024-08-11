import React, { Component, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    signInWithPhoneNumber,
    getAuth,
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
  } from "firebase/auth";
import { auth, db } from "../../bdd/firebase";
import {collection,orderBy,setDoc,doc,getDoc,} from "firebase/firestore";
import { loginUser , Recap ,logoutUser } from "../../bdd/firebase";
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link ,NavLink  } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import GoogleIcon from '@mui/icons-material/Google';
import { GridLoader ,BarLoader } from 'react-spinners';
import { Badge, Container, createTheme, List, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Grid } from '@mui/material';

import Fab from '@mui/material/Fab';
import Tooltip from "@material-ui/core/Tooltip";
import { Book, Home, Help, BookSharp } from '@material-ui/icons';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { BookOnline } from '@mui/icons-material';


const useStyles = makeStyles((theme)=> ({
    Container: {
        position:"auto",
        top:"0",
        paddingTop: theme.spacing(6),
        color:"white",
        marginLeft: theme.spacing(6),
        display: 'flex',
        flexDirection: 'row',
        marginLeft: "1.3rem",
        width: "85%",
        // [theme.breakpoints.up("sm")]:{
        //     backgroundColor: "#19A8D9",
        // color:"white",
        //     border: "1px solid #ece7e7"
        // }
    
    },
    item:{
        // display:"flex",
        // alignItems: "center",
        // marginBottom:theme.spacing(4),
        // [theme.breakpoints.up("sm")]:{
        //     marginBottom:theme.spacing(3),
        //     cursor:"pointer"
        // }
    },
    icon:{
      
        [theme.breakpoints.up("sm")]:{
            fontsize:"18px",
        }
    },
    
    text:{
        marginLeft: theme.spacing(2),
        fontWeight:600,
        [theme.breakpoints.down("sm")]:{
            display:"none",
            
        },
    },
    link:{
        // color:"royalblue",
        textDecoration: "none",
        fontSize: 35,
        
    },
    check:{
     fontSize:"1rem"
    }
    }));




export default function Login () {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [envoi, setEnvoi] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: false,
      });
      const [loginEmail, setLoginEmail] = useState("");
      const [loginPassword, setLoginPassword] = useState("");
      const [Info, setInfo] = useState({});
      const [gooface, setgooface] = useState(false);
      const [phone , setphone] = useState();
      const [phoneERR , setphoneERR] = useState();


    // const login = async () => {
    //     try {
    //       const user = await signInWithEmailAndPassword(
    //         auth,
    //         loginEmail,
    //         loginPassword
    //       );
    //       console.log(user);
    //       history.push('/profil')
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };
        const [state ,setstate] = useState(false)

        const toggleBtn =(e) => {
            e.preventDefault();
          setstate(prevState => !prevState) ;
        }

        const about =()=>{
          history.push(`/about`);
          window.location.reload(`/about`);
          
      
        }
      const go =() => {
          history.push(`/`);
          window.location.reload(`/`);
      }
      
      const goconx = () =>{
        history.push('/connexion')
        window.location.reload('/connexion');
      }
      
      const goins =() => {
          history.push('/inscription');
          window.location.reload('/inscription');
      }
      const catalogue = () =>{
          history.push('/catalogue')
          window.location.reload('/catalogue');
        }



      const log = async ()=>{



        setEnvoi(true);
        setErrors({});
        loginUser(loginEmail, loginPassword).then(async (UserCredential) => {

                const userId = UserCredential._tokenResponse.localId;

                const infos = await getDoc(doc(db, "Users", userId));
                if (infos.data().type == "admin"){
                    history.push('/dashboard')
                }else if (infos.data().type == "client"){
                   history.push('/profil') 
                }else if (infos.data().type == "expert"){
                    history.push('/expert') 
                }
                setInfo(infos.data());
                setEnvoi(false);
                }).catch((error) => {
                
                console.error(error);
                console.log(error.message);
                if(error.message == 'Firebase: Error (auth/network-request-failed).'){
                    setEnvoi(false);
                    setErrors({ connexion : "Verifiez votre connexion"})
                }
                if(error.message == 'Firebase: Error (auth/wrong-password).'){
                    setEnvoi(false);
                    setErrors({ connexion : "mot de passe incorrect , ressayer svp"})
                }
                if(error.message == 'Firebase: Error (auth/user-not-found).'){
                    setEnvoi(false);
                    setErrors({ connexion : "vous ne possedez pas de compte avec cette email !"})
                }
                if(error.message == 'Firebase: Error (auth/invalid-email).'){
                    setEnvoi(false);
                    setErrors({ connexion : "Email invalide !"})
                }
                if(error.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
                    setEnvoi(false);
                    setErrors({ connexion : "L'accès à ce compte a été désactivé temporairement pour raison de sécurité (trop d'essai avec mot de passe incorrect) ! Restaurez-le en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard"})
                }
                
                
                
              }); 
              
      }

      const handleFormSubmit = async () => {

        try {
            const user = await signInWithEmailAndPassword(auth , values.email, values.password);
            console.log(user);
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
        //   loginUser(values.email, values.password).then((UserCredential) => {
        //     console.log(UserCredential);
        //     history.push('/profil')
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     console.log(error.message);
        //     history.push('/waww')

        //   });
      }

            
  const signInWithFacebook = async () => {
    setgooface(true);
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.addScope('email');
    await signInWithPopup(auth, provider)
      .then( async (result) => {
        console.log(result);

        let userId = result._tokenResponse.localId;

        const infos = await getDoc(doc(db, "Users", userId));
        if(infos.exists()) {
            setgooface(false);
            if (infos.data().type == "admin"){
                history.push('/dashboard')
            }else if (infos.data().type == "client"){
               history.push('/profil') 
            }else if (infos.data().type == "expert"){
                history.push('/expert') 
            }
            setInfo(infos.data());
            setEnvoi(false);
        }else{
            
        const infouser ={
            email : result.user.email,
            nom: result._tokenResponse.firstName,
            prenom: result._tokenResponse.lastName,
            userId :userId,
            
            complete:false, 
            phone: 0,
            adresse: '',
            agence:'',
            type: "client",
            nbrV: 0,
            const: 0,
        }
        await setDoc(doc(db , "Users", userId), infouser)
                .then(()=>{
                    setgooface(false);
                    history.push('/profil');
                })
                .catch((error) => {
                  console.log(error.message);
                }); 
        }
                       
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  
  const signInWithGoogle = async () => {
    setgooface(true);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then( async (result) => {
        console.log(result);

        let userId = result._tokenResponse.localId;

        const infos = await getDoc(doc(db, "Users", userId));
        if(infos.exists()) {
            setgooface(false);
            if (infos.data().type == "admin"){
                history.push('/dashboard')
            }else if (infos.data().type == "client"){
               history.push('/profil') 
            }else if (infos.data().type == "expert"){
                history.push('/expert') 
            }
            setInfo(infos.data());
            setEnvoi(false);
        }else{
            
        const infouser ={
            email : result.user.email,
            nom: result._tokenResponse.firstName,
            prenom: result._tokenResponse.lastName,
            userId :userId,
            
            complete:false, 
            phone: 0,
            adresse: '',
            agence:'',
            type: "client",
            nbrV: 0,
            const: 0,
        }
        await setDoc(doc(db , "Users", userId), infouser)
                .then(()=>{
                    setgooface(false);
                    history.push('/profil');
                })
                .catch((error) => {
                  console.log(error.message);
                }); 

        }
           



        
        

        
   
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [codeErr , setcodeErr]=useState("");
  const [resetE , setresetE]=useState(false);
  const [PhoneBool , setPhoneBool]=useState(false);
  const [Otp , setOtp] = useState("");

  const [ConfirmObj , setConfirmObj] = useState("");


function handleReset (e) {
        
        sendPasswordResetEmail(auth, loginEmail).then(() =>{
            setresetE(true);
            // window.alert("check your emails");
        }).catch((error) => {
            window.alert("Cet email n'est pas valide");
})}

  

const envoyer = async (number) =>{
 
  if(phone !== "" && phone != undefined ){
    console.log(number);
    const Phnum = '+'+number
    const res = await Recap(Phnum);
    setConfirmObj(res);
    // console.log(res);
    // console.log(res.confirm());

    setPhoneBool(true);
  }
  else{
    setphoneERR(" veillez saisire votre numero!")
  }

}

const verify = async (number) =>{
  
  if(number !== "" && number !== undefined ){
    await ConfirmObj.confirm(number).then(async(result) => {
      // User signed in successfully.
      setgooface(true);
      console.log(result);
        let userId = result._tokenResponse.localId;
        let pho = result._tokenResponse.phoneNumber;

        const infos = await getDoc(doc(db, "Users", userId));
        if(infos.exists()) {
            setgooface(false);
            if (infos.data().type == "admin"){
                history.push('/dashboard')
            }else if (infos.data().type == "client"){
               history.push('/profil');
               window.location.reload('/profil');
            }else if (infos.data().type == "expert"){
                history.push('/expert') 
            }
            setInfo(infos.data());
            setEnvoi(false);
        }else{
            
        const infouser ={
            email : '',
            nom: '',
            prenom: '',
            userId :userId,

            providerId: result.providerId,

            complete:false, 
            phone: pho,
            adresse: '',
            agence:'',
            type: "client",
            nbrV: 0,
            const: 0,
        }
        await setDoc(doc(db , "Users", userId), infouser)
                .then(()=>{
                    setgooface(false);
                    history.push('/profil');
                    window.location.reload('/profil');
                })
                .catch((error) => {
                  console.log(error.message);
                }); 

        }
      // ...
    }).catch((error) => {
      console.log(error.message);
      setcodeErr(error.message);
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

}


const classes = useStyles();

  return (
        
        <div>
        <div className='NavIco'>
        <Box sx={{width: "100%" , '& > :not(style)': { m: 1 }}}>
        <Tooltip title="acceuil" placement="Top"   >
        <Fab onClick={go} size='small'  color="inherit" aria-label="add">
        <Home />
        </Fab>
        </Tooltip>

        <Tooltip title="connexion" placement="Top"   >
        <Fab onClick={goconx} size='small'  color='inherit' >
        <LoginIcon  />
        </Fab>
        </Tooltip>

        <Tooltip title="iscription" placement="Top"   >
        <Fab onClick={goins} size='small'  color="inherit" aria-label="add">
        <PersonAddAltIcon />
        </Fab>
        </Tooltip>

        <Tooltip title="catalogue" placement="Top"   >
        <Fab onClick={catalogue} size='small'  color="default" aria-label="edit">
        <BookSharp />
        </Fab>
        </Tooltip>

        <Tooltip  size='small'  title="about" placement="Top"   >
        <Fab onClick={about} color="default" aria-label="edit">
        <Help />
        </Fab>
        </Tooltip>

        </Box>
        </div>
        <section class="subscribe_section layout_padding">
            <div class="container" style={{ borderRadius: "15px 70px" , width: "80%" ,height: "60%" , marginTop: "-4%"}}>
            <div class="box">
                <div class="row">
                <div class="col-md-8 mx-auto">
                    <div class="subscribe_form ">
                    
                    <div class="heading_container">
                        <h2>
                        Connectez-vous
                        </h2>
                    </div>
                    <Grid sx={{float: "center"}} container spacing={2}>
                      
                      
                        { gooface ? 
                        <Grid xs={12} sm={12}> 
                        <div>
                                  <ClipLoader size={15}  />
                                  </div></Grid> 
                            : <></>}
                        
                        
                      <Grid xs={4} sm={4}>
                      <div  className={classes.item} >
                        <NavLink onClick={signInWithGoogle} to="/connexion" exact className={classes.link}>
                            <GoogleIcon  style={{color: "#0A66C2"}} fontSize='500px' >  </GoogleIcon>
                        </NavLink>
                        </div>
                      </Grid>
                      <Grid xs={4} sm={4}>
                      <div  className={classes.item} >
                        <NavLink onClick={signInWithFacebook} to="/connexion" exact className={classes.link}>
                            <FacebookIcon  style={{color: "#1877F2"}} fontSize='500px'  />
                        </NavLink>
                       
                        </div>
                      </Grid>
                      <Grid xs={4} sm={4}>
                      <PopupState variant="popover" popupId="demo-popup-popover" style={{marginTop : "10%"}}>
                        {(popupState) => (
                          <div>
                          <div>
                            <NavLink {...bindTrigger(popupState)} to="/connexion" exact className={classes.link}>
                              <PhoneIcon  style={{color: "#19A8d9"}} fontSize='500px'  />
                            </NavLink>
                          </div>
                            
                            <Popover
                              {...bindPopover(popupState)}
                              anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                              }}
                            >
                              
                              <Typography >  
                            {PhoneBool ? 
                            <>
                                <Card sx={{  width : '400px' , height : '300 px'}}>
                                <CardContent>
                                <Typography  style={{fontSize: 13, color:"#19A8d9"}}>Inserer votre Code de confermation envoyee au numero de telephone suivant : +{phone} </Typography>
                                <br></br>
                                  {codeErr &&(<p className='error'> {codeErr}</p>)}
                                <input
                                  className="inputt"
                                    placeholder="Code ..."
                                    value={Otp}
                                    autoFocus
                                    onChange={(event) => {
                                      setOtp(event.target.value);
                                    }}
                                  /> 
                                    <CardActions>
                                  <Button size="small"  {...bindPopover(popupState)} onClick={()=>{verify(Otp)}}>confirmer </Button>
                                </CardActions>
                                </CardContent>
                            
                              </Card>
                            </>
                            :
                            <>  
                            <Card sx={{  width : '400px' , height : '300px'}}>
                              <CardContent>
                               <Typography  style={{fontSize: 13, color:"#19A8d9"}}>Inserer votre numero de telephone </Typography>
                                <br></br>
                                <PhoneInput
                                  country={'dz'}
                                  value={phone}
                                  onChange={setphone}
                                />
                                    <CardActions>
                                      <Button size="small" onClick={()=>{envoyer(phone)}}>envoyer</Button>
                                    </CardActions>
                                    <div
                                          id="recaptcha-container"
                                          class="justify-center flex"
                                      ></div>
                                
                                </CardContent>
                            
                              </Card> 
                            </>}    
                        
                          
                          </Typography>
                            </Popover>
                          </div>
                        )}
                        </PopupState>
                      </Grid>
                    </Grid>
                    <div>
        
        
      </div>
     {/* <input
         className="inputt"
         type="email"
         name="email"
         value={values.email}
         placeholder="Email..."
         onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <div>
        <input
          className="inputt"
          name='password'
          type={state ? "text" : "password"}
          placeholder="Password..."
          value={values.password}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        /> */}
        <input
         className="inputt"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          className="inputt"
          placeholder="Password..."
          type={state ? "" : "password"}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <div className='Boutt2' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </div>
        {/* </div> */}
       

        <button className='btns' onClick={log}> Login
        { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
        </button>

        <PopupState variant="popover" popupId="demo-popup-popover" style={{marginTop : "10%"}}>
      {(popupState) => (
        <div>
        <div  style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13}}>
          <span style={{fontSize: 13,color:'#696969'}}>Mot de passe oublié? </span>
          <NavLink  {...bindTrigger(popupState)} to="/connexion" exact className="">
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
          <>  
          <Card sx={{  width : '600 px' , height : '500 px'}}>
      <CardContent>
      <input
         className="inputt"
          placeholder="Email..."
          value={loginEmail}

          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          
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
        {errors.connexion && <p className="error">{errors.connexion}</p>}      
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
       
        <section class="info_section layout_padding">
            <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4">
                <div className='footerimg'>
                 <img className='logos'  src='assets/images/lo3.png' />
                 <h5 className='footerh'>
                 Asfáleia
                 </h5>
                </div>
                <p>
                Seul dans le passé , ensemble dans le futur </p>
                </div>
                <div class="col-md-7 offset-md-1 offset-lg-2 col-lg-6">
                <div class="row">
                    <div class="col-md-5  ">
                    <h5>
                        Useful Links
                    </h5>
                    <ul>
                        <li>
                        <a href="/inscription">
                            Sign Up
                        </a>
                        </li>
                        <li>
                        <a href="/catalogue">
                            Catalogue
                        </a>
                        </li>
                        
                    </ul>
                    </div>
                    <div class="col-md-6">
                    <h5>
                        Contact Us
                    </h5>
                    <div class="info_link-box">
                        <a href="#">
                        <span>+01 1234567890</span>
                        </a>
                        <a href="#">
                        <span>+01 1234567890</span>
                        </a>
                        <a href="#">
                        <span> <span class="__cf_email__">Asfáleia@gmail.com</span></span>
                        </a>
                    </div>
                    </div>
                </div>
                {/* <div class="info_container">
                    <div class="row">
                    <div class="col-md-5 ">
                        <h5>
                        Follow Us
                        </h5>
                    </div>
                    <div class="col-md-6 mb-0">
                        <div class="info_social">
                        <div>
                            <a href="https://Facebook.com">
                            <img src="assets/images/fb.png" alt="" />
                            </a>
                        </div>
                        <div>
                            <a href="https://Twitter.com">
                            <img src="assets/images/twitter.png" alt="" />
                            </a>
                        </div>
                        <div>
                            <a href="https://Linkedin.com">
                            <img src="assets/images/linkedin.png" alt="" />
                            </a>
                        </div>
                        <div>
                            <a href="https://Instagram.com">
                            <img src="assets/images/instagram.png" alt="" />
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div> */}
                </div>
            </div>
            </div>
        </section>
       
        <section class="container-fluid footer_section">
            <p>
            &copy; 2022 All Rights Reserved. Design by UMMTO student 
            </p>
        </section>
           
    
           
      </div>
    
    


    )
}

