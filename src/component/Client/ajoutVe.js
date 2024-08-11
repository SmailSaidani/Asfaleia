import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { db, auth  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import "../../style.css";

import Carousel from 'react-material-ui-carousel';
import CarouselSlide from 'react-material-ui-carousel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ClipLoader from "react-spinners/ClipLoader";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const steps = ['Infos Initiales', 'Devis Des Garanties', 'Infomations Detaillees'];



const theme = createTheme();
export default function CarAjout1(car) {
console.log(car)
  function getStepContent(step) {
    switch (step) {
      case 0:
        return    <React.Fragment>
   
        <Grid container spacing={3}>
        <Grid xs={6}>
      <Typography variant="overline">Marque</Typography>
      </Grid>
      <Grid xs={6}>
      <Select
      label="Marque"
  
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={values.marque}
      onChange={(e)=>{setValues({...values, marque:e.target.value}) ; setaucun(false)}}
      style={{width : "100%", height : "50%"}}
    >
      <MenuItem value={2.1}>Renault</MenuItem>
      <MenuItem value={2.2}>Peugot</MenuItem>
      <MenuItem value={2.3}>Fiat</MenuItem>
      <MenuItem value={2.4}>Dacia</MenuItem>
      <MenuItem value={2.5}>Opel</MenuItem>
      <MenuItem value={2.6}>suzuki</MenuItem>
  
      <MenuItem value={4.1}>BMW</MenuItem>
      <MenuItem value={4.01}>WV</MenuItem>
      <MenuItem value={4.002}>LandRover</MenuItem>
      <MenuItem value={4.2}>Bentli</MenuItem>
      <MenuItem value={4.12}>Audi</MenuItem>
      <MenuItem value={4.13}>Mercides</MenuItem>
  
      <MenuItem value={3.1}>Ford</MenuItem>
      <MenuItem value={3.2}>Nissan</MenuItem>
      <MenuItem value={3.3}>Mitsubishi</MenuItem>
      <MenuItem value={3.4}>Honda</MenuItem>
      <MenuItem value={3.5}>hunday</MenuItem>
      <MenuItem value={3.55}>Sckoda</MenuItem>
      <MenuItem value={3.6}>Toyota</MenuItem>
    </Select>
          </Grid>
  
  
    <Grid xs={6}>
      <Typography variant="overline">Nom</Typography>
      </Grid>
      <Grid xs={6}>
      <TextField style={{width : "100%"}} id="outlined-basic"  variant="outlined" value={values.nom} onChange={(e)=>{setValues({...values, nom:e.target.value})}} />  
        </Grid>
  
  
        <Grid xs={6} style={mrg}>
      <Typography variant="overline">Annee</Typography>
      </Grid>
      <Grid xs={6} style={mrg}>
      <TextField id="outlined-basic"  style={{width : "100%"}}  variant="outlined" value={values.annes} onChange={(e)=>{setValues({...values, annes:e.target.value}) ; setaucun(false)}} />      
      </Grid>
      
      <Grid xs={6} style={mrg}>
      <Typography variant="overline">Puissance</Typography>
      </Grid>
      <Grid xs={6} style={mrg}>
      <TextField  style={{width : "100% ", height : " 10%"}} id="outlined-basic"  type='number'   value={values.puiss} onChange={(e)=>{setValues({...values, puiss:e.target.value}) ; setaucun(false)}} />
      </Grid>
  
      
      <Grid xs={6}>
      <Typography variant="overline">Duree</Typography>
      </Grid>
      <br></br>
      <Grid xs={6}>
      <Select
      label="Duree"
  
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={values.duree}
      onChange={(e)=>{setValues({...values, duree:e.target.value}); setaucun(false)}}
      style={{width : "100%", height : "50%"}}
    >
      <MenuItem value={1}>Une annee</MenuItem>
      <MenuItem value={0.5}>6 mois</MenuItem>
     
    </Select>
  
    <Button variant="contained" sx={{marginTop : '3%' }} onClick={()=>{calcule() ; setDgrn(false)}}>Calculer 
      {/* { envoi ? <div  >
                                    <ClipLoader size={15}  />
                                    </div> 
                              : <></>} */}
      </Button>
      {aucun && (<p className='error'>Vous avez raté quelque champs! Verifiez </p>)}
          </Grid>
        </Grid>
      </React.Fragment>;
      case 1:
        return  <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} >
          {Offres.map((value) => (
        <>
         <ListItem
              key={value}
              disableGutters
              style={Gb2}
              >
              
              <ListItemText  
              primary={`${value.type}`}
              secondary={`valeur: ${value.val} DA `}/>
              {all ? 
              <>
              <DoneOutlineTwoToneIcon></DoneOutlineTwoToneIcon><p>inclut</p>
              </>
              :
              <>
  
              <Button  className='btnsPre' onClick={()=>{  setValues({...values, type:values.type+'/'+value.type, }); supprimer(value) }} >Prendre
              </Button>
              </>}
  
              {/* {Tr && 
                <>
                <Button  className='btnsPre' onClick={enlever(value)} >enlever
                </Button>
                </> 
                } */}
              
             
              
                  
              </ListItem>
              </>
          ))}
                      { cnf &&   
                      <> 
                      <p className='payee'>Total a paye :  {values.valeur} DA</p>

                     {Vide ? <></> : <Button style={{backgroundColor: "greenyellow" , marginTop: "5px"}}  className='btnsPre' onClick={()=>{handleNext()}} >Confirmer</Button>} 
                      </>
                      }
          </Grid>
        </Grid>
      </React.Fragment>;
      case 2:
        return  <React.Fragment>
        
        <div style={{padding : " 10%"}}>
  
  <Grid container  xs={12} >
  
  <Grid  sm={4} xs={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> Nom : 
  </Typography> 
  </Grid>
  <Grid  sm={8} xs={6} style={Gb}>
  
  <Typography variant="overline" display="block" gutterBottom> {Info.nom} 
  </Typography>
  </Grid>
  
  <Grid  sm={4} xs={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> Prenom : 
  </Typography> 
  </Grid>
  <Grid  sm={8} xs={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> {Info.prenom} 
  </Typography> </Grid>
  
  <Grid  sm={4} xs={6}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> Adresse : 
  </Typography> 
  </Grid>
  <Grid  sm={8} xs={6}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> {Info.adresse} 
  </Typography> </Grid>
  
  <Grid  sm={4} xs={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> agence : 
  </Typography> 
  </Grid>
  <Grid  sm={8} xs={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> {Info.agence} 
  </Typography> </Grid>
  
  <Grid xs={6} sm={4}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> Phone : 
  </Typography> 
  </Grid>
  <Grid xs={6} sm={8}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> {Info.phone} 
  </Typography> </Grid>
  
  <Grid xs={6} sm={3}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> assurance :
  </Typography>
  </Grid>
  <Grid xs={6} sm={3}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> {values.type} 
  </Typography>
  </Grid>
  <Grid xs={6} sm={3}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> valeur estimee :  
  </Typography>
  </Grid>
  <Grid className='vert' xs={6} sm={3}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> {values.valeur} DA
  </Typography>
  </Grid>
  
  <Grid  xs={12} sm={4}  style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> Marque : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.marque} onChange={(e)=>{setValues({...values, marque:e.target.value}) ;}} />
   </Typography> 
  
        
  </Grid>
  <Grid item xs={12} sm={4} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom>   Nom : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.TypeV} onChange={(e)=>{setValues({...values, TypeV:e.target.value}) ;}} />
  </Typography> 
  
          
          
  </Grid>
  <Grid item xs={12} sm={4} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> N DE SERIE : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.numS} onChange={(e)=>{setValues({...values, numS:e.target.value}) ; }} />
  </Typography> 
  
          
          
  </Grid>
  <Grid item xs={12} sm={6} container style={Gb}>
  <Grid item xs={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> CAROSSERIE :
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.caross} onChange={(e)=>{setValues({...values, caross:e.target.value}) ; }} /> 
  </Typography> 
  
          
          
  </Grid>
  
  <Grid item xs={6} >
  <Typography variant="overline" display="block" gutterBottom> ENERGIE : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.energie} onChange={(e)=>{setValues({...values, energie:e.target.value}) ; }} /> 
  </Typography> 
  
          
          
  </Grid>
          
          
  </Grid>
  <Grid item xs={12} sm={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> PLASSES ASSISES : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.place} onChange={(e)=>{setValues({...values, place:e.target.value}) ; }} /> 
  </Typography> 
  
          
          
  </Grid>
  <Grid item xs={6} sm={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> POIDS TOTAL EN CHARGE : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.poids} onChange={(e)=>{setValues({...values, poids:e.target.value}) ; }} /> 
  </Typography> 
  
          
          
  </Grid>
  <Grid item xs={6} sm={6} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> CHARGE UTILE : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.charge} onChange={(e)=>{setValues({...values, charge:e.target.value}) ; }} /> 
  </Typography> 
  
          
          
  </Grid>
  
  <Grid item xs={6} sm={5} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> N D IMMATRICULATION: 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.imma} onChange={(e)=>{setValues({...values, imma:e.target.value}) ;}} /> 
  </Typography> 
  
          
          
  </Grid>
  <Grid item xs={6} sm={5} style={Gb}>
  <Typography variant="overline" display="block" gutterBottom> NUM PRECEDENT : 
  <br></br>
  <TextField id="outlined-basic"  variant="outlined" value={values.immaP} onChange={(e)=>{setValues({...values, immaP:e.target.value}) ; }} /> 
  </Typography> 
  
          
          
  </Grid>
  
  <Grid item xs={12} sm={2} style={Gb}>
  <Typography variant="outlined-basic" display="block" gutterBottom> ANNEE DE PMEC : 
  <br></br>
  {values.annes} 
  </Typography> 
  
          
          
  </Grid>
  <br></br>
  <button className='btnsCD' variant="contained" sx={{marginTop : '10%' ,marginLeft : '35%'}} onClick={()=>{ sendinfos()}}>Envoyer la Demande
    { envoi ? <div  >
                                    <ClipLoader color='white' size={15}  />
                                    </div> 
                              : <></>}
  </button> 
  
  
  </Grid>
  {Errors.problem && <p className="error">{Errors.problem}</p>} 
  {succes ? 
          <p className="succès">Demande envoyer avec succès</p> 
          : 
          <></>} 
  </div>
      </React.Fragment>;
      default:
        throw new Error('Unknown step');
    }
  }

    const [User, setUser] = useState({});
    const [Info, setInfo] = useState({});
    const history = useHistory();
    
    useEffect(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (auth.currentUser){
            setUser(currentUser);
          const infos = await getDoc(doc(db, "Users", currentUser.uid));
          setInfo(infos.data());
          

          }

          });
      
      
    }, []);

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

    const pictures = [
        {image:'../assets/images/jeune.webp', title:'Iu 1'},
        {image:'../assets/images/slider-img.png', title:'Iu 2'},
        {image:'../assets/images/assurance1.PNG', title:'Iu 3'},
        {image:'../assets/images/12.jpg', title:'Iu 3'},
        {image:'../assets/images/image1.jpg', title:'Iu 3'},
    ];




  const hmar = {
    marginTop: "5%"
  }
  const style = {
    width: '100%',
    maxWidth: 360,
    marginTop: '%'
  };
  const Gb ={
    boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',


    
  
  }


  const Gba ={
    boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',
    marginTop: '10%'

    
  
  }
  const Gb2 ={
    boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',
    padding: '5%',
    marginTop:"-5%",
    border : "1px solid black"

  }

  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'white' ? 'white' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '60%',
    boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
    
    marginTop:'20%',
    marginLeft:'20%'
  }));
  
  const ItemL = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#C3ECFD' : '#C3ECFD',
    ...theme.typography.body2,
  
  }));


  const Item = styled(Paper)(({ theme }) => ({
    
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: "white",
    width: '60%',
    boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
    

    marginLeft:'20%'
  }));



  // console.log(User.uid)


  const [Errors, setErrors] = useState({});
  const [succes, setSucces] = useState(false);
  

  const [Etat, setEtat] = useState(false);
  const [Vide , setVide] = useState(true);
  const [aucun , setaucun] = useState(false);
  const [envoi , setenvoi] = useState(false);

  
  const [Offres, setOffres] = useState([]);
  const OFF =[];

  const OFFP=[];
  const [offs, setOfs]=useState([])
  const [Tot, setTot] = useState(0);

 
  const [all ,setall]= useState(false);


  const [infodisplay, setIdp]=useState(false);
  const [ajd, setAjd]=useState(true);
  const [grn, setDgrn]=useState(true);
  const [cnf, setCnf]=useState(false);
 
 const calcule = () =>{
    if (!values.annes || !values.puiss || !values.marque || !values.duree){
      setaucun(true);
    }else{
    handleNext();
    const date = new Date();
    const Sdate = date.getFullYear();
    setCnf(true);

    const age = Sdate-values.annes;
   



    if (age == 0){
      const val = (30000+1600) + (values.puiss*values.puiss*400) + (values.marque*values.marque*400)
      
      var intvalue = Math.round( val );
      OFF.push({
          type: "simple",
          val : intvalue*values.duree+100
      })

      const val2 = (55000+2500) + (values.puiss*values.puiss*1000) + (values.marque*values.marque*values.marque*800)
      var intvalue = Math.round( val2 );
      
      OFF.push({
          type: "TR",
          val : intvalue*values.duree+300
      })
      
      const BBs = Math.round(values.marque*175)
      const VIn = Math.round(values.marque*195)

      OFF.push({
        type  : "Bris de glas " , 
        val : BBs,
        ind : "1"
      })

     OFF.push({
       type  : "Vol et incendie " ,
       val : VIn,
       ind : "2"
      })
      
      setOffres(OFF);

      ;
    } else if (0 < age && age <= 5 ){
        
        const val = (30000 / age) + (values.puiss*values.puiss*400) + (values.marque*values.marque*400)
       
        var intvalue = Math.round( val );
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100
        })

        const val2 = (55000 / age) + (values.puiss*values.puiss*1000) + (values.marque*values.marque*values.marque*800)
        var intvalue = Math.round( val2 );
        
        OFF.push({
            type: "TR",
            val : intvalue*values.duree+300
        })
        
        const BBs = Math.round(values.marque*170)
        const VIn = Math.round(values.marque*190)

        OFF.push({
          type  : "Bris de glas " , 
          val : BBs,
          ind : "1"
        })

       OFF.push({
         type  : "Vol et incendie " ,
         val : VIn,
         ind : "2"
        })
        
        setOffres(OFF);

        ;
        
    } else if (5 < age && age <= 10){
        
        const val = (28000 / age) + (values.puiss*values.puiss*500) + (values.marque*values.marque*values.marque*600)
        var intvalue = Math.round( val );
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100,
            ind : "3"

        })

        const val2 = (50000 / age) + (values.puiss*values.puiss*970) + (values.marque*values.marque*values.marque*900)
        var intvalue = Math.round( val2 );
        OFF.push({
            type: "TR",
            val : intvalue*values.duree+300,
            ind : "4"

        })

        const BBs = Math.round(values.marque*165)
        const VIn = Math.round(values.marque*188)

        OFF.push({
          type  : "Bris de glas " , 
          val : BBs,
          ind : "1"
        })

       OFF.push({
         type  : "Vol et incendie " ,
         val : VIn,
         ind : "2"
        })
        
        
        setOffres(OFF);

        ;
        
    } else if (10 < age && age <= 15){
        
        const val = (15000 / age) + (values.puiss*values.puiss*100) + (values.marque*values.marque*600)
        var intvalue = Math.round( val );
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100,
            ind : "3"
        })


        const val2 = (30000 / age) + (values.puiss*values.puiss*700) + (values.marque*values.marque*values.marque*500)
        var intvalue = Math.round( val2 );
        OFF.push({
            type: "TR",
            val : intvalue*values.duree+300,
            ind : "4"
        })

        const BBs = Math.round(values.marque*160)
        const VIn = Math.round(values.marque*185)

        OFF.push({
          type  : "Bris de glas " , 
          val : BBs,
          ind : "1"
        })

       OFF.push({
         type  : "Vol et incendie " ,
         val : VIn,
         ind : "2"
        })
        
        
        setOffres(OFF);

        ;
        
    }
    else {

        const val = (9000 / age) + (values.puiss*values.puiss*180) + (values.marque*values.marque*180)
        var intvalue = Math.round( val );

        const BBs = Math.round(values.marque*150)
        const VIn = Math.round(values.marque*180)

        OFF.push({
          type  : "Bris de glas " , 
          val : BBs,
          ind : "1"
        })

       OFF.push({
         type  : "Vol et incendie " ,
         val : VIn,
         ind : "2"
        })
      
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100
        })

      

        setOffres(OFF);
    }
    
  
  }
 } 

  const confirmer = () =>{
    setEtat(true);
    setAjd(false);
    setValues({...values, user:User.uid});
    setValues({...values, garanties:offs});

   
  }

  // const show = ()=>{
  //   console.log(values);
  // }

  const supprimer = (value)=>{
    
    if(value.type == 'TR'){
      setall(true);
      setVide(false);
      console.log(value.val);

      setTot(value.val);

      setValues({...values, 
        valeur:value.val,
        type:value.type,
        marque:'',
        userN:Info.nom,
        userPr:Info.prenom,
        userAdr:Info.adresse,
        userPhone:Info.phone,
        userAgen:Info.agence,
        user:Info.userId,
      });

      offs.push(value);
      values.garanties = offs
     
    }else{
      if (value.type == 'simple'){
        setVide(false);
      }
    const ind = Offres.indexOf(value);
    Offres.splice(ind,1);

    var t = value.val+Tot ;
    setTot(t);

    offs.push(value);
    values.garanties = offs
    setValues({...values, 
      valeur:values.valeur + value.val,
      type:values.type+'/'+value.type,
      marque:'',
      userN:Info.nom,
      userPr:Info.prenom,
      userAdr:Info.adresse,
      userPhone:Info.phone,
      userAgen:Info.agence,
      user:Info.userId,
    });
    }

   
  }


  const sendinfos = async ()=>{
    setenvoi(true);
    // console.log(values);

    if (
      values.marque !== '' && 
      values.TypeV !== '' && 
      values.type !== '' && 
      values.valeur > 0 &&
      values.duree > 0 &&
      values.nom !== '' &&
      values.annes !== '' &&
      values.puiss !== '' &&
      values.numS !== '' &&
      values.poids !== '' &&
      values.place !== '' &&
      values.imma !== '' &&
      values.immaP !== '' &&
      values.energie !== '' &&
      values.caross !== '' &&
      values.charge !== '' ){
         
        await addDoc(collection (db,"Demandes",), values).then(()=>{
                      setenvoi(false);
                      setSucces(true);
                      handleNext();
                      setErrors({problem : " "});
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
       }
       else{
        console.log(values);
        setErrors({ problem: "veillez remplire tout les champs SVP!"})
       }

  }




    const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


   




  const [values, setValues] = useState({

    userN:'',
    userPr:'',
    userAdr:'',
    userPhone:'',
    userAgen:'',
    user:'',


    type:"",
    valeur:0,
    duree:0,

    dateD:"",
    dateF:"",

    nom:'',
    annes:'',
    puiss:"",
    marque:'',

    TypeV:'',
    numS:'',
    poids:"",
    place:'',
    imma:'',
    immaP:'',
    energie:'',
    caross:'',
    charge:'',
    garanties :[],
    

  })

  const mrg ={
    marginTop : "5%"
  }


    


return (
    <div className='intVeh'>
    
    <Grid container spacing={1}  >

  <Grid  xs={12} sm={12} >
  <Carousel>
                {pictures.map(({image, title}) => (
                    <CarouselSlide key={image} autoPlay>
                        <Card>
                            <CardMedia
                                image={image}
                                title={title}
                                style={{
                                  padding: '25%',
                                  height: '100%',
                                }}
                            />
                            {/* <CardContent>
                                <Typography>{title}</Typography>
                            </CardContent> */}
                        </Card>
                    </CarouselSlide>
                ))}
            </Carousel>

  </Grid>
  <br></br>
  <br></br>
  <Typography align='center'  variant="h4" display="block" gutterBottom={true} > Ajouter un vehicule </Typography> 
  <br></br>
  <br></br>
  
  
    

  <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper className='Paper' variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },    boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)'}}>
      
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Merci Pour votre Demande.
                </Typography>
                <Typography variant="subtitle1">
                 Votre demande a été envoyé avec succès; vous êtes prié à se déplacer vers l'agence pour une visite technique de véhicule, merci😊.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              

                 
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>


</Grid>

</div>

);

}


// import { Grid, makeStyles } from '@material-ui/core';
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Sidebar from '../sidebar';

// import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Divider from '@mui/material/Divider';
// import Chip from '@mui/material/Chip';

// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';


// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

// import { db, auth, logoutUser, user  } from "../../bdd/firebase";
// import {
//   onAuthStateChanged,
  
// } from "firebase/auth";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
//   Timestamp,
//   orderBy,
//   setDoc,
//   doc,
//   getDoc,
//   updateDoc,
//   getDocs,
// } from "firebase/firestore";


// import "../../style.css";


// import Slider from '@mui/material/Slider';
// import Carousel from 'react-material-ui-carousel';
// import CarouselSlide from 'react-material-ui-carousel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import { flexbox } from '@mui/system';
// import { Row } from 'react-bootstrap';


// import Form from 'react-bootstrap/Form';
// import { info } from 'sass';
// import { Send } from '@material-ui/icons';




// export default function CarAjout() {

//     const [User, setUser] = useState({});
//     const [Info, setInfo] = useState({});

    
//     useEffect(async () => {
//       onAuthStateChanged(auth, async (currentUser) => {
//           if (auth.currentUser){
//             setUser(currentUser);
//           const infos = await getDoc(doc(db, "Users", currentUser.uid));
//           setInfo(infos.data());
          

//           }

//           });
      
      
//     }, []);



//     const pictures = [
//         {image:'../assets/images/jeune.webp', title:'Iu 1'},
//         {image:'../assets/images/slider-img.png', title:'Iu 2'},
//         {image:'../assets/images/assurance1.PNG', title:'Iu 3'},
//         {image:'../assets/images/12.jpg', title:'Iu 3'},
//         {image:'../assets/images/image1.jpg', title:'Iu 3'},
//     ];




//   const hmar = {
//     marginTop: "5%"
//   }
//   const style = {
//     width: '100%',
//     maxWidth: 360,
//     marginTop: '%'
//   };
//   const Gb ={
//     boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',


    
  
//   }


//   const Gba ={
//     boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',
//     marginTop: '10%'

    
  
//   }
//   const Gb2 ={
//     boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',
//     padding: '5%',
//     marginTop:"-5%",
//     border : "1px solid black"

//   }

//   const Item2 = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'white' ? 'white' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     width: '60%',
//     boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
    
//     marginTop:'20%',
//     marginLeft:'20%'
//   }));
  
//   const ItemL = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#C3ECFD' : '#C3ECFD',
//     ...theme.typography.body2,
  
//   }));


//   const Item = styled(Paper)(({ theme }) => ({
    
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     backgroundColor: "white",
//     width: '60%',
//     boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
    

//     marginLeft:'20%'
//   }));

//    const mrg ={
//     marginTop : "5%"
//   }

//   // console.log(User.uid)


//   const [Errors, setErrors] = useState({});
//   const [succes, setSucces] = useState(false);
  

//   const [Etat, setEtat] = useState(false);
//   const [Offres, setOffres] = useState([]);
//   const OFF =[];

//   const OFFP=[];
//   const [offs, setOfs]=useState([])
//   const [Tot, setTot] = useState(0);

//   const [values, setValues] = useState({

//     userN:'',
//     userPr:'',
//     userAdr:'',
//     userPhone:'',
//     userAgen:'',
//     user:'',


//     type:"",
//     valeur:0,
//     duree:0,

//     dateD:"",
//     dateF:"",

//     nom:'',
//     annes:'',
//     puiss:"",
//     marque:'',

//     TypeV:'',
//     numS:'',
//     poids:"",
//     place:'',
//     imma:'',
//     immaP:'',
//     energie:'',
//     caross:'',
//     charge:'',
//     garanties :[],
    

//   })
//   const [all ,setall]= useState(false);


//   const [infodisplay, setIdp]=useState(false);
//   const [ajd, setAjd]=useState(true);
//   const [grn, setDgrn]=useState(true);
//   const [cnf, setCnf]=useState(false);
 
//  const calcule = () =>{
//     const date = new Date();
//     const Sdate = date.getFullYear();
//     setCnf(true);

//     const age = Sdate-values.annes;
   



//     if (age == 0){
//       const val = (30000+1600) + (values.puiss*values.puiss*400) + (values.marque*values.marque*400)
      
//       var intvalue = Math.round( val );
//       OFF.push({
//           type: "simple",
//           val : intvalue*values.duree+100
//       })

//       const val2 = (55000+2500) + (values.puiss*values.puiss*1000) + (values.marque*values.marque*values.marque*800)
//       var intvalue = Math.round( val2 );
      
//       OFF.push({
//           type: "TR",
//           val : intvalue*values.duree+300
//       })
      
//       const BBs = Math.round(values.marque*175)
//       const VIn = Math.round(values.marque*195)

//       OFF.push({
//         type  : "Bris de glas " , 
//         val : BBs,
//         ind : "1"
//       })

//      OFF.push({
//        type  : "Vol et incendie " ,
//        val : VIn,
//        ind : "2"
//       })
      
//       setOffres(OFF);

//       ;
//     } else if (0 < age && age <= 5 ){
        
//         const val = (30000 / age) + (values.puiss*values.puiss*400) + (values.marque*values.marque*400)
       
//         var intvalue = Math.round( val );
//         OFF.push({
//             type: "simple",
//             val : intvalue*values.duree+100
//         })

//         const val2 = (55000 / age) + (values.puiss*values.puiss*1000) + (values.marque*values.marque*values.marque*800)
//         var intvalue = Math.round( val2 );
        
//         OFF.push({
//             type: "TR",
//             val : intvalue*values.duree+300
//         })
        
//         const BBs = Math.round(values.marque*170)
//         const VIn = Math.round(values.marque*190)

//         OFF.push({
//           type  : "Bris de glas " , 
//           val : BBs,
//           ind : "1"
//         })

//        OFF.push({
//          type  : "Vol et incendie " ,
//          val : VIn,
//          ind : "2"
//         })
        
//         setOffres(OFF);

//         ;
        
//     } else if (5 < age && age <= 10){
        
//         const val = (28000 / age) + (values.puiss*values.puiss*500) + (values.marque*values.marque*values.marque*600)
//         var intvalue = Math.round( val );
//         OFF.push({
//             type: "simple",
//             val : intvalue*values.duree+100,
//             ind : "3"

//         })

//         const val2 = (50000 / age) + (values.puiss*values.puiss*970) + (values.marque*values.marque*values.marque*900)
//         var intvalue = Math.round( val2 );
//         OFF.push({
//             type: "TR",
//             val : intvalue*values.duree+300,
//             ind : "4"

//         })

//         const BBs = Math.round(values.marque*165)
//         const VIn = Math.round(values.marque*188)

//         OFF.push({
//           type  : "Bris de glas " , 
//           val : BBs,
//           ind : "1"
//         })

//        OFF.push({
//          type  : "Vol et incendie " ,
//          val : VIn,
//          ind : "2"
//         })
        
        
//         setOffres(OFF);

//         ;
        
//     } else if (10 < age && age <= 15){
        
//         const val = (15000 / age) + (values.puiss*values.puiss*100) + (values.marque*values.marque*600)
//         var intvalue = Math.round( val );
//         OFF.push({
//             type: "simple",
//             val : intvalue*values.duree+100,
//             ind : "3"
//         })


//         const val2 = (30000 / age) + (values.puiss*values.puiss*700) + (values.marque*values.marque*values.marque*500)
//         var intvalue = Math.round( val2 );
//         OFF.push({
//             type: "TR",
//             val : intvalue*values.duree+300,
//             ind : "4"
//         })

//         const BBs = Math.round(values.marque*160)
//         const VIn = Math.round(values.marque*185)

//         OFF.push({
//           type  : "Bris de glas " , 
//           val : BBs,
//           ind : "1"
//         })

//        OFF.push({
//          type  : "Vol et incendie " ,
//          val : VIn,
//          ind : "2"
//         })
        
        
//         setOffres(OFF);

//         ;
        
//     }
//     else {

//         const val = (9000 / age) + (values.puiss*values.puiss*180) + (values.marque*values.marque*180)
//         var intvalue = Math.round( val );

//         const BBs = Math.round(values.marque*150)
//         const VIn = Math.round(values.marque*180)

//         OFF.push({
//           type  : "Bris de glas " , 
//           val : BBs,
//           ind : "1"
//         })

//        OFF.push({
//          type  : "Vol et incendie " ,
//          val : VIn,
//          ind : "2"
//         })
      
//         OFF.push({
//             type: "simple",
//             val : intvalue*values.duree+100
//         })

      

//         setOffres(OFF);
//     }
    
//  } 

//   const confirmer = () =>{
//     setEtat(true);
//     setAjd(false);
//     setValues({...values, user:User.uid});
//     setValues({...values, garanties:offs});

   
//   }

//   // const show = ()=>{
//   //   console.log(values);
//   // }

//   const supprimer = (value)=>{
    
//     if(value.type == 'TR'){
//       setall(true);
//       console.log(value.val);

//       setTot(value.val);

//       setValues({...values, 
//         valeur:value.val,
//         type:value.type,
//         marque:'',
//         userN:Info.nom,
//         userPr:Info.prenom,
//         userAdr:Info.adresse,
//         userPhone:Info.phone,
//         userAgen:Info.agence,
//         user:Info.userId,
//       });

//       offs.push(value);
//       values.garanties = offs
     
//     }else{
//     const ind = Offres.indexOf(value);
//     Offres.splice(ind,1);

//     var t = value.val+Tot ;
//     setTot(t);

//     offs.push(value);
//     values.garanties = offs
//     setValues({...values, 
//       valeur:values.valeur + value.val,
//       type:values.type+'/'+value.type,
//       marque:'',
//       userN:Info.nom,
//       userPr:Info.prenom,
//       userAdr:Info.adresse,
//       userPhone:Info.phone,
//       userAgen:Info.agence,
//       user:Info.userId,
//     });
//     }

   
//   }


//   const sendinfos = async ()=>{
    


//     if (
//       values.marque !== '' && 
//       values.TypeV !== '' && 
//       values.type !== '' && 
//       values.valeur > 0 &&
//       values.duree > 0 &&
//       values.nom !== '' &&
//       values.annes !== '' &&
//       values.puiss !== '' &&
//       values.numS !== '' &&
//       values.poids !== '' &&
//       values.place !== '' &&
//       values.imma !== '' &&
//       values.immaP !== '' &&
//       values.energie !== '' &&
//       values.caross !== '' &&
//       values.charge !== '' ){
         
//         await addDoc(collection (db,"Demandes",), values).then(()=>{
//                       setSucces(true)
//                   })
//                   .catch((error) => {
//                     console.log(error.message);
//                   });
//        }
//        else{
//         console.log(values);
//         setErrors({ problem: "veillez remplire tout les champs SVP!"})
//        }

//   }


//     // const content = (
      
//     //   );


  


   



// return (
//     <div style={{padding : " 10%"}}>
    
//     <Grid container spacing={1}  >

//   <Grid  xs={12} sm={12} >
  
//   <Carousel>
//                 {pictures.map(({image, title}) => (
//                     <CarouselSlide key={image} autoPlay>
//                         <Card>
//                             <CardMedia
//                                 image={image}
//                                 title={title}
//                                 style={{
//                                   padding: '25%',
//                                   height: '100%',
//                                 }}
//                             />
//                             {/* <CardContent>
//                                 <Typography>{title}</Typography>
//                             </CardContent> */}
//                         </Card>
//                     </CarouselSlide>
//                 ))}
//             </Carousel>

//   </Grid>
//   <br></br>
//   <br></br>
//   <Typography align='center'  variant="h4" display="block" gutterBottom={true} > Ajouter un vehicule </Typography> 
//   <br></br>
//   <br></br>
  
//   {ajd &&

//   <Grid xs={12} style={Gba} container >
//   { grn && <Grid xs={12} container style={{padding : "5%" }}>


// <Grid xs={6}>
//     <Typography variant="overline">Marque</Typography>
//     </Grid>
//     <Grid xs={6}>
//     <Select
//     label="Marque"

//     labelId="demo-simple-select-label"
//     id="demo-simple-select"
//     value={values.marque}
//     onChange={(e)=>{setValues({...values, marque:e.target.value})}}
//     style={{width : "100%", height : "50%"}}
//   >
//     <MenuItem value={2.1}>Renault</MenuItem>
//     <MenuItem value={2.2}>Peugot</MenuItem>
//     <MenuItem value={2.3}>Fiat</MenuItem>
//     <MenuItem value={2.4}>Dacia</MenuItem>
//     <MenuItem value={2.5}>Opel</MenuItem>
//     <MenuItem value={2.6}>suzuki</MenuItem>

//     <MenuItem value={4.1}>BMW</MenuItem>
//     <MenuItem value={4.01}>WV</MenuItem>
//     <MenuItem value={4.002}>LandRover</MenuItem>
//     <MenuItem value={4.2}>Bentli</MenuItem>
//     <MenuItem value={4.12}>Audi</MenuItem>
//     <MenuItem value={4.13}>Mercides</MenuItem>

//     <MenuItem value={3.1}>Ford</MenuItem>
//     <MenuItem value={3.2}>Nissan</MenuItem>
//     <MenuItem value={3.3}>Mitsubishi</MenuItem>
//     <MenuItem value={3.4}>Honda</MenuItem>
//     <MenuItem value={3.5}>hunday</MenuItem>
//     <MenuItem value={3.55}>Sckoda</MenuItem>
//     <MenuItem value={3.6}>Toyota</MenuItem>
//   </Select>
//         </Grid>


//   <Grid xs={6}>
//     <Typography variant="overline">Nom</Typography>
//     </Grid>
//     <Grid xs={6}>
//     <TextField style={{width : "100%"}} id="outlined-basic"  variant="outlined" value={values.nom} onChange={(e)=>{setValues({...values, nom:e.target.value})}} />  
//       </Grid>


//       <Grid xs={6} style={mrg}>
//     <Typography variant="overline">Annee</Typography>
//     </Grid>
//     <Grid xs={6} style={mrg}>
//     <TextField id="outlined-basic"  style={{width : "100%"}}  variant="outlined" value={values.annes} onChange={(e)=>{setValues({...values, annes:e.target.value})}} />      
//     </Grid>
    
//     <Grid xs={6} style={mrg}>
//     <Typography variant="overline">Puissance</Typography>
//     </Grid>
//     <Grid xs={6} style={mrg}>
//     <TextField  style={{width : "100% ", height : " 10%"}} id="outlined-basic"  type='number'   value={values.puiss} onChange={(e)=>{setValues({...values, puiss:e.target.value})}} />
//     </Grid>

    
//     <Grid xs={6}>
//     <Typography variant="overline">Duree</Typography>
//     </Grid>
//     <br></br>
//     <Grid xs={6}>
//     <Select
//     label="Duree"

//     labelId="demo-simple-select-label"
//     id="demo-simple-select"
//     value={values.duree}
//     onChange={(e)=>{setValues({...values, duree:e.target.value})}}
//     style={{width : "100%", height : "50%"}}
//   >
//     <MenuItem value={1}>Une annee</MenuItem>
//     <MenuItem value={0.5}>6 mois</MenuItem>
   
//   </Select>
//         </Grid>

//     <Grid xs={12}>


      

//     <Button variant="contained" sx={{marginTop : '3%' }} onClick={()=>{calcule() ; setDgrn(false)}}>Calculer 
//     {/* { envoi ? <div  >
//                                   <ClipLoader size={15}  />
//                                   </div> 
//                             : <></>} */}
//     </Button>
//     </Grid>
//     </Grid>}



//     <Grid  xs={12}  >
    
//     {Offres.map((value) => (
//       <>
//        <ListItem
//             key={value}
//             disableGutters
//             style={Gb2}
//             >
            
//             <ListItemText  
//             primary={`${value.type}`}
//             secondary={`valeur: ${value.val} DA `}/>
//             {all ? 
//             <>
//             <DoneOutlineTwoToneIcon></DoneOutlineTwoToneIcon><p>inclut</p>
//             </>
//             :
//             <>

//             <Button  className='btnsPre' onClick={()=>{  setValues({...values, type:values.type+'/'+value.type, }); ; supprimer(value) }} >Prendre
//             </Button>
//             </>}

//             {/* {Tr && 
//               <>
//               <Button  className='btnsPre' onClick={enlever(value)} >enlever
//               </Button>
//               </> 
//               } */}
            
           
            
                
//             </ListItem>
//             </>
//         ))}
//                     { cnf &&   
//                     <> 
//                     <p className='payee'>Total a paye :  {values.valeur}</p>
//                     <Button  className='btnsPre' onClick={()=>{ confirmer()}} >Confirmer</Button>
//                     </>
//                     }

//   </Grid>
//     </Grid>}


// { Etat ? 
// <div style={{padding : " 10%"}}>

// <Grid container ItemL sm={12} className="constJG">

// <Grid  sm={4} xs={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> Nom : 
// </Typography> 
// </Grid>
// <Grid  sm={8} xs={6} style={Gb}>

// <Typography variant="overline" display="block" gutterBottom> {Info.nom} 
// </Typography>
// </Grid>

// <Grid  sm={4} xs={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> Prenom : 
// </Typography> 
// </Grid>
// <Grid  sm={8} xs={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> {Info.prenom} 
// </Typography> </Grid>

// <Grid  sm={4} xs={6}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> Adresse : 
// </Typography> 
// </Grid>
// <Grid  sm={8} xs={6}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> {Info.adresse} 
// </Typography> </Grid>

// <Grid  sm={4} xs={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> agence : 
// </Typography> 
// </Grid>
// <Grid  sm={8} xs={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> {Info.agence} 
// </Typography> </Grid>

// <Grid xs={6} sm={4}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> Phone : 
// </Typography> 
// </Grid>
// <Grid xs={6} sm={8}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> {Info.phone} 
// </Typography> </Grid>

// <Grid xs={6} sm={3}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> assurance :
// </Typography>
// </Grid>
// <Grid xs={6} sm={3}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> {values.type} 
// </Typography>
// </Grid>
// <Grid xs={6} sm={3}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> valeur estimee :  
// </Typography>
// </Grid>
// <Grid className='vert' xs={6} sm={3}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> {values.valeur} DA
// </Typography>
// </Grid>

// <Grid  xs={12} sm={4}  style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> Marque : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.marque} onChange={(e)=>{setValues({...values, marque:e.target.value}) ;}} />
//  </Typography> 

      
// </Grid>
// <Grid item xs={12} sm={4} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom>   Type : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.TypeV} onChange={(e)=>{setValues({...values, TypeV:e.target.value}) ;}} />
// </Typography> 

        
        
// </Grid>
// <Grid item xs={12} sm={4} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> N DE SERIE DU TYPE : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.numS} onChange={(e)=>{setValues({...values, numS:e.target.value}) ; }} />
// </Typography> 

        
        
// </Grid>
// <Grid item xs={12} sm={6} container style={Gb}>
// <Grid item xs={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> CAROSSERIE :
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.caross} onChange={(e)=>{setValues({...values, caross:e.target.value}) ; }} /> 
// </Typography> 

        
        
// </Grid>

// <Grid item xs={6} >
// <Typography variant="overline" display="block" gutterBottom> ENERGIE : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.energie} onChange={(e)=>{setValues({...values, energie:e.target.value}) ; }} /> 
// </Typography> 

        
        
// </Grid>
        
        
// </Grid>
// <Grid item xs={12} sm={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> PLASSES ASSISES : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.place} onChange={(e)=>{setValues({...values, place:e.target.value}) ; }} /> 
// </Typography> 

        
        
// </Grid>
// <Grid item xs={6} sm={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> POIDS TOTAL EN CHARGE : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.poids} onChange={(e)=>{setValues({...values, poids:e.target.value}) ; }} /> 
// </Typography> 

        
        
// </Grid>
// <Grid item xs={6} sm={6} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> CHARGE UTILE : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.charge} onChange={(e)=>{setValues({...values, charge:e.target.value}) ; }} /> 
// </Typography> 

        
        
// </Grid>

// <Grid item xs={6} sm={5} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> N D IMMATRICULATION: 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.imma} onChange={(e)=>{setValues({...values, imma:e.target.value}) ;}} /> 
// </Typography> 

        
        
// </Grid>
// <Grid item xs={6} sm={5} style={Gb}>
// <Typography variant="overline" display="block" gutterBottom> NUM PRECEDENT : 
// <br></br>
// <TextField id="outlined-basic"  variant="outlined" value={values.immaP} onChange={(e)=>{setValues({...values, immaP:e.target.value}) ; }} /> 
// </Typography> 

        
        
// </Grid>

// <Grid item xs={12} sm={2} style={Gb}>
// <Typography variant="outlined-basic" display="block" gutterBottom> ANNEE DE PREMIER MIS EN CIRCULATION : 
// <br></br>
// {values.annes} 
// </Typography> 

        
        
// </Grid>
// <br></br>
// <button className='btnsCD' variant="contained" sx={{marginTop : '10%' ,marginLeft : '35%'}} onClick={()=>{ sendinfos()}}>Envoyer la Demande</button> 


// </Grid>
// {Errors.problem && <p className="error">{Errors.problem}</p>} 
// {succes ? 
//         <p className="succès">Demande envoyer avec succès</p> 
//         : 
//         <></>} 
// </div> : 
// <>

// </>}


// </Grid>

// </div>

// );

// }

// // import { Grid, makeStyles } from '@material-ui/core';
// // import React, { useEffect, useState } from "react";
// // import { useHistory } from "react-router-dom";

// // import { styled } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import Paper from '@mui/material/Paper';
// // import Sidebar from '../sidebar';

// // import Card from '@mui/material/Card';
// // import CardContent from '@mui/material/CardContent';
// // import CardMedia from '@mui/material/CardMedia';
// // import Typography from '@mui/material/Typography';
// // import { CardActionArea } from '@mui/material';
// // import Divider from '@mui/material/Divider';
// // import Chip from '@mui/material/Chip';

// // import Stack from '@mui/material/Stack';
// // import TextField from '@mui/material/TextField';


// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemText from '@mui/material/ListItemText';
// // import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

// // import { db, auth, logoutUser, user  } from "../../bdd/firebase";
// // import {
// //   onAuthStateChanged,
  
// // } from "firebase/auth";
// // import {
// //   collection,
// //   query,
// //   where,
// //   onSnapshot,
// //   addDoc,
// //   Timestamp,
// //   orderBy,
// //   setDoc,
// //   doc,
// //   getDoc,
// //   updateDoc,
// //   getDocs,
// // } from "firebase/firestore";


// // import "../../style.css";


// // import Slider from '@mui/material/Slider';
// // import Carousel from 'react-material-ui-carousel';
// // import CarouselSlide from 'react-material-ui-carousel';
// // import Select from '@mui/material/Select';
// // import MenuItem from '@mui/material/MenuItem';
// // import Button from '@mui/material/Button';
// // import { flexbox } from '@mui/system';
// // import { Row } from 'react-bootstrap';


// // import Form from 'react-bootstrap/Form';
// // import { info } from 'sass';




// // export default function CarAjout() {

// //     const [User, setUser] = useState({});
// //     const [Info, setInfo] = useState({});
    
// //     useEffect(async () => {
// //       onAuthStateChanged(auth, async (currentUser) => {
// //           if (auth.currentUser){
// //             setUser(currentUser);
// //           const infos = await getDoc(doc(db, "Users", currentUser.uid));
// //           setInfo(infos.data());
          

// //           }

// //           });
      
      
// //     }, []);



// //     const pictures = [
// //         {image:'../assets/images/jeune.webp', title:'Iu 1'},
// //         {image:'../assets/images/slider-img.png', title:'Iu 2'},
// //         {image:'../assets/images/assurance1.PNG', title:'Iu 3'},
// //         {image:'../assets/images/12.jpg', title:'Iu 3'},
// //         {image:'../assets/images/image1.jpg', title:'Iu 3'},
// //     ];




// //   const hmar = {
// //     marginTop: "5%"
// //   }
// //   const style = {
// //     width: '100%',
// //     maxWidth: 360,
// //     marginTop: '%'
// //   };
// //   const Gb ={
// //     boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',


    
  
// //   }
// //   const Gb2 ={
// //     boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)',
// //     backgroundColor: 'white',
// //     padding: '5%',

// //   }

// //   const Item2 = styled(Paper)(({ theme }) => ({
// //     backgroundColor: theme.palette.mode === 'white' ? 'white' : '#fff',
// //     ...theme.typography.body2,
// //     padding: theme.spacing(1),
// //     textAlign: 'center',
// //     color: theme.palette.text.secondary,
// //     width: '60%',
// //     boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
    
// //     marginTop:'20%',
// //     marginLeft:'20%'
// //   }));
  
// //   const ItemL = styled(Paper)(({ theme }) => ({
// //     backgroundColor: theme.palette.mode === 'dark' ? '#C3ECFD' : '#C3ECFD',
// //     ...theme.typography.body2,
  
// //   }));


// //   const Item = styled(Paper)(({ theme }) => ({
    
// //     ...theme.typography.body2,
// //     padding: theme.spacing(1),
// //     textAlign: 'center',
// //     backgroundColor: "white",
// //     width: '60%',
// //     boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
    

// //     marginLeft:'20%'
// //   }));

// //   const [Car, setCar] = useState({});
// //   const [Etat, setEtat] = useState(false);
// //   const [Offres, setOffres] = useState([]);
// //   const OFF =[];
// //   const [O, setO] = useState({});
// //   const [values, setValues] = useState({

// //     type:"",
// //     valeur:"",


// //     nom:'',
// //     annes:'',
// //     puiss:"",
// //     marque:'',

// //     TypeV:'',
// //     numS:'',
// //     poids:"",
// //     place:'',
// //     imma:'',
// //     immaP:'',
// //     energie:'',
// //     caross:'',
// //     charge:'',
// //   })
  
// //  const calcule = () =>{
// //     const date = new Date();
// //     const Sdate = date.getFullYear();

// //     const age = Sdate-values.annes;

// //     if (age <= 5 ){
        
// //         const val = (30000 / age) + (values.puiss*values.puiss*400) + (values.marque*values.marque*400)
// //         var intvalue = Math.round( val );
// //         OFF.push({
// //             type: "simple",
// //             val : intvalue
// //         })

// //         const val2 = (55000 / age) + (values.puiss*values.puiss*1000) + (values.marque*values.marque*values.marque*800)
// //         var intvalue = Math.round( val2 );
// //         OFF.push({
// //             type: "TR",
// //             val : intvalue
// //         })
        
        
// //         setOffres(OFF);

// //         ;
        
// //     } else if (5 < age && age <= 10){
        
// //         const val = (28000 / age) + (values.puiss*values.puiss*500) + (values.marque*values.marque*values.marque*600)
// //         var intvalue = Math.round( val );
// //         OFF.push({
// //             type: "simple",
// //             val : intvalue
// //         })

// //         const val2 = (50000 / age) + (values.puiss*values.puiss*970) + (values.marque*values.marque*values.marque*900)
// //         var intvalue = Math.round( val2 );
// //         OFF.push({
// //             type: "TR",
// //             val : intvalue
// //         })
        
        
// //         setOffres(OFF);

// //         ;
        
// //     } else if (10 < age && age <= 15){
        
// //         const val = (15000 / age) + (values.puiss*values.puiss*100) + (values.marque*values.marque*600)
// //         var intvalue = Math.round( val );
// //         OFF.push({
// //             type: "simple",
// //             val : intvalue
// //         })

// //         const val2 = (30000 / age) + (values.puiss*values.puiss*700) + (values.marque*values.marque*values.marque*500)
// //         var intvalue = Math.round( val2 );
// //         OFF.push({
// //             type: "TR",
// //             val : intvalue
// //         })
        
        
// //         setOffres(OFF);

// //         ;
        
// //     }
// //     else {

// //         const val = (10000 / age) + (values.puiss*values.puiss*200) + (values.marque*values.marque*200)
// //         var intvalue = Math.round( val );
// //         OFF.push({
// //             type: "simple",
// //             val : intvalue
// //         })

// //         setOffres(OFF);
// //     }
    
// //  } 

// //   const prendre = () =>{
// //     setEtat(true);
// //   }
  
// //     // const content = (
      
// //     //   );
    
// // return (
// //     <div style={{padding : " 10%"}}>
    
// //     <Grid container spacing={1}  >

// //   <Grid  xs={12} sm={12} >
  
// //   <Carousel>
// //                 {pictures.map(({image, title}) => (
// //                     <CarouselSlide key={image} autoPlay>
// //                         <Card>
// //                             <CardMedia
// //                                 image={image}
// //                                 title={title}
// //                                 style={{
// //                                   padding: '25%',
// //                                   height: '100%',
// //                                 }}
// //                             />
// //                             {/* <CardContent>
// //                                 <Typography>{title}</Typography>
// //                             </CardContent> */}
// //                         </Card>
// //                     </CarouselSlide>
// //                 ))}
// //             </Carousel>

// //   </Grid>
// //   <br></br>
// //   <br></br>
// //   <Typography align='center'  variant="h4" display="block" gutterBottom={true} > Ajouter un vehicule </Typography> 
// //   <br></br>
// //   <br></br>
  
// //   <Grid container Item2 xs={12} sm={12} style={Gb}>

// //   <Grid  xs={6} sm={6} >
// //     <Form className='coll'>

// //            <Typography variant="overline" display="block" gutterBottom>
// // Marque : 
// // <Select
// //     labelId="demo-simple-select-label"
// //     id="demo-simple-select"
// //     value={values.marque}
// //     label="marque"
// //     onChange={(e)=>{setValues({...values, marque:e.target.value})}}
// //   >
// //     <MenuItem value={2.1}>Renault</MenuItem>
// //     <MenuItem value={2.2}>Peugot</MenuItem>
// //     <MenuItem value={2.3}>Fiat</MenuItem>
// //     <MenuItem value={2.4}>Dacia</MenuItem>
// //     <MenuItem value={2.5}>Opel</MenuItem>
// //     <MenuItem value={2.6}>suzuki</MenuItem>

// //     <MenuItem value={4.1}>BMW</MenuItem>
// //     <MenuItem value={4.2}>Mercides</MenuItem>
// //     <MenuItem value={4.3}>LandRover</MenuItem>
// //     <MenuItem value={4.4}>Bentli</MenuItem>
// //     <MenuItem value={4.5}>Audi</MenuItem>
// //     <MenuItem value={4.6}>WV</MenuItem>

// //     <MenuItem value={3.1}>Ford</MenuItem>
// //     <MenuItem value={3.2}>Nissan</MenuItem>
// //     <MenuItem value={3.3}>Mitsubishi</MenuItem>
// //     <MenuItem value={3.4}>Honda</MenuItem>
// //     <MenuItem value={3.5}>hunday</MenuItem>
// //     <MenuItem value={3.55}>Sckoda</MenuItem>
// //     <MenuItem value={3.6}>Toyota</MenuItem>
// //   </Select>
// //      </Typography>
// //       {/* <Divider textAlign="left" sx={{ maxWidth : 400}}>    */}
      

// //       {/* </Divider> */}
// //       <List sx={style} component="nav" aria-label="mailbox folders">

// //         <Typography variant="overline" display="block" gutterBottom>
// //         NOM: <TextField id="outlined-basic"  variant="outlined" value={values.nom} onChange={(e)=>{setValues({...values, nom:e.target.value})}} />
// //         </Typography>
      
// //       <Typography variant="overline" display="block" gutterBottom> Annes : 
// //       <TextField id="outlined-basic"  variant="outlined" value={values.annes} onChange={(e)=>{setValues({...values, annes:e.target.value})}} />
// //       </Typography>

// //       <Typography variant="overline" display="block" gutterBottom> puissance : 
// //       <TextField id="outlined-basic" type='number'  variant="outlined" value={values.puiss} onChange={(e)=>{setValues({...values, puiss:e.target.value})}} />
// //       </Typography>
      

     


// //   <Button variant="contained" sx={{marginTop : '3%'}} onClick={calcule}>Calculer 
// //     {/* { envoi ? <div  >
// //                                   <ClipLoader size={15}  />
// //                                   </div> 
// //                             : <></>} */}
// //     </Button>
// //       <Divider light />


// //       {/* <ListItem >
// //         <ListItemText primary="kach info niden" />
// //       </ListItem> */}


// //     </List>
// //     </Form>
// //   </Grid>

// //   <Grid  xs={6} sm={6} >
// //     <Form className='coll2'>
// //     {Offres.map((value) => (
// //             <ListItem
// //             key={value}
// //             disableGutters
// //             style={Gb2}
// //             >
            
// //             <ListItemText  
// //             primary={`${value.type}`}
// //             secondary={`valeur: ${value.val} DA `}/>
            
// //             <Button  className='btnsPre' onClick={()=>{prendre(); setValues({...values, valeur:value.val, type:value.type , marque:""})}} >Prendre
// //             </Button>
// //             {/* {value.loading ? <>
// //                 <IconButton aria-label="comment">
// //                 <DoneOutlineTwoToneIcon color="success" />
// //                 </IconButton></> : 
// //                 <>
// //                 <IconButton aria-label="comment">
// //                 <Clear color="Error" />
// //                 </IconButton>
// //                 </>} */}
            
                
// //             </ListItem>
// //         ))}
// // </Form>
// //   </Grid>

// //   </Grid>


// // { Etat ? 
// // <div style={{padding : " 10%"}}>

// // <Grid container ItemL sm={12} className="constJG">

// // <Grid  sm={4} xs={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> Nom : 
// // </Typography> 
// // </Grid>
// // <Grid  sm={8} xs={6} style={Gb}>

// // <Typography variant="overline" display="block" gutterBottom> {Info.nom} 
// // </Typography>
// // </Grid>

// // <Grid  sm={4} xs={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> Prenom : 
// // </Typography> 
// // </Grid>
// // <Grid  sm={8} xs={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> {Info.prenom} 
// // </Typography> </Grid>

// // <Grid  sm={4} xs={6}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> Adresse : 
// // </Typography> 
// // </Grid>
// // <Grid  sm={8} xs={6}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> {Info.adresse} 
// // </Typography> </Grid>

// // <Grid  sm={4} xs={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> agence : 
// // </Typography> 
// // </Grid>
// // <Grid  sm={8} xs={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> {Info.agence} 
// // </Typography> </Grid>

// // <Grid xs={6} sm={4}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> Phone : 
// // </Typography> 
// // </Grid>
// // <Grid xs={6} sm={8}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> {Info.phone} 
// // </Typography> </Grid>

// // <Grid xs={6} sm={3}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> assurance :
// // </Typography>
// // </Grid>
// // <Grid xs={6} sm={3}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> {values.type} 
// // </Typography>
// // </Grid>
// // <Grid xs={6} sm={3}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> valeur estimee :  
// // </Typography>
// // </Grid>
// // <Grid xs={6} sm={3}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> {values.valeur} DA
// // </Typography>
// // </Grid>

// // <Grid  xs={12} sm={4}  style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> Marque : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.marque} onChange={(e)=>{setValues({...values, marque:e.target.value}) ; console.log(e.target)}} />
// //  </Typography> 

      
// // </Grid>
// // <Grid item xs={12} sm={4} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom>   Type : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.TypeV} onChange={(e)=>{setValues({...values, TypeV:e.target.value}) ; console.log(e.target)}} />
// // </Typography> 

        
        
// // </Grid>
// // <Grid item xs={12} sm={4} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> N DE SERIE DU TYPE : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.numS} onChange={(e)=>{setValues({...values, numS:e.target.value}) ; console.log(e.target)}} />
// // </Typography> 

        
        
// // </Grid>
// // <Grid item xs={12} sm={6} container style={Gb}>
// // <Grid item xs={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> CAROSSERIE :
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.caross} onChange={(e)=>{setValues({...values, caross:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>

// // <Grid item xs={6} >
// // <Typography variant="overline" display="block" gutterBottom> ENERGIE : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.energie} onChange={(e)=>{setValues({...values, energie:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>
        
        
// // </Grid>
// // <Grid item xs={12} sm={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> PLASSES ASSISES : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.place} onChange={(e)=>{setValues({...values, place:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>
// // <Grid item xs={6} sm={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> POIDS TOTAL EN CHARGE : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.poids} onChange={(e)=>{setValues({...values, poids:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>
// // <Grid item xs={6} sm={6} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> CHARGE UTILE : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.charge} onChange={(e)=>{setValues({...values, charge:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>

// // <Grid item xs={6} sm={5} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> N D IMMATRICULATION: 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.imma} onChange={(e)=>{setValues({...values, imma:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>
// // <Grid item xs={6} sm={5} style={Gb}>
// // <Typography variant="overline" display="block" gutterBottom> NUM PRECEDENT : 
// // <br></br>
// // <TextField id="outlined-basic"  variant="outlined" value={values.immaP} onChange={(e)=>{setValues({...values, immaP:e.target.value}) ; console.log(e.target)}} /> 
// // </Typography> 

        
        
// // </Grid>

// // <Grid item xs={12} sm={2} style={Gb}>
// // <Typography className='circu'  variant="outlined" display="block" gutterBottom> ANNEE DE PREMIER MIS EN CIRCULATION : 
// // <br></br>
// // {values.annes} 
// // </Typography> 

        
        
// // </Grid>


// // </Grid>
// // </div> : 
// // <>

// // </>}


// // </Grid>

// // </div>

// // );

// // }