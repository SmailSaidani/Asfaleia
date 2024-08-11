import { Grid,Tooltip } from '@material-ui/core';
import React, { useEffect, useState ,useRef,useCallback} from "react";
import { useHistory } from "react-router-dom";
// import Navbar from './navbar';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../bdd/firebase";

import InputUnstyled from '@mui/base/InputUnstyled';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { auth, db ,setDoc} from "../../bdd/firebase";
import { doc ,getDoc} from "firebase/firestore";
import {onAuthStateChanged, } from "firebase/auth";


// import ResponsiveDialog from './map';

import MapPicker from "react-google-map-picker";

import Form from 'react-bootstrap/Form';
import ClipLoader from "react-spinners/ClipLoader";
import validation from "./validation";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DriveEta from '@mui/icons-material/DriveEta';
import Person from '@mui/icons-material/Person';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import PlaceIcon from '@mui/icons-material/Place';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    600: '#0072E5',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };
  
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 600px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }
  `,
  );
  
  const StyledTextareaElement = styled('textarea', {
    shouldForwardProp: (prop) =>
      !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
  })(
    ({ theme }) => `
    width: 600px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }
  `,
  );
  




  
export default function RecConst() {

  const Con = useParams();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        var DefaultLocation = {lat , lng};
        var DefaultZoom = 15;
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

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



    const [dateFP , setDate ] = React.useState(new Date);

    const [essaye , setEssaye] = useState({});


      const [values, setValues] = useState({});  

      const [errors, setErrors] = useState({});
      const [errors1, setErrors1] = useState({});
  
      const [errors2, setErrors2] = useState({});
      const [errors3, setErrors3] = useState({});
  
      const [imagepcad, setimagepcad] = useState(false);
      const [imagepc, setimagepc] = useState(false);
    
      useEffect( () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
            
    
            const infos = await getDoc(doc(db, "Constat" , Con.idCon));
            // setConstat(infos.data());
              console.log(infos.data())
    
              var t = new Date(1970, 0, 2); // Epoch
              t.setSeconds(infos.data().A_conDateN.seconds);
              const t1 = t.toISOString();
              const conDateN = t1.slice(0, 10);
    
    
              // // AdassuDateD
              // var t = new Date(1970, 0, 2); // Epoch
              // t.setSeconds(infos.data().A_assuDateD.seconds);
              // const t2 = t.toISOString();
              // const AdassuDateD = t2.slice(0, 10);
              
    
              // AdassuDateF
              var t = new Date(1970, 0, 2); // Epoch
              t.setSeconds(infos.data().B_assuDateF.seconds);
              const t3 = t.toISOString();
              const AdassuDateF = t3.slice(0, 10);
              
    
    
              // AdconDateN
              var t = new Date(1970, 0, 2); // Epoch
              t.setSeconds(infos.data().B_conDateN.seconds);
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
    
    
    
              setValues({
                dateAc: infos.data().dateAc,
                heureAc:infos.data().heureAc,
    
    
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

                A_carId: infos.id,
                A_energie: infos.data().energie,
                A_marque: infos.data().marque,
                A_type: infos.data().TypeV,
                A_carNom: infos.data().nom,
                A_imma: infos.data().imma,
                images: infos.data().images,
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
                B_assuDateD:infos.data().B_assuDateD,
                B_assuDateF:infos.data().B_assuDateF,
                B_assurAgen:infos.data().B_assurAgen,
                B_degats:infos.data().B_degats,
                B_deg:infos.data().B_deg,
    
          //------------------------
    
                A_conNom:infos.data().A_conNom,
                A_conPrenom:infos.data().A_conPrenom,
                A_conDateN:infos.data().A_conDateN,
                // A_conPhone:infos.data(),
                A_conAdresse:infos.data().A_conAdresse,
                A_conNumP:infos.data().A_conNumP,
                A_conCatP:infos.data().A_conCatP,
                A_dateFP: infos.data().A_dateFP,
    
    
                A_Obsersvation:infos.data().A_Obsersvation,
          //------------------------
    
                B_conNom:infos.data().B_conNom,
                B_conPrenom:infos.data().B_conPrenom,
                B_conDateN:infos.data().B_conDateN,
                // B_conPhone:infos.data(),
                B_conAdresse:infos.data().B_conAdresse,
                B_conNumP:infos.data().B_conNumP,
                B_conCatP:infos.data().B_conCatP,
                B_dateFP:infos.data().B_dateFP,
    
    
                B_Obsersvation:infos.data().B_Obsersvation,
          //------------------------
                

                expert: infos.data().expert,
          
                message: infos.data().message,
          
                demRec: infos.data().demRec,

                RDV : infos.data().RDV, 

                RDVtime:infos.data().RDVtime,

                RDVdate:infos.data().RDVdate,

                rembourse: infos.data().rembourse,
          
                loading: infos.data().loading,

                location: infos.data().location,

                PCimage: infos.data().PCimage,

                PCAdimage: infos.data().PCAdimage,
    
          });
          setimagePCad(infos.data().PCAdimage);
          setimagePC(infos.data().PCimage);
          setLocation ({ lat:infos.data().location._lat , lng:infos.data().location._long});


          // console.log(infos.data().message);
          // console.log(infos.data().location);

          // console.log(infos.data().location._lat);
          // console.log(infos.data().location._long);

            }
    
            });
        
        
      }, []);
      
    
    const history = useHistory();
    const handleChange = (newValue) => {
      setValue(newValue);
      console.log(value);
      setValues({...values, dateAc:newValue});
      // setValues({...values, heureAc:newValue});
    }
    const handleChangeT = (newValue) => {
      
      setValues({...values, heureAc:newValue});
    }

    const handleChange2 =  useCallback((newValue) => {
      setValues({...values, A_dateFP:newValue});
    },)
    
    const handleChange3 = (newValue) => {
      setValues({...values, A_conDateN:newValue});
    }
    const handleChange4 = (newValue) => {
      setValues({...values, A_assuDateD:newValue});
    }
    const handleChange5 = (newValue) => {
      setValues({...values, A_assuDateF:newValue});
    }

    const handleChange21 = (newValue) => {
      setValues({...values, B_dateFP:newValue});
    }
    const handleChange31 = (newValue) => {
      setValues({...values, B_conDateN:newValue});
    }
    const handleChange41 = (newValue) => {
      setValues({...values, B_assuDateD:newValue});
    }
    const handleChange51 = (newValue) => {
      setValues({...values, B_assuDateF:newValue});
    }


    const go =() => {
    history.push('/profil');
     window.location.reload('/profil');
    }
    const goAV =() => {
      history.push('/Ajouter');
       window.location.reload('/Ajouter');
      }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    })
   const brd = {
    border : '1px solid black'
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



      const [User, setUser] = useState({});
      const [Info, setInfo] = useState({});
      const [Car, setCar] = useState([]);
      var con = [];

      useEffect( () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
            setUser(currentUser);
            const infos = await getDoc(doc(db, "Users", currentUser.uid));
            setInfo(infos.data());


            }

            });
      }, []);


 const [envoi , setEnvoi] = useState(false);
  const [confirm , setconfirm] = useState(false);


  const [map , setmap] = useState(false);


  const [imagePC , setimagePC] = useState('');
  const [imagePCad , setimagePCad] = useState('');
  

  const chege3 = async () =>{
        // setErrors({});
        setErrors(validation(values));

        
        setEnvoi(true);
        
        const time = new Date().toISOString();
        const Ftime = time.slice(0, 10); 
        const Fheur = time.slice(11, 16); 

        const id = Con.idCon;
      

          const final = ({
            dateAc: values.dateAc,
            heureAc: values.heureAc,


            A_nom: values.A_nom,
            A_prenom: values.A_prenom,
            A_adresse: values.A_adresse,
            // A_codeP: values.A_codeP,
            A_phone: values.A_phone,

            A_userid:values.A_userid,

      //------------------------
            B_nom: values.B_nom,
            B_prenom: values.B_prenom,
            B_adresse: values.B_adresse,
            // B_codeP: values.B_codeP,
            // phoneAd: values,
      //------------------------

            A_energie: values.A_energie,
            A_marque: values.A_marque,
            A_type: values.A_type,
            A_imma: values.A_imma,

      //------------------------    
            B_CarTyp:values.B_CarTyp,
            B_CarMarqu:values.B_CarMarqu,
            B_Carimma:values.B_Carimma,
            
      //------------------------

            A_assure:values.A_assure,
            A_assuDateD:values.A_assuDateD,
            A_assuDateF:values.A_assuDateF,
            A_assurAgen:values.A_assurAgen,
            A_degats: values.A_degats,
            A_deg:values.A_deg,

      //------------------------
            B_assure:values.B_assure,
            B_assuDateD:values.B_assuDateD,
            B_assuDateF:values.B_assuDateF,
            B_assurAgen:values.B_assurAgen,
            B_degats: values.B_degats,
            B_deg: values.B_deg,

      //------------------------

            A_conNom:values.A_conNom,
            A_conPrenom:values.A_conPrenom,
            A_conDateN:values.A_conDateN,
            // A_conPhone:values,
            A_conAdresse:values.A_conAdresse,
            A_conNumP:values.A_conNumP,
            A_conCatP:values.A_conCatP,
            A_dateFP: values.A_dateFP,


            A_Obsersvation:values.A_Obsersvation,
      //------------------------

            B_conNom:values.B_conNom,
            B_conPrenom:values.B_conPrenom,
            B_conDateN:values.B_conDateN,
            // B_conPhone:values,
            B_conAdresse:values.B_conAdresse,
            B_conNumP:values.B_conNumP,
            B_conCatP:values.B_conCatP,
            B_dateFP:values.B_dateFP,


            B_Obsersvation:values.B_Obsersvation,
      //------------------------

            expert: "",

            message: "",

            demRec: false,

            loading: false,

            RDV: values.RDV,

            RDVtime: values.RDVtime,

            rembourse: false,

            RDVdate: values.RDVdate,
      //---------------------
            location: values.location,

            PCimage: values.PCimage,

            PCAdimage: values.PCAdimage,

          });


       
          if (
          !validation(values).Car && 
          !validation(values).CarMarqu && 
          !validation(values).CarTyp && 
          !validation(values).Carimma && 
          !validation(values).assurAgen &&
          !validation(values).Adassure && 
          !validation(values).AdassurAgen && 
          !validation(values).nomeAd && 
          !validation(values).prenomAd && 
          !validation(values).adresseAd )
          {

            

            await setDoc(doc(db , "Constat", id), final)
            .then(()=>{
              setEnvoi(false);
              setconfirm(true);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        else{
          setErrors({ probleme : "Vous avez ratez quelques champs obligatoire , verifiez SVP! "}); 
        }

         
          //  await addDoc(collection(db, "messages", id, "chat"), );
      }


      const [progress, setProgress] = useState(0);
      const [progress2, setProgress2] = useState(0);
    
      const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
      };
    
      const uploadFiles = (file) => {
        setErrors2({});
        //
        if (!file) return;
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
              
              setimagePC(downloadURL)
    
            });
          }
        );
      };
    
      const formHandler2 = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles2(file);
      };
    
      const uploadFiles2 = (file) => {
        setErrors3({});
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
        
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress2(prog);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              
              setimagePCad(downloadURL);
            });
          }
        );
      };



  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled
        components={{ Input: StyledInputElement, Textarea: StyledTextareaElement }}
        {...props}
        ref={ref}
      />
    );
  });



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

return (
  <div>
    
    <Box sx={{ '& > :not(style)': { m: 1 } }}>

    <Fab onClick={goAV} variant="extended" color="primary" aria-label="add">
      <AddIcon />
      <DriveEta />
    </Fab>

    <Fab onClick={go} variant="extended" color="secondary">
      <Person sx={{ mr: 1 }} />
      Profil
    </Fab>

    {/* <Fab  aria-label="edit">
      <EditIcon />
    </Fab> */}


    </Box>

  <div style={{padding : " 10%"}}>
  <Typography className='error' variant="overline" display="block" gutterBottom>
   Champs a rectifier : {values.message} </Typography>
  <Grid container spacing={1} style={{ backgroundColor : "white"}} >
 <Grid item xs={12} sm={4} container className='deux' style={{ backgroundColor : "white"}}>

        <Grid item xs={6}  style={brd}>     <Typography variant="overline" display="block" gutterBottom>
        Date de l'accident :      </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>

        <DesktopDatePicker
          label="Date de l'accident"
          inputFormat="dd/MM/yyyy"
          value={values.dateAc}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider></Grid>
        <Grid item xs={6}  style={brd}><Typography variant="overline" display="block" gutterBottom>
        Heure:  </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>

        
        <TimePicker
          label="Time"
          value={values.heureAc}
          onChange={handleChangeT}
          renderInput={(params) => <TextField {...params} />}
        />

</LocalizationProvider>
        </Grid>

</Grid>

<Grid item xs={12} sm={4} className='deux'>
<Typography variant="overline" display="block" gutterBottom  style={brd}>
        localisation:
 </Typography>
 <Tooltip title="Localisation" placement="Top" >
<AddLocationAltIcon fontSize='large' sx={{color: "skyblue"}} onClick={()=>{setmap(true)}} />
</Tooltip>
 {/* <button onClick={()=>{setmap(true)}}> See Location </button> */}

{map ? <>
{/* <button onClick={()=>{setmap(false)}}> fermer la fenetre </button> */}
<Tooltip title="Fermer la Localisation" placement="Top" >
  <WrongLocationIcon fontSize='large' sx={{color: "red"}} onClick={()=>{setmap(false)}} />
  </Tooltip>
</> : <></>}

<TextField fullWidth sx={{marginLeft: '10px' ,width: '50%', height : '30%'}} id="fullWidth" value={location.lat} />
<TextField fullWidth sx={{width: '50%',height : '30%'}} id="fullWidth" value={location.lng} />
{status && status=="Locating..." ?<> {status}</>:<></>}
</Grid>

<Grid item xs={12} sm={4} className='deux' style={brd}>
    <Typography variant="overline" display="block" gutterBottom>
        Blesse:
        <FormGroup>
      <FormControlLabel control={<Checkbox  />} label="Oui" />
      <FormControlLabel  control={<Checkbox defaultChecked />} label="Non" />
    </FormGroup>  </Typography>
</Grid>

{map ? <>
<Grid item xs={12} sm={12} className='deux' style={brd}>
<div>
      <Tooltip title="Avoir ma Localisation" placement="Top" >
      <PlaceIcon fontSize='large' sx={{color: "blue"}} onClick={()=>{getLocation()}} />
      </Tooltip>
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


<Grid item xs={12} sm={4} className='deux' container  style={brd}>
<Typography variant="overline" display="block" gutterBottom>
Dégâts matériels à des 
  </Typography>
<Grid item xs={6}  style={brd}><Typography variant="overline" display="block" gutterBottom>
véhicules autres que A et B: <FormGroup>
      <FormControlLabel control={<Checkbox  />} label="Oui" />
      <FormControlLabel  control={<Checkbox defaultChecked />} label="Non" />
    </FormGroup>  </Typography></Grid>
        <Grid item xs={6}  style={brd}><Typography variant="overline" display="block" gutterBottom>
        objets autres que des véhicules: <FormGroup>
      <FormControlLabel control={<Checkbox  />} label="Oui" />
      <FormControlLabel  control={<Checkbox defaultChecked/>} label="Non" />
    </FormGroup>  </Typography></Grid>

</Grid>

<Grid item xs={12} sm={8} className='deux' container  style={brd}>
<Typography variant="overline" display="block" gutterBottom>
Témoins : noms, adresses, tél: 

<div className="onee">
<TextField id="outlined-basic" placeholder="Type something…" variant="outlined"  />
</div>
<CustomInput aria-label="Demo input"  multiline placeholder="Type something…" className='nonee' />
</Typography>
</Grid>

<Grid  xs={12} sm={4} className='deux' style={brd} > 
<Form className='constB'>
<Typography variant="h6" gutterBottom component="div"   style={brd}>

Preneur d'assurance/assuré (voir attestation d'assurance)
      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM:       <TextField id="outlined-basic"  variant="outlined" value={values.A_nom}/>
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :<TextField id="outlined-basic"  variant="outlined" value={values.A_prenom} /></Typography>
<Typography variant="overline" display="block" gutterBottom>
Adresse : <TextField id="outlined-basic"  variant="outlined" value={values.A_adresse} /></Typography>
<Typography variant="overline" display="block" gutterBottom>
{/* Code postal : <TextField id="outlined-basic"  variant="outlined" value={values.A_codeP}/></Typography>
<Typography variant="overline" display="block" gutterBottom> */}
Tél. ou e-mail : <TextField id="outlined-basic"  variant="outlined" value={values.A_phone}/></Typography>


<Typography variant="h6" gutterBottom component="div"  style={brd}>
Vehicule  
{/* <div className='select'>
                        <label  style={brd} >selectionner un vehicule</label>
                    <select 
                    // value={values.Car}
                      onChange={e=>{
                        // setValues({...values, Car:e.target.value}) ;
                       recheV(e.target.value) ;}}>
                      <option >Car</option>
                    {Car.map((Car) => (
                        <><option value={Car.ID}> {Car.marque} </option></>
                    ))}
                     </select>
                    </div>    
                    {validation(values).Car && <p className="error">{validation(values).Car}</p>} */}

                    </Typography>
<Grid item container xs={12}>
<Grid item xs={6} >
<Typography variant="overline" display="block" gutterBottom>
Moteur: {values.A_energie}</Typography>
<Typography variant="overline" display="block" gutterBottom >
Marque, type: <TextField id="outlined-basic"  variant="outlined" value={values.A_marque}/></Typography> 
<Typography variant="overline" display="block" gutterBottom>
N° d'immatriculation: <TextField id="outlined-basic"  variant="outlined"  value={values.A_imma}/>
</Typography>
</Grid>

<Grid item xs={6} >
<Typography variant="overline" display="block" gutterBottom>
REMORQUE:</Typography>
<Typography variant="overline" display="block" gutterBottom>
 type: <TextField  id="outlined-basic"  variant="outlined" value={values.A_type} /></Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
N° d'immatriculation <TextField id="outlined-basic"  variant="outlined" />
:</Typography> */}
</Grid>
</Grid>
<Typography variant="h6" gutterBottom component="div"   style={brd} sx={{float : 'left'}}>
Société d'assurance (voir attestation d'assurance)      </Typography>


{/* <Typography variant="overline" display="block" gutterBottom>
NOM: <TextField id="outlined-basic"  variant="outlined" value={values.A_assure} onChange={(e)=>{ setValues({ ...values, A_assure:e.target.value})}}/>
{validation(values).assure && <p className="error">{validation(values).assure}</p>}
</Typography> */}
<Typography variant="overline" display="block" gutterBottom>
N° de contratAttestation d'assurance ou carte verte valable du :
<LocalizationProvider dateAdapter={AdapterDateFns}>

        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          value={values.A_assuDateD}
          onChange={handleChange4}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        <br></br>
 au 
 <LocalizationProvider dateAdapter={AdapterDateFns}>

<DesktopDatePicker
 
  inputFormat="dd/MM/yyyy"
  value={values.A_assuDateF}
  onChange={handleChange5}
  renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>
 </Typography>
<Typography variant="overline" display="block" gutterBottom>
Agence (ou bureau, ou courtier) : <TextField id="outlined-basic"  variant="outlined" value={values.A_assurAgen} onChange={(e)=>{setValues({...values, A_assurAgen:e.target.value})}}/>
{validation(values).assurAgen && <p className="error">{validation(values).assurAgen}</p>}
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Les dégâts matériels au véhicule sont-ils assurés par le contrat ?: </Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Oui" />
      <FormControlLabel  control={<Checkbox />} label="Non" />
      <Typography variant="h6" gutterBottom component="div"  style={brd}>
      Conducteur (voir permis de conduire )      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM: <TextField id="outlined-basic"  variant="outlined" value={values.A_conNom} onChange={e=>{setValues({...values, A_conNom:e.target.value})}} /></Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :<TextField id="outlined-basic"  variant="outlined" value={values.A_conPrenom} onChange={(e)=>{setValues({...values, A_conPrenom:e.target.value})}}/></Typography>
<Typography variant="overline" display="block" gutterBottom>
 Date de naissance:</Typography>
 <LocalizationProvider dateAdapter={AdapterDateFns}>

<DesktopDatePicker
  label="date de naissance"
  inputFormat="dd/MM/yyyy"
  value={values.A_conDateN}
  onChange={handleChange3}
  renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>
<Typography variant="overline" display="block" gutterBottom>
Adresse  : <TextField id="outlined-basic"  variant="outlined" value={values.A_conAdresse}  onChange={(e)=>{setValues({...values, A_conAdresse:e.target.value})}} /></Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Tél. ou e-mail : <TextField id="outlined-basic"  variant="outlined" value={values.A_conPhone} onChange={(e)=>{setValues({...values, conPhone:e.target.value})}} /></Typography> */}
<Typography variant="overline" display="block" gutterBottom>
Permis de conduire no  : <TextField id="outlined-basic"  variant="outlined" value={values.A_conNumP} onChange={(e)=>{setValues({...values, A_conNumP:e.target.value})}} />
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Catégorie (A, B, ...)  : 
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.A_conCatP}
    label=" Cat"
    onChange={(e)=>{setValues({...values, A_conCatP:e.target.value})}}
  >
    <MenuItem value={'A'}>A</MenuItem>
    <MenuItem value={'B'}>B</MenuItem>
    <MenuItem value={'C'}>C</MenuItem>
  </Select>
  </Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Catégorie (A, B, ...)  :
<TextField id="outlined-basic"  variant="outlined" value={values.conCatP} onChange={(e)=>{setValues({...values, conCatP:e.target.value})}} />
</Typography> */}
<Typography variant="overline" display="block" gutterBottom>
Permis valable jusqu'au  :</Typography>
<LocalizationProvider dateAdapter={AdapterDateFns}>

        <DesktopDatePicker
          label="Permis valable jusqu'au"
          inputFormat="dd/MM/yyyy"
          value={values.A_dateFP}
          onChange={handleChange2}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>



<div>
<img src="../assets/images/degat.png" alt="degats"   className='imgbx'/></div>
<Typography variant="overline" display="block" gutterBottom>
Les zones touches  : 



</Typography>
<FormGroup sx={{display : 'inline'}}>
      <FormControlLabel control={<Checkbox  />} label="1" />
      <FormControlLabel  control={<Checkbox />} label="2" />
      <FormControlLabel control={<Checkbox  />} label="3" />
      <FormControlLabel  control={<Checkbox />} label="4" />
      <FormControlLabel control={<Checkbox  />} label="5" />
      <FormControlLabel  control={<Checkbox />} label="6" />
      <FormControlLabel control={<Checkbox  />} label="7" />
      <FormControlLabel  control={<Checkbox />} label="8" />
      <FormControlLabel control={<Checkbox  />} label="9" />
      <FormControlLabel  control={<Checkbox />} label="10" />
      <FormControlLabel control={<Checkbox  />} label="11" />
      <FormControlLabel control={<Checkbox  />} label="12" />
      <FormControlLabel  control={<Checkbox />} label="13" />
      <FormControlLabel control={<Checkbox  />} label="14" />
      <FormControlLabel  control={<Checkbox />} label="15" />
      <FormControlLabel  control={<Checkbox />} label="16" />


    </FormGroup>

<Typography variant="overline" display="block" gutterBottom>
Degats :( degat 1 ; degat 2 ... ) : <TextField id="outlined-basic" fullWidth placeholder='degats : degat 1 ; degat 2 ...' variant="outlined"  value={values.A_deg} onChange={(e)=>{setValues({...values, A_deg:e.target.value})}} />
</Typography>

{/* <Typography variant="overline" display="block" gutterBottom>
Observations :  <TextField fullWidth sx={{marginTop: '4%', height : '30%'}} id="fullWidth" value={values.A_Obsersvation} onChange={(e)=>{setValues({...values, A_Obsersvation:e.target.value})}}/>
</Typography> */}

<Typography variant="overline" display="block" gutterBottom>
Observations : </Typography>
 <TextField fullWidth sx={{marginTop: '4%', height : '30%'}} id="fullWidth" value={values.A_Obsersvation} onChange={(e)=>{setValues({...values, A_Obsersvation:e.target.value})}} />


<Typography variant="overline" display="block" gutterBottom>
signature  :
 ...........</Typography>
 <Typography variant="overline" display="block" gutterBottom>
 photo de Permis de conduite ....</Typography>

 
    
</Form>
<div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="input" onChange={()=>{setimagepc(true)}} />
        {imagepc ? <>
          <Tooltip title="Importer" placement="Top" >
        <button className='buttonIm' style={{backgroundColor: "transparent", border: "none"}} type="submit"> 
        <UploadFileIcon fontSize='meduim' sx={{color: "black"}} />
        Upload</button></Tooltip>
        {/* <button type="submit">Upload</button> */}
        </>:<></>}
      </form>
      <hr />
      {errors2.imagePC && <p className="error">{errors2.imagePC}</p>}
      
      <h2>Uploading done {progress}%</h2>
      
    </div>
    <div className="Li" >
         <div className="boxclose"
              onClick={() => {setimagePC('') }}
            >
              <span
                style={{
                  // paddingBottom: 7,
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "normal",
                }}
              >
                x
              </span>
      </div>
      <img className='imgV' src={imagePC} alt="" />
      </div>
</Grid>

<Grid item xs={12} sm={4} className='deux' style={brd} >
<Typography variant="overline" display="block" gutterBottom>
 
<FormControlLabel control={<Checkbox  />}  />
En stationnement/à l'arrêt
      <FormControlLabel  control={<Checkbox />}  />
      </Typography>

      <Typography variant="overline" display="block" gutterBottom>
 
 <FormControlLabel control={<Checkbox  />}  />
 quittait un stationnement/<FormControlLabel  control={<Checkbox />}  />
ouvrait une portière       
       </Typography>



       <Typography variant="overline" display="block" gutterBottom>
 
<FormControlLabel control={<Checkbox  />}  />
prenait un stationnement
      <FormControlLabel  control={<Checkbox />}  />
      </Typography>

      <Typography variant="overline" display="block" gutterBottom></Typography>

      <Typography variant="overline" display="block" gutterBottom>
 
 <FormControlLabel control={<Checkbox  />}  />
 sortait d'un parking, d'un lieu/<FormControlLabel  control={<Checkbox />}  />
 privé, d'un chemin de terre     
       </Typography>


<Typography variant="overline" display="block" gutterBottom>

       <FormControlLabel control={<Checkbox  />}  />
       s'engageait d'un parking, d'un lieu/<FormControlLabel  control={<Checkbox />}  />
 privé, d'un chemin de terre     
       </Typography>

       <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox  />}  />
       s'engageait sur une place<FormControlLabel  control={<Checkbox />}  />
       à sens giratoire       </Typography>



       <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox  />}  />
        heurtait à l'arrière, en  <FormControlLabel  control={<Checkbox />}  />
        roulant  dans le même sens et sur une même file      </Typography>



        <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox  />}  />
        roulait dans le même sens<FormControlLabel  control={<Checkbox />}  />
        et sur une file différente       </Typography>


        <Typography variant="overline" display="block" gutterBottom>
 
 <FormControlLabel control={<Checkbox  />}  />
 changeait de file

       <FormControlLabel  control={<Checkbox />}  />
       </Typography>
       
       
       
       <Typography variant="overline" display="block" gutterBottom>

       <FormControlLabel control={<Checkbox  />}  />
       doublait
       <FormControlLabel  control={<Checkbox />}  />
       </Typography>


       <Typography variant="overline" display="block" gutterBottom>

<FormControlLabel control={<Checkbox  />}  />
virait à droite
<FormControlLabel  control={<Checkbox />}  />
</Typography>


<Typography variant="overline" display="block" gutterBottom>

<FormControlLabel control={<Checkbox  />}  />
virait à gauche
<FormControlLabel  control={<Checkbox />}  />
</Typography>

<Typography variant="overline" display="block" gutterBottom>

<FormControlLabel control={<Checkbox  />}  />
reculait
<FormControlLabel  control={<Checkbox />}  />
</Typography>



<Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox  />}  />
        empiétait sur une voie<FormControlLabel  control={<Checkbox />}  />
        réservée à la circulation
en sens inverse    </Typography>




<Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox  />}  />
        venait de droite (dans un <FormControlLabel  control={<Checkbox />}  />
         carrefour)   </Typography>

        <Typography variant="overline" display="block" gutterBottom>
        <FormControlLabel control={<Checkbox  />}  />
        n'avait pas observé un signale <FormControlLabel  control={<Checkbox />}  />
        priorité ou un feu rouge   </Typography>


 

</Grid>

<Grid item xs={12} sm={4}  className='deux' style={brd}>
  <Form className='constJ'>
<Typography variant="h6" gutterBottom component="div"   style={brd}>

Preneur d'assurance/assuré (voir attestation d'assurance d'adversaire)
      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM:      <TextField id="outlined-basic"  variant="outlined" value={values.B_nom} onChange={(e)=>{setValues({...values, B_nom:e.target.value})}} />
{validation(values).nomeAd && <p className="error">{validation(values).nomeAd}</p>}   
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :<TextField id="outlined-basic"  variant="outlined" value={values.B_prenom} onChange={(e)=>{setValues({...values, B_prenom:e.target.value})}}/>
{validation(values).prenomAd && <p className="error">{validation(values).prenomAd}</p>} </Typography>
<Typography variant="overline" display="block" gutterBottom>
Adresse : <TextField id="outlined-basic"  variant="outlined" value={values.B_adresse} onChange={(e)=>{setValues({...values, B_adresse:e.target.value})}}/>
{validation(values).adresseAd && <p className="error">{validation(values).adresseAd}</p>} </Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Code postal : <TextField id="outlined-basic"  variant="outlined" value={values.B_codeP} onChange={(e)=>{setValues({...values, B_codeP:e.target.value})}} /></Typography> */}
{/* <Typography variant="overline" display="block" gutterBottom>
Tél. ou e-mail : <TextField id="outlined-basic"  variant="outlined" value={values.B_phoneAd} onChange={(e)=>{setValues({...values, phoneAd:e.target.value})}}/></Typography> */}


<Typography variant="h6" gutterBottom component="div"  style={brd}>
Vehicule      </Typography>
<Grid item container xs={12}>
<Grid item xs={6} >
<Typography variant="overline" display="block" gutterBottom>
Moteur:</Typography>
<Typography variant="overline" display="block" gutterBottom>
Marque, type: <TextField id="outlined-basic"  variant="outlined" value={values.B_CarMarqu} onChange={(e)=>{setValues({...values, B_CarMarqu:e.target.value})}}/>
{validation(values).CarMarqu && <p className="error2">{validation(values).CarMarqu}</p>}
</Typography> 
<Typography variant="overline" display="block" gutterBottom>
N° d'immatriculation <TextField id="outlined-basic"  variant="outlined" value={values.B_Carimma} onChange={(e)=>{setValues({...values, B_Carimma:e.target.value})}}/>
{validation(values).Carimma && <p className="error2">{validation(values).Carimma}</p>}
</Typography>
</Grid>

<Grid item xs={6} >
<Typography variant="overline" display="block" gutterBottom>
REMORQUE:</Typography>
<Typography variant="overline" display="block" gutterBottom>
Type: <TextField id="outlined-basic"  variant="outlined" value={values.B_CarTyp} onChange={(e)=>{setValues({...values, B_CarTyp:e.target.value})}} />
{validation(values).CarTyp && <p className="error2">{validation(values).CarTyp}</p>}
</Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
N° d'immatriculation <TextField id="outlined-basic"  variant="outlined" />
:</Typography> */}
</Grid>
</Grid>
<Typography variant="h6" gutterBottom component="div"   style={brd} sx={{float : 'left'}}>
Société d'assurance (voir attestation d'assurance)      </Typography>


<Typography variant="overline" display="block" gutterBottom>
NOM: <TextField id="outlined-basic"  variant="outlined" value={values.B_assure} onChange={(e)=>{setValues({...values, B_assure:e.target.value})}} />
{validation(values).Adassure && <p className="error">{validation(values).Adassure}</p>}
</Typography>
<Typography variant="overline" display="block" gutterBottom>
N° de contratAttestation d'assurance ou carte verte valable du :
<LocalizationProvider dateAdapter={AdapterDateFns}>

        <DesktopDatePicker
          
          inputFormat="dd/MM/yyyy"
          value={values.B_assuDateD}
          onChange={handleChange41}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        <br></br>
 au 
<LocalizationProvider dateAdapter={AdapterDateFns}>

        <DesktopDatePicker
          
          inputFormat="dd/MM/yyyy"
          value={values.B_assuDateF}
          onChange={handleChange51}
          renderInput={(params) => <TextField {...params} />}
        />
</LocalizationProvider>
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Agence (ou bureau, ou courtier) : <TextField required id="outlined-basic"  variant="outlined" value={values.B_assurAgen} onChange={(e)=>{setValues({...values, B_assurAgen:e.target.value})}}/>
{validation(values).AdassurAgen && <p className="error">{validation(values).AdassurAgen}</p>}
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Les dégâts matériels au véhicule sont-ils assurés par le contrat ?: </Typography>
      <FormControlLabel control={<Checkbox  />} label="Oui" />
      <FormControlLabel  control={<Checkbox />} label="Non" />


      <Typography variant="h6" gutterBottom component="div"  style={brd}>
      Conducteur (voir permis de conduire )      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM: <TextField  required id="outlined-basic"  variant="outlined" value={values.B_conNom} onChange={(e)=>{setValues({...values, B_conNom:e.target.value})}}/></Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :<TextField required id="outlined-basic"  variant="outlined" value={values.B_conPrenom}  onChange={(e)=>{setValues({...values, B_conPrenom:e.target.value})}}/></Typography>
<Typography variant="overline" display="block" gutterBottom>
 Date de naissance: </Typography>
 <LocalizationProvider dateAdapter={AdapterDateFns}>

<DesktopDatePicker
  label="date de naissance"
  inputFormat="dd/MM/yyyy"
  value={values.B_conDateN}
  onChange={handleChange31}
  renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>
 
<Typography variant="overline" display="block" gutterBottom>
Adresse  : <TextField id="outlined-basic"  variant="outlined" value={values.B_conAdresse} onChange={(e)=>{setValues({...values, B_conAdresse:e.target.value})}}/></Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Tél. ou e-mail : 
<TextField id="outlined-basic"  variant="outlined" value={values.AdconPhone} onChange={(e)=>{setValues({...values, AdconPhone:e.target.value})}}/>
</Typography> */}
<Typography variant="overline" display="block" gutterBottom>
Permis de conduire no  : <TextField id="outlined-basic"  variant="outlined" value={values.B_conNumP} onChange={(e)=>{setValues({...values, B_conNumP:e.target.value})}}/></Typography>
<Typography variant="overline" display="block" gutterBottom>
Catégorie (A, B, ...)  :
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.B_conCatP}
    label="Cat"
    onChange={(e)=>{setValues({...values, B_conCatP:e.target.value})}}
  >
    <MenuItem value={'A'}>A</MenuItem>
    <MenuItem value={'B'}>B</MenuItem>
    <MenuItem value={'C'}>C</MenuItem>
  </Select>
{/* <TextField id="outlined-basic"  variant="outlined" value={values.AdconCatP} onChange={(e)=>{setValues({...values, AdconCatP:e.target.value})}}/> */}

</Typography>
<Typography variant="overline" display="block" gutterBottom>
Permis valable jusqu'au  : </Typography>
<LocalizationProvider dateAdapter={AdapterDateFns}>

<DesktopDatePicker
  label="Permis valable jusqu'au"
  inputFormat="dd/MM/yyyy"
  value={values.B_dateFP}
  onChange={handleChange21}
  renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>




<img src="../assets/images/degat.png" alt="degats"   className='imgbx'/>
<Typography variant="overline" display="block" gutterBottom>
Les zones touches  : 



</Typography>
<FormGroup sx={{display : 'inline'}}>
      <FormControlLabel control={<Checkbox  />} label="1" />
      <FormControlLabel  control={<Checkbox />} label="2" />
      <FormControlLabel control={<Checkbox  />} label="3" />
      <FormControlLabel  control={<Checkbox />} label="4" />
      <FormControlLabel control={<Checkbox  />} label="5" />
      <FormControlLabel  control={<Checkbox />} label="6" />
      <FormControlLabel control={<Checkbox  />} label="7" />
      <FormControlLabel  control={<Checkbox />} label="8" />
      <FormControlLabel control={<Checkbox  />} label="9" />
      <FormControlLabel  control={<Checkbox />} label="10" />
      <FormControlLabel control={<Checkbox  />} label="11" />
      <FormControlLabel control={<Checkbox  />} label="12" />
      <FormControlLabel  control={<Checkbox />} label="13" />
      <FormControlLabel control={<Checkbox  />} label="14" />
      <FormControlLabel  control={<Checkbox />} label="15" />
      <FormControlLabel  control={<Checkbox />} label="16" />


    </FormGroup>


<Typography variant="overline" display="block" gutterBottom>
Degats :( degat 1 ; degat 2 ... ) : <TextField id="outlined-basic" fullWidth placeholder='degats : degat 1 ; degat 2 ...' variant="outlined"  value={values.B_deg} onChange={(e)=>{setValues({...values, B_deg:e.target.value})}} />
</Typography>



<Typography variant="overline" display="block" gutterBottom>
Observations : </Typography>
 <TextField fullWidth sx={{marginTop: '4%', height : '30%'}} id="fullWidth" value={values.B_Obsersvation} onChange={(e)=>{setValues({...values, B_Obsersvation:e.target.value})}} />


<Typography variant="overline" display="block" gutterBottom>
signature  :
 ...........</Typography>
 <Typography variant="overline" display="block" gutterBottom>
 photo de Permis de conduite d'adversaire....</Typography>
</Form>
<div className="App">
      <form onSubmit={formHandler2}>
        <input type="file" className="input" onChange={()=>{setimagepcad(true)}} />
        {imagepcad ? <>
        {/* <button type="submit">Upload</button> */}
        <Tooltip title="Importer" placement="Top" >
        <button className='buttonIm' style={{backgroundColor: "transparent", border: "none"}} type="submit"> 
        <UploadFileIcon fontSize='meduim' sx={{color: "black"}} />
        Upload</button></Tooltip>
        </>:<></>}
        
      </form>
      <hr />
      {errors3.imagePCad && <p className="error">{errors3.imagePCad}</p>} 
      {/* {errors.probleme && <p className="error">{errors.probleme}</p>}  */}
      <h2>Uploading done {progress2}%</h2>
    
    </div>
    <div className="Li" >
         <div className="boxclose"
              onClick={() => {setimagePCad('')}}
            >
              <span
                style={{
                  // paddingBottom: 7,
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "normal",
                }}
              >
                x
              </span>
      </div>
      <img className='imgV' src={imagePCad} alt="" />
      </div>
</Grid>



  </Grid>

<ReactToPrint
        trigger={() => 
        <Button className='buttonIm' variant="contained" sx={{marginTop : '3%'}}>Imprimer le constat</Button>

      }
        content={() => componentRef.current}
      />
<br></br>


    {confirm ? 
        <p className="succès">Mise à jour effectuée avec succès</p> 
        : 
        <></>} 
    <Button variant="contained" sx={{marginTop : '3%'}} onClick={chege3}>Confirmer le constat
    { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
    </Button>
    
    {errors.probleme && <p className="error">{errors.probleme}</p>} 

      </div> </div>

)

}
