import { Grid } from '@material-ui/core';
import React, { useEffect, useState , useRef} from "react";
import { useHistory , } from "react-router-dom";
import { Add, DoneAll } from '@material-ui/icons'; 
import { db, auth, logoutUser ,storage } from "../../bdd/firebase";
import {
  onAuthStateChanged  
} from "firebase/auth";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
  orderBy,
  addDoc,
  Timestamp,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";
import "./feed.css";
import { Badge} from '@material-ui/core';
import { ExitToApp, Person, Settings ,Delete , CloudDownload} from '@material-ui/icons';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import ArticleIcon from '@mui/icons-material/Article';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import RecommendIcon from '@mui/icons-material/Recommend';
import Fab from '@mui/material/Fab';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import PaidIcon from '@mui/icons-material/Paid';
import Clear from "@mui/icons-material/Clear";
import BorderColor from "@mui/icons-material/BorderColor";
import ClipLoader from "react-spinners/ClipLoader";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Link from '@mui/material/Link';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';


import Tooltip from "@material-ui/core/Tooltip";

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { BsFillEmojiSmileFill , BsFillCheckCircleFill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
// import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart"; 
import Picker from 'emoji-picker-react';

import { getDate } from 'date-fns';
import Moment from "react-moment";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Download } from '@mui/icons-material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import validation from "./validation";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const Gb ={
  boxShadow: '0 3px 5px rgb(192, 193, 194)',
}

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


export default function Feed() {
  
    const [openM, setOpenM] = React.useState();
    const handleOpen = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    const scrollRef = useRef();

  //   useEffect(() => {
  //   scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth",block: "nearest" });
  //   // console.log(msg.uid)
  //   // console.log(msg.delid)
    
  // }, [discu]);

  const discus = ()=>{
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth",block: "nearest" });

  }

    const [value, setValue] = React.useState('1');
    const history = useHistory();
    const [User, setUser] = useState({});
    const [Info, setInfo] = useState({});
    const [Car, setCar] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [text, settext] = useState('');
    const [img, setImg] = useState("");
    const [bool, setbool] = useState({});
    const [doce, setFile] = useState("");
    const [Errors, setErrors] = useState();
    const [discu , setdiscu] = useState([]);
    const [LastM , setLast] = useState();
    const [readLM , setreadLM] = useState();
    const [exist , setexist] = useState();
    const [Myms , setMy] = useState();
    const [Lng , setLng] = useState();

    const [expanded, setExpanded] = React.useState(false);
    const [phoon, setphoon] = useState(false);
    const [upda, setupda] = useState();
    const [Consta , setConsta] = useState([]);
    const [messa , setmessa] = useState(0);
    var con = [];
    var recup = false;
    var constt = [];
    
  

  const [showEmojis, setShowEmojis] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    settext(text + emojiObject.emoji);
  };



    const handleChange = (event, newValue) => {
    setValue(newValue);
    };
    const getData = () =>{
      onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
        setUser(currentUser);

        const infos = await getDoc(doc(db, "Users", currentUser.uid));
        setInfo(infos.data());
        setOpenM(true);
        // let idd = currentUser.uid;
        // console.log(idd);
        // const Cars = await getDocs(doc(db, "Users", currentUser.uid , "cars"));
        // setCar(Cars.data());
        

        // console.log(currentUser.uid);
        const q2 = query(collection(db, "Users" , currentUser.uid , 'cars'));
        con = [];
        const querySnapshot2 = await getDocs(q2);
        
        querySnapshot2.forEach((doc) => {
          // console.log(doc.data());
          try {
          con.push({
            ID: doc.id,
            ... doc.data(),
          });

          } catch (error) {
            console.log(error.message);
          }
          
        });



        setCar(con);
        recup = true;
        
        
        


        }

        });
    }

    const getData2 = () =>{
      onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
        
          const q3 = query(collection(db, "Constat"), where("A_userid", "==", currentUser.uid));
          constt = [];
          const querySnapshot = await getDocs(q3);
          querySnapshot.forEach((doc) => {
            
            try {
              constt.push({
                ID: doc.id,
                userid :  doc.data().A_userid,
                nomeAd : doc.data().B_nom,
                prenomAd : doc.data().B_prenom,
                CarMarqu : doc.data().B_CarMarqu,
                loading : doc.data().loading,
                demRec : doc.data().demRec,
                rembourse : doc.data().rembourse,
              });
      
              } catch (error) {
                console.log(error.message);
              }
          });
      
          setConsta(constt);


         

        }

      
      const q4 = query(collection(db, "msgs"), where("receiver", "==", currentUser.uid) , orderBy("time", "desc"));

      const querySnapshot = await getDocs(q4);
      const mmsg=[]
      
      querySnapshot.forEach((doc) => { 
        M = M + 1;
        mmsg.push({
          ID: doc.id,
          ...doc.data()
        })

        })
     
     setMsgs(mmsg)
     
      // ==============    nbr de message non lue  ==================== 

      const qnb = query(collection(db, "msgs"), where("receiver", "==", currentUser.uid) , where("lue" , "==" , false));
      const querySnapshotnb = await getDocs(qnb);
      var M = 0;
      querySnapshotnb.forEach((doc) => { 
        M = M + 1; 
      });
      setmessa(M);



        });
    }

    const getDisc = () =>{
      onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){

          // let Di = [];
          // const D = query(collection(db, "Discussions" ,currentUser.uid, "chat"), orderBy("createdAt", "asc"));
          
          // const querySnapshotD = await getDocs(D);
          // querySnapshotD.forEach((doc) => {
            
          //   try {
              
          //     Di.push({
          //       ID: doc.id,
          //     ...doc.data(),
          //     });

          //     } catch (error) {
          //       console.log(error.message);
          //     }
          // });
          // setdiscu(Di);


          const msgsRef = collection(db, "Discussions", currentUser.uid, "chat");
          const q = query(msgsRef, orderBy("createdAt", "asc"));
          
          onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
              msgs.push({...doc.data() , ID:doc.id});
            });
            setdiscu(msgs);
            setLng(msgs.length);
          });

          const Last = doc(db, "Discussions", currentUser.uid);
          const L = query(Last );
          
           onSnapshot(L , (doc) =>{

            if(doc.exists()){
              setexist(true);
              setLast(doc.data().ADLm);
              setreadLM(doc.data().ADLm.unread);
              setMy(doc.data().CLLm.unread);
            };
          }) 
          
          
        }

        });
    }

    useEffect(async () => {
      getData();
      getData2();
      getDisc();
      setTimeout(() => {
         if (recup == true){
        notif(con);
      } else { 
      setTimeout(() => {
        notif(con);  
      }, 60000);
      }
      }, 3999);
     

    }, []);
    
    
  const read = async ()=>{
    if (exist){
    await updateDoc(doc(db, "Discussions", Info.userId ), { ADLm : {...LastM , unread: false }});
    }

  }

  const phone = async (e) => {
      
        e.preventDefault();
        if(phoon == true){
            setupda(true);
            await updateDoc(doc(db, "Users", Info.userId), { phone: Info.phone }).then(()=>{
            setphoon(prevphoon => !prevphoon) ;
            setupda(false);
          }) .catch((error) => {
            console.log(error.message);
          });
          

        } else if (phoon == false){
          setphoon(prevphoon => !prevphoon) ;
        }
        
  }

  const confirmAdd = async () =>{

    if (
      !validation(Info).nom && 
      !validation(Info).prenom && 
      !validation(Info).email &&
      !validation(Info).agence &&
      !validation(Info).adresse 
      
       ){

      await updateDoc(doc(db, "Users", Info.userId), 
      {
        ...Info,
        complete: true,
      }).then(()=>{
        
        setInfo({...Info, complete:true});
        setOpenM(false);
      }) .catch((error) => {
        console.log(error.message);
      });
    }else{
      setErrors("Oups ! Vous avez raté quelques champs ; verifiez bien SVP !") 

    }

  }

  const handleChange11 = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };
      

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



  const notif = async (voiture)=>{
      {voiture.map( async (Car) => {
        
        var now = new Date();
        // transformations de date de fin de string ar date ....
      
        var dateCa = Date.parse(Car.dateF);
        var voiture = new Date(dateCa);

        // decaler la date de fin d'assurance de 15 jours

        var year = voiture.getFullYear();
        var month = voiture.getMonth();
        var day = voiture.getDate();
        var Expd = new Date(year , month , day , 23,59,59);
        var c = new Date(year , month , day - 15);

        //comparer les deux date : aujourd'hui et la fin assurance decaler
        if (Expd > now && year == now.getFullYear() ) {

          var dd = now.getDate()
          if ( day == dd) {
            var Reste = 0;
          } else {
            var mazal = new Date(year , month , day - dd);
            var Reste = mazal.getDate();
          }

            if (Reste == 0){
                  
                  await updateDoc(doc(db, "Users", Car.user,"cars", Car.ID), { Expiree : "Expiree" , Renouvler: true }).then(async()=>{
                    await setDoc(doc(db, "msgs",Car.ID),{
                      sender : "Systeme",
                      receiver : Car.user,
                      msg : `Votre assurence de ${Car.marque}: ${Car.TypeV} est expiree ; pensez a la renouvler`,
                      time: new Date().toISOString(),
                      lue: false,
                    });
                    getData();
                    getData2();
                  }) .catch((error) => {
                    console.log(error.message);
                  });
            }
            else if (Reste == 3 || Reste < 3){


                  await updateDoc(doc(db, "Users", Car.user,"cars", Car.ID), { Expiree: "Reste" ,Renouvler: true }).then(async()=>{
                    await setDoc(doc(db, "msgs",Car.ID),{
                      sender : "Systeme",
                      receiver : Car.user,
                      msg : `Votre assurence de ${Car.marque}: ${Car.TypeV} expire dans ${Reste} jours ; pensez a la renouvler`,
                      time: new Date().toISOString(),
                      lue: false,
                    });
                    getData();
                    getData2();
                      }) .catch((error) => {
                        console.log(error.message);
                      });
                  
            }
            else if ( Reste > 3 && Reste < 16){

              await updateDoc(doc(db, "Users", Car.user,"cars", Car.ID), { Renouvler: true }).then(async()=>{
                await setDoc(doc(db, "msgs",Car.ID),{
                  sender : "Systeme",
                  receiver : Car.user,
                  msg : `Votre assurence de ${Car.marque}: ${Car.TypeV} expire dans ${Reste} jours ; pensez a la renouvler`,
                  time: new Date().toISOString(),
                  lue: false,
                }).then(()=>{
                  getData();
                  getData2();
                }) .catch((error) => {
                  console.log(error.message);
                });

                  }) .catch((error) => {
                    console.log(error.message);
                  });

                
            }

        }else if ( Expd < now ){

          await updateDoc(doc(db, "Users", Car.user,"cars", Car.ID), { Expiree : "Retard" , Renouvler: true }).then(async()=>{
            await setDoc(doc(db, "msgs",Car.ID),{
              sender : "Systeme",
              receiver : Car.user,
              msg : `Votre assurence de ${Car.marque}: ${Car.TypeV} n'est plus valable ; pensez a la renouvler`,
              time: new Date().toISOString(),
              lue: false,
            });
            getData();
            getData2();
            
          }) .catch((error) => {
            console.log(error.message);
          });

        }

        })}    
  }
  
  const lue = async (car , ind) =>{

    
    msgs[ind].lue = true;
    await updateDoc(doc(db, "msgs", car.ID), { lue: true }).then(()=>{
      setmessa(messa - 1);
      
    }) .catch((error) => {
      console.log(error.message);
    });

  };

  const nonlue = async (car , ind) =>{

      
      msgs[ind].lue = false;
    await updateDoc(doc(db, "msgs", car.ID), { lue: false }).then(()=>{
      setmessa(messa + 1);
      
      }) .catch((error) => {
        console.log(error.message);
      });
    
  };


  const Toutlue = async () =>{
    setmessa(0);
    msgs.map(async(msgs)=>{
      msgs.lue = true;
      await updateDoc(doc(db, "msgs", msgs.ID), { lue: true }).then(()=>{   
      }) .catch((error) => {
        console.log(error.message);
      });
    }) 

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    let url = '';
    let url1 = '';
    if (img) {
      const imgRef = ref(
        storage,
        `imagesM/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    } else {
      if (doce) {
        const doceRef = ref(
          storage,
          `files/${new Date().getTime()} - ${doce.name}`
        );
        const snap1 = await uploadBytes(doceRef, doce);
        const dlUrl1 = await getDownloadURL(ref(storage, snap1.ref.fullPath));
        url1 = dlUrl1;
      }
    }

    //
    if (text !== "" ||(text == "" && url !== "") ||(text == "" && url1 !== "")){
      await addDoc(collection(db, "Discussions", Info.userId, "chat"), {
        msg: text,
        sender: Info.userId,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        file: url1 || "",
        fileN: doce.name || ""
      }).then(()=>{
        setShowEmojis(false);
        settext("");
        setImg("");
        setFile("");
      });;
      if(exist){
      await updateDoc(doc(db, "Discussions", Info.userId), {
        CLLm : 
       { msg: text,
        sender: Info.userId,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        file: url1 || "",
        fileN: doce.name || "",
        unread: true,}
    });
      }else{
        await setDoc(doc(db, "Discussions", Info.userId), {
          ADLm : 
         { msg: '',
          sender: "Admin",
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
          file: url1 || "",
          fileN: doce.name || "",
          unread: null},
          CLLm : 
          { msg: text,
            sender: Info.userId,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
            file: url1 || "",
            fileN: doce.name || "",
            unread: true,}
  
      });
      }
  }
    

  };

  // const supprime = async (ind) => {
   
  //   const idd = discu[ind].ID;
  //   // const docSnap = await getDoc(doc(db, "lastMsg", id));
  //   await deleteDoc(doc(db, "messages", Info.userId, "chat", idd));
  //   setEtat(false);
  
  // };
  
  // const clik = async () => {
  //   if (Etat == true ){
  //     setEtat(false)
  //   }
  //   else if (Etat == false ){
  //     setEtat(true)
  //   }
  // };
  

    return (


      <div class="container">
        {Info.complete ? 
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
        :<></>}

  <div class="header-container">
    <img src="assets/images/jeune.webp" alt="" class="header-image" />
    

        {Info.complete == true &&(
        <>
              <div class="header">
          
              <h1 class="main-heading"> {Info.nom} {Info.prenom} </h1>
              


              
              
                
                {phoon ? 
                <>
                  <div className='infoEdi'>
                  <span class="tag"> 
                  <TextField className='inpummaj'id="outlined-basic" variant="outlined" value={Info.phone}  onChange={(e)=>{ setInfo({...Info , phone:e.target.value})}} /> 
                  <RecommendIcon className='edibut'  color="primary" onClick={phone} fontSize='medium'/> {upda ? <ClipLoader size={15} /> : <></>}
                  </span>
                  </div>
                </> : 
                <>
                <div className='infoEdi'>
                <span class="tag"> 
                Tel :{Info.phone}  
                <EditIcon className='edibut' color="primary" onClick={phone} fontSize='medium'/>  
                </span>
              </div>
                </>}
              
              <br></br>
              <br></br>
              <br></br>
              

              <div className='infoEdi'>
              <span class="tag">
              Agence :{Info.agence} 
              {/* <EditIcon className='edibut' color="primary" onClick={AjouterV} fontSize='medium'/> */}
              </span>
              </div>


              <br></br>

              <div class="stats">
                <span class="stat-module">
                  vehicule assure : <span class="stat-number">{Info.nbrV}</span>
                </span>
                <span class="stat-module">
                  Constats en cours : <span class="stat-number">{Info.const}</span>
                </span>
              </div>
            </div>
            
        </>
        )}

        {Info.complete == false &&(
          <div>
        <div class="header">
        <Button sx={{ backgroundColor: "red" ,width: "70%" , marginTop: "15%"}} onClick={handleOpen}>Completer vos information</Button>
        </div>
      <Modal
          
          sx={{marginTop: "1%",marginLeft: "15%" , width:"70%" , height: "100%" , backgroundColor: "-moz-initial"}}
          open={openM}
          onClose={handleCloseM}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='infoComp' >
          <div  class="headerCom-container" >
        
        <h1 style={{fontSize: "15px"}} class="infoText"> Veuillez completer vos infotmation SVP :</h1>
        <br></br>
        <br></br>
         {Info.providerId && (
          <>
          <div className='complIn' ><span class="tag2">Nom : </span> <TextField className='infoComInput' id="outlined-basic" variant="outlined" value={Info.nom}  onChange={(e)=>{ setInfo({...Info , nom:e.target.value}) ;setErrors()}} /></div>
          <br></br>
          {validation(Info).nom &&(<p className='error'> {validation(Info).nom} </p>)}
          <br></br>
          <div className='complIn' ><span class="tag2">Prenom :</span> <TextField className='infoComInput' id="outlined-basic" variant="outlined" value={Info.prenom}  onChange={(e)=>{ setInfo({...Info , prenom:e.target.value}) ;setErrors()}} /> </div>
          <br></br>
          {validation(Info).prenom &&(<p className='error'> {validation(Info).prenom} </p>)}
          <br></br>
          <div className='complIn' ><span class="tag2">email :</span> <TextField className='infoComInput' id="outlined-basic" type={"email"} variant="outlined" value={Info.email}  onChange={(e)=>{ setInfo({...Info , email:e.target.value}) ;setErrors()}} /> </div>
          <br></br>
          {validation(Info).email &&(<p className='error'> {validation(Info).email} </p>)}
          <br></br>
          </>
        )}
        <div className='complIn' ><span class="tag2">Tel : </span> <TextField className='infoComInput' id="outlined-basic" variant="outlined" value={Info.phone}  onChange={(e)=>{ setInfo({...Info , phone:e.target.value})}} /></div>
        <br></br>
        <br></br>
        <div className='complIn' ><span class="tag2">agence :</span> <TextField className='infoComInput' id="outlined-basic" variant="outlined" value={Info.agence}  onChange={(e)=>{ setInfo({...Info , agence:e.target.value}) ;setErrors()}} /> </div>
        <br></br>
        {validation(Info).agence &&(<p className='error'> {validation(Info).agence} </p>)}
        <br></br>
        <div className='complIn' ><span class="tag2">adresse :</span> <TextField className='infoComInput' id="outlined-basic" variant="outlined" value={Info.adresse}  onChange={(e)=>{ setInfo({...Info , adresse:e.target.value}); setErrors()}} /> </div>
        <br></br>
        {validation(Info).adresse &&(<p className='error'> {validation(Info).adresse} </p>)}
        <br></br>
       
        {Errors && <p className="error">{Errors}</p>}
        <Button sx={{ backgroundColor: "whitesmoke"}} onClick={confirmAdd} >confirmer</Button>
        
        
      </div>
      </Box>
      </Modal>

      
      
          </div>
          )}


  </div>
  
  <div class="overlay-header"></div>
  
  <div class="body">
    
    <img src="assets/images/pro3.png" alt="profil pic" class="body-image" />

   

    <div class="body-action-button u-flex-center">
      <Tooltip title="Ajouter un vehicule " placement="Top"  >
      <Add style={{color : 'white'}} onClick={AjouterV}></Add>
      </Tooltip>
    </div>

    

    <div class="u-clearfix"></div>


    <div class="body-info"></div>

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',fontSize: 14, }}>
          <TabList allowScrollButtonsMobile variant='scrollable' onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ width: '1%',fontSize: 9}} label="Vehicules" value="1" />
            <Tab sx={{ width: '1%',fontSize: 9}} label="Constats" value="2" />
            <Tab sx={{ width: '1%',fontSize: 9}} label="Messages" value="3" />
            <Badge style={{ marginTop: "18px" , marginLeft: "-5px"}} badgeContent={messa} color="secondary" ></Badge>
            <Tab sx={{ width: '1%',fontSize: 9}} label="Discussion" onClick={()=>{read() ;
             setTimeout(() => {
              discus ();
            }, 200); }} value="4" />
            {readLM ?<NotificationsActiveIcon style={{ marginTop: "10px" , marginLeft: "-8px", color:"red"}} /> : <></>}

            
          </TabList>
        </Box>
        <TabPanel value="1"><div class="">
      <span class="card-more">
      

      </span>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 700,
        flexGrow: 1,
        background : 'none',
      }}
    >
      {Car.map((Car) => (
      <Grid container spacing={2} >
        
        <Grid item style={{borderBottom : '1px solid black' , marginTop : "20px"}}>
          <ButtonBase sx={{ width: 159, height: 159 }}>
            <Img alt="asd" src={Car.images[0]} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container style={{borderBottom : '1px solid black'}}>
          <Grid item xs container direction="column" spacing={2} >
            <Grid item xs >
              {Car.Refus && (<p className='error'>{Car.Refus}</p>)}
              {Car.Expiree == "Expiree" && (<p className='error'> Votre assurance expire aujourd'hui <Link onClick={()=>{ window.open(`../Car/${Car.ID}`, '_blank')}} >Renouvler </Link></p>)}
              {Car.Expiree == "Reste" && (<p className='error'> il reste pas beaucoup pour que votre assurance expire !<Link onClick={()=>{ window.open(`../Car/${Car.ID}`, '_blank')}} > Renouvler </Link></p>)}
              {Car.Expiree == "Retard" && (<p className='error'>votre assurance n'est plus valable !!<Link onClick={()=>{ window.open(`../Car/${Car.ID}`, '_blank')}} > Renouvler </Link></p>)}
              <Typography gutterBottom variant="subtitle1" component="div">
                marque : {Car.marque}
              </Typography>
              <Typography variant="body2" gutterBottom>
                immatriculation : {Car.imma}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               numero de serie :  {Car.numS}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Link onClick={()=>{
                                    history.push(`Car/${Car.ID}`)
                                    window.location.reload(`Car/${Car.ID}`);
                                  }} >
                            More Info</Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography cursor="pointer" onClick={()=>{ window.open(`../contract/${Car.ID}`, '_blank')}}variant="subtitle1" component="div">
              <ArticleIcon onClick={()=>{ window.open(`../contract/${Car.ID}`, '_blank')}} />
                <p className='navig'>Contrat</p>
            </Typography>
          </Grid>
        </Grid>
        
      </Grid>

        ))}
      

{/* 
      <Grid container spacing={2} style={cardStyle}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="asd" src="https://sf1.autoplus.fr/wp-content/uploads/autoplus/2015/11/renault-clio-2012-c056d.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                More Info
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>




        
      </Grid>



      <Grid container spacing={2} style={cardStyle}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="asd" src="https://sf1.autoplus.fr/wp-content/uploads/autoplus/2015/11/renault-clio-2012-c056d.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                More Info
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>




        
      </Grid> */}
    </Paper></div>
    </TabPanel>
        <TabPanel value="2"> <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none' }}>
      {Consta.map((value) => (
        <ListItem
          key={value}
          disableGutters
          style={Gb}
          
          
        >
          
          <ListItemText 
          sx={{ marginLeft: "20px"}}
          primary={` ${value.nomeAd} ${value.prenomAd}`}
          secondary={`voiture: ${value.CarMarqu}`} />
          {/* <Button variant="outlined" onClick={()=>{history.push(`/constat/${value.ID}`)
                                          window.location.reload(`/constat/${value.ID}`);}}>Visualiser le constat
          </Button> */}
          {(value.loading && !value.demRec && value.rembourse == false ) ? 
          <>
          <Tooltip title="confermee" placement="Top"  >
            <IconButton sx={{marginRight: "20px"}} aria-label="comment">
              <DoneOutlineTwoToneIcon  color="success" />
            </IconButton>
            </Tooltip>
            </> : 
            <>
            </>}
            
            {(!value.loading && !value.demRec) ? 
          <>
          <Tooltip title="Non traite" placement="Top"  >
             <IconButton aria-label="comment">
              <Clear color="Error" />
            </IconButton></Tooltip>
            </> : 
            <>
            </>}
           
            {value.demRec ? <>
              <Tooltip title="A recifier" placement="Top"  >
              <IconButton aria-label="comment">
              <BorderColor color="warning" />
              </IconButton>
              </Tooltip>
              <button  className='btnsRect' onClick={()=>{history.push(`/Rectifier-const/${value.ID}`)
                                          window.location.reload(`/Rectifier-const/${value.ID}`)}} >Rectifier
              </button>
            </> : 
            <>
            </>}

            {(value.loading && value.rembourse == true && !value.demRec) ? 
          <>
          <Tooltip title="Rembourse" placement="Top"  >
            <IconButton aria-label="comment">
              <PaidIcon color="success" />
            </IconButton>
            </Tooltip>
            </> : 
            <>
            </>}

          
            
        </ListItem>
      ))}
    </List>
    </TabPanel>

    <TabPanel value="3"> 
    <Tooltip onClick={()=>{Toutlue()}} title="marquer le tout comme lue" placement="Top">
      <Typography sx={{fontSize: "9px" , marginLeft: "45%"}}> marquer le tout comme lue <DoneAllIcon fontSize='8px' /></Typography>
      </Tooltip>
    {msgs.map((value,index) => (

    <div key={value}>

      <Accordion expanded={expanded === `'panel'${index}`} onChange={handleChange11(`'panel'${index}`)}>
        {value.lue ? 
        <>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{backgroundColor : "white"}}
                  > 
                    <Tooltip onClick={()=>{nonlue(value , index)}} title="marquer comme non lue" placement="Top"   >
                    <MarkEmailReadIcon  fontSize='6px' /></Tooltip>
                    <Typography sx={{ width: '100%', flexShrink: 0, color : 'black'  }}>
                    Vous avez recu un nouveau message de {value.sender}

                    </Typography>
                   
                  
                  </AccordionSummary>
        </> 
        : 
        <>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{backgroundColor : "#d4cb85"}}
                  >
                    <Tooltip onClick={()=>{lue(value , index)}}  title="marquer comme lue" placement="Top"   >
                    <MarkEmailUnreadIcon fontSize='6px'/></Tooltip>
                    <Typography sx={{ width: '100%', flexShrink: 0, color : 'black'  }}>
                    Vous avez recu un nouveau message de {value.sender}
                    </Typography>
                  
                  </AccordionSummary>
        </>}
                  
                  <AccordionDetails style={{backgroundColor : "##bfbbbb"}}>
                    <Typography style={{color : '#141414' }}>
                    {value.msg}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
    </div>
     ))}
    </TabPanel>

    <TabPanel value="4"> 
    <>
    <div className="messages_container">
        
          <>
            <div className="messages_user"  >
              <div  style={{cursor:'pointer'}} 
              > 
              <img src={'assets/images/pro3.png'} alt="avatar" className="mu_image" /> </div>
               <h3 style={{cursor:'pointer'}} 
                    > Admin</h3>
                    <div
                style={{
                  position: "absolute",
                  right: 20,
                  cursor: "pointer",
                }}
              >

                
              </div>
              
             
            </div>
                <div className='boite_discu'>
            {discu.map((discu,index)=>(
              <div className="messages">
                {discu.sender !== "Admin" && (
                  <div className={`message_wrapper own`}  ref={scrollRef}>
                    {/* onClick={clik} */}
              <p className={"me"}  >
              {discu.media ?  <a onClick={()=>{window.open(discu.media, '_blank');}}> <img src={discu.media} alt={discu.text} /> </a> : null}
              {discu.file ? <a> {discu.fileN} <Download onClick={()=>{window.open(discu.file, '_blank');}} /> </a> : null}
              {discu.msg}
              
                    </p>
              {Myms === false  && index === Lng -1 && (<a style={{fontSize: "9px" , marginLeft: "45%"}}> Vu <DoneAll fontSize="small" /> </a>) }
  
            </div>
                )}
            
            {discu.sender == "Admin" && (
            <div className={`message_wrapper`} ref={scrollRef}>
              
              <p className={"friend"}  >
              {discu.media ?  <a onClick={()=>{window.open(discu.media, '_blank');}}> <img src={discu.media} alt={discu.text} /> </a> : null}
              {discu.file ? <a> {discu.fileN} <Download onClick={()=>{window.open(discu.file, '_blank');}} /> </a> : null}
              {discu.msg}             
              </p>
              {/* <div>
                <small>    https://firebasestorage.googleapis.com/v0/b/asfaleia-vehicule.appspot.com/o/files%2F1662593628936%20-%20
                  <Moment fromNow>{new Date().toDateString()}</Moment>
                </small>
              </div> */}
              
            </div>
                )}
            </div>
            ))}
                </div>
          </>
    
      </div>
    <div className="form_container">
        <form onSubmit={handleSubmit} className="message_form" >
          <div className="pic_doc">
            <div>
              <label htmlFor="img">
              <svg  xmlns="http://www.w3.org/2000/svg" 

              style={{
                //    marginLeft: "-10px",
                  width: '25px',
                  height: '25px',
                  cursor: 'pointer',
                  color: "#19A8D9",
                  
                  
              }}
              viewBox="0 0 20 20" 
              fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              </label>
              <input
                onChange={(e) =>{ setImg(e.target.files[0]) ; setbool({img: "image"})}}
                type="file"
                id="img"
                accept="image/*"
              style={{ display: "none" }}
              />
            </div>
            
            {bool.img && <span className=""> <BsFillCheckCircleFill fontSize="1rem" color="green" /></span>} 
          <div>
            <label htmlFor="doce" style={{marginLeft: '5px'}}> 
            <svg xmlns="http://www.w3.org/2000/svg" 
              style={{
                  width: '25px',
                  height: '25px',
                  cursor: 'pointer',
                  color: "#19A8D9",
              }}
              fill="none"
              viewBox="0 0 24 24" 
              stroke="currentColor">
              <path strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth={2} 
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </label>
            <input
                onChange={(e) => {setFile(e.target.files[0]) ; setbool({file: "file"})}}
              type="file"
                id="doce"
              accept="file/*"
              style={{ display: "none", borderColor:"#696969" }}
              />
            </div>
            {bool.file && <span className=""> <BsFillCheckCircleFill fontSize="1rem" color="green" /></span>}
        </div>
       
          <div className="picker_container" >
            
                <input
                className="nit"
                type="text"
                placeholder="Entrez un message"
                value={text}
                onChange={(e) => settext(e.target.value)}
                />
            <div
             className="Btns_icon"
             onClick={() => setShowEmojis(!showEmojis)}
            >
              <BsFillEmojiSmileFill fontSize="1.5rem" color="#19A8D9" />
            </div>
            <div className='EmojiCont' >
      {showEmojis && (
            
            <Picker
              // style={{
              //   height: 300,
              //   width: 300,
              //   position: "fixed",
              //   maxWidth: 250,
              //   marginTop: 730,
              //   marginLeft: "200px",
              // }}
              // onSelect={addEmoji}
              onEmojiClick={onEmojiClick}
            />
            
               )} 
               </div>
            </div>

          <div>
            <button className="btn_form"  onClick={()=> setbool({})}  > <IoMdSend fontSize="1.5rem" /> </button>
          </div>

          {/*  */}
        </form>
        
        </div>
        </>
    </TabPanel>

   
      </TabContext>
    </Box>
    
  </div>
  
</div>

    )
}


