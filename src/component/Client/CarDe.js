import React, { useEffect, useState } from "react";
// import Navbar from './navbar';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { db, auth ,logoutUser } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CancelIcon from '@mui/icons-material/Cancel';
import "../../style.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import { BsCardImage } from "react-icons/bs";
import { storage } from "../../bdd/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@mui/material/Fab';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import ArticleIcon from '@mui/icons-material/Article';
import { ExitToApp, Person, Settings ,Delete , CloudDownload} from '@material-ui/icons';
import UploadFileIcon from '@mui/icons-material/UploadFile';


import RenouVe from './renouVe'


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

export default function CarDetails() {
  const [value, setValue] = React.useState(0);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hmar = {
    marginTop: "5%"
  }
  const style = {
    width: '100%',
    maxWidth: 360,
    marginTop: '%'
  };
  const Gb ={
    boxShadow: '0 3px 5px rgb(192, 193, 194)',
  
  }
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '60%',
    boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',

    marginLeft:'20%'
  }));
  const ItemL = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#C3ECFD' : '#C3ECFD',
    ...theme.typography.body2,
  
  }));




  const [Car, setCar] = useState({
    images:[],
  });
  const [Nimage , setNimage] = useState([]);
  const [nimage , setnimage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recup, setrecup] = useState(false);
  const [error, seterror] = useState();
  const [Succes, setSucces] = useState(false);
  
  const [Renouvler, setRenouvler] = useState(false);

  const idCar = useParams();
  const history = useHistory();
  useEffect(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
        

        const infos = await getDoc(doc(db, "Users", currentUser.uid , "cars" , idCar.idC));
        setCar({
          ID : idCar.idC,
          ...infos.data()
        });
        console.log(infos.data().images);
        

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

  const formHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    uploadFiles(e.target[0].files[0]);
  };
  
  const uploadFiles = (file) => {
    
  
    if (!file) return;
    seterror();
    setrecup(false);
    const sotrageRef = ref(storage, `files/${file.name}`);
  
    const uploadTask = uploadBytesResumable(sotrageRef, file);
  
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
          Nimage.push(downloadURL);
          setrecup(true);
        });
        
      }
    );
  };

  const supprimer = (image) =>{
    setrecup(false);
    const index = Nimage.indexOf(image);
    Nimage.splice(index , 1);
    setTimeout(() => {
      setrecup(true);
    }, 200);
    
  }

  const envoyer = async () =>{
    if (Nimage.length <= 3) {
      seterror("veuillez inserez au moin 4 photos SVP!");
    }
    else{
      const final = {
        ...Car,
        imagesMaj: Nimage, 
      }
      await setDoc(doc (db,"imagesMaj",idCar.idC), final).then(()=>{
        setSucces(true)
    })
    .catch((error) => {
      console.log(error.message);
    });

    }
    
  }
  

  const [renouv , setRenouv]=useState(false);
  const [details , setDetails]=useState(true);

console.log(Car)
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
    <>
    <Grid container>

    <Grid className='profresp' item sm={4} ><Sidebar/></Grid>


    <Grid item sm={8} xs={12} spacing={2}>
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Images" {...a11yProps(1)} />
          
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <>

        {Car.Renouvler == true && (
          <Button  onClick={(e)=>{setRenouvler(true); setDetails(false)}} sx={{padding: "4%" ,border : "1px solid green" , height: "35px" , backgroundColor: "skyblue"}} >
          Renouvler
          <AutorenewIcon sx={{marginLeft: "4px"}} fontSize='medium' color='info' />
          </Button>
        )}

        { Renouvler == true && (
          <RenouVe  car={Car}/>
        )}
        
        <Typography variant="h6" display="block" gutterBottom> Car details : 
        </Typography> 


        {details && 
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
        <Typography variant="overline" display="block" gutterBottom>   Nom : 
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
        <Typography variant="outlined-basic" display="block" gutterBottom> ANNEE DE PREMIER MIS EN CIRCULATION : 
        <br></br>
        {Car.annes} 
        </Typography> 

                
                
        </Grid>
        <br></br>
        {/* <button className='btnsCD' variant="contained" sx={{marginTop : '10%' ,marginLeft : '35%'}} onClick={()=>{ }}>Envoyer la Demande</button>  */}


        </Grid>
        </div>
        }
        </>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <>
        <div style={{ paddingLeft : "10%" , paddingRight : "10%"}} >
        {Succes ? <>
        <p className="succès">Votre demande a été effectuée avec succès</p>
        <br></br>
        </> 
        : 
        <></>} 

        {nimage ? 
        <>
        <Button  onClick={(e)=>{envoyer()}} sx={{padding: "4%" ,border : "1px solid green" , height: "35px"}} >
            envoyer la demande
          <SendIcon sx={{marginLeft: "4px"}} fontSize='medium' color='info' />
          </Button>
          {error && <p className="error">{error}</p>} 
        </> : 
        <>
          <Button   onClick={(e)=>{setnimage(true)}} sx={{padding: "4%" ,border : "1px solid green" , height: "35px" }} >
            Mise a jour des images
          <ImageIcon sx={{marginLeft: "4px"}} fontSize='medium' color='success' />
          </Button>
          <br></br>
          </>}

          <br></br>
        <span class="card-heading">images</span>

        
        {nimage ? 
        <>
        <div className="chaipas">
          <div>
          <form onSubmit={formHandler}>
          <BsCardImage fontSize="1.5rem" color="#19A8D9" margin-right= "10px;" > </BsCardImage> 
          <input 
              type="file"  
              className="input"   
            />

        <Tooltip title="Importer" placement="Top" >
        <button className='buttonIm' style={{backgroundColor: "transparent", border: "none"}} type="submit"> 
        <UploadFileIcon fontSize='meduim' sx={{color: "black"}} />
        Upload</button></Tooltip>
          {/* <button type="submit">Upload</button> */}
          <hr />
          <h2>Uploading done {progress}%</h2>
          {nimage == true && (
        <>
        
        <Button  onClick={(e)=>{setnimage(false) ; setNimage([]) ; seterror()}} sx={{padding: "4%" , border : "1px solid red" , height: "35px" , mmarginLeft : "25px"}} >
           Annuler
          <CancelIcon sx={{marginLeft: "4px"}} fontSize='medium' color='error' />
          </Button>
        </>)}
        </form>
          </div>
       
        </div>

        {recup && recup == true && (
        <>
        <div className="tabR">
        <ImageList  sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
          {Nimage.map((item) => (
            <ImageListItem className="Li" key={item}>
              <div className="boxclose2"
              onClick={() => {supprimer(item)}}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "normal",
                }}
              >
                x
              </span>
      </div>
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
          {Nimage.map((item) => (
            <ImageListItem className="Li" key={item}>
              <div className="boxclose2"
              onClick={() => {supprimer(item)}}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "normal",
                }}
              >
                x
              </span>
      </div>
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
        </> )}
        
        </>

         :

         <>
         <ImageList  sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
          {Car.images.map((item) => (
            <ImageListItem  key={item}>
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
         </>}
        

</div>
        </>
      </TabPanel>

    </Box>
    </Grid>


    </Grid>
    </>
  );
}




// export default function CarDetails() {



// return (
//     <div>
//  <Grid container>
//  <Grid item sm={4} xs={3}><Sidebar/></Grid>


// <Grid item sm={8} xs={9} spacing={2}>

//             </Grid>
//         </Grid>




// </div>

// );

// }