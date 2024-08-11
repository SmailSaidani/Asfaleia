import { Grid, Tooltip } from '@material-ui/core';
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
import { updateDoc, doc ,getDoc} from "firebase/firestore";
import {onAuthStateChanged, } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  GeoPoint,
} from "firebase/firestore";


// import ResponsiveDialog from './map';

import MapPicker from "react-google-map-picker";

import Form from 'react-bootstrap/Form';
import ClipLoader from "react-spinners/ClipLoader";
import validation from "./validation";


import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
  




  
export default function ConstatF() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);



var DefaultLocation = { lat: 36.7312717, lng: 3.0876783 };
var DefaultZoom = 15;

const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

const [location, setLocation] = useState(defaultLocation);
const [zoom, setZoom] = useState(DefaultZoom);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setmap(false);
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLocation ({ lat:position.coords.latitude , lng:position.coords.longitude});
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setmap(true);
        var DefaultLocation = {lat , lng};
        var DefaultZoom = 15;
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }


    const [ouvre , setouvre] = useState(false);
    const [value, setValue] = React.useState(new Date);

    const [isOpen, setIsOpen] = useState(false);

   

    
  
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
      const [values, setValues] = useState({


            dateAc: '',
            heureAc: '',


            A_nom: '',
            A_prenom: '',
            A_adresse: "",
            // A_codeP: '',
            A_phone: '',

            A_userid:'',

      //------------------------
            B_nom: "",
            B_prenom: "",
            B_adresse: "",
            // B_codeP: "",
            // phoneAd: "",
      //------------------------

            A_energie: '',
            A_marque: '',
            A_type: '',
            A_imma: '',
            A_carId: '',
            images: [],

      //------------------------    
            B_CarTyp:"",
            B_CarMarqu:"",
            B_Carimma:"",
            
      //------------------------

            A_assure:"",
            A_assuDateD:"",
            A_assuDateF:"",
            A_assurAgen:"",
            A_degats:[],
            A_deg:"",

      //------------------------
            B_assure:"",
            B_assuDateD:"",
            B_assuDateF:"",
            B_assurAgen:"",
            B_degats:[],
            B_deg:"",

      //------------------------

            A_conNom:"",
            A_conPrenom:"",
            A_conDateN:"",
            // conPhone:"",
            A_conAdresse:"",
            A_conNumP:"",
            A_conCatP:"",
            A_dateFP: "",


            A_Obsersvation:"",
      //------------------------

            B_conNom:"",
            B_conPrenom:"",
            B_conDateN:"",
            // B_conPhone:"",
            B_conAdresse:"",
            B_conNumP:"",
            B_conCatP:"",
            B_dateFP: "",


            B_Obsersvation:"",
      //------------------------

            expert :"",

            message :"",

            demRec :false,

            RDV : false, 

            RDVtime:"",

            RDVdate:"",

            rembourse: false,

            loading: false,

      });

    const [errors, setErrors] = useState({});
    const [errors1, setErrors1] = useState({});

    const [errors2, setErrors2] = useState({});
    const [errors3, setErrors3] = useState({});
    const [errorsD, setErrorsD] = useState({});

    const [imagepcad, setimagepcad] = useState(false);
    const [imagepc, setimagepc] = useState(false);

    const [photo, setphoto] = useState(false);
    const [photoad, setphotoad] = useState(false);

    const [voutour, setvoutour] = useState({});

    const recheV = async (ID) =>{
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
            
            const infos = await getDoc(doc(db, "Users", currentUser.uid , "cars" , ID));
            setvoutour(infos.data());

            setValues({...values, 
              
              A_carId: infos.id,
              A_energie: infos.data().energie,
              A_marque: infos.data().marque,
              A_type: infos.data().TypeV,
              A_carNom: infos.data().nom,
              A_imma: infos.data().imma,
              images: infos.data().images,
              A_assuDateD: infos.data().dateD,
              A_assuDateF: infos.data().dateF,
              A_assurAgen: infos.data().userAgen,

  
          });
    
            }
    
            });

    }

   

      
    
    const history = useHistory();
    const handleChange = (newValue) => {
      setValue(newValue);
      console.log(value);
      setValues({...values, dateAc:newValue});
      setErrorsD({});
      // setValues({...values, heureAc:newValue});
    }
    const handleChangeT = (newValue) => {
      
      setValues({...values, heureAc:newValue});
      setErrorsD({});
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

      useEffect(async () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
            setUser(currentUser);
            const infos = await getDoc(doc(db, "Users", currentUser.uid));
            setInfo(infos.data());
            
            setValues({...values, 
              
              A_userid: infos.id,
              A_nom: infos.data().nom,
              A_prenom: infos.data().prenom,
              A_adresse: infos.data().adresse,
              // A_codeP: infos.data().codeP,
              A_phone: infos.data().phone,
          });
            }

            const q2 = query(collection(db, "Users" , currentUser.uid , 'cars'));

          const querySnapshot2 = await getDocs(q2);
          
          querySnapshot2.forEach((doc) => {
            // console.log(doc.data());
            try {
            con.push({
              ID: doc.id,
              imma :  doc.data().imma,
              marque : doc.data().marque,
              numS : doc.data().numS,
              image: doc.data().image,
            });

            } catch (error) {
              console.log(error.message);
            }
            
          });



          setCar(con);
          // console.log(Car);


            });
      }, []);


  const [envoi , setEnvoi] = useState(false);
  const [confirm , setconfirm] = useState(false);


  const [map , setmap] = useState(false);
  const [imagePC , setimagePC] = useState('');
  const [imagePCad , setimagePCad] = useState('');
  

  const chege3 = async () =>{

        setErrors({});
        setErrors1(validation(values));
        
        setEnvoi(true);


        const loca = new GeoPoint ( location.lat , location.lng )

        const time = new Date().toISOString();
        const Ftime = time.slice(0, 10); 
        const Fheur = time.slice(11, 16); 

        const id = Ftime+'&'+Fheur+'&'+Info.userId;
      

          const final = {
            ...values,
            location: loca,
            PCimage: imagePC,
            PCAdimage: imagePCad,
            A_degats: allchecked,
            B_degats: allcheckedadv,
          }
          if(imagePC === ""){
            setErrors2({...errors2 , imagePC:'veiliez impotrer une image de votre permis de conduite!'})
          }
          if(imagePCad === ""){
            setErrors3({...errors3 , imagePCad:'veiliez impotrer une image de permis de conduite de votre adversaire !'})
          }
          if(values.dateAc === "" || values.heureAc === ''){
            setErrorsD({...errorsD , Date: "veiliez saisire la date/heure d'accident !"})
          }

          if (
          imagePC !== '' && 
          imagePCad !== ''&& 
          values.dateAc !== '' && 
          values.heureAc !== ''&& 
          !validation(values).Car && 
          !validation(values).CarMarqu && 
          !validation(values).CarTyp && 
          !validation(values).Carimma && 
          !validation(values).assurAgen &&
          !validation(values).Adassure && 
          !validation(values).AdassurAgen && 
          !validation(values).nomeAd && 
          !validation(values).prenomAd && 
          !validation(values).adresseAd
           )
          {
            await setDoc(doc(db , "Constat", id), final)
            .then( async()=>{
              await updateDoc(doc(db, "Users", values.A_userid), { const: Info.const + 1 })
              setEnvoi(false);
              setconfirm(true);
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else{ 
          setErrors({...errors, probleme: "Vous avez ratez quelques champs obligatoire , verifiez SVP! "}); 
        }

        // console.log(final);
        

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
          
          setimagePC(downloadURL);
          setphoto(true);

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
          setphotoad(true);
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

  
  
  
  
  
  
  
  
  const [check1 , setCheck1]=useState({})
  const [allchecked , setAllCh]=useState([
    {
      ind : '1',
      checked : 'false'
    },
    {
      ind : '2',
      checked : 'false'
    },
    {
      ind : '3',
      checked : 'false'
    },
    {
      ind : '4',
      checked : 'false'
    },
    {
      ind : '5',
      checked : 'false'
    },
    {
      ind : '6',
      checked : 'false'
    },
    {
      ind : '7',
      checked : 'false'
    },
    {
      ind : '8',
      checked : 'false'
    },
    {
      ind : '9',
      checked : 'false'
    },
    {
      ind : '10',
      checked : 'false'
    },
    {
      ind : '11',
      checked : 'false'
    },
    {
      ind : '12',
      checked : 'false'
    },
    {
      ind : '13',
      checked : 'false'
    },
    {
      ind : '14',
      checked : 'false'
    },
    {
      ind : '15',
      checked : 'false'
    },
    {
      ind : '16',
      checked : 'false'
    },


  ]);



  const [checked1, setChecked1] = React.useState(false);

  const save = (event) => {
    setChecked1(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 1,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[0].checked == 'false'){
      newArr[0].checked= 'true'
    }else {
      if (newArr[0].checked == 'true'){
        newArr[0].checked= 'false'
    }}   
    setAllCh(newArr);
    console.log(allchecked)
    
  };
  const [checked2, setChecked2] = React.useState(false);


  const save1 = (event) => {
    setChecked2(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 2,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[1].checked == 'false'){
      newArr[1].checked= 'true'
    }else {
      if (newArr[1].checked == 'true'){
        newArr[1].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };
  const [checked3, setChecked3] = React.useState(false);

  const save2 = (event) => {
    setChecked3(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 3,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[2].checked == 'false'){
      newArr[2].checked= 'true'
    }else {
      if (newArr[2].checked == 'true'){
        newArr[2].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked4, setChecked4] = React.useState(false);

  const save3 = (event) => {
    setChecked4(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 4,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[3].checked == 'false'){
      newArr[3].checked= 'true'
    }else {
      if (newArr[3].checked == 'true'){
        newArr[3].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked5, setChecked5] = React.useState(false);

  const save4 = (event) => {
    setChecked5(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 5,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[4].checked == 'false'){
      newArr[4].checked= 'true'
    }else {
      if (newArr[4].checked == 'true'){
        newArr[4].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked6, setChecked6] = React.useState(false);

  const save5 = (event) => {
    setChecked6(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 6,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[5].checked == 'false'){
      newArr[5].checked= 'true'
    }else {
      if (newArr[5].checked == 'true'){
        newArr[5].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };
   
  const [checked7, setChecked7] = React.useState(false);

  const save6 = (event) => {
    setChecked7(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 7,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[6].checked == 'false'){
      newArr[6].checked= 'true'
    }else {
      if (newArr[6].checked == 'true'){
        newArr[6].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };
  const [checked8, setChecked8] = React.useState(false);

  const save7 = (event) => {
    setChecked8(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 8,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[7].checked == 'false'){
      newArr[7].checked= 'true'
    }else {
      if (newArr[7].checked == 'true'){
        newArr[7].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked9, setChecked9] = React.useState(false);

  const save8 = (event) => {
    setChecked9(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 9,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[8].checked == 'false'){
      newArr[8].checked= 'true'
    }else {
      if (newArr[8].checked == 'true'){
        newArr[8].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked10, setChecked10] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const save9 = (event) => {
    setChecked10(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 10,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[9].checked == 'false'){
      newArr[9].checked= 'true'
    }else {
      if (newArr[9].checked == 'true'){
        newArr[9].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked11, setChecked11] = React.useState(false);

  const save10 = (event) => {
    setChecked11(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 11,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[10].checked == 'false'){
      newArr[10].checked= 'true'
    }else {
      if (newArr[10].checked == 'true'){
        newArr[10].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };
   
  const [checked12, setChecked12] = React.useState(false);

  const save11 = (event) => {
    setChecked12(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 12,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[11].checked == 'false'){
      newArr[11].checked= 'true'
    }else {
      if (newArr[11].checked == 'true'){
        newArr[11].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };
  const [checked13, setChecked13] = React.useState(false);

  const save12 = (event) => {
    setChecked13(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 13,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[12].checked == 'false'){
      newArr[12].checked= 'true'
    }else {
      if (newArr[12].checked == 'true'){
        newArr[12].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked14, setChecked14] = React.useState(false);

  const save13 = (event) => {
    setChecked14(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 14,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[13].checked == 'false'){
      newArr[13].checked= 'true'
    }else {
      if (newArr[13].checked == 'true'){
        newArr[13].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };

  const [checked15, setChecked15] = React.useState(false);

  const save14 = (event) => {
    setChecked15(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 15,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[14].checked == 'false'){
      newArr[14].checked= 'true'
    }else {
      if (newArr[14].checked == 'true'){
        newArr[14].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };
  const [checked16, setChecked16] = React.useState(false);

  const save15 = (event) => {
    setChecked16(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 16,
      val : event.target.checked
    };
    let newArr = [...allchecked]; // copying the old datas array
    if (newArr[15].checked == 'false'){
      newArr[15].checked= 'true'
    }else {
      if (newArr[15].checked == 'true'){
        newArr[15].checked= 'false'
    }}       setAllCh(newArr);
    console.log(allchecked)
    
  };









  const [allcheckedadv , setAllChAdv]=useState([
    {
      ind : '1',
      checked : 'false'
    },
    {
      ind : '2',
      checked : 'false'
    },
    {
      ind : '3',
      checked : 'false'
    },
    {
      ind : '4',
      checked : 'false'
    },
    {
      ind : '5',
      checked : 'false'
    },
    {
      ind : '6',
      checked : 'false'
    },
    {
      ind : '7',
      checked : 'false'
    },
    {
      ind : '8',
      checked : 'false'
    },
    {
      ind : '9',
      checked : 'false'
    },
    {
      ind : '10',
      checked : 'false'
    },
    {
      ind : '11',
      checked : 'false'
    },
    {
      ind : '12',
      checked : 'false'
    },
    {
      ind : '13',
      checked : 'false'
    },
    {
      ind : '14',
      checked : 'false'
    },
    {
      ind : '15',
      checked : 'false'
    },
    {
      ind : '16',
      checked : 'false'
    },


  ]);


  
  const [checkedadv1, setCheckedAdv1] = React.useState(false);

  const saveadv = (event) => {
    setCheckedAdv1(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 1,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[0].checked == 'false'){
      newArr[0].checked= 'true'
    }else {
      if (newArr[0].checked == 'true'){
        newArr[0].checked= 'false'
    }}     setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
  const [checkedadv2, setCheckedAdv2] = React.useState(false);


  const saveadv1 = (event) => {
    setCheckedAdv2(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 2,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[1].checked == 'false'){
      newArr[1].checked= 'true'
    }else {
      if (newArr[1].checked == 'true'){
        newArr[1].checked= 'false'
    }}     setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
  const [checkedadv3, setCheckedAdv3] = React.useState(false);

  const saveadv2 = (event) => {
    setCheckedAdv3(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 3,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[2].checked == 'false'){
      newArr[2].checked= 'true'
    }else {
      if (newArr[2].checked == 'true'){
        newArr[2].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv4, setCheckedAdv4] = React.useState(false);

  const saveadv3 = (event) => {
    setCheckedAdv4(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 4,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[3].checked == 'false'){
      newArr[3].checked= 'true'
    }else {
      if (newArr[3].checked == 'true'){
        newArr[3].checked= 'false'
    }}     setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv5, setCheckedAdv5] = React.useState(false);

  const saveadv4 = (event) => {
    setCheckedAdv5(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 5,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[4].checked == 'false'){
      newArr[4].checked= 'true'
    }else {
      if (newArr[4].checked == 'true'){
        newArr[4].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv6, setCheckedAdv6] = React.useState(false);

  const saveadv5 = (event) => {
    setCheckedAdv6(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 6,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[5].checked == 'false'){
      newArr[5].checked= 'true'
    }else {
      if (newArr[5].checked == 'true'){
        newArr[5].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
   
  const [checkedadv7, setCheckedAdv7] = React.useState(false);

  const saveadv6 = (event) => {
    setCheckedAdv7(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 7,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[6].checked == 'false'){
      newArr[6].checked= 'true'
    }else {
      if (newArr[6].checked == 'true'){
        newArr[6].checked= 'false'
    }}     setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
  const [checkedadv8, setCheckedAdv8] = React.useState(false);

  const saveadv7 = (event) => {
    setCheckedAdv8(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 8,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[7].checked == 'false'){
      newArr[7].checked= 'true'
    }else {
      if (newArr[7].checked == 'true'){
        newArr[7].checked= 'false'
    }}    setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv9, setCheckedAdv9] = React.useState(false);

  const saveadv8 = (event) => {
    setCheckedAdv9(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 9,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[8].checked == 'false'){
      newArr[8].checked= 'true'
    }else {
      if (newArr[8].checked == 'true'){
        newArr[8].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv10, setCheckedAdv10] = React.useState(false);

  const saveadv9 = (event) => {
    setCheckedAdv10(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 10,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[9].checked == 'false'){
      newArr[9].checked= 'true'
    }else {
      if (newArr[9].checked == 'true'){
        newArr[9].checked= 'false'
    }}    setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv11, setCheckedAdv11] = React.useState(false);

  const saveadv10 = (event) => {
    setCheckedAdv11(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 11,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[10].checked == 'false'){
      newArr[10].checked= 'true'
    }else {
      if (newArr[10].checked == 'true'){
        newArr[10].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
   
  const [checkedadv12, setCheckedAdv12] = React.useState(false);

  const saveadv11 = (event) => {
    setCheckedAdv12(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 12,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[11].checked == 'false'){
      newArr[11].checked= 'true'
    }else {
      if (newArr[11].checked == 'true'){
        newArr[11].checked= 'false'
    }}     setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
  const [checkedadv13, setCheckedAdv13] = React.useState(false);

  const saveadv12 = (event) => {
    setCheckedAdv13(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 13,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[12].checked == 'false'){
      newArr[12].checked= 'true'
    }else {
      if (newArr[12].checked == 'true'){
        newArr[12].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv14, setCheckedAdv14] = React.useState(false);

  const saveadv13 = (event) => {
    setCheckedAdv14(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 14,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[13].checked == 'false'){
      newArr[13].checked= 'true'
    }else {
      if (newArr[13].checked == 'true'){
        newArr[13].checked= 'false'
    }}     setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };

  const [checkedadv15, setCheckedAdv15] = React.useState(false);

  const saveadv14 = (event) => {
    setCheckedAdv15(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 15,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[14].checked == 'false'){
      newArr[14].checked= 'true'
    }else {
      if (newArr[14].checked == 'true'){
        newArr[14].checked= 'false'
    }}    setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };
  const [checkedadv16, setCheckedAdv16] = React.useState(false);

  const saveadv15 = (event) => {
    setCheckedAdv16(event.target.checked);
    console.log(event.target.checked);
    var c1= {
      ind: 16,
      val : checked
    };
    let newArr = [...allcheckedadv]; // copying the old datas array
    if (newArr[15].checked == 'false'){
      newArr[15].checked= 'true'
    }else {
      if (newArr[15].checked == 'true'){
        newArr[15].checked= 'false'
    }}      setAllChAdv(newArr);
    console.log(allcheckedadv)
    
  };


const lab=1

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
  <div >


     <Box sx={{ '& > :not(style)': { m: 1 } }}>

      <Fab onClick={goAV} variant="extended" color="primary" aria-label="add">
        <AddIcon />
        <DriveEta />
      </Fab>
     
      <Fab onClick={go} color="secondary" variant="extended" >
        <Person sx={{ mr: 1 }} />
        Profil
      </Fab>

      {/* <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab> */}
      
      
    </Box>


     {/* <div className='aya'>< CgProfile className='iconn'  onClick={go}/> </div> */}

  <div style={{padding : " 10%"}} ref={componentRef} >
    
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
 {/* <button > See Location </button> */}

 {map ? <>
  <Tooltip title="Fermer la Localisation" placement="Top" >
  <WrongLocationIcon fontSize='large' sx={{color: "red"}} onClick={()=>{setmap(false)}} />
  </Tooltip>
 {/* <button > fermer la fenetre </button> */}
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
      {/* <button onClick={}>Get Location</button> */}
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
<TextField id="outlined-basic"  placeholder="Type something…" variant="outlined"  />
</div>
<CustomInput aria-label="Demo input" multiline placeholder="Type something…" className='nonee' />
</Typography>
</Grid>

<Grid  xs={12} sm={4} className='deux' style={brd} > 
<Form className='constB'>
<Typography variant="h6" gutterBottom component="div"   style={brd}>

Preneur d'assurance/assuré (voir attestation d'assurance)
      </Typography>
<Typography variant="overline" display="block" gutterBottom>
NOM:       <TextField id="outlined-basic"  variant="outlined" value={Info.nom}/>
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Prénom :<TextField id="outlined-basic"  variant="outlined" value={Info.prenom} /></Typography>
<Typography variant="overline" display="block" gutterBottom>
Adresse : <TextField id="outlined-basic"  variant="outlined" value={Info.adresse} /></Typography>
{/* <Typography variant="overline" display="block" gutterBottom>
Code postal : <TextField id="outlined-basic"  variant="outlined" value={Info.codeP}/></Typography> */}
<Typography variant="overline" display="block" gutterBottom>
Tél. ou e-mail : <TextField id="outlined-basic"  variant="outlined" value={Info.phone}/></Typography>


<Typography variant="h6" gutterBottom component="div"  style={brd}>
Vehicule  <div className='select'>
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
                    {validation(values).Car && <p className="error">{validation(values).Car}</p>}

                    </Typography>
<Grid item container xs={12}>
<Grid item xs={6} >
<Typography variant="overline" display="block" gutterBottom>
Moteur: {voutour.energie}</Typography>
<Typography variant="overline" display="block" gutterBottom >
Marque, type: <TextField id="outlined-basic"  variant="outlined" value={voutour.marque}/></Typography> 
<Typography variant="overline" display="block" gutterBottom>
N° d'immatriculation: <TextField id="outlined-basic"  variant="outlined"  value={voutour.imma}/>
</Typography>
</Grid>

<Grid item xs={6} >
<Typography variant="overline" display="block" gutterBottom>
REMORQUE:</Typography>
<Typography variant="overline" display="block" gutterBottom>
 nom: <TextField  id="outlined-basic"  variant="outlined" value={voutour.TypeV} /></Typography>
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
Tél. ou e-mail : <TextField id="outlined-basic"  variant="outlined" value={values.conPhone} onChange={(e)=>{setValues({...values, conPhone:e.target.value})}} /></Typography> */}
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
<img src="assets/images/degat.png" alt="degats" className='imgbx'/></div>
<Typography variant="overline" display="block" gutterBottom>
Les zones touches  : 

</Typography>
<FormGroup sx={{display : 'inline'}}>
<FormControlLabel
    control={<Checkbox
      checked={checked1}
       onChange={save} />}
   label={lab}
    />      <FormControlLabel   control={<Checkbox
      checked={checked2}
       onChange={save1} />} label="2" />
      <FormControlLabel   control={<Checkbox
      checked={checked3}
       onChange={save2} />} label="3" />

      <FormControlLabel    control={<Checkbox
      checked={checked4}
       onChange={save3} />} label="4" />
      <FormControlLabel   control={<Checkbox
      checked={checked5}
       onChange={save4} />} label="5" />
      <FormControlLabel    control={<Checkbox
      checked={checked6}
       onChange={save5} />} label="6" />
      <FormControlLabel   control={<Checkbox
      checked={checked7}
       onChange={save6} />} label="7" />
      <FormControlLabel    control={<Checkbox
      checked={checked8}
       onChange={save7} />} label="8" />
      <FormControlLabel   control={<Checkbox
      checked={checked9}
       onChange={save8} />} label="9" />
      <FormControlLabel    control={<Checkbox
      checked={checked10}
       onChange={save9} />} label="10" />
      <FormControlLabel   control={<Checkbox
      checked={checked11}
       onChange={save10} />} label="11" />
      <FormControlLabel   control={<Checkbox
      checked={checked12}
       onChange={save11} />} label="12" />
      <FormControlLabel    control={<Checkbox
      checked={checked13}
       onChange={save12} />} label="13" />
      <FormControlLabel   control={<Checkbox
      checked={checked14}
       onChange={save13} />} label="14" />
      <FormControlLabel    control={<Checkbox
      checked={checked15}
       onChange={save14} />} label="15" />
      <FormControlLabel    control={<Checkbox
      checked={checked16}
       onChange={save15} />} label="16" />


    </FormGroup>

<Typography variant="overline" display="block" gutterBottom>
Degats :( degat 1 ; degat 2 ... ) : <TextField id="outlined-basic" fullWidth placeholder='degats : degat 1 ; degat 2 ...' variant="outlined"  value={values.A_deg} onChange={(e)=>{setValues({...values, A_deg:e.target.value})}} />

</Typography>

<Typography variant="overline" display="block" gutterBottom>
Observations : </Typography>
 <TextField fullWidth sx={{marginTop: '4%', height : '30%'}} id="fullWidth" placeholder='Observation ...' value={values.A_Obsersvation} onChange={(e)=>{setValues({...values, A_Obsersvation:e.target.value})}}/>

<Typography variant="overline" display="block" gutterBottom>
signature  :
 ...........</Typography>
 
 
    
</Form>













   
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
NOM:       <TextField id="outlined-basic"  variant="outlined" value={values.B_nom} onChange={(e)=>{setValues({...values, B_nom:e.target.value})}} />
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
Tél. ou e-mail : <TextField id="outlined-basic"  variant="outlined" value={values.phoneAd} onChange={(e)=>{setValues({...values, phoneAd:e.target.value})}}/></Typography> */}


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




<img src="assets/images/degat.png" alt="degats"  className='imgbx'/>
<Typography variant="overline" display="block" gutterBottom>
Les zones touches  : 



</Typography>
<FormGroup sx={{display : 'inline'}}>
<FormControlLabel
    control={<Checkbox
      checked={checkedadv1}
       onChange={saveadv} />}
   label={lab}
    />      <FormControlLabel   control={<Checkbox
      checked={checkedadv2}
       onChange={saveadv1} />} label="2" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv3}
       onChange={saveadv2} />} label="3" />

      <FormControlLabel    control={<Checkbox
      checked={checkedadv4}
       onChange={saveadv3} />} label="4" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv5}
       onChange={saveadv4} />} label="5" />
      <FormControlLabel    control={<Checkbox
      checked={checkedadv6}
       onChange={saveadv5} />} label="6" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv7}
       onChange={saveadv6} />} label="7" />
      <FormControlLabel    control={<Checkbox
      checked={checkedadv8}
       onChange={saveadv7} />} label="8" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv9}
       onChange={saveadv8} />} label="9" />
      <FormControlLabel    control={<Checkbox
      checked={checkedadv10}
       onChange={saveadv9} />} label="10" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv11}
       onChange={saveadv10} />} label="11" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv12}
       onChange={saveadv11} />} label="12" />
      <FormControlLabel    control={<Checkbox
      checked={checkedadv13}
       onChange={saveadv12} />} label="13" />
      <FormControlLabel   control={<Checkbox
      checked={checkedadv14}
       onChange={saveadv13} />} label="14" />
      <FormControlLabel    control={<Checkbox
      checked={checkedadv15}
       onChange={saveadv14} />} label="15" />
      <FormControlLabel    control={<Checkbox
      checked={checkedadv16}
       onChange={saveadv15} />} label="16" />


    </FormGroup>

    <Typography variant="overline" display="block" gutterBottom>
Degats :( degat 1 ; degat 2 ... ) : <TextField id="outlined-basic" fullWidth placeholder='degats : degat 1 ; degat 2 ...' variant="outlined"  value={values.B_deg} onChange={(e)=>{setValues({...values, B_deg:e.target.value})}} />

</Typography>

<Typography variant="overline" display="block" gutterBottom>
Observations : </Typography>
 <TextField fullWidth sx={{marginTop: '4%', height : '30%'}} placeholder="Observations ..." id="fullWidth" value={values.B_Obsersvation} onChange={(e)=>{setValues({...values, B_Obsersvation:e.target.value})}} />


<Typography variant="overline" display="block" gutterBottom>
signature  :
 ...........</Typography>
 

    
</Form>

</Grid>



  </Grid>

 

      </div> 
      


    <Grid xs={12} container  style={{ border : '1px solid black', width : '80%', marginLeft : '10%', marginTop : '-9%', backgroundColor : 'white'}}>

      <Grid sm={6} xs={12}>
      <Typography variant="overline" display="block" gutterBottom>
 photo de Permis de conduite ....</Typography>
 
 <div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="input" onChange={()=>{setimagepc(true)}} />
        {imagepc ? <>
          <Tooltip title="Importer" placement="Top" >
        <button className='buttonIm' style={{backgroundColor: "transparent", border: "none"}} type="submit"> 
        <UploadFileIcon fontSize='meduim' sx={{color: "black"}} />
        Upload</button></Tooltip></>:<></>}
      </form>
      <hr />
      {errors2.imagePC && <p className="error">{errors2.imagePC}</p>}
      
      <h2>Uploading done {progress}%</h2>
      
    </div>
        {photo ? 
        <>
         <div className="Li" >
         <div className="boxclose"
              onClick={() => {setimagePC('') ; setphoto(false)}}
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
      </div></> 
      :<></>}
     
      </Grid>
      <Grid sm={6} xs={12}>
      <Typography variant="overline" display="block" gutterBottom>
 photo de Permis de conduite d'adversaire....</Typography>

     <div className="App">
      <form onSubmit={formHandler2}>
        <input type="file" className="input" onChange={()=>{setimagepcad(true)}} />
        {imagepcad ? <>
        <Tooltip title="Importer" placement="Top" >
        <button className='buttonIm' style={{backgroundColor: "transparent", border: "none"}} type="submit"> 
        <UploadFileIcon fontSize='meduim' sx={{color: "black"}} />
        Upload</button></Tooltip></>:<></>}
        
      </form>
      <hr />
      {errors3.imagePCad && <p className="error">{errors3.imagePCad}</p>} 
      {/* {errors.probleme && <p className="error">{errors.probleme}</p>}  */}
      <h2>Uploading done {progress2}%</h2>
    
    </div>
    {photoad ? 
        <>
         <div className="Li" >
         <div className="boxclose"
              onClick={() => {setimagePCad('') ; setphotoad(false)}}
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
      </div></> 
      :<></>}

      </Grid>
    </Grid>








      <ReactToPrint
        trigger={() => <Button className='buttonIm' style={{marginTop : '5%'}}> Imprimer Le Constat</Button>}
        content={() => componentRef.current}
      />
      
      

<br></br>
<br></br>

{confirm ? 
        <p className="succès">Votre constat a été effectuée avec succès</p> 
        : 
        <></>} 

    {errorsD.Date && <p className="error">{errorsD.Date}</p>} 
    {errors.probleme && <p className="error">{errors.probleme}</p>} 
    <Button variant="contained" sx={{marginTop : '3%'}} onClick={chege3}>Confirmer le constat
    { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
    </Button>
  
      
      </div>

      
)

}






