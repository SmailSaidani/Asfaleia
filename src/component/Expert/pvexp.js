

import React, { useEffect, useState,useRef } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClipLoader from "react-spinners/ClipLoader";
import ReactToPrint from 'react-to-print';

import Typography from '@mui/material/Typography';
import Sidebar from './sidebarE';
import Tooltip from "@material-ui/core/Tooltip";
import { BsCardImage } from "react-icons/bs";
import InputAdornment from '@mui/material/InputAdornment';
import UploadFileIcon from '@mui/icons-material/UploadFile';



import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import InputUnstyled from '@mui/base/InputUnstyled';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


import { db, auth  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,

} from "firebase/firestore";
import { storage } from "../../bdd/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


import Button from '@mui/material/Button';
import { Image } from "@material-ui/icons";


export default function Pvexp() {
  

      // ====================== CSS =================================
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '90%',
        boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
        padding: '5%',
    
        marginLeft:'5%'
      }));

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

    const table={
     border : '1px solid black',
     backgroundColor : '#d9d9d9',
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
    
      const blue = {
        100: '#DAECFF',
        600: '#80BFFF',
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



    //==================== Back ======================
      const history = useHistory();
      const [fait, setfait] = useState(false);
      const [errors, seterrors] = useState([]);
      const [envoi, setenvoi] = useState(false);
      const [confirm , setconfirm] = useState(false);

      const [values , setValues] = useState({
        imagesEX: [],
        vetu: 0,
        immobi: 0,
      });
      const [Constat, setConstat] = useState({
        A_degats:[],
        B_degats:[],
      });
      const [user, setuser] = useState({});
      const [Car, setCar] = useState({});
      const idConstat = useParams();
      const [DateAc, setDateAc] = useState('');
      const [HeurAc, setHeurAc] = useState('');

      const date = idConstat.idCo.slice(0, 10);

      
      const [Theur, setTheur] = useState(0);
      const [DetailsR , setDetailsR]=useState([
        {
          emp:"",
          des:"",
          TRepT:0,
          TRepP:0,
          PrixT:0,
          PrixP:0,
          typeR:'',
          bool: false,
        }
      ]);
      const [detb , setdetb] = useState(false);
      const [ind, setind] = useState(0);
      

      const [fournit , setfournit]=useState([
        {
          Qte:1,
          emp:"",
          dsi:"",
          HT:0,
          TVA:0,
          bool: false,
        }
      ]);
      const [detf , setdetf] = useState(false);
      const [find, setfind] = useState(0);
      
    
      const [first , setfirst] = useState(false);
      const [images , setimage] = useState([]);
      const [progress, setProgress] = useState(0);
      
      

      const [mmd, setmmd] = useState(0);
      const [mp, setmp] = useState(0);
      const [mf, setmf] = useState(0);
     
      useEffect(async () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
            
    
            const infos = await getDoc(doc(db, "Constat" , idConstat.idCo));
            setConstat(infos.data());
            // console.log(infos.data());

            if(infos.data().RDVdate == "fait"){
              setfait(true);
            }

              var t = new Date(1970, 0, 2); // Epoch
              t.setSeconds(infos.data().dateAc.seconds);
              const t1 = t.toISOString();
              const DateAcc = t1.slice(0, 10);
              setDateAc(DateAcc);

              var t = new Date(1970, 0, 2 , 4 , 0 ,0 ); // Epoch
              t.setSeconds(infos.data().heureAc.seconds);
              const t2 = t.toISOString();
              // console.log(t2);
              const HeurAcc = t2.slice(11, 16);
              // console.log(HeurAcc);
              setHeurAc(HeurAcc);
           
            const voiture = await getDoc(doc(db , "Users" , infos.data().A_userid , "cars" , infos.data().A_carId));
            setCar(voiture.data());
            
            const expert = await getDoc(doc(db, "Users" , currentUser.uid));
            setuser(expert.data());
            

            setValues({
              ...values,
              ...voiture.data() ,
      
              expertId: expert.data().userId ,
              expertNom: expert.data().nom ,
              expertPrenom: expert.data().prenom ,
      
              clientId: infos.data().A_userid ,
              clientnom: infos.data().A_nom ,
              clientprenom: infos.data().A_prenom ,
              
      
              advernom: infos.data().B_nom ,
              adverprenom: infos.data().B_prenom ,
              adverassur : infos.data().B_assure,
              adverassurAgen : infos.data().B_assurAgen,

              DateAc: infos.data().dateAc,
              A_degats:infos.data().A_degats,
              A_deg:infos.data().A_deg,
              
      
            })
    
            }
    
            });
        
        
      }, []);

     
      
const formHandler = (e) => {
  
  setProgress(0);
  e.preventDefault();
  
  uploadFiles(e.target[0].files[0]);
};

const uploadFiles = (file) => {
  

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
        images.push(downloadURL);
        setValues({...values,
                imagesEX: images,});
        setfirst(true);
        
      });
      
    }
  );
};

const supprimer = (image) =>{

  const index = images.indexOf(image);
  images.splice(index , 1);
  
  setValues({...values,
    images: images,});

}


const chege3 = async () =>{
        setenvoi(true)
        const moment = new Date().toLocaleDateString();
        const final = {

          ...values,

          dateR:moment,
          DetailsR: DetailsR,
          Fourniture: fournit,
          Total: mmd+mp+mf,
          mmd:mmd,
          mp:mp,
          mf:mf,
        };

        // console.log(final);
 
        if(values.imagesEX.length == 0 ){
          
          errors[0]="veuillez importer au moins une photo SVP!";
          setTimeout(() => {
           setenvoi(false); 
          }, 1000);
        }else {

        console.log(idConstat.idCo);
       

        await setDoc(doc(db , "Rapport", idConstat.idCo), final)
        .then(async()=>{
          await updateDoc(doc(db, "Users", user.userId), { nbrV: user.nbrV - 1 });
          await updateDoc(doc(db, "Constat", idConstat.idCo), { 
                    RDV : false,
                    RDVdate : "fait",
                    RDVtime  : "fait", })
          setenvoi(false);
          setconfirm(true);

        })
        .catch((error) => {
          console.log(error.message);
        });

       

        }

}

const ajoutIn = ()  =>{
        setdetb(true);
       

        DetailsR[ind]={
          ...DetailsR[ind],
          bool: true,
        }

       

        DetailsR[ind+1]={
          emp:"",
          des:"",
          TRepT:0,
          TRepP:0,
          PrixT:0,
          PrixP:0,
          typeR:'',
          bool: false,
        }

        // DetailsR.push({
        //   emp:"",
        //   des:"",
        //   TRep:"",
        //   Prix:0,
        //   typeR:'',
        // });
        setind(ind + 1);
        setTimeout(() => {
          calculeMd(ind);
          calculeMp(ind);
       }, 100);
        
}

const ajoutFn = ()  =>{
        setdetf(true);

        fournit[find]={
          ...fournit[find],
          bool: true,
        }

       

        fournit[find+1]={
          Qte:1,
          emp:"",
          desi:"",
          HT:0,
          TVA:0,
          bool: false,
        }

        setfind(find + 1);
        setTimeout(() => {
          calcule(find);
       }, 100);
       
        
}



const calculeMd = (i) =>{
  

  const Tot = Number(DetailsR[i].PrixT) ;
 
  setmmd(mmd + Tot);


}
const calculeMp = (i) =>{
  

  const Tot = Number(DetailsR[i].PrixP) ;
 
  setmp(mp + Tot);


}
const calcule = (i) =>{
  
  const Tot = (Number(fournit[i].HT) + Number(fournit[i].TVA) ) * fournit[i].Qte;
  

  setmf(mf + Tot);

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
          }else if(!auth.currentUser){
            history.push('/');
          }
  
          });
      
      
    }, []);


    //===========================================================================
    



    const componentRef = useRef();

return (
<>

<Sidebar/>

     <div style={{ padding: "10%" , backgroundColor: "white"}} ref={componentRef}>

        <Typography variant="h5" style={{borderBottom:'1px solid black'}}>
            Société ALGERIENNE D'EXPERTISE ET DE CONTROLE TECHNIQUE
        </Typography>
        {fait ? <p className="error"> le Rapport a déjà été envoyé </p> : <></>}

        <Grid container >
          <Grid item xs={6}>
            <Typography variant="overline">
                Cantre d'expertise: copenhagen</Typography>
       
          </Grid>
          <Grid item xs={6}>      <Typography variant="overline">
                Proces-verbale d'expertise N: 9423468-02</Typography></Grid>
        </Grid>

        <Grid container >
          <Grid item xs={6}>
  
                <Typography variant="overline">
                Lieu de visite : {Car.userAgen} </Typography>
          </Grid>
          <Grid item xs={6}>   
             <Typography variant="overline">
               etabli le : {date} </Typography>
                  <Typography variant="overline" style={{marginLeft: '5%'}}>
               expert : </Typography> <Typography variant="overline" style={{fontWeight: 'bolde'}}>{user.nom} {user.prenom}</Typography>
             


        </Grid>
        </Grid>


            <Grid container >
            <Grid sm={6} xs={12} container style={{border : " 1px solid black"}}>
            <Grid sm={12} xs={12} style={table} ><Typography variant="h6">Mode</Typography></Grid>

            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Agence : </Typography>
            <Typography className="infos" align="center" variant="overline">{Constat.A_assurAgen} </Typography>
            </Grid>
            

            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Numero : </Typography>
            <Typography className="infos" align="center" variant="overline">{Constat.A_phone} </Typography>
            {/* <TextField id="standard-basic"   variant="standard" /> */}


            </Grid>
            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Date : </Typography>
            <Typography className="infos" align="center" variant="overline">{DateAc} </Typography>
            {/* <TextField id="standard-basic" value={DateAc} variant="standard" /> */}


            </Grid>
            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Heur : </Typography>
            <Typography className="infos" align="center" variant="overline">{HeurAc} </Typography>
            {/* <TextField id="standard-basic"  variant="standard"  /> */}


            </Grid>

            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Assure : </Typography>
            <Typography className="infos" align="center" variant="overline">{Constat.A_nom} {Constat.A_prenom}</Typography>
            {/* <TextField id="standard-basic"  variant="standard"  /> */}


            </Grid>
            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Tiers : </Typography>
            <Typography className="infos" align="center" variant="overline">{Constat.B_nom} {Constat.B_prenom} </Typography>
            {/* <TextField id="standard-basic"   variant="standard" /> */}


            </Grid>

            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Assure Tiers : </Typography>
            <Typography className="infos" align="center" variant="overline">{Constat.B_assure} </Typography>
            {/* <TextField id="standard-basic"  variant="standard"  /> */}


            </Grid>
            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Agence : </Typography>
            <Typography className="infos" align="center" variant="overline">{Constat.B_assurAgen} </Typography>
            {/* <TextField id="standard-basic"  variant="standard" /> */}


            </Grid>

            <Grid sm={6} xs={12}  >


            </Grid>
            </Grid>




            <Grid sm={6} xs={12} container style={{border : " 1px solid black"}}>
            <Grid sm={12} xs={12}  style={table}><Typography variant="h6">Mandat</Typography></Grid>
            <Grid xs={4} style={{border :"1px solid black"}} >

            <Typography variant="overline">Marque : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.marque} </Typography>
            {/* <TextField id="standard-basic"  value={Car.marque}   /> */}

            </Grid>
            <Grid xs={4} style={{border :"1px solid black"}} >

            <Typography variant="overline">Modele : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.nom} </Typography>
            {/* <TextField id="standard-basic"  value={Car.nom}   /> */}


            </Grid>

            <Grid xs={4}  style={{border :"1px solid black"}}>

            <Typography variant="overline">Genre : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.marque} </Typography>
            {/* <TextField id="standard-basic"  textAlign="center" value={Car.marque}   /> */}


            </Grid>

            <Grid xs={6}  >

            <Typography variant="overline">N serie : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.numS} </Typography>
            {/* <TextField id="standard-basic" value={Car.numS}   variant="standard" /> */}


            </Grid>

            <Grid xs={6}  >

            <Typography variant="overline">Puissance : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.puiss} </Typography>
            {/* <TextField id="standard-basic" value={Car.puissance}  variant="standard"  /> */}


            </Grid>
            <Grid sm={6} xs={12}  >

            <Typography variant="overline">Immatriculation : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.imma} </Typography>
            {/* <TextField id="standard-basic" value={Car.imma}   variant="standard" /> */}


            </Grid>

            <Grid xs={6}  >

            <Typography variant="overline">annee : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.annes} </Typography>
            {/* <TextField id="standard-basic" value={Car.annee}  variant="standard"  /> */}


            </Grid>
            <Grid xs={6}  >

            <Typography variant="overline">Energie : </Typography>
            <Typography className="infos" align="center" variant="overline">{Car.energie} </Typography>
            {/* <TextField id="standard-basic" value={Car.energie}   variant="standard" /> */}


            </Grid>

            <Grid xs={6}  >

            <Typography variant="overline">Etat du veh : 
            <Typography className="infos" align="center" variant="overline">{Car.etat} </Typography>
            </Typography>
                {/* <TextField id="standard-basic"  variant="outlined" /> */}


            </Grid>

            <Grid xs={6}  >

                <Typography variant="overline">    Carrosserie :
                <Typography className="infos" align="center" variant="overline">{Car.caross} </Typography>
                </Typography>
            </Grid>

            
            </Grid>

           <Grid style={table} xs={12}><Typography variant="h5">Description Du Choc</Typography></Grid>

            <Grid style={{border : '1px solid black'}} xs={12} container>
                
                
                
                
                
<Grid container sm={12} xs={12}>
<Grid sm={4} xs={12}>
<Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Emplacement : 

{Constat.A_degats.map((g) => (
<>

{g && g.checked == "true" && (
  <Typography className="infosVe" align="center" variant="overline">  {g.ind} / </Typography>

)}
</>
))}
</Typography>
</Grid>
<Grid sm={4} xs={12}>
<img style={{ border : "1px solid black"}} src="../assets/images/degat.png" alt="degats" className='imgbx'/>
</Grid>
<Grid sm={4} xs={12}>
<Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Les degats : 
<Typography className="infosVe" align="center" variant="overline">  {Constat.A_deg} </Typography>
</Typography>
</Grid>


</Grid>

<Grid xs={12} >
<Typography variant="overline" style={{float : 'left'}}>Description Du choc : 
<TextField fullWidth sx={{ height : '30%'}} id="fullWidth" placeholder='description du choc ...' value={values.desChoc} onChange={(e)=>{setValues({...values, desChoc:e.target.value})}}/>
</Typography>
</Grid>
 

</Grid>
 

 
 <Grid container xs={12} >
<Grid sm={9} xs={6} style={table} ><Typography variant="h6">Evaluation De La Mise en etat</Typography></Grid>
<Grid sm={1.5} xs={3} style={table} ><Typography variant="subtitle2">Taux horaire</Typography></Grid>
<Grid sm={1.5} xs={3} style={{border : " 1px solid black"}}> <TextField style={{width: "50%"}} label="en DA" type={"number"} id="standard-basic" variant="standard" value={Theur} onChange={(e)=>{ setTheur(e.target.value)}} /> </Grid>




<Grid container xs={12} style={{border : '1px solid black'}}>
<Grid sm={9} xs={6} style={table} ><Typography variant="overline" >Details Des Reparations</Typography>
</Grid>
<Grid sm={1.5} xs={3} style={table} ><Typography variant="overline" >t/rep</Typography></Grid>
<Grid sm={1.5} xs={3}  style={table}> <Typography variant="overline" >Montant</Typography> </Grid>  

<Grid sm={9} xs={6}  style={{borderRight : '1px solid black',padding: "2%" }}  >
<Tooltip title="Confirmer" placement="Top"   >
<Box sx={{ '& > :not(style)': { ml: 7 } }}>
<Fab onClick={ajoutIn} size='small' color="primary" aria-label="add">
  <CheckIcon />
</Fab>
</Box></Tooltip>
</Grid>
<Grid sm={1.5} xs={3} style={{borderRight : '1px solid black'}}  ></Grid>


{DetailsR.map((D,index) => (

<Grid container xs={12} style={{border : '1px solid black', marginTop: "10px" ,marginBottom: "40px"}}>

<Grid sm={9} xs={6}  style={{borderRight : '1px solid black'}}>

                
  <Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Emplacement :</Typography>

  {D.bool ?<><Typography variant="standard" style={{ float : 'left' , fontWeight:"bold" , marginTop: "10px"}}> {D.emp} </Typography>  </>            
  :<TextField style={{ float : 'left'}} onChange={(e)=>{  D.emp = e.target.value  }}/>}
                
                    
  {/* {D.bool ?<> <Typography variant="standard" style={{ fontWeight:"bold" , marginTop: "16px"}}> {D.typeR} </Typography> <br></br>  </>        
  :<TextField   placeholder='reparation ...' onChange={(e)=>{D.typeR = e.target.value }}/>} */}
    <Typography variant="standard" style={{ fontWeight:"bold" , marginTop: "15px"}}> Toliers </Typography>

  <br></br>
  {D.bool ?<> <Typography variant="standard" style={{ marginTop: "10px" }}> {D.des} </Typography>  </>         
  :<TextField fullWidth sx={{ height : '280px%'}} id="fullWidth" placeholder='description du choc ...' onChange={(e)=>{D.des = e.target.value }} />} 
  <br></br>
  <br></br>
  {D.bool ?<> <Typography variant="overline" style={{ float : 'left'}} >Emplacement : {D.emp}  </Typography>
</> : <></>}
  <Typography variant="standard" style={{ fontWeight:"bold" , float : 'right' , marginRight: "15px"}}> Peinture et ingridients </Typography>
  <br></br>
  <br></br>
                  </Grid>
                  
                  
                  
                  
                  
                  
                  <Grid sm={1.5} xs={3} style={{borderRight : '1px solid black'}}  >
                  {D.bool ? <><Typography variant="standard" > {D.TRepT} </Typography>  <br></br><br></br><br></br>   </>          
                : <TextField type={"number"}  style={{overflow: "hidden"}} onChange={(e)=>{D.TRepT = e.target.value }}/>}

                  {D.bool ? <Typography variant="standard" > {D.TRepP} </Typography>           
                : <TextField type={"number"}  style={{overflow: "hidden"}} onChange={(e)=>{D.TRepP = e.target.value }}/>}
            
                 </Grid>




                  
                 <Grid sm={1.5} xs={3}   >
                 {D.bool ?<> <Typography variant="standard" > {D.PrixT} </Typography> <br></br><br></br><br></br>   </>       
                : <TextField type={"number"}  style={{overflow: "hidden"}}  onChange={(e)=>{D.PrixT = e.target.value }}/>}

                 {D.bool ? <Typography variant="standard" > {D.PrixP} </Typography>           
                : <TextField type={"number"}  style={{overflow: "hidden"}} onChange={(e)=>{D.PrixP = e.target.value }}/>}
                
                 </Grid>

 </Grid>

))}


                  
                  
                  
                  
                  
                  
                  {/* <Grid xs={9} style={{borderRight : '1px solid black'}}>

                    <Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Emplacement :   
                          <TextField id="standard-basic"   variant="standard" style={{width:"40%"}} />
                    </Typography>
                    <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} />
                    <CustomInput aria-label="Demo input" multiline placeholder="Type something…"  style={{float : 'left' , marginLeft: '1%'}}/>


                  </Grid>


                  <Grid xs={1} style={{borderRight : '1px solid black'}}  >
            <Typography variant="overline" >3</Typography>
                 </Grid>

                 <Grid xs={2}   >
            <Typography variant="overline" >3000</Typography>
                 </Grid>

                  <Grid xs={9} style={{borderRight : '1px solid black'}}>

                
                <Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Emplacement :   
                          <TextField id="standard-basic"   variant="standard" style={{width:"40%"}} />
                    </Typography>
                    <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} />
                    <CustomInput aria-label="Demo input" multiline placeholder="Type something…"  style={{float : 'left' , marginLeft: '1%'}}/>


                  </Grid>

                  <Grid xs={1} style={{borderRight : '1px solid black'}}  >
            <Typography variant="overline" >6</Typography>
                 </Grid>

                 <Grid xs={2}   >
            <Typography variant="overline" >3000</Typography>
                 </Grid> */}

</Grid>

            </Grid >

            <Grid container xs={12} style={table} > <Typography variant="h6" >Fourniture</Typography> </Grid>
            </Grid>

            <Grid container xs={12}>
            <Grid container sm={9} xs={11}>
            <Grid  xs={0.5} style={table}><Typography variant='overline'></Typography></Grid>
            <Grid  xs={1.5} style={table}><Typography variant='overline'>Qte</Typography></Grid>

            <Grid  xs={7} style={table}><Typography variant='overline'>designation</Typography></Grid>
            <Grid  xs={2} style={table}><Typography variant='overline'>h.t</Typography></Grid>
            <Grid  xs={2} style={table}><Typography variant='overline'>tva</Typography></Grid>
            </Grid>

            {fournit.map((D,index) => (
            <Grid container sm={8} xs={11}>
              <Grid  xs={0.5} style={{border : '1px solid black'}} >
             <Typography variant="standard" > {index+1} </Typography>           
              </Grid>
            <Grid  xs={0.5} style={{border : '1px solid black'}} >
            {D.bool ? <Typography variant="standard" > {D.Qte} </Typography>           
                : <TextField   onChange={(e)=>{D.Qte = e.target.value }}/>}
              </Grid>

            <Grid  xs={7} style={{border : '1px solid black'}}>
              {D.bool ? <Typography variant="standard" > {D.dsi} </Typography>           
                : <TextField   onChange={(e)=>{D.dsi = e.target.value }}/>}
              </Grid>
            <Grid  xs={2} style={{border : '1px solid black'}}>
              
              {D.bool ? <Typography variant="standard" > {D.HT} </Typography>           
                : <TextField type={"number"}  onChange={(e)=>{D.HT = e.target.value }}/>}
              </Grid>
            <Grid  xs={2} style={{border : '1px solid black'}}>
            {D.bool ? <Typography variant="standard" > {D.TVA} </Typography>           
                : <TextField type={"number"}  onChange={(e)=>{D.TVA = e.target.value }}/>}
                </Grid>

            </Grid>
            
            ))}
            <Grid  xs={1}>
            <Tooltip title="Confirmer" placement="Top"   >
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab onClick={ajoutFn}  size='small' color="primary" aria-label="add">
              <CheckIcon />
            </Fab>
            </Box></Tooltip>
            </Grid>
            </Grid>

            {/* <Grid container xs={12}>

              </Grid> */}



              <Grid container xs={12}>
            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>   
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant TTC</Typography></Grid>

            <Typography style={{ fontWeight: "bolder" , color: "green" , fontSize:"16px" , marginTop:"10px"}} variant='overline'> { mmd + mp + mf} </Typography>                 
              {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
            </Grid>

            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant Main-d'oeuvre</Typography></Grid>
 

            <Grid  xs={12} container> 
            {detb ? 
              <>
                    {DetailsR.map((D,index) => (
              <>
                <Grid  xs={6} style={{border : '1px solid black'}}>{index+1}</Grid>
                <Grid  xs={6} style={{border : '1px solid black'}}> {Number(D.PrixT)} </Grid>
                <br></br>
              </>
            ))}  
              </> : 
              <>
              </>}
         
                  
                </Grid>

            <Typography style={{ fontWeight: "bold"}} variant='overline'>Total: {mmd} </Typography>                   
              {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
            </Grid>            
            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant peinture</Typography></Grid>

              <Grid  xs={12} container> 
              {detb ? 
              <>
                {DetailsR.map((D,index) => (
              <>
                <Grid  xs={6} style={{border : '1px solid black'}}>{index+1}</Grid>
                <Grid  xs={6} style={{border : '1px solid black'}}> {Number(D.PrixP)} </Grid>
                <br></br>
              </>
               ))} 
              </> : 
              <>
              </>}
             
                  
                </Grid>



            <Typography style={{ fontWeight: "bold"}} variant='overline'>Total: {mp} </Typography>  
            {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
              </Grid>
            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant fourniture </Typography></Grid>
 

                <Grid  xs={12} container> 
                  <Grid  xs={1} style={{border : '1px solid black'}}> </Grid>
                  <Grid  xs={1} style={{border : '1px solid black'}}>Q</Grid>
                  <Grid  xs={5} style={{border : '1px solid black'}}>TVA</Grid>
                  <Grid  xs={5} style={{border : '1px solid black'}}>TTC</Grid>
                </Grid>
                <Grid  xs={12} container> 
                
                {detf ?
                <>    {fournit.map((D,index) => (
                        <>
                          <Grid  xs={1} style={{border : '1px solid black'}}> {index+1} </Grid>
                          <Grid  xs={1} style={{border : '1px solid black'}}> {D.Qte} </Grid>
                          <Grid  xs={5} style={{border : '1px solid black'}}>{D.TVA} </Grid>
                          <Grid  xs={5} style={{border : '1px solid black'}}>{Number(D.TVA)+Number(D.HT)}</Grid>
                          <br></br>
                        </>
                      ))}  
                </>:<></>}
            
                </Grid>

           <Typography style={{ fontWeight: "bold"}} variant='overline'> Total : {mf} </Typography>  
                       
              {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
            </Grid>           
               </Grid>



     <Grid xs={12} style={{border : ' 1px solid black' ,}}>Montant Total en Lettre : ..........</Grid>

     </div>

     <Grid xs={12} style={{border : ' 1px solid black', width : '80%', marginLeft: '10%', backgroundColor :'white' , marginTop : '-10%'}} container>

     <Grid sm={6} xs={12}>
      <Typography variant="subtitle2" >Photos : {values.imagesEX.length}  </Typography> 
      {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
      <div className="chaipas">

     
        <div>
        
        <form onSubmit={formHandler}>
          {/* <Tooltip title="Photo" placement="Top"   >
        <BsCardImage fontSize="1rem" color="#19A8D9" margin-right= "10px;" > </BsCardImage></Tooltip>  */}
        <TextField 
        type={"file"} 
        label='Importer des images ...'
        
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BsCardImage fontSize="1rem" color="#19A8D9" margin-right= "10px;" />
            </InputAdornment>
          ),
        }} />
        {/* <input 
            type="file"  
            className="input"   
            
          /> */}
          
        <Tooltip title="Importer" placement="Top" >
        <button className='buttonIm' style={{backgroundColor: "transparent", border: "none"}} type="submit"> 
        <UploadFileIcon fontSize='meduim' sx={{color: "black"}} />
        Upload</button></Tooltip>
        {/* <button type="submit">Upload</button> */}
        <hr />
        <h2>Uploading done {progress}%</h2>

        </form>
        </div>
        
        </div>
      




     </Grid>


     <Grid sm={2} xs={4} style={{border : "1px solid black "}}>

     <p>Immobilisation :</p> 
       <TextField id="standard-basic"  variant="standard" type={"number"} value={values.immobi} onChange={(e)=>{ setValues({...values, immobi:e.target.value})}} style={{width:"20%"}} />

     </Grid>

     <Grid sm={2} xs={4} className='pvbord'>

     <p>Vetuste : {values.vetu} %</p>   <TextField   value={values.vetu} type={"range"} onChange={(e)=>{ setValues({ ...values, vetu :e.target.value})}} variant="standard" style={{width:"100%"}} />



     </Grid>


     <Grid sm={2} xs={4} className='pvbord'>


     <p>Soit { ((mf)*values.vetu) / 100 } </p>   


</Grid>

</Grid>
{errors[0] && <p className="error">{errors[0]}</p>} 

{first ? 
<div className="sendouq">
<div className="sendouq">
<span class="card-heading">images</span>
<span class="card-more">
</span>

 <ul class="card-list">
  {values.imagesEX.map((image) => (
     <li>
      <div className="Li" >
      <div className="boxclose"
              onClick={() => {supprimer(image)}}
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
      <img className='imgV' src={image} alt="" /></div>
    </li>
     ))}
 </ul>
</div></div> : <></>}


{confirm ? 
        <p className="succès">Votre Rapport a été effectuée avec succès</p> 
        : 
        <></>} 


{fait ? 
<Button variant="contained" sx={{marginTop : '3%'}} onClick={chege3} >Ecrasse l'ancien PV ?
    { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
    </Button> 
  : 
<Button variant="contained" sx={{marginTop : '3%'}} onClick={chege3} >Confirmer le PV
    { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
    </Button>} 
<br></br>
<br></br>
    <ReactToPrint
        trigger={() => <Button className="buttonIm" > Imprimer Le Constat</Button>}
        content={() => componentRef.current}
      />
<br></br>
<br></br>
</>
      );
}
