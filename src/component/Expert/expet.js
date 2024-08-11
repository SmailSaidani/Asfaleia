import React, { useEffect, useState,useRef } from 'react';
import Sidebar from './sidebarE';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Chrono } from "react-chrono";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { db, auth ,storage } from "../../bdd/firebase";
import {onAuthStateChanged, } from "firebase/auth";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BsFillEmojiSmileFill , BsFillCheckCircleFill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
// import "emoji-mart/css/emoji-mart.css";
import Picker from 'emoji-picker-react';
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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Download } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import ClipLoader from "react-spinners/ClipLoader";
import EditIcon from '@mui/icons-material/Edit';
import RecommendIcon from '@mui/icons-material/Recommend';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { DoneAll } from '@material-ui/icons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';


  const ulStyle = { width:'60%' , marginLeft : '25%'}
  const clients = { marginTop:'10%'}  

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));






export default function Expert (){


  const scrollRef = useRef();
  const [text, settext] = useState('');
  const [img, setImg] = useState("");
  const [bool, setbool] = useState({});
  const [doce, setFile] = useState("");
  const [Etat, setEtat] = useState(false);
  const [discu , setdiscu] = useState([]);
  const [LastM , setLast] = useState();
  const [readLM , setreadLM] = useState();
  const [exist , setexist] = useState();

  const [Myms , setMy] = useState();
  const [Lng , setLng] = useState();

  const [user, setuser] = useState({});
  const [RDV , setRDV] = useState([]);
  const [RDVP , setRDVP] = useState([]);
  const [Donne , setDonne] =useState(false);
  const [Vide , setVide] =useState(true);

  const [phoon, setphoon] = useState(false);
  const [upda, setupda] = useState();

  const RD = [];
  const RDP = [];





  const [confirm , setconfirm] = useState(false);
  const [Constat, setConstat] = useState([]);
  const con =[];
  
  const [client, setclient] = useState({});
  const [envoi, setenvoi] = useState(false);
  const [enl , setenl] = useState();
  const [recupp , setrecupp] = useState(false);

  const history = useHistory();

  const [value1, setValue1] = React.useState('1');

  const [showEmojis, setShowEmojis] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    settext(text + emojiObject.emoji);
  };

  const handleChange = (event, newValue) => {
    setValue1(newValue);
    };

  const getDisc = () =>{
    onAuthStateChanged(auth, async (currentUser) => {
      if (auth.currentUser){

        


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
            }
          });
            
      }

      });
  }

 
  useEffect( () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
        getDisc();
        const expert = await getDoc(doc(db, "Users" , currentUser.uid));
        setuser(expert.data());
        setenl(expert.data().enligne);
        setrecupp(true);



        const jour = new Date().getDate();
        const year = new Date().getFullYear();
        const mon = new Date().getMonth();

        var cejour = mon+1+'/'+jour+'/'+year;
       


        // -------- recuperation de liste des constat sans rendez-vous---------------------------------

        const ConRef= collection(db, "Constat");
          const co = query(ConRef,  where("expert", "==", currentUser.uid) , where("RDV", "==", false), where ("RDVdate" ,"!=" , "fait"));

          onSnapshot(co, (querySnapshot) => {
            let Constat = [];
            querySnapshot.forEach((doc) => {
              Constat.push({
                ID: doc.id,
                Ncontrat :  doc.data().Ncontrat,
                fullname : doc.data().A_nom+" "+doc.data().A_prenom,
                Fname : doc.data().B_nom+" "+doc.data().B_prenom,
                userid : doc.data().A_userid,
                A_carId : doc.data().A_carId,
              });
            });
            setConstat(Constat);
            
          });
        
          


        //-------- recuperation de liste des rendez-vous d'aujordhui -----------------------------------------

    

        const RDRef = collection(db, "Constat");
        const R = query(RDRef, where("expert", "==", currentUser.uid) , where("RDV", "==", true), where("RDVdate" , "==" , cejour));

        onSnapshot(R, (querySnapshot) => {
          let RDD = [];
          querySnapshot.forEach((doc) => {
            RDD.push({
              title: doc.data().RDVdate+' '+doc.data().RDVtime,
              cardTitle: doc.data().A_marque+" => "+" "+doc.data().B_CarMarqu,
              url: "constat/"+doc.id,
              cardSubtitle: doc.data().A_nom+" "+doc.data().A_prenom,
              cardDetailedText: doc.data().B_nom+" "+doc.data().B_prenom,
              media: {
                type: "IMAGE",
                source: {
                  url: doc.data().images[0]
                }
              }
            });
            setTimeout(() => {
            setVide(false);
            }, 300);
          });
           
          setRDV(RDD);
         

          
          });

        

        //-------- recuperation de liste des rendez-vous prochains ------------------



        
        const RDVRef = collection(db, "Constat");
        const RV = query(RDVRef, where("expert", "==", currentUser.uid) , where("RDV", "==", true), where("RDVdate" , "!=" , cejour));

        onSnapshot(RV, (querySnapshot) => {
          let RDDV = [];
          querySnapshot.forEach((doc) => {
            RDDV.push({
              title: doc.data().RDVdate+' '+doc.data().RDVtime,
              cardTitle: doc.data().A_marque+" => "+" "+doc.data().B_CarMarqu,
              url: "constat/"+doc.id,
              cardSubtitle: doc.data().A_nom+" "+doc.data().A_prenom,
              cardDetailedText: doc.data().B_nom+" "+doc.data().B_prenom,
              media: {
                type: "IMAGE",
                source: {
                  url: doc.data().images[0]
                }
              }
            });
            setTimeout(() => {
            setDonne(true);
            }, 300);
          });
            
          setRDVP(RDDV);
          
          
          
          });






        }

        });
    
    
  }, []);




 


    const localizer = momentLocalizer(moment)
    const myEventsList={}
    const [value, setValue] = React.useState(new Date());
   
 

 const label = { inputProps: { 'aria-label': 'Switch demo' } };

const  SendM = async (userId) => {
  
    await updateDoc(doc(db, "Constat", userId.ID), { RDVtime: value.toLocaleTimeString() , RDVdate: value.toLocaleDateString() , RDV: true })
        .catch((error) => {
          console.log(error.message);
        });
        await setDoc(doc(db, "msgs" , userId.ID),{
        sender : user.nom+" "+user.prenom,
        receiver : userId.userid,
        msg : "vous avez redez-vous avec l'expert le : "+value.toLocaleDateString()+" a : "+value.toLocaleTimeString(),
        time: new Date().toISOString(),
        lue: false,

    }).then(()=>{
      setenvoi(true);
    }).catch((error) => {
      console.log(error.message);
    });
   
    
    
}

const change = async (e) =>{

  e.preventDefault();
  setenl(prevenl => !prevenl) ;

  if(e.target.value == "true"){
    var etat = false;
  }else if (e.target.value == 'false'){
    var etat = true;
  }

  console.log(etat);
 

  await updateDoc(doc(db, "Users", user.userId), { enligne: etat }).then(()=>{
 
  }) .catch((error) => {
    console.log(error.message);
  });

}

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
    await addDoc(collection(db, "Discussions", user.userId, "chat"), {
      msg: text,
      sender: user.userId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
      fileN: doce.name || ""
    }).then(()=>{
      setShowEmojis(false);
      settext("");
      setImg("");
      setFile("");
    });
    if(exist){
    await updateDoc(doc(db, "Discussions", user.userId), {
      CLLm : 
     { msg: text,
      sender: user.userId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
      fileN: doce.name || "",
      unread: true,}
  });
}else{
  await setDoc(doc(db, "Discussions", user.userId), {
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
      sender: user.userId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
      fileN: doce.name || "",
      unread: true,}

});
}
}
  
  


};

const phone = async (e) => {
      
  e.preventDefault();
  if(phoon == true){
      setupda(true);
      await updateDoc(doc(db, "Users", user.userId), { phone: user.phone }).then(()=>{
      setphoon(prevphoon => !prevphoon) ;
      setupda(false);
    }) .catch((error) => {
      console.log(error.message);
    });
    

  } else if (phoon == false){
    setphoon(prevphoon => !prevphoon) ;
  }
  
}

const read = async ()=>{
  if (exist){
      await updateDoc(doc(db, "Discussions", user.userId ), { ADLm : { ...LastM, unread: false }});
  }

}
//============================= Controles =========================
  
         useEffect(async () => {
          onAuthStateChanged(auth, async (currentUser) => {
              if (auth.currentUser){
                  const User = await getDoc(doc(db, "Users" , currentUser.uid));
                  if(User.data().type == 'admin'){ 
                  history.push('/dashboard') ;
                  window.location.reload('/dashboard');
                  }
                  if(User.data().type == 'client'){
                   history.push('/profil')
                   window.location.reload('/profil');
                  }
              }else{
                history.push('/')
                window.location.reload('/');
              }
      
              });
          
          
        }, []);
    
//===========================================================================

    return (
  <div>
  <Sidebar/> 
  <div>
 {/* <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab>
    </Box> */}
  <div style={{paddin: "5%"}}>
  <div  class="headerEx-container" >
    

 

  
    <div class="header">
      <h1 class="main-heading">{user.nom} {user.prenom}</h1>


      {phoon ? 
                <>
                  <div className='infoEdi'>
                  <span class="tag"> 
                  <TextField className='inpummaj'id="outlined-basic" variant="outlined" value={user.phone}  onChange={(e)=>{ setuser({...user , phone:e.target.value})}} /> 
                  <RecommendIcon className='edibut'  color="primary" onClick={phone} fontSize='medium'/> {upda ? <ClipLoader size={15} /> : <></>}
                  </span>
                  </div>
                </> : 
                <>
                <div className='infoEdi'>
                <span class="tag"> 
                Tel :{user.phone}  
                <EditIcon className='edibut' color="primary" onClick={phone} fontSize='medium'/>  
                </span>
              </div>
                </>}
              
              <br></br>
              <br></br>
              <br></br>
      
      {/* <span class="tag">Tel :{user.phone}</span> */}
      
        <div className='infoEdi'>
        <span class="tag">
        Agence :{user.agence}
        </span>
        </div>


      <div class="stats">
        <span class="stat-module">
          Nombre de constat attribuee : <span class="stat-number">{user.nbrV}</span>
        </span>
        
        {/* <span class="stat-module">
          Nombre Totale d'Experts : <span class="stat-number">1</span>
        </span>
        <span class="stat-module">
          Constats en cours : <span class="stat-number">1</span>
        </span> */}

      </div>
      {recupp ?
       <span class="stat-module">
       Statu en ligne : <>
       <Stack direction="row" spacing={1} alignItems="center">
        <Typography className='red' >Off</Typography>
        
        {enl ?<><AntSwitch onChange={change} value={enl} {...label} defaultChecked /></>:<> <AntSwitch onChange={change} value={enl} {...label}  /></>}
        
        <Typography className="green" >On</Typography>
        </Stack>
       </> 
     </span>
      :<></>}
     
      
    </div>
  </div>
  </div>



    
    <Box className='BoxEx' >
      <TabContext value={value1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',fontSize: 14, }}>
          <TabList centered onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ width: '1%',fontSize: 9}} label="Constats" value="1" />
            <Tab sx={{ width: '1%',fontSize: 9}} label="Rendez-Vous" value="2" />
            <Tab sx={{ width: '1%',fontSize: 9}} label="Discussion" onClick={()=>{read()}} value="3" />
            {readLM ?<NotificationsActiveIcon style={{ marginTop: "10px" , marginLeft: "-8px", color: "red"}}  /> : <></>}

            
          </TabList>
        </Box>

        <TabPanel value="1">
        <>
        <TableContainer component={Paper} style={ulStyle}>
      <Table sx={{ minWidth: 550 }}   size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell align="right">Adversaire</TableCell>
            {/* <TableCell align="right">proprio</TableCell>
            <TableCell align="right"> etat</TableCell> */}
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {Constat.map((Constat,index) => (
            <TableRow
            key={Constat.ID}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {Constat.fullname}
              </TableCell>
              <TableCell align="justify">{Constat.Fname}</TableCell>
              {/* <TableCell align="right">{Constat.}</TableCell> */}
              <TableCell align="right">   
              <LocalizationProvider  dateAdapter={AdapterDateFns}>

      <DateTimePicker
        
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider></TableCell>
    <TableCell align="right">
 <Button variant="contained" onClick={() => {setconfirm(true)}} >Fixer rendez-vous</Button>
 {confirm ? 
            <Dialog open={confirm} >
            <DialogTitle>Confirmatiom</DialogTitle>
            <DialogContent>
            
              <DialogContentText>
                Fixer le rendez-vous pour le : 
              </DialogContentText>
             
              {value.toLocaleDateString()} a : {value.toLocaleTimeString()}

            </DialogContent>
            <DialogActions>
              <Button sx={{backgroundColor: "skyblue"}} onClick={()=>{SendM(Constat);setconfirm(false)}}>Confirmer</Button>
              <Button sx={{backgroundColor: "red"}} onClick={()=>{setconfirm(false)}}>Annuler</Button>
            </DialogActions>
          </Dialog>
            : 
            <></>} 
 </TableCell>
 {Constat.RDV ? 
 <>
  <TableCell align="right"><BsFillCheckCircleFill fontSize="1rem" color="green" />
</TableCell>
 </> : <></> } 

<TableCell align="right"> 
<Button className='btnsC' onClick={()=>{window.open(`constat/${Constat.ID}`, '_blank')}} variant="contained">ouvrer le constat</Button>
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
        </TabPanel>

        <TabPanel value="2"> 
        <>
        <Typography variant="h4" gutterBottom component="div">
        Les Rendez Vous d'aujourd'hui
      </Typography>
    
    { Vide ?  
    <> <p className='error'> pas de rendez-vous pour aujourd'hui</p> </>
    :
    <>
    <div style={{ width: "100%", height: "400px",}}>
        <Chrono items={RDV} />
      </div>
    </> 
    }


    <Typography variant="h4" gutterBottom component="div">
        Autres Rendez-vous
      </Typography>
    {Donne ? 
    <><div style={{ width: "100%", height: "400px", }}>
        <Chrono items={RDVP} />
      </div>
    </> : <></>}
        </>
       
        </TabPanel>

        <TabPanel value="3"> 
        <div className='MesCon' >
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
            </div>
        </TabPanel>

   
      </TabContext>
    </Box>
    

     
</div>

  </div>
    
);
}
