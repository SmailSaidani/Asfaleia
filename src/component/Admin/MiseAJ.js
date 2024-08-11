import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, auth  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,

} from "firebase/firestore";
import {
    deleteObject,
    ref,
    getStorage,
  } from "firebase/storage";
import "../Client/feed.css";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@mui/material/Button';



import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';






import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';




import Sidebar from "../sidebar";
import Logo from '../logoL';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Gb ={
    boxShadow: '0 3px 5px rgb(192, 193, 194)',
  
}
  

export default function MiseAj() {


    const id = useParams();
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const history = useHistory();
    const [User, setUser] = useState({});
    const [Accepter, setAccepter] = useState([]);
    const [Car, setCar] = useState({
        images:[],
        imagesMaj:[],
    });
    const [ajou , setajou] =useState(true);
    const [envoi, setenvoi] = useState(false);
    const [envoiIm, setenvoiIm] = useState(false);
    const [decline, setdecline] = useState(false);
    const [retour, setretour] = useState(false);
    const [existe, setexiste] = useState();
    const [motif , setmotif] = useState('');
    const [error , seterror] = useState();
    const [errorEn , seterrorEn] = useState();
    

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

    useEffect(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (auth.currentUser){
          setUser(currentUser);

          const infos = await getDoc(doc(db, "imagesMaj", id.id));
          
          if(!infos.exists()){
            setretour(true);
            setexiste("Cette demande n'existe plus ; la mise a jour a deja ete efectuee ");
            
          } 
          if (infos.exists()){
            setCar(infos.data());
            const User = await getDoc(doc(db, "Users", infos.data().user));
            setUser(User.data());
          }
          

          }

          });
      
      
    }, []);

    const supprimer = (image) =>{
        seterrorEn();

        setajou(false);

        Car.imagesMaj.push(image);

        const index = Accepter.indexOf(image);
        Accepter.splice(index , 1);

        setTimeout(() => {
          setajou(true);  
        }, 200); 
    }
    const accepter = (image) =>{
        seterrorEn();
        setajou(false);
        Accepter.push(image);
        const index = Car.imagesMaj.indexOf(image);
        Car.imagesMaj.splice(index , 1);
        setTimeout(() => {
          setajou(true);  
        }, 200);    
        
    }

    const envoyerRef = async () =>{
        if(motif == ''){
            seterror('veillez inserer un motif de refus SVP!')
        }else{

            console.log(Car);
            await updateDoc(doc(db, "Users", Car.user , "cars" , id.id ),{ Refus: 'Votre demande est refuser pour motif : '+motif }).then(()=>{
                setajou(false);
                setdecline(false);
                setenvoi(true);
            }) .catch((error) => {
                console.log(error.message);
            });
        }
    }
//=========================suppp des photo apres les avoire remplacer a voir apres =======================
    const dele = () =>{
        console.log("===================================================")
        const photo = "https://firebasestorage.googleapis.com/v0/b/asfaleia-vehicule.appspot.com/o/files%2Fbale55.jpg?alt=media&token=451fea99-5a31-4045-8bf3-77a62fcdf540";

        const storage = getStorage();

        const storageRef = ref(storage, photo);
        deleteObject(storageRef)
        .then(() => {
            console.log("File deleted successfully");
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
//======================================================================================
    
    const envoyerIma = async () =>{
        
        if( Accepter.length == 2 || Accepter.length < 2 ){
            seterrorEn('Veuillez accepter au moins 3 photo!');
        }else{
            
            await updateDoc(doc(db, "Users", Car.user , "cars" , id.id ),{ images: Accepter , Refus:"", DateMAJ: new Date().toLocaleDateString() }).then(async()=>{
                await deleteDoc(doc(db, "imagesMaj",id.id )).then(()=>{})
                .catch((error) => {
                  console.log(error.message);
                });
                setajou(false);
                setenvoiIm(true);
                setexiste("Cette demande n'existe plus ; la mise a jour a deja ete efectuee ");
            }) .catch((error) => {
                console.log(error.message);
            });
            
        }
    }

    
    return (
        <>
        {retour ? 
            <>
            <Sidebar/>
            {existe && (<p style={{color: "red"}} className="main-heading1">{existe} </p>)}
            <Logo/>
            </>
             :
            <div>
            <Sidebar/>
          <div class="container">
          <div  class="header2-container" >
              <div class="header">
              <h1 class="main-heading1">Demande de Mise a jour des photos de Mr : {User.nom} {User.prenom}</h1> 
              {/* <h1 class="main-heading"></h1> */}
              
              <span class="tag">Tel :{User.phone}</span>
              <br></br>
              <br></br>
              <br></br>
          
              <span class="tag">Agence :{User.agence}</span>
          <div class="stats"> 
            <span class="stat-module">
              Nombre Vehicules : <span class="stat-number">{User.nbrV}</span>
            </span>
            <span class="stat-module">
              Constats en cours : <span class="stat-number">{User.const}</span>
            </span>
          </div>
        </div>
      </div>
      
      <div class="overlay-header2"></div>
      
      <div class="body">
        <img src="../assets/images/pro3.png" alt="profil pic" class="body-image" />  
      
        <div class="u-clearfix">
        {existe && (<p style={{color: "red"}} className="main-heading1">{existe} </p>)}
           </div>
      
      
      
      
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider',fontSize: 14, }}>
                <TabList centered onChange={handleChange} aria-label="lab API tabs example">
                  <Tab sx={{ width: '1%',fontSize: 9}} label="Details" value="1" />
                  <Tab sx={{ width: '1%',fontSize: 9}} label="nouvelles images" value="2" />
                  <Tab sx={{ width: '1%',fontSize: 9}} label="images actuelles" value="3" />
      
      
                  
                </TabList>
              </Box>
             
      
      <TabPanel value="1">
      <>
              <Typography variant="h6" display="block" gutterBottom> Car details : 
              </Typography> 
      
      
      
              <div style={{ paddingLeft : "10%" , paddingRight : "10%", paddingBottom : "2%"}}>
              <Grid container ItemL sm={12} className="constJG">
      
              <Grid  sm={4} xs={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> Nom : 
              </Typography> 
              </Grid>
              <Grid  sm={8} xs={6} style={Gb}>
      
              <Typography variant="overline" display="block" gutterBottom> {Car.userN} 
              </Typography>
              </Grid>
      
              <Grid  sm={4} xs={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> Prenom : 
              </Typography> 
              </Grid>
              <Grid  sm={8} xs={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> {Car.userPr} 
              </Typography> </Grid>
      
              <Grid  sm={4} xs={6}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> Adresse : 
              </Typography> 
              </Grid>
              <Grid  sm={8} xs={6}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> {Car.userAdr} 
              </Typography> </Grid>
      
              <Grid  sm={4} xs={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> agence : 
              </Typography> 
              </Grid>
              <Grid  sm={8} xs={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> {Car.userAgen} 
              </Typography> </Grid>
      
              <Grid xs={6} sm={4}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> Phone : 
              </Typography> 
              </Grid>
              <Grid xs={6} sm={8}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> {Car.userPhone} 
              </Typography> </Grid>
      
              <Grid xs={6} sm={3}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> assurance :
              </Typography>
              </Grid>
              <Grid xs={6} sm={3}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> {Car.type} 
              </Typography>
              </Grid>
              <Grid xs={6} sm={3}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> valeur estimee :  
              </Typography>
              </Grid>
              <Grid xs={6} sm={3}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> {Car.valeur} DA
              </Typography>
              </Grid>
      
              <Grid  xs={12} sm={4}  style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> Marque : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.marque} onChange={(e)=>{setCar({...Car, marque:e.target.value}) ;}} /> */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.marque} 
              </Typography>
                    
              </Grid>
              <Grid item xs={12} sm={4} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom>   Type : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.TypeV} onChange={(e)=>{setCar({...Car, TypeV:e.target.value}) ;}} /> */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.nom} 
              </Typography>
                      
                      
              </Grid>
              <Grid item xs={12} sm={4} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> N DE SERIE DU TYPE : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.numS} onChange={(e)=>{setCar({...Car, numS:e.target.value}) ; }} /> */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.numS} 
              </Typography>
                      
                      
              </Grid>
              <Grid item xs={12} sm={6} container style={Gb}>
              <Grid item xs={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> CAROSSERIE :
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.caross} onChange={(e)=>{setCar({...Car, caross:e.target.value}) ; }} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.caross} 
              </Typography>
                      
                      
              </Grid>
      
              <Grid item xs={6} >
              <Typography variant="overline" display="block" gutterBottom> ENERGIE : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.energie} onChange={(e)=>{setCar({...Car, energie:e.target.value}) ; }} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.energie} 
              </Typography>
                      
              </Grid>
                      
                      
              </Grid>
              <Grid item xs={12} sm={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> PLASSES ASSISES : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.place} onChange={(e)=>{setCar({...Car, place:e.target.value}) ; }} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.place} 
              </Typography>
                      
              </Grid>
              <Grid item xs={6} sm={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> POIDS TOTAL EN CHARGE : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.poids} onChange={(e)=>{setCar({...Car, poids:e.target.value}) ; }} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.poids} 
              </Typography>
                      
                      
              </Grid>
              <Grid item xs={6} sm={6} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> CHARGE UTILE : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.charge} onChange={(e)=>{setCar({...Car, charge:e.target.value}) ; }} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.charge} 
              </Typography>
                      
                      
              </Grid>
      
              <Grid item xs={6} sm={5} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> N D IMMATRICULATION: 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.imma} onChange={(e)=>{setCar({...Car, imma:e.target.value}) ;}} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.imma} 
              </Typography>
                      
                      
              </Grid>
              <Grid item xs={6} sm={5} style={Gb}>
              <Typography variant="overline" display="block" gutterBottom> NUM PRECEDENT : 
              <br></br>
              {/* <TextField id="outlined-basic"  variant="outlined" value={Car.immaP} onChange={(e)=>{setCar({...Car, immaP:e.target.value}) ; }} />  */}
              </Typography> 
              <Typography variant="overline" display="block" gutterBottom> {Car.immaP} 
              </Typography>
                      
                      
              </Grid>
      
              <Grid item xs={12} sm={2} style={Gb}>
              <Typography style={{fontSize: "9px" }} variant="overline" display="block" gutterBottom> ANNEE DE PREMIER MIS EN CIRCULATION : 
              <br></br>
              {Car.annes} 
              </Typography> 
      
                      
                      
              </Grid>
              <br></br>
              {/* <button className='btnsCD' variant="contained" sx={{marginTop : '10%' ,marginLeft : '35%'}} onClick={()=>{ }}>Envoyer la Demande</button>  */}
      
      
              </Grid>
              </div>
              </>
      </TabPanel>
          
      <TabPanel value="2"> 
          <div>
          
              <>
              <div style={{paddingBottom: "4%" ,paddingTop: "4%" ,}}>
              <Button  onClick={(e)=>{setdecline(true)}} sx={{ border : "1px solid red" , height: "35px" , mmarginLeft : "25px"}} >
                 {envoi ? <> deja Refuser </> : <>Refuser</>}
                <CancelIcon sx={{marginLeft: "4px"}} fontSize='medium' color='error' />
                </Button></div>
                {decline && ( 
                <div>
                {error && <p className="error">{error}</p>} 
                <Typography variant="overline" display="block" gutterBottom> Motif de refus : 
                <TextField id="outlined-basic"  variant="outlined" value={motif} onChange={(e)=>{ setmotif(e.target.value) ; seterror() }} /> 
                
      
                <div style={{paddingBottom: "4%" ,paddingTop: "4%" ,}}>
                  <Button  onClick={(e)=>{envoyerRef()}} sx={{ border : "1px solid red" , height: "35px" , mmarginLeft : "25px"}} >
                   Envoyer
                  <SendIcon sx={{marginLeft: "4px"}} fontSize='medium' color='success' />
                  </Button>
      
                </div>
                </Typography>
      
                </div>)}
      
              <div className="tabR">
              <ImageList  sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
                {Car.imagesMaj.map((item) => (
                  <ImageListItem className="Li" key={item}>
                  {/* <div className="boxclose2" onClick={() => {decliner(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal", }}>
                      x
                  </span>
                  </div> */}
                  <Tooltip title="Accepter" placement="Top"  >   
                  <div className="boxcloseOk" onClick={() => {accepter(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal",}}>
                      +
                  </span>
                  </div>
                  </Tooltip>
                  <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="image"
                  loading="lazy"
                  onClick={()=>{window.open(`${item}`, '_blank')}}
                />
              </ImageListItem>
            ))}
              </ImageList>
              </div>
      
              <div className="tabD">
              <ImageList sx={{ width: "100%", height: "100%" }} cols={1} rowHeight={164}>
                {Car.imagesMaj.map((item) => (
                  <ImageListItem className="Li" key={item}>
                  {/* <div className="boxclose2" onClick={() => {}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal", }}>
                      x
                  </span>
                  </div> */}
                  <Tooltip title="Accepter" placement="Top"  > 
                  <div className="boxcloseOk" onClick={() => {accepter(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal",}}>
                      +
                  </span>
                  </div>
                  </Tooltip>
                  <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="image"
                  loading="lazy"
                  onClick={()=>{window.open(`${item}`, '_blank')}}
                />
              </ImageListItem>
            ))}
              </ImageList>
              </div>
              </>
              
              <div style={Gb}> 
              {errorEn &&(<p className="error"> {errorEn}</p>)}
              <Typography variant="h6" display="block" gutterBottom> Images approuvees : 
              </Typography> 
              <div style={{paddingBottom: "4%" ,paddingTop: "4%" ,}}>
              <Button  onClick={(e)=>{envoyerIma()}} sx={{ border : "1px solid white",borderRadius: "20px 60px" , height: "35px" , mmarginLeft : "25px" , backgroundColor: "rgb(5, 169, 5)"}} >
                 {envoiIm ? <> deja Envoyer </> : <>Envoyer</>}
                <SendIcon sx={{marginLeft: "4px"}} fontSize='medium' color='info' />
                </Button></div>
              <>
              {ajou && (
                  <>
                  <div className="tabR">
              <ImageList  sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
                {Accepter.map((item) => (
                  <ImageListItem className="Li" key={item}>
                  <Tooltip title="Retirer" placement="Top"  > 
                  <div className="boxclose2" onClick={() => {supprimer(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal", }}>
                      x
                  </span>
                  </div>
                  </Tooltip>
                  {/* <div className="boxcloseOk" onClick={() => {accepter(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal",}}>
                      +
                  </span>
                  </div> */}
                  <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="image"
                  loading="lazy"
                  onClick={()=>{window.open(`${item}`, '_blank')}}
                />
              </ImageListItem>
            ))}
              </ImageList>
              </div>
      
              <div className="tabD">
              <ImageList sx={{ width: "100%", height: "100%" }} cols={1} rowHeight={164}>
                {Accepter.map((item) => (
                  <ImageListItem className="Li" key={item}>
                  <Tooltip title="Retirer" placement="Top"  > 
                  <div className="boxclose2" onClick={() => {supprimer(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal", }}>
                      x
                  </span>
                  </div>
                  </Tooltip>
      
                  {/* <div className="boxcloseOk" onClick={() => {accepter(item)}}>
                  <span style={{color: "#fff",fontSize: 25,fontWeight: "normal",}}>
                      +
                  </span>
                  </div> */}
      
                  <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="image"
                  loading="lazy"
                  onClick={()=>{window.open(`${item}`, '_blank')}}
                />
              </ImageListItem>
            ))}
              </ImageList>
              </div>
                  </>
              )}
              
              </>
              </div>
              
          </div>
      </TabPanel>
      
      <TabPanel value="3"> 
          <div>
          
              <>
              <div className="tabR">
              <ImageList  sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
                {Car.images.map((item) => (
                  <ImageListItem className="Li" key={item}>
                  <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="image"
                  loading="lazy"
                  onClick={()=>{window.open(`${item}`, '_blank')}}
                />
              </ImageListItem>
            ))}
              </ImageList>
              </div>
      
              <div className="tabD">
              <ImageList sx={{ width: "100%", height: "100%" }} cols={1} rowHeight={164}>
                {Car.images.map((item) => (
                  <ImageListItem className="Li" key={item}>
                  <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="image"
                  loading="lazy"
                  onClick={()=>{window.open(`${item}`, '_blank')}}
                />
              </ImageListItem>
            ))}
              </ImageList>
              </div>
              </>
          </div>
      </TabPanel>
      
      
      
      
            </TabContext>
          </Box>
        
      </div>
      
          </div>
            </div>
            }
     
        </>


    )
}


