import React, { useEffect } from 'react'
import '../../index.css'
import { Link } from "@material-ui/core";
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useState } from 'react';
import validation from "../Client/validation";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import { loginUser  } from "../../bdd/firebase";

import Sidebar from './sidebarE';

import { db, auth, logoutUser, user  } from "../../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
  
  } from "firebase/firestore";


export default function Settings() {
let history = useHistory();


const [state ,setstate] = useState(false);
const [token ,settoken] = useState("");
const [email ,setemail] = useState("");


useEffect(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (auth.currentUser){
            
          settoken(currentUser.accessToken);
          setemail(currentUser.email);
        }

        });
    
    
  }, []);

    
const toggleBtn =(e) => {
    e.preventDefault();
  setstate(prevState => !prevState) ;
}


const [values, setValues] = useState({
    password: "",
    password2: "",
});

const [errors, setErrors] = useState({});


const handlechange = (event) =>{
    setErrors({});
    setValues({
        ...values,
        [event.target.name]: event.target.value,
    } );
   
        
    
    

};

const goprofil =() => {
    history.push(`/profil`);
    window.location.reload(`/profil`);
}

const handleFormSubmit = (event) =>{
event.preventDefault();


// if (!errors.password2 && !errors.password && !errors.code){
    let data = {
        idToken: token,
        password: values.password,
        returnSecureToken: true, 
    }
    try {
        var idd;
           axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA90T1zNlTE2klpwKX1AsOwKZxaK-xSrsM' , data).then( (res) => {

            window.location.reload('/profil');
            loginUser(email, data.password).then( () => {
            goprofil();
            window.location.reload();
            });
                       
                        
                    }).catch((err) => {
                        console.log(err) 
                        console.log(err.message) 
                        setErrors({message : "Une erreur c'est produit , essayer de se reconnecter SVP"});
                        setValues({
                            password: "",
                            password2: "",
                        });
                      });
                  
 
    } catch (error) {
        console.log(error);
    }


// }else{
//     setValues({
//         password: "",
//         password2: "",
//     });
// }

};


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
        }
        else{
            history.push('/') ;
            window.location.reload('/');
        }

        });
    
    
  }, []);

//===========================================================================

    return (

        <div>
        <Sidebar/>
        <Grid container>
            


            <Grid item sm={12} xs={12} spacing={2}>

            <section class="subscribe_section layout_padding">
            <div class="container">
            
            <div class="box">
            <div class="row">
            <div class="col-md-8 mx-auto">
            <div class="subscribe_form ">

            <div className="contenu">
                        
                        
                        <Typography align='center'  variant="h4" display="block" gutterBottom={true} > changer votre mot de passe </Typography> 
                        <h3 className="titre">Saisissez votre nouveau mot de passe </h3>
                        <p className="text">Créez un mot de passe d’au moins 8 caractères.
                        Le mot de passe doit inclure au moins 1 lettre, 1 
                        chiffre et 1 caractère spécial (!@#$%^&*)</p>
                       {/*<input className="Input" type="password" name="email"  placeholder="Nouveau mot de passe  " />*/ } 
                       <input className="Input" type= {state ? "text" : "password"} name="password" placeholder="Mot de passe" value={values.password} onChange={handlechange} />

                                <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button>
                         {errors.password && <p className="error">{errors.password}</p>}    


                        {/* <input className="Input1" type="password" name="email"  placeholder="Confirmer mot de passe  " /> */}

                        <input className="Input1" type= {state ? "text" : "password"} name="password2" placeholder="Confirmation de mot de passe" value={values.password2} onChange={handlechange} />
                         
                            <button className='Btn' onClick={toggleBtn}>
                                    {state ? <AiOutlineEyeInvisible /> :
                                    <AiOutlineEye/>  }
                                </button>
                        {errors.password2 && <p className="error">{errors.password2}</p>} 
                        {errors.message && <p className="error">{errors.message}</p>}


                        <div>
                            {/* <button className='Btn' onClick={handleFormSubmit}>Terminé</button> */}
                            <Button variant="contained" sx={{marginTop : '3%'}} onClick={handleFormSubmit}>Terminé 
                            {/* { envoi ? <div  >
                                                        <ClipLoader size={15}  />
                                                        </div> 
                                                    : <></>} */}
                            </Button>
                        </div>
            </div>

            </div>
            </div>
            </div>
            </div>


            </div>
             </section>


            </Grid>
        
         </Grid> 

           
        </div>


    )
}
