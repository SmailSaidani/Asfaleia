import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState , useRef } from "react";
import { useHistory } from "react-router-dom";
import { Add, DoneAll } from '@material-ui/icons'; 
import { BsFillEmojiSmileFill , BsFillCheckCircleFill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { db, auth, logoutUser, user ,storage  } from "../bdd/firebase";
import {onAuthStateChanged,getAuth,} from "firebase/auth";
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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "./Client/feed.css";
import {Container,Form, Button, Row, Col } from "react-bootstrap";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import Clear from "@mui/icons-material/Clear";
import BorderColor from "@mui/icons-material/BorderColor";
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ArticleIcon from '@mui/icons-material/Article';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from "@material-ui/core/Tooltip";
import Sidebar from "./sidebar";
import { Download } from "@mui/icons-material";
import Picker from 'emoji-picker-react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import Logo from './logoL';

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
const ulStyle = { width:'100%'  , backround: "none"}

const Ce = { marginLeft:'50%'}

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


export default function Client() {

  const scrollRef = useRef();
  // useEffect(() => {
  //   scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
   
   
    
  // }, [discu]);

  const discus = ()=>{
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth",block: "nearest" });

  }
  
    const der = useParams();  
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [showEmojis, setShowEmojis] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    settext(text + emojiObject.emoji);
  };

    const history = useHistory();
    const [User, setUser] = useState({});
    const [Info, setInfo] = useState({});
    const [Car, setCar] = useState([]);
    const [Vide , setVide] =useState(true);
    const [VideCon , setVideCon] =useState(true);

    const [CL , setCL] =useState();
    const [EX , setEX] =useState();

    var con = [];
    var constt = [];

    const [msgs, setMsgs] = useState([]);
    const [Consta , setConsta] = useState([]);
    const [Rapport , setRapport] = useState([]);

    const [text, settext] = useState('');
    const [img, setImg] = useState("");
    const [bool, setbool] = useState({});
    const [doce, setFile] = useState("");
    const [discu , setdiscu] = useState([]);
    const [LastM , setLast] = useState();
    const [readLM , setreadLM] = useState();
    const [exist , setexist] = useState();
    const [Myms , setMy] = useState();
    const [Lng , setLng] = useState();

    useEffect(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (auth.currentUser){
          setUser(currentUser);
          const infos = await getDoc(doc(db, "Users", der.id));
          setInfo(infos.data());

          //=================== (if client) cote client =============================
          if(infos.data().type == 'client'){
            setCL(true);
              //======== voitures======
              const q2 = query(collection(db, "Users" , der.id , 'cars'));

              const querySnapshot2 = await getDocs(q2);
              
              querySnapshot2.forEach((doc) => {
              
                try {
                setVide(false);
                con.push({
                  ID: doc.id,
                  imma :  doc.data().imma,
                  marque : doc.data().marque,
                  numS : doc.data().numS,
                  image: doc.data().image,
                  images: doc.data().images,
                });

                } catch (error) {
                  console.log(error.message);
                }
                
              });
              setCar(con);
              //======= constats ======
              const q3 = query(collection(db, "Constat"), where("A_userid", "==", der.id));

              const querySnapshot = await getDocs(q3);
              querySnapshot.forEach((doc) => {
                
                try {
                  setVideCon(false);
                  constt.push({
                    ID: doc.id,
                    userid :  doc.data().A_userid,
                    nomeAd : doc.data().B_nom,
                    prenomAd : doc.data().B_prenom,
                    CarMarqu : doc.data().B_CarMarqu,
                    loading : doc.data().loading,
                    demRec : doc.data().demRec,
                  });
          
                  } catch (error) {
                    console.log(error.message);
                  }
              });
          
              setConsta(constt);


          }

          //===================== (if expert ) cotee expert ===============================
          if(infos.data().type == 'expert'){
            setEX(true);


            const q3 = query(collection(db, "Constat"), where("expert", "==", der.id));

            const querySnapshot = await getDocs(q3);
            querySnapshot.forEach((doc) => {
              
              try {
                setVide(false);
                constt.push({
                  ID: doc.id,
                  userid :  doc.data().A_userid,
                  nomeAd : doc.data().B_nom,
                  prenomAd : doc.data().B_prenom,
                  CarMarqu : doc.data().B_CarMarqu,
                  CarTyp : doc.data().B_CarTyp,
                  loading : doc.data().loading,
                  demRec : doc.data().demRec,
                });
        
                } catch (error) {
                  console.log(error.message);
                }
            });
        
            setConsta(constt);

            //====== rapports

            const Rapport = query(collection(db, "Rapport"), where("expertId", "==", der.id));

            const querySnapshotR = await getDocs(Rapport);
            const rapp=[];
            querySnapshotR.forEach((doc) => {
            setVideCon(false);
              try {
                rapp.push({
                  ID: doc.id,
                  ... doc.data(),
                });
        
                } catch (error) {
                  console.log(error.message);
                }
            });
        
            setRapport(rapp);

          }

          //=============== la discu =====================
          const msgsRef = collection(db, "Discussions", der.id, "chat");
          const q = query(msgsRef, orderBy("createdAt", "asc"));

          onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
              msgs.push(doc.data());
            });
            setdiscu(msgs);
            setLng(msgs.length);
            
          });
        
          const Last = doc(db, "Discussions", der.id);
          const L = query(Last );
          onSnapshot(L , (doc) =>{
            if(doc.exists()){
            setexist(true)
            setLast(doc.data().CLLm);
            setreadLM(doc.data().CLLm.unread);
            setMy(doc.data().ADLm.unread);
            }
          })
        
           
          }

          });
      
      
    }, []);

    //============================= Controles =========================

    useEffect(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (auth.currentUser){
              const User = await getDoc(doc(db, "Users" , currentUser.uid));
    
              if(User.data().type == 'client'){
               history.push('/profil')
               window.location.reload('/profil');
              }
          }else if(!auth.currentUser){
            history.push('/');
          }
  
          });
      
      
    }, []);


    //===========================================================================
   
//  const q4 = query(collection(db, "msgs"), where("receiver", "==", der.id));

//         const querySnapshot = await getDocs(q4);
//         const mmsg=[]
//         querySnapshot.forEach((doc) => { 
//           mmsg.push(doc.data())


//         });
//         });
  
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
      sender: "Admin",
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
      fileN: doce.name || "",
    }).then(()=>{
      setShowEmojis(false);
      settext("");
      setImg("");
      setFile("");
    });

    if(exist){
      await updateDoc(doc(db, "Discussions", Info.userId), {
        ADLm : 
       { msg: text,
        sender: "Admin",
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        file: url1 || "",
        fileN: doce.name || "",
        unread: true,}
    });
    }else{
      await setDoc(doc(db, "Discussions", Info.userId), {
        ADLm : 
       { msg: text,
        sender: "Admin",
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        file: url1 || "",
        fileN: doce.name || "",
        unread: true},
        CLLm : 
       { msg: '',
        sender: Info.userId,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        file: url1 || "",
        fileN: doce.name || "",
        unread: null},

    });
    }
    

}

 discus();


};

const read = async ()=>{
  if (exist){
  await updateDoc(doc(db, "Discussions", Info.userId ), { CLLm : { ...LastM , unread: false }});
  }
}


    return (

      <div>
      <Sidebar/>
    <div class="container">
  <div  class="header2-container" >
    
    <div class="header">
      {Info.type == 'admin' && (<p style={{ color: "blue" , fontSize: "18px" , fontWeight: "bold"}}> Administrateur</p>)}
    <h1 class="main-heading">{Info.nom} {Info.prenom}</h1>
    <span class="tag">Tel :{Info.phone}</span>
    <br>
    </br>
    <br>
    </br>
    
    <span class="tag">Agence :{Info.agence}</span>
    {CL &&(
    <div class="stats"> 
      <span class="stat-module">
        Nombre Vehicules : <span class="stat-number">{Info.nbrV}</span>
      </span>
      <span class="stat-module">
        Constats en cours : <span class="stat-number">{Info.const}</span>
      </span>
    </div>)}

    {EX &&(
    <div class="stats"> 
      <span class="stat-module">
        Nombre Constat attribuee : <span class="stat-number">{Info.nbrV}</span>
      </span>
      <span class="stat-module">
        statut : 
        <span class="stat-number"></span>{Info.enligne ? <span style={{color: "green"}} class="stat-number"> Connecte </span> : <span style={{color: "red"}} class="stat-number"> Deconnecte</span>}
      </span>
    </div>
 
    )}
  </div>
    
  

  
</div>

<div class="overlay-header2"></div>

<div class="body">
  <img src="../assets/images/pro3.png" alt="profil pic" class="body-image" />
  <div class="u-clearfix"></div>


  {/* <div class="body-info"></div> */}


  <Box sx={{ width: '100%', typography: 'body1' }}>
    { CL && (
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',fontSize: 14, }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ width: '1%',fontSize: 9}} label="Vehicules" value="1" />
            <Tab sx={{ width: '1%',fontSize: 9}} label="Constats" value="2" />
            <Tab sx={{ width: '1%',fontSize: 9}} label="Discussion" onClick={()=>{read() ; setTimeout(() => {
              discus ();
            }, 200); }} value="3" />
            {readLM ?<NotificationsActiveIcon style={{ marginTop: "10px" , marginLeft: "-8px", color:"red"}}  /> : <></>}

            
          </TabList>
        </Box>
       

<TabPanel value="1">
  <div class="">
   
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
      { Vide ?  
          <div className='LogDiv' > 
          <p className='TextLo'> Aucune voiture 😣😥</p>
          <Logo  className='LogSect' />
           </div>
          :<></>}
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
                                    window.open(`../details-car/${der.id}&${Car.ID}`, '_blank')
                                    // history.push(`../details-car/${der.id}&${Car.ID}`)
                                    // window.location.reload(`../details-car/${der.id}&${Car.ID}`);
                                  }} >
                            More Info</Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography cursor="pointer" onClick={()=>{window.open(`../Contrat/${der.id}&${Car.ID}`, '_blank')}} variant="subtitle1" component="div">
              <ArticleIcon onClick={()=>{ window.open(`../Contrat/${der.id}&${Car.ID}`, '_blank')}} />
                <p className='navig'>Contrat</p>
            </Typography>
          </Grid>
        </Grid>
        
      </Grid>

        ))}
      

    </Paper></div>
    </TabPanel>
    
<TabPanel value="2"> 
  { VideCon ?  
          <div className='LogDiv' > 
          <p className='TextLo'> Aucune Constat 😣😥</p>
          <Logo  className='LogSect' />
           </div>
          :<></>}
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none' }}>
      {Consta.map((value) => (
        <ListItem
          key={value}
          disableGutters
        >
          
          <ListItemText 
          primary={` ${value.nomeAd} ${value.prenomAd}`}
          secondary={`voiture: ${value.CarMarqu}`} />

          {/* <Button variant="outlined" onClick={()=>{history.push(`/constat/${value.ID}`)
                                          window.location.reload(`/constat/${value.ID}`);}}>verifier rapport
          </Button> */}
        <Tooltip title="Details" placement="Top"  >
        <IconButton aria-label="details">
          <SendIcon onClick={()=>{window.open(`../Constat/${value.ID}`, '_blank')}} color="success" />
        </IconButton>
        </Tooltip>

          
            
        </ListItem>
      ))}
    </List>
     </TabPanel>

<TabPanel value="3"> 
    <>
    <div className="messages_container"> 
          
            <div className="messages_user"  >
              <div  style={{cursor:'pointer'}} 
              > 
              <img src={'../assets/images/pro3.png'} alt="avatar" className="mu_image" /> </div>
               <h3 style={{cursor:'pointer'}} 
                    > {Info.nom} {Info.prenom}</h3>
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
                {discu.sender == "Admin" && (
                  <div className={`message_wrapper own`} ref={scrollRef}>

              <p className={"me"}  >
              {discu.media ?  <a onClick={()=>{window.open(discu.media, '_blank');}}> <img src={discu.media} alt={discu.text} /> </a> : null}
              {/* {discu.file ? <a onClick={()=>{window.open(discu.file, '_blank');}}> Télécharger </a> : null} */}
              {discu.file ? <a> {discu.fileN} <Download onClick={()=>{window.open(discu.file, '_blank');}} /> </a> : null}
              {discu.msg}
              </p>
              {Myms === false  && index === Lng -1 && (<a  style={{fontSize: "9px" , marginLeft: "45%"}}> Vu <DoneAll fontSize="small" /> </a>) }
              
  
            </div>
                )}
            
            {discu.sender !== "Admin" && (
            <div className={`message_wrapper`} ref={scrollRef}>
              
              <p className={"friend"}  >
              {discu.media ?  <a onClick={()=>{window.open(discu.media, '_blank');}}> <img src={discu.media} alt={discu.text} /> </a> : null}
              {discu.file ? <a> {discu.fileN} <Download onClick={()=>{window.open(discu.file, '_blank');}} /> </a> : null}
              {discu.msg}             
              </p>
             
              
            </div>
                )}
            </div>
            ))}
            {/* <div  ref={scrollRef} /> */}

            </div>
  
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

          <div className="picker_container">
            
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
      
              {/* {showEmojis && (
                <div className='EmojiCont'>
                  <Picker
                    // onSelect={addEmoji}
                    onEmojiClick={onEmojiClick}
                  />
                  </div>
                    )}  */}

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
            <button className="btn_form2" onClick={()=> setbool({})}  > <IoMdSend fontSize="1.5rem" /> </button>
          </div>

          {/*  */}
        </form>
        
    </div>
      </>
    </TabPanel>




      </TabContext>
    )}


    { EX &&(

<TabContext value={value}>
<Box sx={{ borderBottom: 1, borderColor: 'divider',fontSize: 14, }}>
  <TabList onChange={handleChange} aria-label="lab API tabs example">
    <Tab sx={{ width: '1%',fontSize: 9}} label="Rapport" value="1" />
    <Tab sx={{ width: '1%',fontSize: 9}} label="Constats attribee" value="2" />
    <Tab sx={{ width: '1%',fontSize: 9}} label="Discussion" onClick={()=>{read() ; setTimeout(() => {
              discus ();
            }, 200); }} value="3" />
    {readLM ?<NotificationsActiveIcon style={{ marginTop: "10px" , marginLeft: "-8px" , color:"red"}}  /> : <></>}
    

    
  </TabList>
</Box>


<TabPanel value="1">

  { Vide ?  
          <div className='LogDiv' > 
          <p className='TextLo'> Aucune voiture</p>
          <Logo  className='LogSect' />
           </div>
          :<></>}
<TableContainer sx={{ height: 300}}  component={Paper} style={ulStyle}>
            <Table   size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow >
                  <TableCell style={Gb} size="medium" align="center">Client</TableCell>
                  {/* <TableCell style={Gb} size="medium" align="center">Expert</TableCell> */}
                  <TableCell style={Gb} size="medium" align="center">Voiture</TableCell>
                  <TableCell style={Gb} size="medium" align="center"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

   
        
        
         {Rapport.map((Rapport) => (
                  <TableRow
                    key={Rapport.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {Rapport.clientnom} {Rapport.clientprenom}
                    </TableCell>
                    {/* <TableCell align="justify">{Rapport.expertNom} {Rapport.expertPrenom}</TableCell> */}
                    <TableCell style={Ce} align="justify">{Rapport.marque} =&gt; {Rapport.TypeV} </TableCell>
                    {/* <TableCell align="justify">{Rapport.ID}</TableCell> */}
                    <TableCell align="justify">  <button onClick={()=>{window.open(`../Rapport/${Rapport.ID}`, '_blank')}}  className='btnsC' variant="contained">Visualiser le Rapport</button></TableCell>
                  </TableRow>
                ))}

               
              </TableBody>
            </Table>
            </TableContainer>

</TabPanel>

<TabPanel value="2"> 

{ VideCon ?  
          <div className='LogDiv' > 
          <p className='TextLo'> Aucune Constat 😣😥</p>
          <Logo  className='LogSect' />
           </div>
          :<></>}
<List sx={{ width: '100%', bgcolor: 'none' }}>
{Consta.map((value) => (
<ListItem
  key={value}
  disableGutters
  style={Gb}
>
  
  <ListItemText 
  sx={{ marginLeft: "20px"}}
  primary={` ${value.nomeAd} ${value.prenomAd}`}
  secondary={`voiture: ${value.CarMarqu} : ${value.CarTyp}`} />
  {/* <Button variant="outlined" onClick={()=>{history.push(`/constat/${value.ID}`)
                                  window.location.reload(`/constat/${value.ID}`);}}>verifier Constat
  </Button> */}


  <Tooltip title="Details" placement="Top"  >
    <IconButton onClick={()=>{window.open(`../constat/${value.ID}`, '_blank')}} aria-label="details">
      <p style={{fontSize: "12px"}}>Consulter </p>
      <SendIcon color="success" />
    </IconButton>
    </Tooltip>



  
    
</ListItem>
))}
</List>
</TabPanel>

<TabPanel value="3"> 
    <>
    <div className="messages_container" > 
          
            <div className="messages_user"  >
              <div  style={{cursor:'pointer'}} 
              > 
              <img src={'../assets/images/pro3.png'} alt="avatar" className="mu_image" /> </div>
               <h3 style={{cursor:'pointer'}} 
                    > {Info.nom} {Info.prenom}</h3>
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
                {discu.sender == "Admin" && (
                  <>
                  <div className={`message_wrapper own`} ref={scrollRef} >

              <p className={"me"}  >
              {discu.media ?  <a onClick={()=>{window.open(discu.media, '_blank');}}> <img src={discu.media} alt={discu.text} /> </a> : null}
              {/* {discu.file ? <a onClick={()=>{window.open(discu.file, '_blank');}}> Télécharger </a> : null} */}
              {discu.file ? <a> {discu.fileN} <Download onClick={()=>{window.open(discu.file, '_blank');}} /> </a> : null}
              {discu.msg}  
              </p>
              {Myms === false  && index === Lng -1 && (<a style={{fontSize: "9px" , marginLeft: "45%"}}> Vu <DoneAll fontSize="small" /> </a>) }

              
  
            </div>
            
              </>
                )}
            
            {discu.sender !== "Admin" && (
            <div className={`message_wrapper`} ref={scrollRef}>
              
              <p className={"friend"}  >
              {discu.media ?  <a onClick={()=>{window.open(discu.media, '_blank');}}> <img src={discu.media} alt={discu.text} /> </a> : null}
              {discu.file ? <a> {discu.fileN} <Download onClick={()=>{window.open(discu.file, '_blank');}} /> </a> : null}
              {discu.msg}  

              </p>
             
              
            </div>
                )}
            </div>
            ))}

            <div style={{backgroundColor :"red"}} ref={scrollRef} />
            </div>
  
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
{/* style={{ position: "relative", width: "100%", color:"black",left: "25px"}} */}
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
      
              {/* {showEmojis && (
                <div className='EmojiCont'>
                  <Picker
                    // onSelect={addEmoji}
                    onEmojiClick={onEmojiClick}
                  />
                  </div>
                    )}  */}

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
            <button className="btn_form2" onClick={()=> setbool({})}  > <IoMdSend fontSize="1.5rem" /> </button>
          </div>

          {/*  */}
        </form>
        
    </div>
      </>
    </TabPanel>


</TabContext>

    )}
      
    </Box>
  
</div>

    </div>
    </div>



    )
}


