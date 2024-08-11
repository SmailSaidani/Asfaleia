import { Grid, Tooltip } from '@material-ui/core';
import React, { useEffect, useState ,useRef} from "react";
import { useHistory } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Sidebar from '../sidebar';
import SidebarEx from '../Expert/sidebarE';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';

import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { momentLocalizer } from 'react-big-calendar'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { db, auth, logoutUser, user  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import MapPicker from "react-google-map-picker";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import PlaceIcon from '@mui/icons-material/Place';

const brd = {
  border : '1px solid black'
 }


export default function Constat() {
  const Co = useParams();
  const componentRef = useRef();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

var DefaultLocation = { lat: 36.7312717, lng: 3.0876783 };
var DefaultZoom = 15;


    const [ouvre , setouvre] = useState(false);
    const [value, setValue] = React.useState(new Date);

    const [isOpen, setIsOpen] = useState(false);

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
  
    function handleChangeLocation(lat, lng) {
      setLocation({ lat: lat, lng: lng });
    }
  
    function handleChangeZoom(newZoom) {
      setZoom(newZoom);
    }
  
    function handleResetLocation() {
      setDefaultLocation({ ...DefaultLocation });
      setZoom(DefaultZoom);
    }

  const [map , setmap] = useState(false);
  const [Constat , setConstat] = useState({
    A_degats:[],
    B_degats:[],
  });

  const [experDes, setexperDes] = useState({});

  const [user , setuser ] = useState({});
  const [client ,setclient] = useState({});
  const [errors, setErrors] = useState({});
  const [recup , setrecup] = useState(false);
  const [nbrV , setnbrV] = useState('');
  const [Rem , setRem] = useState(false);

  const [Expert , setExpert] = useState("");
  const [Experts , setExperts] = useState([]);
  const Exp = [];
  

  const [Expr , setExp] = useState(false);
  const [Cej , setCej] = useState();
  const [Maz , setMaz] = useState();
  const [Own , setOwn] = useState();
  const [Change , setChange] = useState();
  const [message ,setmessage] = useState("");
  
  useEffect(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){

          const jour = new Date().getDate();
          const year = new Date().getFullYear();
          const mon = new Date().getMonth();
  
          var cejour = mon+1+'/'+jour+'/'+year;




        const User = await getDoc(doc(db , "Users" , currentUser.uid));
        if (User.data().type == "expert"){
          setExp(true);
          setuser(User.data());
        }else {
          setuser(User.data());
        }
        

        const infos = await getDoc(doc(db, "Constat" , Co.idCo));
        // setConstat(infos.data());
        if (infos.data().RDVdate == cejour){
          setCej(true);
        }
        if (infos.data().RDVdate !== "fait" ){
          setMaz(true);
        }
        
        if (User.data().userId == infos.data().expert){
          setOwn(true)
        }

          

          var t = new Date(1970, 0, 2); // Epoch
          t.setSeconds(infos.data().A_conDateN.seconds);
          const t1 = t.toISOString();
          const conDateN = t1.slice(0, 10);


          // AdassuDateD
          var t = new Date(1970, 0, 2); // Epoch
          t.setSeconds(infos.data().B_assuDateD.seconds);
          const t2 = t.toISOString();
          const AdassuDateD = t2.slice(0, 10);
          

          // AdassuDateF
          var t = new Date(1970, 0, 2); // Epoch
          t.setSeconds(infos.data().B_assuDateF.seconds);
          const t3 = t.toISOString();
          const AdassuDateF = t3.slice(0, 10);
          


          // AdconDateN
          var t = new Date(1970, 0, 2); // Epoch
          t.setSeconds(infos.data().A_conDateN.seconds);
          const t4 = t.toISOString();
          const AdconDateN = t4.slice(0, 10);
          


          // AddateFP
          var t = new Date(1970, 0, 2); // Epoch
          t.setSeconds(infos.data().B_dateFP.seconds);
          const t5 = t.toISOString();
          const AddateFP = t5.slice(0, 10);


          // // assuDateD
          // var t = new Date(1970, 0, 2); // Epoch
          // t.setSeconds(infos.data().A_assuDateD.seconds);
          // const t6 = t.toISOString();
          // const assuDateD = t6.slice(0, 10);

          // // assuDateF
          // var t = new Date(1970, 0, 2); // Epoch
          // t.setSeconds(infos.data().A_assuDateF.seconds);
          // const t7 = t.toISOString();
          // const assuDateF = t7.slice(0, 10);

          // dateFP
          var t = new Date(1970, 0, 2); // Epoch
          t.setSeconds(infos.data().A_dateFP.seconds);
          const t8 = t.toISOString();
          const dateFP = t8.slice(0, 10);

           // dateAc
           var t = new Date(1970, 0, 2); // Epoch
           t.setSeconds(infos.data().dateAc.seconds);
           const t9 = t.toISOString();
           const dateAc = t9.slice(0, 10);

            // heureAc
          var t = new Date(1970, 0, 0, 4, 0, 0); // Epoch
          t.setSeconds(infos.data().heureAc.seconds);
          const h = t.toISOString();
          const heureAc = h.slice(11, 16);



          setConstat({
            dateAc: dateAc,
            heureAc: heureAc,



            A_nom: infos.data().A_nom,
            A_prenom: infos.data().A_prenom,
            A_adresse: infos.data().A_adresse,
            // A_codeP: infos.data().A_codeP,
            A_phone: infos.data().A_phone,

            A_userid:infos.data().A_userid,

      //------------------------
            B_nom: infos.data().B_nom,
            B_prenom: infos.data().B_prenom,
            B_adresse: infos.data().B_adresse,
            // B_codeP: infos.data().B_codeP,
            // phoneAd: infos.data(),
      //------------------------

            A_energie: infos.data().A_energie,
            A_marque: infos.data().A_marque,
            A_type: infos.data().A_type,
            A_imma: infos.data().A_imma,

      //------------------------    
            B_CarTyp:infos.data().B_CarTyp,
            B_CarMarqu:infos.data().B_CarMarqu,
            B_Carimma:infos.data().B_Carimma,
            
      //------------------------

            A_assure:infos.data().A_assure,
            A_assuDateD:infos.data().A_assuDateD,
            A_assuDateF:infos.data().A_assuDateF,
            A_assurAgen:infos.data().A_assurAgen,
            A_degats:infos.data().A_degats,
            A_deg:infos.data().A_deg,
      //------------------------
            B_assure:infos.data().B_assure,
            B_assuDateD:AdassuDateD,
            B_assuDateF:AdassuDateF,
            B_assurAgen:infos.data().B_assurAgen,
            B_degats:infos.data().B_degats,
            B_deg:infos.data().B_deg,

      //------------------------

            A_conNom:infos.data().A_conNom,
            A_conPrenom:infos.data().A_conPrenom,
            A_conDateN:conDateN,
            // A_conPhone:infos.data(),
            A_conAdresse:infos.data().A_conAdresse,
            A_conNumP:infos.data().A_conNumP,
            A_conCatP:infos.data().A_conCatP,
            A_dateFP: dateFP,


            A_Obsersvation:infos.data().A_Obsersvation,
      //------------------------

            B_conNom:infos.data().B_conNom,
            B_conPrenom:infos.data().B_conPrenom,
            B_conDateN:AdconDateN,
            // B_conPhone:infos.data(),
            B_conAdresse:infos.data().B_conAdresse,
            B_conNumP:infos.data().B_conNumP,
            B_conCatP:infos.data().B_conCatP,
            B_dateFP:AddateFP,


            B_Obsersvation:infos.data().B_Obsersvation,
      //------------------------

            expert: infos.data().expert,
      
            message: infos.data().message,
      
            demRec: infos.data().demRec,

            RDV : infos.data().RDV, 

            RDVtime:infos.data().RDVtime,

            RDVdate:infos.data().RDVdate,

            rembourse:infos.data().rembourse,
      
            loading: infos.data().loading,

            location: infos.data().location,

            PCimage: infos.data().PCimage,

            PCAdimage: infos.data().PCAdimage,

          });

          setLocation ({ lat:infos.data().location._lat , lng:infos.data().location._long});
          const clientt = await getDoc(doc(db, "Users" , infos.data().A_userid));
          setclient(clientt.data());
          
          


          const idEx = infos.data().expert;
          if (infos.data().expert !== ""){
            const exprr = await getDoc(doc(db, "Users", idEx));
          setexperDes({nom :exprr.data().nom , prenom: exprr.data().prenom});
          }
       
          const q = query(collection(db, "Users"), where("type", "==", 'expert'),where("enligne", "==", true));

          const querySnapshot = await getDocs(q);
          
          querySnapshot.forEach((doc) => {
            try {
              // console.log(doc.data()); 
            
            Exp.push({
              ID :  doc.data().userId,
              nom : doc.data().nom,
              prenom : doc.data().prenom,
              nbrV : doc.data().nbrV,
            });
            
            
            } catch (error) {
              console.log(error);
            }

            
           
           
          });
          setExperts(Exp);
          setrecup(true);
        }

        });
    
    
  }, []);

  
  const correction = async () =>{
    // console.log(Co.idCo);
    if ( message !== ""){
      
      setErrors({})
      await updateDoc(doc(db, "Constat", Co.idCo), { message: message , demRec: true});
      window.location.reload(`Constat/${Co.idCo}`);
        }else{
          setErrors({ message: "veillez saisire (le/les) champs a rectifier "})
        }
  }


  const ConfermC = async () =>{
    // console.log(nbrV);
    if ( Expert !== "Expert" && Expert !== ""){
      
      setErrors({})
      await updateDoc(doc(db, "Constat", Co.idCo), { loading: true , expert: Expert , rembourse: false });
      // await updateDoc(doc(db, "Users", Constat.A_userid), { const: client.const + 1 });
      await updateDoc(doc(db, "Users", Expert), { nbrV: nbrV + 1 });

      window.location.reload(`Constat/${Co.idCo}`);
        }else{
          setErrors({ Car: "selectioner un expert SVP!"})
        }
  }

  const Signaler = async ()=>{
    await updateDoc(doc(db, "Constat", Co.idCo), { rembourse: true , rembourseTime: new Date().toISOString(), }).then(()=>{
      setConstat({ ...Constat , rembourse: true});
    }).catch((error) => {
      console.log(error.message);
    });
  }

  const selectEx = async (id) =>{
  setExpert(id);
  const User = await getDoc(doc(db , "Users" , id));
  setnbrV(User.data().nbrV);

  }
  
  const  SendM = async () => {

    
    await updateDoc(doc(db, "Constat",  Co.idCo), { RDVtime: value.toLocaleTimeString() , RDVdate: value.toLocaleDateString() , RDV: true })
        .catch((error) => {
          console.log(error.message);
        });

    await setDoc(doc(db, "msgs" , Co.idCo),{
      sender : user.nom+" "+user.prenom,
      receiver : Constat.A_userid,
      msg : "vous avez redez-vous avec l'expert le : "+value.toLocaleDateString()+" a : "+value.toLocaleTimeString(),
      time: new Date().toISOString(),
      lue: false,

    }).then(()=>{
      setConstat({...Constat, RDVtime: value.toLocaleTimeString() , RDVdate: value.toLocaleDateString()});
      setChange(false);
    }).catch((error) => {
      console.log(error.message);
    });
   
    
    
}

  const PV = () =>{
    window.open(`../Pvexp/${Co.idCo}`);  
  }
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    })

   const history= useHistory();
  
         //============================= Controles =========================
  
         useEffect(async () => {
          onAuthStateChanged(auth, async (currentUser) => {
              if (auth.currentUser){
                  const User = await getDoc(doc(db, "Users" , currentUser.uid));
                  
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

  //============================= CSS ===========================
  const style = {
    width: '100%',
    maxWidth: 360,
    marginTop: '%'
  };
  const Gb ={
    boxShadow: '0 3px 5px rgb(192, 193, 194)',
  
  }
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '80%',
    boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',

    marginLeft:'10%'
  }));

  const ItemL = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#C3ECFD' : '#C3ECFD',
    ...theme.typography.body2,
  
  }));

  const ItemR = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#FDFFA6' : '#FDFFA6',
    ...theme.typography.body2,
  
  }));

 

return (
  <div>
    {Expr ? <SidebarEx /> : <Sidebar/>}
    
    {Expr && Own && Maz && ( 
      <>
       <Typography variant="overline" display="block" gutterBottom>
        Date de rendez-vous : 
      <Typography className="infosVe" align="center" variant="overline"> {Constat.RDVdate} / {Constat.RDVtime} </Typography> </Typography>

      <Button variant="contained" onClick={() => { setChange(!Change)}} > changer le Rendez-vous </Button>
      {Change ? 
      <>
        <div style={{padding : " 3%" , width: "60%",marginLeft: "20%" , display: "flex" , flexDirection: "row",}} > 
      <LocalizationProvider  dateAdapter={AdapterDateFns}>

      <DateTimePicker
        
        renderInput={(props) => <TextField {...props} />}
        label="Rendez-vous pour "
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      </LocalizationProvider>
      <Button variant="contained" onClick={() => { SendM()}} >Fixer rendez-vous</Button>
      
    </div>
      </> : 
      <></>}
    
    </> )}



    {Expr && Cej == true && (
      <div style={{padding : " 3%"}} ><button className='btnsRD' onClick={PV}  >Rediger Le PV </button></div>
    )}

    {/* <Item  ref={componentRef}>  */}
    <div style={{padding : " 10%"}} ref={componentRef}>
    <Grid container spacing={1}  style={{ backgroundColor : "white"}} >
        
        <Grid item xs={12} sm={4} container style={brd}>
        <Grid item xs={6}>     <Typography variant="overline" display="block" gutterBottom>
        Date de l'accident :      
        <Typography className="infosVe" align="center" variant="overline"> {Constat.dateAc} </Typography></Typography></Grid>
        <Grid item xs={6}><Typography variant="overline" display="block" gutterBottom>
        Heure: 
        <Typography className="infosVe" align="center" variant="overline"> {Constat.heureAc} </Typography></Typography></Grid>

</Grid>
<Grid item xs={12} sm={4} style={brd}>
<Typography variant="overline" display="block" gutterBottom>
        localisation:
</Typography>
{/* <button onClick={()=>{setmap(true)}}> See Location </button> */}
<Tooltip title="Localisation" placement="Top" >
<PlaceIcon fontSize='large' sx={{color: "blue"}} onClick={()=>{setmap(true)}} />
</Tooltip>
{map ? <>
{/* <button onClick={()=>{setmap(false)}}> fermer la fenetre </button> */}
<Tooltip title="Fermer la Localisation" placement="Top" >
  <WrongLocationIcon fontSize='large' sx={{color: "red"}} onClick={()=>{setmap(false)}} />
  </Tooltip>
</> : <></>}</Grid>
<Grid item xs={12} sm={4} style={brd}>
    <Typography variant="overline" display="block" gutterBottom>
        Blesse:
        <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Oui" />
      <FormControlLabel disabled control={<Checkbox />} label="Non" />
    </FormGroup>  </Typography>
</Grid>

{map ? <>
<Grid item xs={12} sm={12} className='deux' style={brd}>
<div>
      {/* <button onClick={getLocation}>Get Location</button> */}
      <div style={{backgroundColor: 'black'}}>

      {/* <button onClick={handleResetLocation}>Reset Location</button> */}
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />

      </div>
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />
    </div>
</Grid>
</> 
:
 <>
 </>}


<Grid item xs={12} sm={4} container style={brd}>
<Typography variant="overline" display="block" gutterBottom>
Dégâts matériels à des 
  </Typography>
<Grid item xs={6}><Typography variant="overline" display="block" gutterBottom>
véhicules autres que A et B: <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Oui" />
      <FormControlLabel disabled control={<Checkbox />} label="Non" />
    </FormGroup>  </Typography></Grid>
        <Grid item xs={6}><Typography variant="overline" display="block" gutterBottom>
        objets autres que des véhicules: <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Oui" />
      <FormControlLabel disabled control={<Checkbox />} label="Non" />
    </FormGroup>  </Typography></Grid>

</Grid>
<Grid item xs={12} sm={8} container style={brd}>
<Typography variant="overline" display="block" gutterBottom>
Témoins : noms, adresses, tél: ..................................................................</Typography>
</Grid>

<Grid xs={12} sm={4}  > 
<ItemL>

<Typography variant="h6" gutterBottom component="div" style={brd}>
Preneur d'assurance/assuré (voir attestation d'assurance)
</Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM: 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_nom} </Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_prenom}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Adresse : <Typography className="infosVe" variant="overline">{Constat.A_adresse}</Typography>  
{/* Code postal :  <Typography className="infosVe" variant="overline">{Constat.A_codeP}</Typography> */}
</Typography>

<Typography variant="overline" display="block" gutterBottom>
Tél. ou e-mail : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_phone}</Typography></Typography>


<Typography variant="h6" gutterBottom component="div" align='center' style={brd}>
Vehicule      </Typography>
<Grid item container xs={12}>
<Grid item xs={6} >

<Typography variant="overline" >Marque: 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_marque}</Typography></Typography> 

</Grid>

<Grid item xs={6} >
<Typography variant="overline" >type: 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_type}</Typography></Typography>

</Grid>

<Typography variant="overline" >N° d'immatriculation : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_imma}</Typography></Typography>

</Grid>
<Typography variant="h6" gutterBottom component="div" style={brd}>
Société d'assurance (voir attestation d'assurance)      </Typography>


<Typography variant="overline" display="block" gutterBottom>
NOM: 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_assure}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
N° de contratAttestation d'assurance ou carte verte valable du :
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_assuDateD} au {Constat.A_assuDateF}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Agence (ou bureau, ou courtier) : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_assurAgen}</Typography></Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Les dégâts matériels au véhicule sont-ils assurés par le contrat ?: </Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Oui" />
      <FormControlLabel disabled control={<Checkbox />} label="Non" /> */}


<Typography variant="h6" gutterBottom component="div" style={brd}>
Conducteur (voir permis de conduire )      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM: 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_conNom}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_conPrenom}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
 Date de naissance: 
 <Typography className="infosVe" align="center" variant="overline"> {Constat.A_conDateN}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Adresse  : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_conAdresse}</Typography></Typography>

<Typography variant="overline" display="block" gutterBottom>
Permis de conduire no  : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_conNumP}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Catégorie (A, B, ...)  : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_conCatP}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Permis valable jusqu'au  : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_dateFP}</Typography></Typography>



<img src="../assets/images/degat.png" alt="degats" className='imgbx'/>
<Typography variant="overline" display="block" gutterBottom>
Les zones touches  : 
{Constat.A_degats.map((g) => (
<>

{g && g.checked == "true" && (
  <Typography className="infosVe" align="center" variant="overline">  {g.ind} / </Typography>

)}
</>
))}

</Typography>

<Typography variant="overline" display="block" gutterBottom>
degats : 
<Typography className="infosVe" align="center" variant="overline">{Constat.A_deg}</Typography></Typography>




<Typography variant="overline" display="block" gutterBottom>
Observations : 
<Typography className="infosVe" align="center" variant="overline"> {Constat.A_Obsersvation}</Typography></Typography>


<Typography variant="overline" display="block" gutterBottom>
signature  :
 ...........</Typography>
 <div onClick={()=>{window.open(Constat.PCimage, '_blank')}}><img src={Constat.PCimage}  alt="Piece-identite"  className='imgbx'/> </div>

</ItemL>

</Grid>
<Grid item xs={12} sm={4} >
<Typography variant="overline" display="block" gutterBottom>
 
<FormControlLabel control={<Checkbox defaultChecked />}  />
En stationnement/à l'arrêt
      <FormControlLabel disabled control={<Checkbox />}  />
      </Typography>

      <Typography variant="overline" display="block" gutterBottom>
 
 <FormControlLabel control={<Checkbox defaultChecked />}  />
 quittait un stationnement/<FormControlLabel disabled control={<Checkbox />}  />
ouvrait une portière       
       </Typography>



       <Typography variant="overline" display="block" gutterBottom>
 
<FormControlLabel control={<Checkbox defaultChecked />}  />
prenait un stationnement
      <FormControlLabel disabled control={<Checkbox />}  />
      </Typography>

      <Typography variant="overline" display="block" gutterBottom></Typography>

      <Typography variant="overline" display="block" gutterBottom>
 
 <FormControlLabel control={<Checkbox defaultChecked />}  />
 sortait d'un parking, d'un lieu/<FormControlLabel disabled control={<Checkbox />}  />
 privé, d'un chemin de terre     
       </Typography>


<Typography variant="overline" display="block" gutterBottom>

       <FormControlLabel control={<Checkbox defaultChecked />}  />
       s'engageait d'un parking, d'un lieu/<FormControlLabel disabled control={<Checkbox />}  />
 privé, d'un chemin de terre     
       </Typography>

       <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox defaultChecked />}  />
       s'engageait sur une place<FormControlLabel disabled control={<Checkbox />}  />
       à sens giratoire       </Typography>



       <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox defaultChecked />}  />
        heurtait à l'arrière, en  <FormControlLabel disabled control={<Checkbox />}  />
        roulant  dans le même sens et sur une même file      </Typography>



        <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox defaultChecked />}  />
        roulait dans le même sens<FormControlLabel disabled control={<Checkbox />}  />
        et sur une file différente       </Typography>


        <Typography variant="overline" display="block" gutterBottom>
 
 <FormControlLabel control={<Checkbox defaultChecked />}  />
 changeait de file

       <FormControlLabel disabled control={<Checkbox />}  />
       </Typography>
       
       
       
       <Typography variant="overline" display="block" gutterBottom>

       <FormControlLabel control={<Checkbox defaultChecked />}  />
       doublait
       <FormControlLabel disabled control={<Checkbox />}  />
       </Typography>


       <Typography variant="overline" display="block" gutterBottom>

<FormControlLabel control={<Checkbox defaultChecked />}  />
virait à droite
<FormControlLabel disabled control={<Checkbox />}  />
</Typography>


<Typography variant="overline" display="block" gutterBottom>

<FormControlLabel control={<Checkbox defaultChecked />}  />
virait à gauche
<FormControlLabel disabled control={<Checkbox />}  />
</Typography>

<Typography variant="overline" display="block" gutterBottom>

<FormControlLabel control={<Checkbox defaultChecked />}  />
reculait
<FormControlLabel disabled control={<Checkbox />}  />
</Typography>



<Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox defaultChecked />}  />
        empiétait sur une voie<FormControlLabel disabled control={<Checkbox />}  />
        réservée à la circulation
en sens inverse    </Typography>




<Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox defaultChecked />}  />
        venait de droite (dans un <FormControlLabel disabled control={<Checkbox />}  />
         carrefour)   </Typography>

        <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox defaultChecked />}  />
        n'avait pas observé un signale <FormControlLabel disabled control={<Checkbox />}  />
        priorité ou un feu rouge   </Typography>

        {Constat.loading ? 
        <div className='conf1'>
                <Typography variant="overline" display="block" gutterBottom>
                 l'Expert designee:  {experDes.nom} {experDes.prenom}
                </Typography>

        </div> 
        :
        <div className='conf1'>

        <div className='select'>
                         <label  style={brd} >selectionner un Expert </label>
                     <select 
                       value={Expert}
                       onChange={e=>{
                         // setValues({...values, Car:e.target.value}) ;
                        selectEx(e.target.value) ;}}>
                       <option >Expert</option>
                     {Experts.map((Experts) => (
                         <><option value={Experts.ID}> {Experts.nom} {Experts.prenom} </option></>
                     ))}
                      </select>
                     </div> 
                     {errors.Car && <p className="error">{errors.Car}</p>}
          <button className='btnsC' onClick={ConfermC} variant="contained">Confermer le constat</button>
          {Constat.demRec ? <>
            <Typography variant="overline" display="block" gutterBottom> ...............................</Typography>
          <Typography lowercase variant="overline" display="block" gutterBottom>champs a rectifier : {Constat.message}
          </Typography>
          </>
          : 
          <>
          <Typography variant="overline" display="block" gutterBottom> ...............................</Typography>
          <Typography lowercase variant="overline" display="block" gutterBottom>champs a rectifier : 
          <TextField id="outlined-basic"  variant="outlined" value={message} onChange={(e)=>{setmessage(e.target.value)}} />
          </Typography>
          

          <button className='btnsC' onClick={correction} variant="contained">demande de correction</button>
          {errors.message && <p className="error">{errors.message}</p>}
          </>}
          
       </div>}

       {Constat.RDVdate == 'fait' && Constat.RDVtime == 'fait' &&(
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {Constat.rembourse ? 
        <>
                <Typography  variant="overline" display="block" gutterBottom>
                Le remboursement a déjà été effectué 💰.
                </Typography>
        </>:
            <>
                <Typography  variant="overline" display="block" gutterBottom>
                Signaler le remboursement: 
                </Typography>
                <Button sx={{backgroundColor: "blue"}} onClick={()=>{setRem(true)}} > Signaler </Button>
                <Dialog
                open={Rem}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Signaler le remboursement"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  Êtes-vous sûr que ce client a récupéré son argent 💵 ? Si oui cliquez sur confirmer.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={Signaler}>confirmer</Button>
                  <Button onClick={()=>{setRem(false)}} >
                    Annuler
                  </Button>
                </DialogActions>
              </Dialog>
            </>
                }
                
                
        </>
        )}
       
</Grid>

<Grid  xs={12} sm={4} >
<ItemR>
<Typography variant="h6"  component="div" style={brd}>
Preneur d'assurance/assuré (voir attestation d'assurance)
</Typography>

<Typography variant="overline" display="block" gutterBottom>NOM: 
<Typography className="infosOr" variant="overline">{Constat.B_nom}</Typography></Typography>

<Typography variant="overline" display="block" gutterBottom>Prénom :
<Typography className="infosOr" variant="overline">{Constat.B_prenom}</Typography></Typography>

<Typography variant="overline" display="block" gutterBottom>Adresse : 
<Typography className="infosOr" variant="overline">{Constat.B_adresse}</Typography></Typography>

{/* <Typography variant="overline" display="block" gutterBottom>Code postal : 
<Typography className="infosOr" variant="overline">{Constat.B_codeP}</Typography></Typography> */}




<Typography variant="h6" align='center' gutterBottom component="div" style={brd}>
Vehicule      </Typography>
<Grid item container xs={12}>
<Grid  xs={6} >
<Typography variant="overline" > Marque: 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_CarMarqu} </Typography></Typography>
</Grid>

<Grid  xs={6} >
<Typography variant="overline" > type : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_CarTyp}</Typography></Typography>
</Grid>

<Typography variant="overline" >N° d'immatriculation : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_Carimma}</Typography></Typography>

</Grid>
<Typography variant="h6" gutterBottom component="div" style={brd}>
Société d'assurance (voir attestation d'assurance)      </Typography>


<Typography variant="overline" display="block" gutterBottom>
NOM: 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_assure}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
N° de contratAttestation d'assurance ou carte verte valable du :
<Typography className="infosOr" align="center" variant="overline">{Constat.B_assuDateD} au {Constat.B_assuDateF}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Agence (ou bureau, ou courtier) : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_assurAgen}</Typography></Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Les dégâts matériels au véhicule sont-ils assurés par le contrat ?: </Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Oui" />
      <FormControlLabel disabled control={<Checkbox />} label="Non" /> */}


 <Typography variant="h6" gutterBottom component="div" style={brd}>
      Conducteur (voir permis de conduire)      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM: 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_conNom}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :
<Typography className="infosOr" align="center" variant="overline">{Constat.B_conPrenom}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
 Date de naissance: 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_conDateN}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Adresse  : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_conAdresse}</Typography></Typography>

<Typography variant="overline" display="block" gutterBottom>
Permis de conduire no  : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_conNumP}</Typography></Typography>
<Typography variant="overline" display="block" gutterBottom>
Catégorie (A, B, ...)  : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_conCatP}</Typography>
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Permis valable jusqu'au  : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_dateFP}</Typography></Typography>

<img src="../assets/images/degat.png" alt="degats"  className='imgbx'/>
<Typography variant="overline" display="block" gutterBottom>
Les zones touches  : 
{Constat.B_degats.map((g) => (
<>

{g && g.checked == "true" && (
  <Typography className="infosOr" align="center" variant="overline">  {g.ind} / </Typography>

)}
</>
))}
</Typography>

<Typography variant="overline" display="block" gutterBottom>
degats : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_deg}</Typography></Typography>


<Typography variant="overline" display="block" gutterBottom>
Observations : 
<Typography className="infosOr" align="center" variant="overline">{Constat.B_Obsersvation}</Typography></Typography>


<Typography variant="overline" display="block" gutterBottom>
signature  :
 ...........</Typography>
 <div onClick={()=>{window.open(Constat.PCAdimage, '_blank')}}><img src={Constat.PCAdimage}  alt="Piece-identite"  className='imgbx'/>
 </div>
</ItemR>
</Grid>
{Constat.loading ? 
        <div className='conf2'>
                <Typography  variant="overline" display="block" gutterBottom>
                 l'Expert designee:  {experDes.nom} {experDes.prenom}
                </Typography>

        </div> 
:
<Grid className='conf2' item xs={12} sm={12} >
<div > 
<div className='select'>
                        <label  style={brd} >selectionner un Expert </label>
                    <select 
                    value={Expert}
                      onChange={e=>{
                        // setValues({...values, Car:e.target.value}) ;
                       selectEx(e.target.value) ;}}>
                      <option >Expert</option>
                    {Experts.map((Experts) => (
                        <><option value={Experts.ID}> {Experts.nom} {Experts.prenom} </option></>
                    ))}
                     </select>
                    </div> 
                    {errors.Car && <p className="error">{errors.Car}</p>}
  <button className='btnsC' onClick={ConfermC} variant="contained">Confermer le constat</button>
</div>
</Grid>  } 

</Grid>
        
        
         {/* </Item> */}

      </div>
      <ReactToPrint
        trigger={() => <Button className='buttonIm' style={{marginTop : '5%'}}> Imprimer Le Constat</Button>}
        content={() => componentRef.current}
      />
      </div>

)

}

