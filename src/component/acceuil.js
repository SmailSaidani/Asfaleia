import React, { Component, useEffect, useState,useRef  } from 'react';
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { auth ,getDoc,db, } from "../bdd/firebase";
import {
  onAuthStateChanged,
  
} from "firebase/auth";
import {
    doc,
    
  } from "firebase/firestore";

import Tooltip from "@material-ui/core/Tooltip";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HelpIcon from '@mui/icons-material/Help';
import FeedIcon from '@mui/icons-material/Feed';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';

import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import DriveEta from '@mui/icons-material/DriveEta';
import Person from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Logo from "./logoL";
import emailjs from '@emailjs/browser';
export default function Acceuil() {
    const defaultValues = {
        name: "",
       email: "",
        msg: "",
       
      };
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const history =useHistory();
    const [User , setUser] =useState({});
    const [Info , setInfo] = useState({});
    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (auth.currentUser){
                setUser(currentUser);
                
                const infos = await getDoc(doc(db, "Users", currentUser.uid));
                setInfo(infos.data());
                // console.log(infos.data().type);
                if(infos.data().type == "client"){
                    history.push('/profil');
                }
                else if(infos.data().type == "expert"){
                    history.push('/expert');
                }
                else if(infos.data().type == "admin"){
                    history.push('/dashboard');
                }

            
            }else{ 
                history.push('/')
            }
            });
        
        
      }, []);
      const [open , setopen ] = useState(false);
     
      const  openNav =(e) => {
        e.preventDefault();
        setopen(prevopen => !prevopen) ;
      }

    //   const  openNav =() => {
    //             document.getElementById("myNav").classList.toggle("menu_width");
    //             document
    //                 .querySelector(".custom_menu-btn")
    //                 .classList.toggle("menu_btn-style");
    //           }



    const  [templateParams,setTp] =useState( {
        email: '',
        text: ''
    });
      const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_cuiqvdk", "template_n0i3zyo", form.current, '5WwV6W5b1JecPR9Ks' )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };



  
    return (
   
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet" /> 
         {/* Font Awesome */}
             <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        {/* Flaticon Font */}
             <link href="lib/flaticon/font/flaticon.css" rel="stylesheet" />
             {/* Libraries Stylesheet */}
            <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
         <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
         {/* Customized Bootstrap Stylesheet */}
         <link href="css/style.css" rel="stylesheet" />

         {open ?
        <div className='NavIcoacc'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Tooltip title="Connexion" placement="Top"   >
        <a href='/connexion'>
        <Fab color="success" aria-label="add">
        <LoginIcon />
        </Fab>
        </a>
        </Tooltip>
        <Tooltip title="Inscription" placement="Top"   >
        <a href='/inscription'>
        <Fab color='warning' >
        <PersonAddAltIcon  />
        </Fab>
        </a>
        </Tooltip>
        <Tooltip title="Catalogue" placement="Top"   >
        <a href='/Catalogue'> 
        <Fab color="info" aria-label="add">
        <FeedIcon />
        </Fab>
        </a>
        </Tooltip>
        <Tooltip title="Comment ca marche?" placement="Top"   >
        <a href='/about'>
        <Fab color="secondary" aria-label="edit">
        <HelpIcon />
        </Fab>
        </a>
        </Tooltip>

        </Box></div>
        : <></> }
        <div class="hero_area">
       
        <div class="logo_box">
        

        <a class="navbar-brand" href="/">
        <img className='logos'  src='assets/images/lo3.png' />
            <span>
            Asfáleia
            </span>
        </a>
        </div>
       

       
        <section className="slider_section">

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
            <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            </ol>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="detail-box">
                <h2>
                    L' <br />
                    agence <br />
                    de   <br />
                    vos <br />
                    reves
                </h2>
                </div>
            </div>
            
            </div>
        </div>
        

        </section>

        <div class="menu_box">
        <div class="navbar-collapse" id="">
            <div class="custom_menu-btn">
            <button onClick={openNav} >
                <span class="s-1"> </span>
                <span class="s-2"> </span>
                <span class="s-3"> </span>
            </button>
            </div>
            {/* <div id="myNav" class="overlay">
            <div class="overlay-content">
                
                <a href='/'> Home</a>
                <a href='/connexion'> Login</a>
                <a href='/inscription'> Sign Up</a>
                <a href='/catalogue'> Catalogue</a>
                
            </div>
            </div> */}
        </div>
        <div className="icons-wrapper">
            <a href="https://Facebook.com"> <FacebookIcon style={{color: "#1877F2"}} fontSize='20px'  className="ri-facebook-circle-line icon" /> 
        </a>
            <a href="https://instagram.com"><InstagramIcon style={{color: "#E4405F"}} fontSize='20px' className="ri-instagram-line icon" />
        </a>
            <a href="https://Linkedin.com"><LinkedInIcon style={{color: "#0A66C2"}} fontSize='20px'  className='ri-facebook-circle-line icon'  />
        </a>
            <a href="https://Twitter.com"><TwitterIcon style={{color: "#1DA1F2"}}  fontSize='20px'  className="ri-whatsapp-line icon" />
        </a>
        </div>
        </div>

    </div>
    

        
   
    <section class="men_section layout_padding-bottom">
        <div class="container" style={{ borderRadius: "15px 70px" , width: "80%" ,height: "60%" , marginTop: "4%"}}>
        <div class="box">
            <div class="row">
            <div class="col-md-7">
                <div class="detail-box">
                <div class="heading_container">
                    <h2>
                    Connectez-vous
                    </h2>
                </div>
                <p>
                Accéder à votre compte et visualiser l'etat de votre assurance
                </p>
                <div class="btn-box">
                    
                    <a href="/connexion" class="btn2">
                    Login
                    </a>
                </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="img-box">
                <img src="assets/images/assurees.jpg" alt="" />
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

    <section class="women_section layout_padding">
        <div class="container" style={{ borderRadius: "70px 15px" , width: "80%" ,height: "60%" , marginTop: "-4%"}}>
        <div class="box">
            <div class="row">
            <div class="col-md-6">
                <div class="img-box">
                <img src="assets/images/assur.jpg" alt="" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="detail-box">
                <div class="heading_container">
                    <h2>
                    Inscrivez-vous
                    </h2>
                </div>
                <p>
                Vous êtes assuré chez nous et vous n'avez pas de compte ?
                Allez créer votre compte dès maintenant
                </p>
                <div class="btn-box">
                <a href="/inscription" class="btn2">
                    Sign Up
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

   
    <section class="men_section layout_padding-bottom">
        <div class="container" style={{ borderRadius: "15px 70px" , width: "80%" ,height: "60%" , marginTop: "-4%"}}>
        <div class="box">
            <div class="row">
            <div class="col-md-7">
                <div class="detail-box">
                <div class="heading_container">
                    <h2>
                    c'est quoi Asfaleia ?
                    </h2>
                </div>
                <p>
                How does asfaleia work
                </p>
                <div class="btn-box">
                    
                    <a href="/about" class="btn2">
                    Voir
                    </a>
                </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="img-box">
                <img src="assets/images/3.png" alt="" />
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

 

    <section class="modern_section layout_padding-bottom">  
        <div class="container" style={{ borderRadius: "70px 15px" , width: "80%" ,height: "60%" , marginTop: "-4%"}}>
        <div class="box layout_padding">
            <div class="row">
            <div class="col-md-7">
                <div class="detail-box">
                <div class="heading_container">
                    <h2>
                    Nos offres
                    </h2>
                </div>
                <p>
                Accéder au catalogue pour voir nos offres
                </p>
                <div class="btn-box">
                    <a href="/catalogue" class="btn2">
                    Catalogue
                    </a>
                </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="img_container">
                <div class="img-box">
                    <img src="assets/images/Catalogue.png" alt="" />
                </div>
                
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

    
{/*    
     <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
    <div className="row pt-5">
      <div className="col-lg-4 col-md-12 mb-5">
        <h1 className="mb-3 display-5 text-capitalize text-white">Asfaleia</h1>
       
      </div>
      <div className="col-lg-8 col-md-12">
        <div className="row">
          <div className="col-md-4 mb-5">
            <h5 className="text-primary mb-4">Get In Touch</h5>
            <p><i className="fa fa-map-marker-alt mr-2" />xxxxxxxxxxxxxxxxxxxxxx</p>
            <p><i className="fa fa-phone-alt mr-2" />xxxxxxxxxxxxxx</p>
            <p><i className="fa fa-envelope mr-2" />xxxxxx@example.com</p>
            <div className="d-flex justify-content-start mt-4">
              <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '36px', height: '36px'}} href="#"><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '36px', height: '36px'}} href="#"><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '36px', height: '36px'}} href="#"><i className="fab fa-linkedin-in" /></a>
              <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '36px', height: '36px'}} href="#"><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <h5 className="text-primary mb-4">Popular Links</h5>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Home</a>
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Login</a>
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />SignUp</a>
              
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <h5 className="text-primary mb-4">Contact Us</h5>
            <form ref={form} onSubmit={sendEmail}>
            <div className="form-group">
                <input type="email"        onChange={(e)=>{setTp({...templateParams, email:e.target.value})}} name="user_email" value={templateParams.email} className="form-control border-0" placeholder="Your Email" required="required" />
              </div>
              <div className="form-group">
                <input name="message" onChange={(e)=>{setTp({...templateParams, text:e.target.value})}} className="form-control border-0" value={templateParams.text}  placeholder="Your Message" required="required" />
              </div>
              <div>
                <button className="btn btn-lg btn-primary btn-block border-0"value="Send" type="submit">Submit Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
        */}


  <section class="info_section layout_padding">
            <div class="container">
            <div class="row" style={{marginTop: "5%"}}>
                <div class="col-md-3">
                <div className='footerimg'>
                 <img className='logos'  src='assets/images/lo3.png' />
                 <h5 className='footerh'>
                 Asfáleia
                 </h5>
                </div>
                <p>
                Seul dans le passé , ensemble dans le futur </p>
                </div>
                <div class="col-md-4">
                <div class="row">
                    {/* <div class="col-md-5  ">
                    <h5>
                        Useful Links
                    </h5>
                    <ul>
                        <li>
                        <a href="/inscription">
                            Sign Up
                        </a>
                        </li>
                        <li>
                        <a href="/catalogue">
                            Catalogue
                        </a>
                        </li>
                        
                    </ul>
                    </div> */}
                    <div class="col-md-6">
                    <h5>
                        Contact Us
                    </h5>
                    <div class="info_link-box">
                        <a href="#">
                        <span>+01 1234567890</span>
                        </a>
                        <a href="#">
                        <span>+01 1234567890</span>
                        </a>
                        <a href="#">
                        <span> <span class="__cf_email__">Asfáleia@gmail.com</span></span>
                        </a>
                    </div>
                    </div>
         
                </div>
                </div>
                <div className="col-md-5">
            <h5 className="text-primary mb-8">Contact Us</h5>
            <form ref={form} onSubmit={sendEmail}>
            <div className="form-group">
                <input type="email"        onChange={(e)=>{setTp({...templateParams, email:e.target.value})}} name="user_email" value={templateParams.email} className="form-control border-0" placeholder="Your Email" required="required" />
              </div>
              <div className="form-group">
                <input name="message" onChange={(e)=>{setTp({...templateParams, text:e.target.value})}} className="form-control border-0" value={templateParams.text}  placeholder="Your Message" required="required" />
              </div>
              <div>
                <button className="btn btn-lg btn-primary btn-block border-0"value="Send" type="submit">Submit Now</button>
              </div>
            </form>
          </div>
            </div>
            </div>
        </section>
       
        <section class="container-fluid footer_section">
            <p>
            &copy; 2022 All Rights Reserved. Design by UMMTO student 
            </p>
        </section>

       
  </div>



  );

 }

