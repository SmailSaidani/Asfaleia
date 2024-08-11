import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Sidebar from '../sidebar';
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
  setDoc
} from "firebase/firestore";
import Button from '@mui/material/Button';
import ClipLoader from "react-spinners/ClipLoader";



export default function Rapport() {
  

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

      const Gb ={
        border: "1px solid black"
      }

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

      const history=useHistory();

      const [fait, setfait] = useState(false);
      const [errors, seterrors] = useState([]);
      const [Rapport , setRapport] = useState({
        DetailsR: [],
        Fourniture: [],
        imagesEX:[],
        garanties:[],
        images:[],
      });
      const [user , setuser] = useState({});
      const [Message , setMessage] = useState('');
      const [M , setM] = useState(false);
      const [dejaEn , setdejaEn] = useState(false);
      const [Mes , setMes] = useState(false);
      const idRapp = useParams();
      const dateCons = idRapp.id.slice(0, 10);
      const [DateAc, setDateAc] = useState('');


            
      

      const [videM, setvideM] = useState(false);
   

const message = async () =>{
  
  if (Message == ''){
    setvideM(true);
  }else {
    setMes(true);
    await setDoc(doc(db, "msgs",idRapp.id ),{
      sender : "Systeme",
      receiver : Rapport.user,
      msg : `(motif : Réponse au constat) : ${Message}`,
      time: new Date().toISOString(),
      lue: false,
    }).then(()=>{
      setMes(false);
      setM(true)
    });
  }
  
}


     
      useEffect(async () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
            
    
            const infos = await getDoc(doc(db, "Rapport" , idRapp.id));

            setRapport(infos.data());
            
            var t = new Date(1970, 0, 2); // Epoch
            t.setSeconds(infos.data().DateAc.seconds);
            const t1 = t.toISOString();
            const DateAcc = t1.slice(0, 10);
            setDateAc(DateAcc);

            const Mes = await getDoc(doc(db, "msgs" , idRapp.id));
            if (Mes.exists()){
              let det = Mes.data().msg;
              const dd = det.slice(0 , 28);
              if ( dd == "(motif : Réponse au constat)"){
                setdejaEn(true);
              }
            }
            
    
            }
    
            });
        
        
      }, []);

     //============================= Controles =========================

     useEffect(async () => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
                const User = await getDoc(doc(db, "Users" , currentUser.uid));
                setuser(User.data());
                // if(User.data().type == 'expert'){ 
                // history.push('/expert') ;
                // window.location.reload('/expert');
                // }
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

     <div style={{ padding: "10%" , backgroundColor: "white"}}>
      { user.type == 'admin' &&(
        <div>
        <dialog style={{marginTop : "-10%" , borderRadius: "6px" ,paddingBottom:"10px"}} open>
        {M  ? 
          <p className="succès"> Message envoyée avec succès </p>
        : 
        <>
        {dejaEn && (<p className="error"> Vous avez déja envoyée un message .</p>)}
         <Typography variant="h5" style={{borderBottom:'1px solid black'}}>
            envoyé une reponse a l'utilisateur : 
        </Typography>
        <Typography variant="overline" style={{float : 'left'}}>Message :
        <TextField onChange={(e)=>{  setMessage(e.target.value ) ; setvideM(false)}}/></Typography>
        <br></br>
        
        <Button sx={{marginTop : '3%' , backgroundColor: "greenyellow" , color: "GrayText"}} onClick={message} >Envoyer le message
          { Mes ? <div  >
                                        <ClipLoader size={15}  />
                                        </div> 
                                  : <></>}
          </Button>
          {videM &&(
          <p className="error"> Veuillez saisire un message SVP!</p>
        )}
        </>}
       
        </dialog>  
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
      )}

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
                Lieu de visite : {Rapport.userAgen}</Typography>
          </Grid>
          <Grid item xs={6}>   
             <Typography variant="overline">
               etabli le : {Rapport.dateR} </Typography>
                  <Typography variant="overline" style={{marginLeft: '5%'}}>
               expert : </Typography> <Typography variant="overline" style={{fontWeight: 'bolde'}}>{Rapport.expertNom} {Rapport.expertPrenom}</Typography>
             


        </Grid>
        </Grid>


            <Grid container >
            <Grid sm={6} xs={12} container style={{border : " 1px solid black"}}>
            <Grid sm={12} xs={12} style={table} ><Typography variant="h6">Mode</Typography></Grid>
            
            <Grid sm={12} xs={12} style={{border : " 1px dotted black"}}  >

            <Typography variant="overline">ID : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.user} </Typography>


            </Grid>
            <Grid sm={12} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Agence : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.userAgen} </Typography>
            </Grid>
           

            <Grid sm={6} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Numero : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.userPhone} </Typography>
            {/* <TextField id="standard-basic"   variant="standard" /> */}


            </Grid>
            <Grid sm={6} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Date  : </Typography>
            <Typography className="infos" align="center" variant="overline">{DateAc} </Typography>
            {/* <TextField id="standard-basic" value={DateAc} variant="standard" /> */}


            </Grid>

            <Grid sm={6} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Assure : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.userN} {Rapport.userPr}</Typography>
            {/* <TextField id="standard-basic"  variant="standard"  /> */}


            </Grid>
            <Grid sm={6} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Tiers : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.advernom} {Rapport.adverprenom} </Typography>
            {/* <TextField id="standard-basic"   variant="standard" /> */}


            </Grid>

            <Grid sm={6} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Assure Tiers : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.adverassur} </Typography>
            {/* <TextField id="standard-basic"  variant="standard"  /> */}


            </Grid>
            <Grid sm={6} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Agence : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.adverassurAgen} </Typography>
            {/* <TextField id="standard-basic"  variant="standard" /> */}


            </Grid>

            <Grid sm={6} xs={12}  >


            </Grid>
            </Grid>




            <Grid sm={6} xs={12} container style={{border : " 1px solid black"}}>
            <Grid sm={12} xs={12}  style={table}><Typography variant="h6">Mandat</Typography></Grid>
            <Grid xs={4} style={{border :"1px solid black"}} >

            <Typography variant="overline">Marque : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.marque} </Typography>
            {/* <TextField id="standard-basic"  value={Rapport.marque}   /> */}

            </Grid>
            <Grid xs={4} style={{border :"1px dotted black"}} >

            <Typography variant="overline">Modele : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.nom} </Typography>
            {/* <TextField id="standard-basic"  value={Rapport.nom}   /> */}


            </Grid>

            <Grid xs={4}  style={{border :"1px dotted black"}}>

            <Typography variant="overline">Genre : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.marque} </Typography>
            {/* <TextField id="standard-basic"  textAlign="center" value={Rapport.marque}   /> */}


            </Grid>

            <Grid xs={6} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">N serie : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.numS} </Typography>
            {/* <TextField id="standard-basic" value={Rapport.numS}   variant="standard" /> */}


            </Grid>

            <Grid xs={6} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Puissance : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.puiss} </Typography>
            {/* <TextField id="standard-basic" value={Rapport.puissance}  variant="standard"  /> */}


            </Grid>
            <Grid sm={12} xs={12} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Immatriculation : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.imma} </Typography>
            {/* <TextField id="standard-basic" value={Rapport.imma}   variant="standard" /> */}


            </Grid>

            <Grid xs={6} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">annee : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.annes} </Typography>
            {/* <TextField id="standard-basic" value={Rapport.annee}  variant="standard"  /> */}


            </Grid>
            <Grid xs={6} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Energie : </Typography>
            <Typography className="infos" align="center" variant="overline">{Rapport.energie} </Typography>
            {/* <TextField id="standard-basic" value={Rapport.energie}   variant="standard" /> */}


            </Grid>

            <Grid xs={6} style={{border : " 1px dotted black"}} >

            <Typography variant="overline">Etat du veh : 
            <Typography className="infos" align="center" variant="overline">{Rapport.etat} </Typography>
            </Typography>
                {/* <TextField id="standard-basic"  variant="outlined" /> */}


            </Grid>

            <Grid xs={6} style={{border : " 1px dotted black"}} >

                <Typography variant="overline">    Carrosserie :
                <Typography className="infos" align="center" variant="overline">{Rapport.caross} </Typography>
                </Typography>
            </Grid>

            
            </Grid>

           <Grid style={table} xs={12}><Typography variant="h5">Description Du Choc</Typography></Grid>

            <Grid style={{border : '1px dotted black'}} xs={12} container>
                
                
                
                
                
<Grid container sm={12} xs={12}>
<Grid sm={4} xs={12}>
<Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Emplacement : 

{/* {Rapport.A_degats.map((g) => (
<>

{g && g.checked == "true" && (
  <Typography className="infosVe" align="center" variant="overline">  {g.ind} / </Typography>

)}
</>
))} */}
</Typography>
</Grid>
<Grid sm={4} xs={12}>
<img style={{ border : "1px solid black"}} src="../assets/images/degat.png" alt="degats" className='imgbx'/>
</Grid>
<Grid sm={4} xs={12}>
<Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Les degats : 
<Typography className="infosVe" align="center" variant="overline">  {Rapport.A_deg} </Typography>
</Typography>
</Grid>


</Grid>

<Grid xs={12} >
<Typography variant="overline" style={{float : 'left'}}>Description Du choc : 
<Typography className="infosVe" align="center" variant="overline">  {Rapport.desChoc} </Typography>

{/* <TextField fullWidth sx={{ height : '30%'}} id="fullWidth" placeholder='description du choc ...' value={values.desChoc} onChange={(e)=>{setValues({...values, desChoc:e.target.value})}}/> */}
</Typography>
</Grid>
 

</Grid>
 

 
 <Grid container xs={12} >
<Grid sm={9} xs={6} style={table} ><Typography variant="h6">Evaluation De La Mise en etat</Typography></Grid>
<Grid sm={1.5} xs={3} style={table} ><Typography variant="subtitle2">Taux horaire</Typography></Grid>
<Grid sm={1.5} xs={3} style={{border : " 1px solid black"}}>
    <Typography className="infosVe" align="center" variant="overline">  {Rapport.Theur} </Typography>
    {/* <TextField style={{width: "50%"}} label="en DA" type={"number"} id="standard-basic" variant="standard" value={Theur} onChange={(e)=>{ setTheur(e.target.value)}} /> */}
     </Grid>




<Grid container xs={12} style={{border : '1px solid black'}}>
<Grid sm={9} xs={6} style={table} ><Typography variant="overline" >Details Des Reparations</Typography>
</Grid>
<Grid sm={1.5} xs={3} style={table} ><Typography variant="overline" >t/rep</Typography></Grid>
<Grid sm={1.5} xs={3}  style={table}> <Typography variant="overline" >Montant</Typography> </Grid>  

<Grid sm={9} xs={6}  style={{borderRight : '1px solid black',padding: "2%" }}  >

</Grid>
<Grid sm={1.5} xs={3} style={{borderRight : '1px solid black'}}  ></Grid>


{Rapport.DetailsR.map((D,index) => (

<Grid container xs={12} style={{border : '1px solid black', marginTop: "10px" ,marginBottom: "40px"}}>

<Grid sm={9} xs={6}  style={{borderRight : '1px solid black'}}>

                
  <Typography variant="overline" style={{textDecoration :" underline", float : 'left'}}>Emplacement :</Typography>

  <Typography variant="standard" style={{ float : 'left' , fontWeight:"bold" , marginTop: "10px"}}> {D.emp} </Typography>              
                
                    

  <Typography variant="standard" style={{ fontWeight:"bold" , marginTop: "15px"}}> Toliers </Typography>

  <br></br>
  <Typography variant="standard" style={{ marginTop: "10px" }}> {D.des} </Typography>        
  <br></br>
  <br></br>
  <Typography variant="overline" style={{ float : 'left'}} >Emplacement : {D.emp}  </Typography>

  <Typography variant="standard" style={{ fontWeight:"bold" , float : 'right' , marginRight: "15px"}}> Peinture et ingridients </Typography>
  <br></br>
  <br></br>
                  </Grid>
                  
                  
                  
                  
                  
                  
                  <Grid sm={1.5} xs={3} style={{borderRight : '1px solid black'}}  >
                   <Typography variant="standard" > {D.TRepT} </Typography>  
                   <br></br>
                   <br></br>
                   <br></br>          
                   <Typography variant="standard" > {D.TRepP} </Typography>           
            
                 </Grid>




                  
                 <Grid sm={1.5} xs={3}   >
                  <Typography variant="standard" > {D.PrixT} </Typography> 
                  <br></br>
                  <br></br>
                  <br></br>         
                 <Typography variant="standard" > {D.PrixP} </Typography>           
                
                 </Grid>

 </Grid>

))}


                  
                  
                  
                  

</Grid>

            </Grid >

            <Grid container xs={12} style={table} > <Typography variant="h6" >Fourniture</Typography> </Grid>
            </Grid>

            <Grid container xs={12}>
            <Grid container sm={8} xs={11}>
            <Grid  xs={1} style={table}><Typography variant='overline'>Qte</Typography></Grid>

            <Grid  xs={7} style={table}><Typography variant='overline'>designation</Typography></Grid>
            <Grid  xs={2} style={table}><Typography variant='overline'>h.t</Typography></Grid>
            <Grid  xs={2} style={table}><Typography variant='overline'>tva</Typography></Grid>
            </Grid>

            {Rapport.Fourniture.map((D,index) => (
            <Grid container sm={8} xs={11}>

            <Grid  xs={1} style={{border : '1px solid black'}} >
            <Typography variant="standard" > {D.Qte} </Typography>           
              </Grid>

            <Grid  xs={7} style={{border : '1px solid black'}}>
              <Typography variant="standard" > {D.dsi} </Typography>           
              </Grid>

            <Grid  xs={2} style={{border : '1px solid black'}}>
              
               <Typography variant="standard" > {D.HT} </Typography>           
              </Grid>
            <Grid  xs={2} style={{border : '1px solid black'}}>
             <Typography variant="standard" > {D.TVA} </Typography>           
                </Grid>

            </Grid>
            
            ))}
            
            </Grid>

           



              <Grid container xs={12}>
            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>   
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant TTC</Typography></Grid>

            <Typography style={{ fontWeight: "bolder" , color: "green" , fontSize:"16px" , marginTop:"10px"}} variant='overline'> {Rapport.Total} </Typography>                 
              {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
            </Grid>

            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant Main-d'oeuvre</Typography></Grid>
 

            <Grid  xs={12} container> 
             
              {Rapport.DetailsR.map((D,index) => (
              <>
                <Grid  xs={6} style={{border : '1px solid black'}}>{index+1}</Grid>
                <Grid  xs={6} style={{border : '1px solid black'}}> {Number(D.PrixT)} </Grid>
                <br></br>
              </>
            ))}  
               
         
                  
                </Grid>

            <Typography style={{ fontWeight: "bold"}} variant='overline'>Total: {Rapport.mmd} </Typography>                   
              {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
            </Grid>            
            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant peinture</Typography></Grid>

              <Grid  xs={12} container> 
              
                {Rapport.DetailsR.map((D,index) => (
              <>
                <Grid  xs={6} style={{border : '1px solid black'}}>{index+1}</Grid>
                <Grid  xs={6} style={{border : '1px solid black'}}> {Number(D.PrixP)} </Grid>
                <br></br>
              </>
               ))} 
              
             
                  
                </Grid>



            <Typography style={{ fontWeight: "bold"}} variant='overline'>Total: {Rapport.mp} </Typography>  
            {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
              </Grid>
            <Grid  sm={3} xs={6} style={{border : '1px solid black'}}>
            <Grid  sm={12} xs={12} style={table}><Typography variant='overline'>Montant fourniture </Typography></Grid>
 

                <Grid  xs={12} container> 
                  <Grid  xs={1} style={{border : '1px solid black'}}> </Grid>
                  <Grid  xs={1} style={{border : '1px solid black'}}>Q</Grid>
                  <Grid  xs={5} style={{border : '1px solid black'}}>TVA </Grid>
                  <Grid  xs={5} style={{border : '1px solid black'}}>TTC</Grid>
                </Grid>
                <Grid  xs={12} container> 
                
                
                    {Rapport.Fourniture.map((D,index) => (
                        <>
                          <Grid  xs={1} style={{border : '1px solid black'}}> {index+1} </Grid>
                          <Grid  xs={1} style={{border : '1px solid black'}}> {D.Qte} </Grid>
                          <Grid  xs={5} style={{border : '1px solid black'}}>{D.TVA} </Grid>
                          <Grid  xs={5} style={{border : '1px solid black'}}>{Number(D.TVA)+Number(D.HT)}</Grid>
                          <br></br>
                        </>
                      ))}  
            
            
                </Grid>

           <Typography style={{ fontWeight: "bold"}} variant='overline'> Total : {Rapport.mf} </Typography>  
                       
              {/* <TextField id="standard-basic"   variant="standard" style={{width:"20%"}} /> */}
            </Grid>           
               </Grid>



     <Grid xs={12} style={{border : ' 1px solid black'}}>Montant Total en Lettre : ..........</Grid>


     <Grid xs={12} style={{border : ' 1px solid black'}} container>

     <Grid sm={6} xs={12}>
      <Typography variant="subtitle2" >Photos : {Rapport.imagesEX.length}  </Typography> 


      {/* <div className="chaipas">

      <Tooltip title="Photo" placement="Top"   >
        <div>
        
        <form onSubmit={formHandler}>
        <BsCardImage fontSize="1rem" color="#19A8D9" margin-right= "10px;" > </BsCardImage> 
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
        </div> */}
      




     </Grid>


     <Grid sm={2} xs={4} style={{border : "1px solid black "}}>

     <p>Immobilisation :</p> 
     <Typography variant="subtitle2" >Photos : {Rapport.immobi}  </Typography> 
     </Grid>

     <Grid sm={2} xs={4} className='pvbord'>

     <p>Vetuste : {Rapport.vetu} %</p>   
     <TextField   value={Rapport.vetu} type={"range"} />



     </Grid>


     <Grid sm={2} xs={4} className='pvbord'>


     <p>Soit { ((Rapport.mf)*Rapport.vetu) / 100 } </p>   


</Grid>

</Grid>
{errors[0] && <p className="error">{errors[0]}</p>} 

<div className="sendouq">
<div className="sendouq">
<span class="card-heading">images</span>
<span class="card-more">
</span>

 <ul class="card-list">
  {Rapport.imagesEX.map((image) => (
     <li>
      <div className="Li" >
      {/* <div className="boxclose"
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
      </div> */}
      <img className='imgV' src={image} alt="" /></div>
    </li>
     ))}
 </ul>
</div></div>




     
{/* <Button variant="contained" sx={{marginTop : '3%'}} onClick={chege3} >Confirmer le PV
    { envoi ? <div  >
                                  <ClipLoader size={15}  />
                                  </div> 
                            : <></>}
    </Button> */}

     </div>
</>
      );
}