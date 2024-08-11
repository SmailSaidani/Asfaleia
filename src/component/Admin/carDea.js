import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
// import Navbar from './navbar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Sidebar from '../sidebar';

import Typography from '@mui/material/Typography';



import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { db, auth  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";


import "../../style.css";

export default function CarDetails() {


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

  const [Car, setCar] = useState({
    images:[],
  });
  //================================ back ====================================
  const history= useHistory();
  const idCar = useParams();

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
        
        console.log(idCar.carid);
        const infos = await getDoc(doc(db, "Users", idCar.idC , "cars" , idCar.carid));
        setCar(infos.data());
        console.log(infos.data().images);
        

        }

        });
    
    
  }, []);


  const ItemL = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#C3ECFD' : '#C3ECFD',
    ...theme.typography.body2,
  
  }));
  
    // const content = (
      
    //   );
    
return (
    <div>
<Sidebar/>

<Typography variant="h6" display="block" gutterBottom> Car details : 
</Typography> 


<div style={{ paddingLeft : "10%" , paddingRight : "10%" , paddingBottom : "7%" }} >
<span class="card-heading">images</span>
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

{/* <div class="card u-clearfix">
<span class="card-heading">images</span>
<span class="card-more">
</span>

 <ul class="card-list">
  {Car.images.map((image) => (
     <li>
      <div className="Li" >
      <img className='imgV' onClick={()=>{window.open(`${image}`, '_blank')}} src={image} alt="" /></div>
    </li>
     ))}
 </ul>
</div> */}

</div>
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
<Typography variant="outlined-basic" display="block" gutterBottom> ANNEE DE PREMIER MIS EN CIRCULATION : 
<br></br>
{Car.annes} 
</Typography> 

        
        
</Grid>
<br></br>
{/* <button className='btnsCD' variant="contained" sx={{marginTop : '10%' ,marginLeft : '35%'}} onClick={()=>{ }}>Envoyer la Demande</button>  */}


</Grid>
</div>





</div>

);

}





