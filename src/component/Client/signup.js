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
    getAuth,
    createUserWithEmailAndPassword
  } from "firebase/auth";
import { auth, db ,setDoc,getDoc } from "../../bdd/firebase";
import { signupUser , Recap } from "../../bdd/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link ,NavLink  } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
// import { Google  } from "react-bootstrap-icons/Google";
import { GridLoader ,BarLoader } from 'react-spinners';
import { Badge, Container, createTheme, List, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import validation from "./validation";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Fab from '@mui/material/Fab';
import Tooltip from "@material-ui/core/Tooltip";
import { Home, Help , Book ,BookSharp } from '@material-ui/icons';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import PhoneInput from 'react-phone-input-2'

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
    

export default function Signup () {

    const Agences = [
        { label: 'Adrar', wilaya: 1 },

        { label: 'Chlef-centre', wilaya: 2 },
        { label: 'Chlef-est', wilaya: 2 },
        { label: 'Chlef', wilaya: 2 },

        { label: 'Oum El Bouaghi', wilaya: 3 },

        { label: "Laghouat", wilaya: 4 },

        { label: 'Batna', wilaya: 5 },

        { label: 'Bejaia', wilaya: 6 },
        { label: 'Sidi-aiche', wilaya: 6 },
        { label: 'Bejaia-centre', wilaya: 6 },
        { label: 'Tichy', wilaya: 6 },
        { label: 'Biskra', wilaya: 7 },
        { label: 'Béchar', wilaya: 8 },

        { label: 'Bab-sebt',wilaya: 9},
        { label: 'Soumaa', wilaya: 9 },
        
        { label: 'Tamanrasset', wilaya: 11 },
        { label: 'Tébessa', wilaya: 12 },
        { label: 'Tlemcen', wilaya: 13 },
        { label: 'Tiaret', wilaya: 14 },

        { label: 'Tizi-ouzou', wilaya: 15 },
        { label: 'Tigzirt', wilaya: 15 },
        { label: "Azeffoun", wilaya: 15 },
        { label: 'Freha', wilaya: 15 },
        { label: 'Azazga', wilaya: 15 },
        { label: 'Ain-el-hemmam', wilaya: 15 },
        { label: 'LNI',wilaya: 15},

        { label: 'Bab-el-oued', wilaya: 16},
        { label: 'Staouali', wilaya: 16 },
        { label: 'Rghaya', wilaya: 16 },
        { label: 'Bir-mourad-raies',wilaya: 16},
        { label: "Rouiba", wilaya: 16 },
        { label: 'Ain-el-beniane', wilaya: 16 },
        { label: 'Bir-touta', wilaya: 16 },

        { label: 'Djelfa', wilaya: 17},
        { label: 'Jijel', wilaya: 18 },
        { label: 'Sétif', wilaya: 19 },
        { label: 'Saïda', wilaya: 20 },
        { label: 'Skikda', wilaya: 21 },
        { label: 'Sidi Bel Abbès', wilaya: 22 },
        { label: 'Annaba', wilaya: 23 },
        { label: 'Guelma', wilaya: 24 },
        { label: 'Constantine', wilaya: 25 },
        { label: 'Médéa', wilaya: 26 },
        { label: 'Mostaganem', wilaya: 27 },
        { label: "M'Sila", wilaya: 28 },
        { label: 'Mascara', wilaya: 29 },
        { label: 'Ouargla', wilaya: 30 },
        { label: 'Oran', wilaya: 31 },
        { label: 'El Bayadh', wilaya: 32 },
        { label: 'Illizi', wilaya: 33 },
        { label: 'Bordj Bou Arreridj', wilaya: 34 },

        { label: 'Boufarik', wilaya: 35 },
        { label: 'Boudouaw', wilaya: 35 },        
       
        { label: 'El Tarf',wilaya: 36},
        { label: 'Tindouf', wilaya: 37 },
        { label: 'Tissemsilt', wilaya: 38 },
        { label: 'El Oued', wilaya: 39 },
        { label: 'Khenchela', wilaya: 40 },
        { label: 'Souk Ahras', wilaya: 41 },
        { label: 'Tipaza', wilaya: 42 },
        { label: 'Mila', wilaya: 43 },
        { label: 'Aïn Defla', wilaya: 44 },
        { label: 'Naâma', wilaya: 45 },
        { label: 'Aïn Témouchent', wilaya: 46 },
        { label: 'Ghardaïa', wilaya: 47 },
        { label: 'Relizane', wilaya: 48 },
        { label: 'Timimoun', wilaya: 49 },
        { label: 'Bordj Badji Mokhtar', wilaya: 50 },
        { label: 'Ouled Djellal', wilaya: 51 },
        { label: 'Béni Abbès', wilaya: 52 },
        { label: 'In Saleh', wilaya: 53 },
        { label: 'In Guezzam', wilaya: 54 },
        { label: 'Touggourt', wilaya: 55 },
        { label: 'Djanet', wilaya: 56 },
        { label: "El M'Ghair", wilaya: 57 },
        { label: 'El Meniaa', wilaya: 58 },

        // { label: 'M', wilaya: 1931 },
        
        ];


    const history = useHistory()
    const [errors, setErrors] = useState();
    const [envoi, setEnvoi] = useState(false);
    const [gooface, setgooface] = useState(false);
    const [state ,setstate] = useState(false)

    const [nomb, setnomb] = useState(false);
    const [passwb, setpasswb] = useState(false);
    const [prenomb, setprenomb] = useState(false);
    const [adresseb, setadresseb] = useState(false);
    const [emailb, setemailb] = useState(false);
    const [agenb, setagenb] = useState(true);
    const [passw2b, setpassw2b] = useState(false);

    const [codeErr , setcodeErr]=useState("");
    const [resetE , setresetE]=useState(false);
    const [PhoneBool , setPhoneBool]=useState(false);
    const [Otp , setOtp] = useState("");
    const [phone , setphone] = useState();
    const [phoneERR , setphoneERR] = useState();
    const [ConfirmObj , setConfirmObj] = useState("");

    // const [b, setb] = useState(false);

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



    const toggleBtn =(e) => {
        e.preventDefault();
      setstate(prevState => !prevState) ;
    }

    const [values, setValues] = useState({
        nom: "",
        prenom: "",
        phone: "",
        email: "",
        // Npermet:"",
        password: "",
        password2: "",
        adresse:"",
        agence:"",
        loading: false,
      });

      const handleFormSubmit = async () => {
        
        if (
            !validation(values).nom && 
            !validation(values).prenom && 
            !validation(values).email &&
            !validation(values).password && 
            !validation(values).agence &&
            !validation(values).adresse && 
            !validation(values).password2 
             )
            {
                    setEnvoi(true);
                    signupUser(values.email, values.password).then(async(user) => {
                        const userId = user._tokenResponse.localId;

                        const infouser ={
                            nom : values.nom,
                            prenom : values.prenom,
                            userId :userId,
                            email: values.email,
                            // Npermet: values.Npermet,
                            phone: values.phone,
                            adresse: values.adresse,
                            agence:values.agence,
                            complete: true,
                            type: "client",
                            nbrV: 0,
                            const: 0,
                        }
                        await setDoc(doc(db , "Users", userId), infouser)
                                .then(()=>{
                                    setEnvoi(false);
                                })
                                .catch((error) => {
                                console.log(error.message);
                                });
                        history.push('/profil');
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });


            } else {
                setErrors("Oups ! il y'a une erreure ; verifiez bien SVP !") 
            }



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
        

       
        
        

        // console.log(result);
        // console.log(infouser);
        
        
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
        

        
   
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };


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

        <section class="contact_section layout_padding">
        <div class="container" style={{ borderRadius: "15px 70px" , width: "80%" ,height: "60%" , marginTop: "-4%"}}>
        <div class="box layout_padding2">
            <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <div class="contact-form">
                {/* <div style={{marginLeft:"30px"}}>
                    <Container className={classes.Container} >
                        <div style={{ width: '300px'}}  className={classes.item} >
                        <NavLink onClick={signInWithGoogle} to="/inscription" exact className={classes.link}>
                            <GoogleIcon  style={{color: "#0A66C2"}} fontSize='500px' >  </GoogleIcon>
                        </NavLink>
                        </div>
                        <div>
                        { gooface ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
                        </div>

                        <div style={{ width: '300px'}}  className={classes.item} >
                        <NavLink onClick={signInWithFacebook} to="/inscription" exact className={classes.link}>
                            <FacebookIcon  style={{color: "#1877F2"}} fontSize='500px'  />
                        </NavLink>
                       
                        </div>
                    </Container>
                    
                    </div>  */}
                <div class="heading_container">
                    <h2>
                    Inscrivez-vous
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

                <form>
                    <div>
                    <input
                     className="input"
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      value={values.nom}
                      onChange={e=>{setValues({...values, nom:e.target.value}) ; setnomb(true);setErrors()}}
                      />
                    {nomb ? <>{validation(values).nom && <p className="error">{validation(values).nom}</p>} </>:<></>}    

                    </div>
                    <div>
                    <input
                     className="input"
                      type="text"
                      name="prenom"
                      placeholder="prenom"
                      value={values.prenom}
                      onChange={e=>{setValues({...values, prenom:e.target.value}) ; setprenomb(true);setErrors()}}
                      />
                    {prenomb ? <>{validation(values).prenom && <p className="error">{validation(values).prenom}</p>} </>:<></>}    

                    </div>
                    <div>
                    <input
                     className="input"
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={values.phone}
                      onChange={e=>{setValues({...values, phone:e.target.value})}}
                      />
                    </div>
                    <div>
                    <input
                     className="input"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={e=>{setValues({...values, email:e.target.value}) ; setemailb(true);setErrors()}}
                      />
                    {emailb ? <>{validation(values).email && <p className="error">{validation(values).email}</p>} </>:<></>}    

                    </div>
                    {/* <div>
                    <input
                     className="input"
                      type="text"
                      name="Npermet"
                      placeholder="Numero de permet de conduite"
                      value={values.Npermet}
                      onChange={e=>{setValues({...values, Npermet:e.target.value})}}
                      />
                    </div> */}
                    <div>
                    <input
                     className="input"
                      type={state ? "text" : "password"}
                      name="Password"
                      placeholder="Password"
                      value={values.password}
                      onChange={e=>{setValues({...values, password:e.target.value}); setpasswb(true) ;setErrors() }}
                      />
                      <div className='Boutt' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </div>
                    {passwb ? <>{validation(values).password && <p className="error">{validation(values).password}</p>} </>:<></>}    

                    </div>
                    <div>
                    <input
                     className="input"
                     type={state ? "text" : "password"}
                      name="Password2"
                      placeholder="Confirm Password"
                      value={values.password2}
                      onChange={e=>{setValues({...values, password2:e.target.value}) ; setpassw2b(true) ; setErrors()}}
                      />
                      <div className='Boutt' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </div>
                    {passw2b ? <>{validation(values).password2 && <p className="error">{validation(values).password2}</p>} </>:<></>}    

                    </div>
                    <div>
                    <input
                     className="input"
                      type="adresse"
                      name="adresse"
                      placeholder=" adrresse"
                      value={values.adresse}
                      onChange={e=>{setValues({...values, adresse:e.target.value}) ;setadresseb(true) ; setErrors()}}
                      />
                     {adresseb ? <>{validation(values).adresse && <p className="error">{validation(values).adresse}</p>} </>:<></>}    

                    </div>
                    <div className='autoCin'>
                    <Autocomplete
                            style={{background : "none"}}
                            
                            id="combo-box-demo"
                            options={Agences}
                            sx={{ width: "100%" }}
                            
                            onChange={(e)=>{setValues({...values, agence:e.target.innerText});setagenb(true) ;setErrors() }}
                            renderInput={(params) => <TextField id='autocom' {...params} label="Agence" />}
                            />


                           
                        </div>
                        {agenb ? <>{validation(values).agence && <p className="error">{validation(values).agence}</p>} </>:<></>}    
                    <br></br>
                   {errors && <p className="error">{errors}</p>}
                    <div class="d-flex justify-content-center">
                    
                    <button className='buttonSU' onClick={handleFormSubmit} type="button" >
                        Sign Up
                        { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
                    </button>
                    </div>
                    
                </form>
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
                    <a href="/connexion">
                        Login
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
            <div class="info_container">
                <div class="row">
                <div class="col-md-5 ">
                    <h5>
                    Follow Us
                    </h5>
                </div>
                <div class="col-md-6 mb-0">
                    <div class="info_social">
                    <div>
                        <a href="https://therichpost.com">
                        <img src="assets/images/fb.png" alt="" />
                        </a>
                    </div>
                    <div>
                        <a href="https://therichpost.com">
                        <img src="assets/images/twitter.png" alt="" />
                        </a>
                    </div>
                    <div>
                        <a href="https://therichpost.com">
                        <img src="assets/images/linkedin.png" alt="" />
                        </a>
                    </div>
                    <div>
                        <a href="https://therichpost.com">
                        <img src="assets/images/instagram.png" alt="" />
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
   
    <section class="container-fluid footer_section">
        <p>
        &copy; 2021 All Rights Reserved. Design by
        <a href="https://therichpost.com">Free Html Templates</a>
        </p>
    </section>
       

       
        </div>


    )
}

