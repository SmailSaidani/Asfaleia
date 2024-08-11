import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
  


import { auth, db ,setDoc ,addDoc} from "../../bdd/firebase";
import { updateDoc, doc ,getDoc ,Timestamp} from "firebase/firestore";
import {onAuthStateChanged, } from "firebase/auth";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  border: '1px solid black'
}));

const borber ={
  border : "1px solid black",
  marginTop : "5%"
}
const borber2 ={
  border : "1px solid black",
  float: "center",
}
const b ={
  border : "1px solid black",
}
const th={
  border : "1px solid black",
 
  backgroundColor:" #ebebeb"
}
const lefting ={
  float : "left",
  marginLeft: "2%"
}
const br={
  borderRight : "1px solid black"
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const brd = {
  border: '1px solid black', 
}

 

export default function ContratVe (){

  const idCar = useParams();

  const [see, setsee] = useState(false);
  const [Info, setInfo] = useState({});
  const [Car, setCar] = useState({
    garanties: []
  });

  const history = useHistory();
  useEffect(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
        
        const infos = await getDoc(doc(db, "Users", idCar.idC));
        setInfo(infos.data());
        console.log(infos.data());

         const Cars = await getDoc(doc(db, "Users", idCar.idC , "cars" , idCar.carid));
        setCar(Cars.data());
        console.log(Cars.data());

        }else if (!auth.currentUser){
          history.push('/')
        }


        });
  }, []);

  //============================= Controles =========================
  
           useEffect(async () => {
            onAuthStateChanged(auth, async (currentUser) => {
                if (auth.currentUser){
                    const User = await getDoc(doc(db, "Users" , currentUser.uid));
                    if(User.data().type == 'expert'){
                      history.push('/Expert')
                      window.location.reload('/Expert');
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

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '80%',
    boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',

    marginLeft:'10%'
  }));

    return(


      <div style={{padding: "10%" ,backgroundColor : "white ", width : "95%", marginLeft : " 2.5%", border : "1px solid black"}}>

            <Typography variant="h4" gutterBottom component="div">
                CONTRAT AUTOMOBILE
              </Typography>
            <Grid container xs={12}>


            <Grid xs={12} container style={b}>

                    <Grid container sm={6} xs={12} style={br}>

                      <Grid xs={12} style={br} >
                      <h1>Identifiant utilisateur</h1>
                      </Grid>

                      <Grid xs={12} style={br} >
                      <Typography style={{fontSize: "9px"}} className="infosContr" align="center" variant="overline"> {Car.user} </Typography>
                      </Grid>

                    </Grid>

                    <Grid container sm={2} xs={12} style={br}>
                      <Grid xs={12} style={br} >
                      <h1>Agence</h1>
                      </Grid>

                      <Grid xs={12} style={br}>
                      <Typography className="infosContr" align="center" variant="overline"> {Car.userAgen} </Typography>
                      </Grid>

                    </Grid>

                    <Grid container sm={4} xs={12} style={br}>
                      <Grid xs={12} style={br} >
                      <h1>Identifiant Vehicule</h1>
                      </Grid>

                      <Grid xs={12} style={br}>
                      <Typography style={{fontSize: "9px"}} className="infosContr" align="center" variant="overline"> {idCar.idC} </Typography>
                      </Grid>

                    </Grid>
            </Grid>

            <Grid xs={12} container style={b}>
              

              

              


              </Grid>



            <Grid sm={12} xs={12}  container>

            <Grid sm={6} xs={12} container style={borber} >
             <Grid xs={12}>
            <Typography variant="overline" style={{backgroundColor : "#f5eb64" , float: "center"}}>Police</Typography>
            </Grid>
            {/* <Grid xs={12}>
             <h1 style={lefting}>Direction Reginale :
            <TextField id="outlined-basic"  variant="outlined" /> 
             </h1>
             </Grid> */}
             <Grid xs={12}>

             <h1 style={lefting}>Agence : 
             <Typography className="infosContr" align="center" variant="overline"> {Car.userAgen} </Typography>
             </h1>
             </Grid>
             {/* <Grid xs={12}>

             <h1 style={lefting}>Identifiant Vehicule: 
             <Typography className="infosContr" align="center" variant="overline"> {idCar.idC} </Typography>
              </h1>
             </Grid> */}
             <Grid xs={12}>

             <h1 style={lefting}>Date D'effet : 
             <Typography className="infosContr" align="center" variant="overline"> {Car.dateD} </Typography>
             </h1>
             
             </Grid>

             <Grid xs={12}>

             
             <h1 style={lefting}>Date d'expiration : 
             <Typography className="infosContr" align="center" variant="overline"> {Car.dateF} </Typography>
              </h1>
             </Grid>

             <Grid xs={12}>

             <h1 style={lefting}>Heure et Date de souscription : </h1>
            </Grid>
            <Grid xs={12}> 

             <h1 style={lefting}>
             <Typography  align="center" variant="overline" style={{color : "gray" , float: "center"}}> {Car.heurV} -- {Car.dateV} </Typography>
              </h1>
            </Grid>
            </Grid>




            <Grid sm={6} xs={12} container style={borber} >
             <Grid xs={12}>
            <Typography variant="overline" style={{backgroundColor : "#f5eb64" , float: "center"}}>Assure</Typography>
            </Grid>
            <Grid xs={12}>
             <h1 style={lefting}>Nom et Prenom : 
             <Typography className="infosContr" align="center" variant="overline"> {Car.userN} {Car.userPr}</Typography>
             </h1>
             </Grid>
          

             <Grid xs={12}>

             
             <h1 style={lefting}>Adresse : 
             <Typography className="infosContr" align="center" variant="overline"> {Car.userAdr} </Typography>
             </h1>
             </Grid>

             <Grid xs={12}>

             <h1 style={lefting}>N De Telephone : 
             <Typography className="infosContr" align="center" variant="overline"> {Car.userPhone} </Typography>
             </h1>
            </Grid>
            </Grid>

             </Grid>


            <Grid container xs={12}>
            <Grid sm={4} xs={12} style={borber2} container>
            <Grid xs={12}>
            <Typography variant="overline" style={{backgroundColor : "#f5eb64", float : "center" , marginLeft : "2%"}}>Vehicule Assure</Typography>
            </Grid>

            <Grid xs={12}><h1 style={lefting}>Marque: <Typography align="center" variant="overline" style={{ color: "grey"  }} > {Car.marque} </Typography></h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Nom: <Typography align="center" variant="overline" style={{ color: "grey" }}  >{Car.nom}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Energie: <Typography align="center" variant="overline" style={{ color: "grey" }}  >{Car.energie} </Typography></h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Puissance: <Typography align="center" variant="overline" style={{ color: "grey" }}  >{Car.puiss}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Type: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.type}</Typography></h1></Grid>
            



                </Grid>

            <Grid sm={4} xs={12} style={borber2} container>
            <Grid xs={8}>
            <Typography variant="overline" style={{backgroundColor : "#f5eb64", float : "center" , marginLeft : "2%"}}>Vehicule Assure</Typography>
            </Grid>

            <Grid xs={12}><h1 style={lefting}>Etat du vehicule: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.etat}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>N imm: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.imma}</Typography></h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Date MEC: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.annes}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Nb de places: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.place}</Typography> </h1></Grid>


                </Grid>

            <Grid sm={4} xs={12} style={borber2} container>
            <Grid xs={8}>
            <Typography variant="overline" style={{backgroundColor : "#f5eb64", float : "center" , marginLeft : "2%"}}>Remorque</Typography>
            </Grid>

            <Grid xs={12}><h1 style={lefting}>Carrosserie: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.caross}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>N serie: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.numS}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>charge utile: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.charge}</Typography> </h1></Grid>
            <Grid xs={12}><h1 style={lefting}>Poids: <Typography align="center" variant="overline" style={{ color: "grey" }}  > {Car.poids}</Typography> </h1></Grid>

                {/* <h1 style={lefting}>N chassis: <TextField id="outlined-basic"  variant="outlined" /> </h1>
                <h1 style={lefting}>N imm: <TextField id="outlined-basic"  variant="outlined" /> </h1>
                <h1 style={lefting}>Date MEC: <TextField id="outlined-basic"  variant="outlined" /> </h1>
                <h1 style={lefting}>PTC/CU: <TextField id="outlined-basic"  variant="outlined" /> </h1>
                <h1 style={lefting}>Type: <TextField id="outlined-basic"  variant="outlined" /> </h1> */}

            </Grid>


            </Grid>


            <Grid xs={12} style={{backgroundColor : "#f5eb64"}}>
            <Typography variant="overline" style={{backgroundColor : "#f5eb64", float : "center" , marginLeft : "2%"}}>Garanties et limites de couvertures</Typography>
            </Grid>



            <Grid xs={12} container>

                <Grid xs={12} container style={b}>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline">Garanties </Typography>


                    </Grid>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline" >Capital assure </Typography>

                    </Grid>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline" >franchise </Typography>

                    </Grid>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline" >Prime Nette </Typography>

                    </Grid>

                </Grid>
                
                {/* <Grid xs={6} container style={b}>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline">Garanties </Typography>


                    </Grid>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline" >Capital assure </Typography>

                    </Grid>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline" >franchise </Typography>

                    </Grid>
                    <Grid xs={3} style={th}>
                    <Typography variant="overline" >Prime Nette </Typography>

                    </Grid>

                </Grid> */}
                {Car.garanties.map((g) => (
                  <>
                  <Grid xs={12} container style={b}>
                    <Grid xs={3} style={b}>
                    <Typography variant="overline" >{g.type} </Typography>


                    </Grid>
                    <Grid xs={3} style={b}>
                    <Typography variant="overline" >00.00 </Typography>

                    </Grid>
                    <Grid xs={3} style={b}>
                    <TextField id="outlined-basic"  variant="outlined" />

                    </Grid>
                    <Grid xs={3} style={b}>
                    <Typography variant="overline" >{g.val} Da</Typography>

                    </Grid>

                </Grid>
                  </>
                ))}
                

               


                <Grid xs={6} container style={b}>
                
                <Typography style={{ float: "center",fontWeight: "bolder" , color: "black"}} variant="overline" >Total payee : </Typography>

                </Grid>

                <Grid xs={6} container style={b}>
                   
                <Typography style={{float: "center" , fontWeight: "bolder" , color: "green"}} variant="overline" >{Car.valeur} DA </Typography>

                </Grid>



            </Grid>

       
        

          {see ? 
          <>
          </>
          :
          <div style={{padding: "2%"}}>
           <Button   onClick={(e)=>{setsee(true)}} sx={{color:"green" , padding: "4%" ,border : "1px solid green" , height: "35px", width:"100%" , marginLeft: "30%" }} >
           images
          <ImageIcon sx={{marginLeft: "4px"}} fontSize='medium' color='success' />
          </Button>
          </div>}


        
        
        
        


        {see && see == true && (
        <div style={{paddingBottom: "2%"}}>
        <div className="tabR">
        <Button   onClick={(e)=>{setsee(false)}} sx={{ color:"orange" ,padding: "4%" ,border : "1px solid green" , height: "35px" }} >
            cachee les images
          <ImageIcon sx={{marginLeft: "4px"}} fontSize='medium' color='success' />
          </Button>
        <ImageList  sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
          {Car.images.map((item) => (
            <ImageListItem className="Li" key={item}>
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
        <Button   onClick={(e)=>{setsee(false)}} sx={{color:"orange" ,padding: "4%" ,border : "1px solid green" , height: "35px" }} >
            cachee les images
          <ImageIcon sx={{marginLeft: "4px"}} fontSize='medium' color='success' />
          </Button>
        <ImageList sx={{ width: "100%", height: "100%" }} cols={1} rowHeight={164}>
          {Car.images.map((item) => (
            <ImageListItem className="Li" key={item}>
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
        </div> )}
    
  

    <Grid xs={12} container >
        <Grid xs={6}>
        <Typography variant="overline" style={{backgroundColor : "#f5eb64", float : "left" , marginLeft : "2%"}}>Reduction / Majorations</Typography>

        </Grid>
        <Grid xs={6}>
        <Typography variant="overline" style={{backgroundColor : "#f5eb64", float : "left" , marginLeft : "2%"}}>Decomopte de la prima a Payer</Typography>

        </Grid>


        <Grid xs={6} container >
        <Grid xs={12}>
             <h1 style={lefting}>Bonus/Malus : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>
             <Grid xs={12}>

             <h1 style={lefting}>Maj Age : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>
             <Grid xs={12}>

             <h1 style={lefting}>Maj Permis : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>
             <Grid xs={12}>

             <h1 style={lefting}>Maj Mat Inf : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             
             </Grid>

             <Grid xs={12}>

             
             <h1 style={lefting}>Maj Turbo : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>

            
            
            </Grid> 



            <Grid xs={6} container >
            <Grid xs={12}>
             <h1 style={lefting}>Prime nette : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>
             <Grid xs={12}>

             <h1 style={lefting}>Accessoires : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>
             <Grid xs={12}>

             <h1 style={lefting}>TVA : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>
             <Grid xs={12}>

             <h1 style={lefting}>FGA : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             
             </Grid>

             <Grid xs={12}>

             
             <h1 style={lefting}>DTD : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>

              <Grid xs={12}>

             
             <h1 style={lefting}>DTG : <TextField id="outlined-basic"  variant="outlined" /> </h1>
             </Grid>

             <Grid xs={12}>
             <Typography variant="h6" style={{fontWeight : "bold", textDecoration : "underline", float : "left"}}>Prime totale </Typography>
             <TextField id="outlined-basic"  variant="outlined"      
            
             style={{float :"right", border : "1px solid black"}}/>
             </Grid>
            
            </Grid> 
    </Grid>
   

           </Grid>
           


        </div>





//         <React.Fragment>
//         <CssBaseline />
//         <Item>
//         <Container maxWidth="lr">
//         <Typography variant="h4" gutterBottom component="div">
//         CONTRAT AUTOMOBILE
//       </Typography>

//         <Grid  xs={12} style={brd} >
//           Identification du contrat 
//         </Grid>
//         <Grid container  style={brd}>

//         <Grid  xs={8} style={brd}>
//           <Typography variant="subtitle1" gutterBottom component="div">
//               {/* <Typography variant="overline" display="block" gutterBottom> Nom : </Typography> */}
//               <TextField id="standard-basic"  variant="standard" value="Nom : " />
//                <TextField id="standard-basic"  variant="standard" value={Info.fullname} />

//       </Typography>
//       <Typography variant="subtitle1" gutterBottom component="div">
//             <TextField id="standard-basic"  variant="standard" value="Agence : " />
//             <TextField id="standard-basic" variant="standard" value={Info.agence} />

//       </Typography>

//       <Typography variant="subtitle1" gutterBottom component="div">
//               <TextField id="standard-basic"  variant="standard" value="DATE D'EFFET : " />
//               <TextField id="standard-basic" variant="standard" value={Car.dateD} />
//               <TextField id="standard-basic"  variant="standard" value="DATE FIN : " />
//               <TextField id="standard-basic" variant="standard" value={Car.dateF} />

//       </Typography>
      
//         </Grid>
//         <Grid  xs={4} style={brd} >
//                      <TextField id="standard-basic"  variant="standard" value="PERMIS : " />
//                      <TextField id="standard-basic"  variant="standard"  value={Info.Npermet}/>

//                      <TextField id="standard-basic" label="DELIVRE LE " variant="standard" />
//                      <TextField id="standard-basic" label="LIEU" variant="standard" />
//         </Grid>
//         </Grid>


//         <Typography variant="h4" gutterBottom component="div" sx={{matginTop:'40%'}}>
// IDENTIFICATION DU RISQUE
// </Typography>
// <Grid container style={brd} >
// <Grid  xs={6} >

// <Typography variant="overline" display="block" gutterBottom>
//         Marque Vehicule
//       </Typography>
               
//         </Grid>
// <Grid  xs={6}>

// <Typography variant="overline" display="block" gutterBottom>
//         {Car.marque}
//       </Typography>
// </Grid>
// </Grid>
// <Grid container style={brd} >
// <Grid  xs={6}>
// <Typography variant="overline" display="block" gutterBottom>
//         Matricule Vehicule
//       </Typography>
               
//         </Grid>
// <Grid  xs={6} style={brd}>
// <Typography variant="overline" display="block" gutterBottom>
// {Car.imma}
//  </Typography>
// </Grid>
// </Grid>

// <Grid container  style={brd}>
// <Grid  xs={6}>
// <Typography variant="overline" display="block" gutterBottom>
//         Nom de Vehicule
//       </Typography>
               
//         </Grid>
// <Grid  xs={6} style={brd}>
// <Typography variant="overline" display="block" gutterBottom>
// {Car.nom}
// </Typography>
// </Grid>
// </Grid>

// <Grid container >
// <Grid  xs={6} style={brd}>
// <Typography variant="overline" display="block" gutterBottom>
//         Type Vehicule
//  </Typography>
               
//         </Grid>
// <Grid  xs={6} style={brd}>
// <Typography variant="overline" display="block" gutterBottom>
// {Car.type}
//  </Typography>

               
//         </Grid>
// </Grid>

// <Grid container  style={brd}>
// <Grid  xs={6}>
// <Typography variant="overline" display="block" gutterBottom>
//         N De Serie Vehicule
//       </Typography>
               
//         </Grid>
// <Grid  xs={6}>
// <Typography variant="overline" display="block" gutterBottom>
// {Car.numS}
// </Typography>

               
//         </Grid>
// </Grid>

// <Grid container style={brd} >
// <Grid  xs={6}>
// <Typography variant="overline" display="block" gutterBottom>
//         Annee Vehicule
//       </Typography>
               
//         </Grid>
// <Grid  xs={6}>
// <TextField id="standard-basic" label="....." variant="standard" />
// </Grid>
// </Grid>


// <Grid container style={brd} >
// <Grid  xs={6}>
// <Typography variant="overline" display="block" gutterBottom>
//         Carosserie
//       </Typography>
               
//         </Grid>
// <Grid  xs={6}>
//                      <TextField id="standard-basic" label="....." variant="standard" />

               
//         </Grid>



// </Grid>

// <Typography variant="h4" gutterBottom component="div" sx={{matginTop:'40%'}}>
// GARANTIES
// </Typography>
// <TableContainer style={brd} >
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Garanties</TableCell>
//             <TableCell align="right">capital</TableCell>
//             <TableCell align="right">Prime/Base</TableCell>
//             <TableCell align="right">Reduction</TableCell>
//             <TableCell align="right">Majoration</TableCell>
//             <TableCell align="right">Prime Nette</TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>



    
// <Grid container  style={brd}>
// <Grid  xs={4} style={brd}>
// <TextField id="standard-basic" label="Prix net" variant="standard" />
// <TextField id="standard-basic" label="Reduction" variant="standard" />
// <TextField id="standard-basic" label="Majoration" variant="standard" />

               
//         </Grid>
// <Grid  xs={4} style={brd}>
//                      <TextField id="standard-basic" label="Complement" variant="standard" />
//                      <TextField id="standard-basic" label="Tva" variant="standard" />
//                      <TextField id="standard-basic" label="Fga" variant="standard" />
//                      <TextField id="standard-basic" label="Taxe annuelle" variant="standard" />
//                      <TextField id="standard-basic" label="Timbre Dim" variant="standard" />
//                      <TextField id="standard-basic" label="Timbre Gradue" variant="standard" />


               
//         </Grid>
//         <Grid  xs={4} style={brd}>
//         <Typography variant="overline" display="block" gutterBottom>
//         Net a Payer
//       </Typography>
//                      <TextField id="standard-basic" label="....." variant="standard" />

               
//         </Grid>



// </Grid>
//     </Container>
//     </Item>
//     </React.Fragment>



    )
}