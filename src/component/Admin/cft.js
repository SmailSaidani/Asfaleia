import React, { useEffect, useRef, useState } from "react";
import Typography from '@mui/material/Typography';
import Sidebar from '../sidebar';


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ClipLoader from "react-spinners/ClipLoader";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputUnstyled from '@mui/base/InputUnstyled';
import { FormControlLabel } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {doc,getDoc,deleteDoc, updateDoc} from "firebase/firestore";
import { db, auth, setDoc } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import { storage } from "../../bdd/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { BsCardImage } from "react-icons/bs";
import Tooltip from "@material-ui/core/Tooltip";


export default function Cft() {

//=================== CSS ==================================================

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
      

      const StyledTextareaElement = styled('textarea', {
        shouldForwardProp: (prop) =>
          !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
      })(
        ({ theme }) => `
        width: 800px;
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

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '90%',
        boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
        padding: '5%',
    
        marginLeft:'5%'
      }));

const border = {
    border : "1px solid black"
}
const borderL={
    borderLeft : '1px solid black'
}






  //==============================  BACKK  ===================================
  const filePickerRef = useRef(null);
  const dm={}
  const ide = useParams();
  const [Demande , setDemande]=useState({
    images: [],
  });
  const id = String(ide);
  const[gr ,setGr]=useState([]);

  const[exist ,setexist]=useState('');
  const [Client ,setclient]=useState('');
  const [errors , seterrors]=useState({});
  const [errorsD , seterrorsD] = useState({});
  const [errorsG , seterrorsG] = useState();


  const [user ,setuser]= useState({});
  const [value, setValue] = React.useState(new Date);

  const [envoi , setEnvoi] = useState(false);
  const [confirm , setconfirm] = useState(false);

  const [first , setfirst] = useState(false);
  const [images , setimage] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imageObject, setImageObject] = useState(false);


 useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
        
        const Ad = await getDoc(doc(db, "Users", currentUser.uid));
        setuser(Ad.data());
       
        


        const infos = await getDoc(doc(db, "Demandes", ide.id));
        console.log(infos.exists());
        if(infos.exists()){
          setDemande({
          ... infos.data(),
          agentV: Ad.data().nom+" "+ Ad.data().prenom,
          agentId: Ad.data().userId,
          dateV: value.toLocaleDateString(),
          heurV: value.toLocaleTimeString(),
          images: [],
        });
        setGr(infos.data().garanties);
        const client = await getDoc(doc(db, "Users", infos.data().user));
        setclient(client.data());
        }else{
          setexist('Ce véhicule a été déjà confirmé.')
        }
        

        


        }

        });
    
    
  }, []);

const chege3 = async () =>{
  setEnvoi(true);
 
  seterrorsG();

  if ( Demande.images.length !== 0 && Demande.dateD){

  await setDoc(doc(db ,"Users", Demande.user , "cars", ide.id), Demande)
            .then(async()=>{
                  await deleteDoc(doc(db, "Demandes",ide.id )).then(()=>{})
                  .catch((error) => {
                    console.log(error.message);
                  });
                  await updateDoc(doc(db, "Users", Demande.user), { nbrV: Client.nbrV + 1 });

                  setEnvoi(false);
                  setconfirm(true);

            })
            .catch((error) => {
              console.log(error.message);
            });


  

  }else {
      seterrorsG("ERROR ! Vérifiez bien votre formulaire ")
      if(!Demande.dateD){
        seterrorsD({...errorsD, Date : "Veuillez définir la date SVP!"})
      };
      if (Demande.images.length < 3){
        seterrors({...errors, images : "Veillez importer des images de vehicule SVP(au moins 3 images)!"})
      };
      
      setEnvoi(false);
}


  // from demande to user subcollection
  // delet from demandes
  

  
}

const formHandler = (e) => {
  e.preventDefault();
  console.log(e.target[0].files[0]);
  setImageObject(e.target[0].files[0]);
  uploadFiles(e.target[0].files[0]);
};

const uploadFiles = (file) => {
  

  if (!file) return;
  seterrors({});
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
        setDemande({...Demande,
                images: images,});
        setfirst(true);
      });
      
    }
  );
};


const handleChange = (newValue) => {
  
  seterrorsD({});
  if (Demande.duree == 1){
    var d = newValue;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + 1, month, day-1);
    var Cs= c.toLocaleDateString();
    var ne = newValue.toLocaleDateString();
  setDemande({...Demande, 
    dateF:Cs,
    dateD:ne});
  }else if (Demande.duree == 0.5){
    var d = newValue;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year , month + 6, day - 1);
    var Cs= c.toLocaleDateString();
    var ne = newValue.toLocaleDateString();
  setDemande({...Demande, 
    dateF:Cs,
    dateD:ne});
  }
    
  
  
 

  
 
}

const supprimer = (image) =>{

  const index = images.indexOf(image);
  images.splice(index , 1);
  
  setDemande({...Demande,
    images: images,});

}

const history= useHistory();


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

return (

  <>
  <Sidebar/>

<div style={{ padding: "10%"}}>
    
<Typography variant="h3">Fiche De Visite Technique</Typography>
{exist && <p className="error">{exist}</p>} 
<Grid xs={12} container  style={border}>
<Grid xs={6} sm={3}  style={borderL}> <Typography variant="overline"> Nom de l'assure : </Typography> </Grid>
<Grid xs={6} sm={3}  style={borderL}>  
{/* <TextField id="standard-basic" value={`${Demande.userPr}   ${Demande.userN}`}   variant="standard" /> */}
<Typography className="infos" align="center" variant="overline">{Demande.userPr} {Demande.userN} </Typography>

  </Grid>
<Grid xs={6} sm={2}  style={borderL}> <Typography variant="overline"> Identifiant :  </Typography>
 </Grid>
<Grid xs={6} sm={4}  style={borderL}> 
<Typography style={{fontSize: "9px"}} className="infos" align="center" variant="overline"> {Demande.user} </Typography>
 </Grid>




</Grid>




<Grid xs={12} container  style={border}>
<Grid xs={3} sm={1}   style={borderL}> <Typography variant="overline"> Branche </Typography> </Grid>
<Grid xs={6} sm={2}  style={borderL}> <Typography variant="overline"> Automobile </Typography>  </Grid>
<Grid xs={6} sm={3}  style={borderL}> <Typography variant="overline"> N de Police 
</Typography>
{exist && exist == '' &&( 
<>
<Typography className="infos" align="center" variant="overline"> {ide.id} </Typography>
</> 
)}

</Grid>
<Grid xs={6} sm={3}  style={borderL}>  <Typography variant="overline"> Date D'effet  
</Typography>
<LocalizationProvider dateAdapter={AdapterDateFns}>

        <DesktopDatePicker
          label="Date D'effet"
          inputFormat="MM/dd/yyyy"
          value={Demande.dateD}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
</LocalizationProvider>
{errorsD.Date && <p className="error">{errorsD.Date}</p>} 
</Grid>
<Grid xs={6} sm={3}  style={borderL}>   <Typography variant="overline"> Date D'expiration : 
</Typography>
<Typography className="infos" align="center" variant="overline"> {Demande.dateF} </Typography>
</Grid>

 </Grid>

<Typography variant="subtitle1" style={{textDecoration : 'underline'}}>Caracterstiques du vehicule</Typography>



<Grid container xs={12} style={border}>
<Grid xs={4} style={borderL}>
<Typography variant="overline"> Marque : 
{/* <TextField id="standard-basic" value={Demande.marque}   variant="standard" />  */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.marque} </Typography>


</Grid>

<Grid xs={4} style={borderL}>

<Typography variant="overline"> nom : 
{/* <TextField id="standard-basic"   value={Demande.marque} variant="standard" />  */}</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.TypeV} </Typography>

</Grid>

<Grid xs={4} style={borderL}>
<Typography variant="overline"> type d'assurance : 
{/* <TextField id="standard-basic" value={Demande.type}   variant="standard" />  */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.type} </Typography>

</Grid>



</Grid>
<Grid container xs={12} style={border}>
<Grid xs={4} style={borderL}>
<Typography variant="overline"> N Immat : 
{/* <TextField id="standard-basic" value={Demande.imma}  variant="standard" />  */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.imma} </Typography>


</Grid>

<Grid xs={4} style={borderL}>
<Typography variant="overline"> N serie : 
{/* <TextField id="standard-basic"  value={Demande.numS}  variant="standard" />  */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.numS} </Typography>

    
</Grid>

<Grid xs={4} style={borderL}>
<Typography variant="overline"> energie : 
{/* <TextField id="standard-basic" value={Demande.energie}  variant="standard" />  */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.energie} </Typography>

    
</Grid>

</Grid>


<Grid container xs={12} style={border}>
<Grid xs={4} style={borderL}>
<Typography variant="overline"> Puissance : 
{/* <TextField id="standard-basic" value={Demande.puiss}  variant="standard" /> */}
 </Typography>
 <Typography className="infos" align="center" variant="overline">{Demande.puiss} </Typography>


</Grid>

<Grid xs={4} style={borderL}>

<Typography variant="overline"> Carrosserie : 
{/* <TextField id="standard-basic" value={Demande.caro}  variant="standard" />  */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.caross} </Typography>

</Grid>

<Grid xs={4} style={borderL}>
<Typography variant="overline"> Date de MEC : 
{/* <TextField id="standard-basic"   value={Demande.annes}    variant="standard" /> */}
</Typography>
<Typography className="infos" align="center" variant="overline">{Demande.annes} </Typography>
    
</Grid>



</Grid>





<Grid container xs={12} style={border}>

    <Grid xs={6} style={borderL}>
      <Typography variant="overline"> Valeur a neuf du vehicule 
      <TextField id="outlined-basic"  variant="outlined" value={Demande.valeurN} onChange={(e)=>{setDemande({...Demande, valeurN:e.target.value})}}/>
      </Typography>
  
    </Grid>


    <Grid xs={6} >
      <Typography variant="overline"> Valeur venale du vehicule 
      <TextField id="outlined-basic"  variant="outlined" value={Demande.valeurVe} onChange={(e)=>{setDemande({...Demande, valeurVe:e.target.value})}}/>
      </Typography>
  
    </Grid>
</Grid>

<br></br>
<br></br>


<Typography variant='h5' style={{ float : "left",marginLeft : "2%"}}>Garanties:</Typography>
<Grid xs={12} container>
{gr.map((g) => (
<>
   <Grid xs={12}>
      <Typography variant="overline">{g.type} ==&gt;  </Typography>
      <Typography className="infos" align="center" variant="overline">{g.val} DA</Typography>
      
      {/* <Typography variant="overline">   {g.val}</Typography> */}

  </Grid>
  <br></br>
  <br></br>
  </>
))}
<Typography variant="overline"> Total : 
</Typography>
<Typography className="infos" align="center" variant="overline"> {Demande.valeur} DA </Typography>


</Grid>


<Grid container xs={12} style={border}>

<Grid xs={6}  style={borderL}>

<Typography variant='h6' style={{float : "center"}}>Etat du vehicule:</Typography>
<Select
    className="Select"
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Demande.etat}
    label=" Etat"
    onChange={(e)=>{setDemande({...Demande, etat:e.target.value})}}
  >
    <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
    <MenuItem value={'Bon'}>Bon</MenuItem>
    <MenuItem value={'Moyen'}>Moyen</MenuItem>
    <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
  </Select>
</Grid>
<Grid xs={6}  style={borderL}>
<Typography variant='h6' style={{float : "center"}}>Ajouter une photo : </Typography>

<div className="chaipas">

              <Tooltip title="Photo" placement="Top"   >
                <div 
                // className="Btns_icon"
                  // onClick={() => filePickerRef.current.click()}
                 >
                
                <form onSubmit={formHandler}>
                <BsCardImage fontSize="1.5rem" color="#19A8D9" margin-right= "10px;" > </BsCardImage> 
                <input 
                    type="file"  
                    className="input"   
                    
                  />
                 <button type="submit">Upload</button>
                 <hr />
                 <h2>Uploading done {progress}%</h2>

               </form>
                </div>
              </Tooltip>
</div>
{errors.images && <p className="error">{errors.images}</p>} 

</Grid>

</Grid>


  <Grid container xs={12}>
    <Grid xs={6}>
    <Typography variant="overline"> Couleur 
    <TextField id="outlined-basic"  variant="outlined" value={Demande.couleur} onChange={(e)=>{setDemande({...Demande, couleur:e.target.value})}}/>
    </Typography>

    </Grid>


    <Grid xs={6}>
    <Typography variant="overline"> Kilometrage 
    <TextField id="outlined-basic"  variant="outlined" value={Demande.Kilometrage} onChange={(e)=>{setDemande({...Demande, Kilometrage:e.target.value})}}/> Km </Typography>

    </Grid>
  </Grid>

<br></br>
<br></br>
  
{first ? 
<div className="sendouq">
<div className="sendouq">
<span class="card-heading">images</span>
<span class="card-more">
</span>

 <ul class="card-list">
  {Demande.images.map((image) => (
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
<br></br>
<br></br>


<Typography  variant='h5' style={{float : "center"}}>Autres Informations : </Typography>


<Grid container xs={12} style={border}>



        <Grid xs={6}  style={borderL}>

         <Typography variant="overline"> etat des glaces</Typography>

        </Grid>
        <Grid xs={6} style={borderL}>

        <Select
          className="Select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Demande.etatglaces}
          label=" Etat"
          onChange={(e)=>{setDemande({...Demande, etatglaces:e.target.value})}}
        >
          <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
          <MenuItem value={'Bon'}>Bon</MenuItem>
          <MenuItem value={'Moyen'}>Moyen</MenuItem>
          <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
        </Select>

        </Grid>
        
        {/* <Grid xs={2} style={borderL}>

         <Typography variant="overline"> Tres bien</Typography>

        </Grid>

        <Grid xs={2} style={borderL}>

         <Typography variant="overline"> bien</Typography>

        </Grid>

        <Grid xs={2} style={borderL}>

         <Typography variant="overline"> Moyen</Typography>

        </Grid>
       
        <Grid xs={2} style={borderL} >

         <Typography variant="overline"> Mauvais</Typography>

        </Grid> */}
        

</Grid>


<Grid container xs={12} style={border}>



        <Grid xs={6}  style={borderL}>

         <Typography variant="overline"> Par-Brise</Typography>

        </Grid>
        <Grid xs={6} style={borderL}>

        <Select
          className="Select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Demande.etatBB}
          label=" Etat"
          onChange={(e)=>{setDemande({...Demande, etatBB:e.target.value})}}
        >
          <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
          <MenuItem value={'Bon'}>Bon</MenuItem>
          <MenuItem value={'Moyen'}>Moyen</MenuItem>
          <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
        </Select>

        </Grid>
        
        {/* <Grid xs={2} style={borderL}>

        <FormControlLabel control={<Checkbox/>} />

        </Grid>

        <Grid xs={2} style={borderL}>

        <FormControlLabel control={<Checkbox/>} />

        </Grid>

        <Grid xs={2} style={borderL}>

        <FormControlLabel control={<Checkbox/>} />

        </Grid>
       
        <Grid xs={2} style={borderL} >

        <FormControlLabel control={<Checkbox/>} />

        </Grid> */}
        

</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Lunettes arriere</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatLA}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatLA:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>


</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Lunettes toit avant</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatLTA}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatLTA:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>

</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Pavillon Panoramique</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatPPa}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatPPa:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>


</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Glaces Laterales droites</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatGLD}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatGLD:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>


</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Glaces Laterales gauches</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatGLG}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatGLG:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>


</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Glaces retroviseurs droites</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatRD}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatRD:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>


</Grid>

<Grid container xs={12} style={border}>



<Grid xs={6}  style={borderL}>

 <Typography variant="overline"> Glaces retroviseurs gauches</Typography>

</Grid>

<Grid xs={6} style={borderL}>

<Select
  className="Select"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={Demande.etatRG}
  label=" Etat"
  onChange={(e)=>{setDemande({...Demande, etatRG:e.target.value})}}
>
  <MenuItem value={'Tres Bon'}>Tres Bon</MenuItem>
  <MenuItem value={'Bon'}>Bon</MenuItem>
  <MenuItem value={'Moyen'}>Moyen</MenuItem>
  <MenuItem value={'Mauvais'}>Mauvais</MenuItem>
</Select>

</Grid>

</Grid>

{/* <Grid xs={12}>
<Typography variant="h6" style={{textDecoration : " underline", float : 'left'}}>Autre Information:</Typography>
</Grid>
<Grid container  xs={12} style={{float : "left"}}>
<FormControlLabel control={<Checkbox checked onClick={(e) => console.log(e)}/>} label="Systeme d'alarme d'origine :"/>
<FormControlLabel control={<Checkbox/>} label="Oui"/>
<FormControlLabel control={<Checkbox/>} label="Non"/>


</Grid>

<Grid container  xs={12} >
<FormControlLabel control={<Checkbox/>} label="Auto Radio :"/>
<Typography variant="overline"> Marque <TextField id="standard-basic"    variant="standard" /> </Typography>
<FormControlLabel control={<Checkbox/>} label="Incorporable"/>
<FormControlLabel control={<Checkbox/>} label="Extractible"/>


</Grid>

<Grid container  xs={12} >
<FormControlLabel control={<Checkbox/>} label="Mini Chaine :"/>
<Typography variant="overline"> Marque <TextField id="standard-basic"    variant="standard" /> </Typography>
</Grid>

<Grid   xs={12} >

<Typography variant="overline"> Autres Accessoires <TextField id="standard-basic"  style={{width: "70%"}}  variant="standard" /> </Typography>

</Grid> */}


<Grid container  xs={12} >
<Grid xs={2}>
<Typography variant="overline" style={{float : 'left' , fontWeight : "bold", textDecoration : " underline"}}> Vehicule inacessible</Typography>
</Grid>
<Grid xs={2}>

<FormControlLabel control={<Checkbox/>} label="Oui"/>
</Grid>

<Grid xs={2}>

<FormControlLabel control={<Checkbox/>} label="Non"/>

</Grid>
<Grid xs={6}>

<Typography variant="overline"> date d'incessibilite 
<TextField id="standard-basic" type={"date"} value={Demande.inaccDate}  onChange={(e)=>{setDemande({...Demande, inaccDate:e.target.value})}}  style={{width: "70%"}}  variant="standard" /> </Typography>
</Grid>
</Grid>

<Grid container  xs={12} >
<Grid xs={2}>
<Typography variant="overline" style={{float : 'left' , fontWeight : "bold", textDecoration : " underline"}}> Vehicule Gage</Typography>
</Grid>
<Grid xs={2}>

<FormControlLabel control={<Checkbox/>} label="Oui"/>
</Grid>

<Grid xs={2}>

<FormControlLabel control={<Checkbox/>} label="Non"/>

</Grid>
<Grid xs={6}>

</Grid>
</Grid>


<Grid xs={12}>
<Typography variant="overline" style={{fontWeight : " bold"}}>Par quelle organisme ?  <TextField id="standard-basic" value={Demande.organisme}  onChange={(e)=>{setDemande({...Demande, organisme:e.target.value})}}  style={{width: "70%"}}  variant="standard" /> </Typography>

</Grid>



<Grid xs={12}>
<Typography variant="overline" style={{fontWeight : " bold"}}>Duree du gage ?  <TextField id="standard-basic" value={Demande.dureeGage}  onChange={(e)=>{setDemande({...Demande, dureeGage:e.target.value})}} style={{width: "70%"}}  variant="standard" /> </Typography>

</Grid>



<Grid container xs={12}>
<Grid xs={4}>

<Typography variant="overline"> Visite effectue par 
<Typography className="infos" align="center" variant="overline"> {user.nom} {user.prenom} </Typography></Typography> 

</Grid>



<Grid xs={4}>
<Typography variant="overline"> Date :
<Typography className="infos" align="center" variant="overline"> {value.toLocaleDateString()} </Typography></Typography> 

</Grid>
<Grid xs={4}>
<Typography variant="overline"> heure : 
<Typography className="infos" align="center" variant="overline"> {value.toLocaleTimeString()} </Typography></Typography> 

    
</Grid>


</Grid>

<Button variant="contained" sx={{marginTop : '3%'}} onClick={chege3} >Confirmer le Vehicule
    { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
    </Button>

    {errorsG && <p className="error">{errorsG}</p>} 


    <br></br>
    <br></br>

{confirm ? 
        <p className="succès">Votre vehicule a été ajouté avec succès</p> 
        : 
        <></>} 
</div>
</>


);

}






// import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';


// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';

// import TextField from '@mui/material/TextField';

// import Grid from '@mui/material/Grid';
// import InputUnstyled from '@mui/base/InputUnstyled';
// import { FormControlLabel } from "@mui/material";
// import FormGroup from '@mui/material/FormGroup';
// import Checkbox from '@mui/material/Checkbox';

// export default function Cft() {
  


//     const CustomInput = React.forwardRef(function CustomInput(props, ref) {
//         return (
//           <InputUnstyled
//             components={{ Input: StyledInputElement, Textarea: StyledTextareaElement }}
//             {...props}
//             ref={ref}
//           />
//         );
//       });
    
//       const blue = {
//         100: '#DAECFF',
//         200: '#80BFFF',
//         400: '#3399FF',
//         600: '#0072E5',
//       };
      
//       const grey = {
//         50: '#F3F6F9',
//         100: '#E7EBF0',
//         200: '#E0E3E7',
//         300: '#CDD2D7',
//         400: '#B2BAC2',
//         500: '#A0AAB4',
//         600: '#6F7E8C',
//         700: '#3E5060',
//         800: '#2D3843',
//         900: '#1A2027',
//       };
      

//       const StyledTextareaElement = styled('textarea', {
//         shouldForwardProp: (prop) =>
//           !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
//       })(
//         ({ theme }) => `
//         width: 800px;
//         font-size: 0.875rem;
//         font-family: IBM Plex Sans, sans-serif;
//         font-weight: 400;
//         line-height: 1.5;
//         color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//         background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
//         border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
//         border-radius: 8px;
//         padding: 12px 12px;
      
//         &:hover {
//           background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
//           border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//         }
      
//         &:focus {
//           outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
//         }
//       `,
//       );


//       const StyledInputElement = styled('input')(
//         ({ theme }) => `
//         width: 600px;
//         font-size: 0.875rem;
//         font-family: IBM Plex Sans, sans-serif;
//         font-weight: 400;
//         line-height: 1.5;
//         color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//         background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
//         border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
//         border-radius: 8px;
//         padding: 12px 12px;
      
//         &:hover {
//           background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
//           border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//         }
      
//         &:focus {
//           outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
//         }
//       `,
//       );

//     const Item = styled(Paper)(({ theme }) => ({
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         width: '90%',
//         boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
//         padding: '5%',
    
//         marginLeft:'5%'
//       }));

// const border = {
//     border : "1px solid black"
// }
// const borderL={
//     borderLeft : '1px solid black'
// }
// return (
// <Item>
    
// <Typography variant="h3">Fiche De Visite Technique</Typography>
// <Grid xs={12} container  style={border}>
// <Grid xs={3}  style={borderL}> <Typography variant="overline"> Nom de l'assure </Typography> </Grid>
// <Grid xs={3} style={borderL}>  <TextField id="standard-basic"    variant="standard" />
//   </Grid>
// <Grid xs={3} style={borderL}> <Typography variant="overline"> date de naissance </Typography> </Grid>
// <Grid xs={3} style={borderL}> <TextField id="standard-basic"    variant="standard" />
//  </Grid>




// </Grid>




// <Grid xs={12} container  style={border}>
// <Grid xs={1}  style={borderL}> <Typography variant="overline"> Branche </Typography> </Grid>
// <Grid xs={2} style={borderL}> <Typography variant="overline"> Automobile </Typography>  </Grid>
// <Grid xs={3} style={borderL}> <Typography variant="overline"> N de Police <TextField id="standard-basic"    variant="standard" /> </Typography> </Grid>
// <Grid xs={3} style={borderL}>  <Typography variant="overline"> Date D'effet  <TextField id="standard-basic"    variant="standard" /> </Typography></Grid>
// <Grid xs={3} style={borderL}>   <Typography variant="overline"> Date D'expiration <TextField id="standard-basic"    variant="standard" /> </Typography></Grid>

//  </Grid>

// <Typography variant="subtitle1" style={{textDecoration : 'underline'}}>Caracterstiques du Vehicuke</Typography>



// <Grid container xs={12} style={border}>
// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> Marque<TextField id="standard-basic"    variant="standard" /> </Typography>

// </Grid>

// <Grid xs={4} style={borderL}>

// <Typography variant="overline"> Genre <TextField id="standard-basic"    variant="standard" /> </Typography>
// </Grid>

// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> Modele <TextField id="standard-basic"    variant="standard" /> </Typography>
    
// </Grid>



// </Grid>
// <Grid container xs={12} style={border}>
// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> N Immat<TextField id="standard-basic"    variant="standard" /> </Typography>

// </Grid>

// <Grid xs={4} style={borderL}>

// <Typography variant="overline"> N chassis <TextField id="standard-basic"    variant="standard" /> </Typography>
// </Grid>

// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> N serie <TextField id="standard-basic"    variant="standard" /> </Typography>
    
// </Grid>



// </Grid>


// <Grid container xs={12} style={border}>
// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> Turbo<TextField id="standard-basic"    variant="standard" /> </Typography>

// </Grid>

// <Grid xs={4} style={borderL}>

// <Typography variant="overline"> Carrosserie <TextField id="standard-basic"    variant="standard" /> </Typography>
// </Grid>

// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> energie <TextField id="standard-basic"    variant="standard" /> </Typography>
    
// </Grid>



// </Grid>



// <Grid container xs={12} style={border}>
// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> Puissance<TextField id="standard-basic"    variant="standard" /> </Typography>

// </Grid>

// <Grid xs={4} style={borderL}>

// <Typography variant="overline"> Ch utile <TextField id="standard-basic"    variant="standard" /> </Typography>
// </Grid>

// <Grid xs={4} style={borderL}>
// <Typography variant="overline"> Date de MEC <TextField id="standard-basic"    variant="standard" /> </Typography>
    
// </Grid>



// </Grid>

// <Grid container xs={12} style={border}>

//     <Grid xs={6} style={borderL}>
//       <Typography variant="overline"> Valeur a neuf du vehicule <TextField id="standard-basic"    variant="standard" /> </Typography>
  
//     </Grid>


//     <Grid xs={6} >
//       <Typography variant="overline"> Valeur venale du vehicule <TextField id="standard-basic"    variant="standard" /> </Typography>
  
//     </Grid>
// </Grid>


// <Typography variant='h5' style={{textDecoration : "underline" ,float : " left"}}>Garanties:</Typography>
// <Grid xs={12} container>
//    <Grid xs={2}>
//   <FormControlLabel control={<Checkbox/>} label="TR"/>
//   </Grid>
//   <Grid xs={2}>
//   <FormControlLabel control={<Checkbox/>} label="VIV"/>
//   </Grid>
//   <Grid xs={2}>
//   <FormControlLabel control={<Checkbox/>} label="DC"/>
//   </Grid>
//   <Grid xs={2}>
//   <FormControlLabel control={<Checkbox/>} label="BDG"/>
//   </Grid>
//   <Grid xs={2}>
//   <FormControlLabel control={<Checkbox/>} label="Responsablite"/>
//   </Grid>

// </Grid>




// <Typography variant='subtitle1' style={{textDecoration : "underline" ,float : " left"}}>Etat du vehicule:</Typography>
// <Grid xs={12} container>
//    <Grid xs={3}>
//   <FormControlLabel control={<Checkbox/>} label="Tres bon"/>
//   </Grid>
//   <Grid xs={3}>
//   <FormControlLabel control={<Checkbox/>} label="bon"/>
//   </Grid>
//   <Grid xs={3}>
//   <FormControlLabel control={<Checkbox/>} label="Moyen"/>
//   </Grid>
//   <Grid xs={3}>
//   <FormControlLabel control={<Checkbox/>} label="Mauvais"/>
//   </Grid>


// </Grid>
//   <Grid container xs={12}>
//     <Grid xs={6}>
//     <Typography variant="overline"> Couleur <TextField id="standard-basic"    variant="standard" /> </Typography>

//     </Grid>


//     <Grid xs={6}>
//     <Typography variant="overline"> Kilometrage <TextField id="standard-basic"    variant="standard" /> Km </Typography>

//     </Grid>
//   </Grid>

//   <Typography variant='subtitle1' style={{textDecoration : "underline" ,float : " left"}}>Dommages constates:</Typography>
//     <FormControlLabel control={<Checkbox/>} label="Ne Presente Aucun Dommage"/>
//      <Grid container xs={12}>
//      <FormControlLabel control={<Checkbox/>} label="Presente  Less Dommage suivants"/>

//      </Grid>
//      <CustomInput aria-label="Demo input" multiline placeholder="Type something…"  style={{float : 'left' , marginLeft: '1%' ,}}/>

//      <Grid container xs={12}>
//      <Typography variant="subtitle1" style={{textDecoration : "underline"}}>Reparations Recentes</Typography>

//      </Grid>
//      <CustomInput aria-label="Demo input" multiline placeholder="Type something…"  style={{float : 'left' , marginLeft: '1%' ,}}/>






//      <Grid container xs={12} style={border}>



//         <Grid xs={4}  style={borderL}>

//          <Typography variant="overline"> etat des glaces</Typography>

//         </Grid>
        
//         <Grid xs={2} style={borderL}>

//          <Typography variant="overline"> Tres bien</Typography>

//         </Grid>

//         <Grid xs={2} style={borderL}>

//          <Typography variant="overline"> bien</Typography>

//         </Grid>

//         <Grid xs={2} style={borderL}>

//          <Typography variant="overline"> Moyen</Typography>

//         </Grid>
       
//         <Grid xs={2} style={borderL} >

//          <Typography variant="overline"> Mauvais</Typography>

//         </Grid>
        

//         </Grid>


//         <Grid container xs={12} style={border}>



//         <Grid xs={4}  style={borderL}>

//          <Typography variant="overline"> Par-Prise</Typography>

//         </Grid>
        
//         <Grid xs={2} style={borderL}>

//         <FormControlLabel control={<Checkbox/>} />

//         </Grid>

//         <Grid xs={2} style={borderL}>

//         <FormControlLabel control={<Checkbox/>} />

//         </Grid>

//         <Grid xs={2} style={borderL}>

//         <FormControlLabel control={<Checkbox/>} />

//         </Grid>
       
//         <Grid xs={2} style={borderL} >

//         <FormControlLabel control={<Checkbox/>} />

//         </Grid>
        

//         </Grid>

//         <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Lunettes arriere</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>


// </Grid>
// <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Lunettes toit avant</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>


// </Grid>

// <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Pavillon Panoramique</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>


// </Grid>

// <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Glaces Laterales droites</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>


// </Grid>

// <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Glaces Laterales gauches</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>


// </Grid>

// <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Glaces retroviseurs droites</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>


// </Grid>

// <Grid container xs={12} style={border}>



// <Grid xs={4}  style={borderL}>

//  <Typography variant="overline"> Glaces retroviseurs gauches</Typography>

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL}>

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// <Grid xs={2} style={borderL} >

// <FormControlLabel control={<Checkbox/>} />

// </Grid>

// </Grid>

// <Grid xs={12}>
// <Typography variant="h6" style={{textDecoration : " underline", float : 'left'}}>Autre Information:</Typography>
// </Grid>
// <Grid container  xs={12} style={{float : "left"}}>
// <FormControlLabel control={<Checkbox/>} label="Systeme d'alarme d'origine :"/>
// <FormControlLabel control={<Checkbox/>} label="Oui"/>
// <FormControlLabel control={<Checkbox/>} label="Non"/>


// </Grid>

// <Grid container  xs={12} >
// <FormControlLabel control={<Checkbox/>} label="Auto Radio :"/>
// <Typography variant="overline"> Marque <TextField id="standard-basic"    variant="standard" /> </Typography>
// <FormControlLabel control={<Checkbox/>} label="Incorporable"/>
// <FormControlLabel control={<Checkbox/>} label="Extractible"/>


// </Grid>

// <Grid container  xs={12} >
// <FormControlLabel control={<Checkbox/>} label="Mini Chaine :"/>
// <Typography variant="overline"> Marque <TextField id="standard-basic"    variant="standard" /> </Typography>
// </Grid>

// <Grid   xs={12} >

// <Typography variant="overline"> Autres Accessoires <TextField id="standard-basic"  style={{width: "70%"}}  variant="standard" /> </Typography>

// </Grid>


// <Grid container  xs={12} >
// <Grid xs={2}>
// <Typography variant="overline" style={{float : 'left' , fontWeight : "bold", textDecoration : " underline"}}> Vehicule inacessible</Typography>
// </Grid>
// <Grid xs={2}>

// <FormControlLabel control={<Checkbox/>} label="Oui"/>
// </Grid>

// <Grid xs={2}>

// <FormControlLabel control={<Checkbox/>} label="Non"/>

// </Grid>
// <Grid xs={6}>

// <Typography variant="overline"> date d'incessibilite <TextField id="standard-basic"  style={{width: "70%"}}  variant="standard" /> </Typography>
// </Grid>
// </Grid>

// <Grid container  xs={12} >
// <Grid xs={2}>
// <Typography variant="overline" style={{float : 'left' , fontWeight : "bold", textDecoration : " underline"}}> Vehicule Gage</Typography>
// </Grid>
// <Grid xs={2}>

// <FormControlLabel control={<Checkbox/>} label="Oui"/>
// </Grid>

// <Grid xs={2}>

// <FormControlLabel control={<Checkbox/>} label="Non"/>

// </Grid>
// <Grid xs={6}>

// </Grid>
// </Grid>


// <Grid xs={12}>
// <Typography variant="overline" style={{fontWeight : " bold"}}>Par quelle organisme ?  <TextField id="standard-basic"  style={{width: "70%"}}  variant="standard" /> </Typography>

// </Grid>



// <Grid xs={12}>
// <Typography variant="overline" style={{fontWeight : " bold"}}>Duree du gage ?  <TextField id="standard-basic"  style={{width: "70%"}}  variant="standard" /> </Typography>

// </Grid>



// <Grid container xs={12}>
// <Grid xs={4}>

// <Typography variant="overline"> Visite effectue par <TextField id="standard-basic"    variant="standard" /> </Typography> 
// </Grid>

// <Grid xs={4}>

// <Typography variant="overline"> Fonction/Grade <TextField id="standard-basic"    variant="standard" /> </Typography> 
// </Grid>

// <Grid xs={4}>
// <Typography variant="overline"> Date et heure <TextField id="standard-basic"    variant="standard" /> </Typography> 
    
// </Grid>


// </Grid>
// </Item>



// );

// }