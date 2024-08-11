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
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { db, auth  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";


import "../../style.css";


import Carousel from 'react-material-ui-carousel';
import CarouselSlide from 'react-material-ui-carousel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';



import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClipLoader from "react-spinners/ClipLoader";












const steps = ['Infos Initiales', 'Devis Des Garanties', 'Infomations Detaillees'];



const theme = createTheme();
export default function RenouVe({car}) {
    const idCar = useParams();
    console.log(idCar);

    
    
      const models =[   
        { value : "2.1",  nom: 'Renault'},
           
        {value : '2.2', nom: 'Peugot'},
        {value :  '2.3' , nom:  'Fiat'},
        {value : '2.4' , nom: 'Dacia'},
        {value : '2.5' , nom: 'Opel'},
        {value : '2.6' , nom: 'suzuki'},
    
        {value : '4.1' , nom: 'BMW'},
        {value : '4.01' , nom: 'WV'},
        {value : '4.002' , nom: 'LandRover'},
        {value : '4.2' , nom: 'Bentli'},
        {value : '4.12' , nom: 'Audi'},
        {value : '4.13', nom: 'Mercides'},
    
        {value : '3.1', nom: 'Ford'},
        {value : '3.2'  , nom:'Nissan'},
        {value : '3.3', nom: 'Mitsubishi'},
        {value : '3.4' , nom:'Honda'},
        {value : '3.5', nom: 'hunday'},
        {value : '3.55', nom: 'Sckoda'},
        {value : '3.6' , nom:'Toyota'}]
        var mv= ''
        models.map((mdl)=>{
            if (mdl.nom == car.marque){
                console.log(mdl.value)
                mv=mdl.value
            }
        })
    console.log(car)

  function getStepContent(step) {
    switch (step) {
      case 0:
        return    <React.Fragment>
   
        <Grid container spacing={3}>
        <Grid xs={6}>
      <Typography variant="overline" defaultValue={values.marque}>Marque</Typography>
      </Grid>
      <Grid xs={6}>
      <Typography variant="subtitle1">{car.marque}</Typography>
          </Grid>
  
  
    <Grid xs={6}>
      <Typography variant="overline">Nom</Typography>
      </Grid>
      <Grid xs={6}>
      <Typography variant="subtitle1">{car.nom}</Typography>
        </Grid>
  
  
        <Grid xs={6} style={mrg}>
      <Typography variant="overline">Annee</Typography>
      </Grid>
      <Grid xs={6} style={mrg}>
      <Typography variant="subtitle1">{car.annes}</Typography>
      </Grid>
      
      <Grid xs={6} style={mrg}>
      <Typography variant="overline">Puissance</Typography>
      </Grid>
      <Grid xs={6} style={mrg}>
      <Typography variant="subtitle1">{car.puiss}</Typography>
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

                      {/* <Button  className='btnsPre' onClick={()=>{handleNext()}} >Confirmer</Button> */}
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
  <button className='btnsCD' variant="contained" sx={{marginTop : '10%' ,marginLeft : '35%'}} onClick={()=>{ sendinfos()}}>Renouvler
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
  const [envoi , setenvoi] = useState(false);
  const [aucun , setaucun] = useState(false);

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

  if (!values.annes && !values.puiss && !values.marque && !values.duree){
    setaucun(true);
  }else{
  handleNext();
    const date = new Date();
    const Sdate = date.getFullYear();
    setCnf(true);

    const age = Sdate-values.annes;
   


    console.log(mv)
    if (age == 0){
      const val = (30000+1600) + (values.puiss*values.puiss*400) + (mv*mv*400)
      
      var intvalue = Math.round( val );
      OFF.push({
          type: "simple",
          val : intvalue*values.duree+100
      })

      const val2 = (55000+2500) + (values.puiss*values.puiss*1000) + (mv*mv*mv*800)
      var intvalue = Math.round( val2 );
      
      OFF.push({
          type: "TR",
          val : intvalue*values.duree+300
      })
      
      const BBs = Math.round(mv*175)
      const VIn = Math.round(mv*195)

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
        
        const val = (30000 / age) + (values.puiss*values.puiss*400) + (mv*mv*400)
       
        var intvalue = Math.round( val );
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100
        })

        const val2 = (55000 / age) + (values.puiss*values.puiss*1000) + (mv*mv*mv*800)
        var intvalue = Math.round( val2 );
        
        OFF.push({
            type: "TR",
            val : intvalue*values.duree+300
        })
        
        const BBs = Math.round(mv*170)
        const VIn = Math.round(mv*190)

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
        
        const val = (28000 / age) + (values.puiss*values.puiss*500) + (mv*mv*mv*600)
        var intvalue = Math.round( val );
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100,
            ind : "3"

        })

        const val2 = (50000 / age) + (values.puiss*values.puiss*970) + (mv*mv*mv*900)
        var intvalue = Math.round( val2 );
        OFF.push({
            type: "TR",
            val : intvalue*values.duree+300,
            ind : "4"

        })

        const BBs = Math.round(mv*165)
        const VIn = Math.round(mv*188)

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
        
        const val = (15000 / age) + (values.puiss*values.puiss*100) + (mv*mv*600)
        var intvalue = Math.round( val );
        OFF.push({
            type: "simple",
            val : intvalue*values.duree+100,
            ind : "3"
        })


        const val2 = (30000 / age) + (values.puiss*values.puiss*700) + (mv*mv*mv*500)
        var intvalue = Math.round( val2 );
        OFF.push({
            type: "TR",
            val : intvalue*values.duree+300,
            ind : "4"
        })

        const BBs = Math.round(mv*160)
        const VIn = Math.round(mv*185)

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

        const val = (9000 / age) + (values.puiss*values.puiss*180) + (mv*mv*180)
        var intvalue = Math.round( val );

        const BBs = Math.round(mv*150)
        const VIn = Math.round(mv*180)

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
    setValues({...values, marque:car.marque}) 


    console.log(values);

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
         
        await setDoc(doc (db,"Demandes", car.ID), values).then(()=>{
                      setenvoi(false);
                      handleNext();
                      setSucces(true);
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


   



console.log(car)
  const mrg ={
    marginTop : "5%"
  }


  const [values, setValues] = useState({

    demande: "Renouvlement",

    userN:'',
    userPr:'',
    userAdr:'',
    userPhone:'',
    userAgen:'',
    user:'',


    type:car.type,
    valeur:0,
    duree:0,

    dateD:car.dateF,
    dateF: "",

    nom:car.nom,
    annes:car.annes,
    puiss:car.puiss,
    marque:car.marque,

    TypeV:car.TypeV,
    numS:car.numS,
    poids:car.poids,
    place:car.place,
    imma:car.imma,
    immaP:car.immaP,
    energie:car.energie,
    caross:car.caross,
    charge:car.charge,
    garanties :[],
    idCar : idCar.idC

  })


return (
    <div style={{padding : " 10%"}}>
    
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
  <Typography align='center'  variant="h4" display="block" gutterBottom={true} > Renouvler Votre Assurance </Typography> 
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
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },    boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)', }}>
      
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
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
                  Votre demande a ete envoye avec succes , vous recevrez un message des qu'elle seras traite 
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

