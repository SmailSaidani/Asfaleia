
import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState ,useRef,useCallback} from "react";
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Fab from '@mui/material/Fab';
import Tooltip from "@material-ui/core/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HelpIcon from '@mui/icons-material/Help';
import FeedIcon from '@mui/icons-material/Feed';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import emailjs from '@emailjs/browser';
import { Home } from '@material-ui/icons';


export default function Catalogue (){
    Catalogue.propTypes = {
        post: PropTypes.shape({
          description: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          imageText: PropTypes.string.isRequired,
          linkText: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }).isRequired,
    
    
    
    
    
    }

    const [open , setopen ] = useState(false);
     
    const  openNav =(e) => {
      e.preventDefault();
      setopen(prevopen => !prevopen) ;
    }

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
    return(
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
        <div className='NavIcon'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Tooltip title="acceuil" placement="Top"   >
        <a href='/'>
        <Fab   color="default" aria-label="add">
        <Home />
        </Fab>
        </a>
        </Tooltip>
        <Tooltip title="Connexion" placement="Top"   >
        <a href='/connexion'>
        <Fab   color="success" aria-label="add">
        <LoginIcon />
        </Fab>
        </a>
        </Tooltip>
        <Tooltip title="Inscription" placement="Top"   >
        <a href='/inscription'>
        <Fab  color='warning' >
        <PersonAddAltIcon  />
        </Fab>
        </a>
        </Tooltip>
        <Tooltip title="Catalogue" placement="Top"   >
        <a href='/Catalogue'> 
        <Fab   color="info" aria-label="add">
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

            <div class="navbar-collapse" id="">
            <div class="custom_menu-btn">
            <button onClick={openNav} >
                <span class="s-1"> </span>
                <span class="s-2"> </span>
                <span class="s-3"> </span>
            </button>
            </div>
        </div>
        <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height : '300px',
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        
        <Box
          sx={{
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Box sx={{marginTop: "50px"}} >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom style={{color : "#edd068"}}>
                Asfaleia
              </Typography>
              <span>Choisissez votre formule d’assurance Auto adaptée à vos besoins et à votre budget,en seulement quelques clics</span>
            </Box>
          </Grid>
        </Grid>


       
      </Paper>

    <Grid container xs={12} style={{boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",marginTop : '-2%', backgroundColor : 'white'}}>
            <Grid sm={4} xs={12}>
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="assets/images/checked.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="UN CHOIX RICHE DE GARANTIES"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                berberberberberber
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
            </Grid>
            <Grid sm={4} xs={12}>
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://previews.123rf.com/images/jovanas/jovanas1608/jovanas160800558/61446727-camion-de-remorquage-de-voiture-ic%C3%B4ne.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Asfelia Vous suit Partout"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Faites un Constat 
                où que vous soyez quand vous voulez
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
            </Grid>



             <Grid sm={4} xs={12}>
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://icones.pro/wp-content/uploads/2021/02/icone-de-localisation-jaune.png" />
        </ListItemAvatar>
        <ListItemText
          primary="UN SERVICE D'ASSISTANCE"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              INCLUS 24H/24 ET 7J/7 où que vous soyez quand vous voulez
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
            </Grid>



    </Grid>
    <Grid xs={12}  style={{boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.75)", backgroundColor : 'white', padding : '5%'}}>
        <Typography variant='body1' >
        Pour rouler en toute sérénité, Asfelia  vous propose l’assurance  « Tous Risques » offrant une protection à votre véhicule pour le garder comme neuf le plus longtemps possible.

L’assurance auto Tous risques est la formule la plus complète. Elle intervient notamment dans le cas d’un accident dit

« Responsable », c’est-à-dire si le tort est de votre côté, y compris si vous perdez seul le contrôle de votre voiture.
        </Typography>
    </Grid>
    

    <Grid xs={12} container style={{boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.75)", backgroundColor : 'white', padding : '5%'}}>
        <Grid xs={6} style={{}}>
            <Typography variant='h5' style={{color : '#e3d94f',}}>
              Les Garanties que Asfelia vou presente
            </Typography>
            <Typography variant='h6' style={{color : '#96968f'}}>
              Asfelia est une assurance auto complete qui vous presentes toutes les garanties des assurances auto parmi elles
            </Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '2%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Dommages-collisions</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Bris de glaces</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Vol</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Incendie et explosion</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Assistance au vehicule</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Defense et recours</Typography>

        </Grid>

        <Grid xs={6} style={{}}>
            <Typography variant='h5' style={{color : '#e3d94f',}}>
              Asfelia vous suit partout 
            </Typography>
            <Typography variant='h6' style={{color : '#96968f'}}>
            vous permet de gérer tous vos aspects d'assurance depuis votre téléphone , que sa soit :            </Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '2%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Constats</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Contrat D'assurance</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Rendez Vous avec expert</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> Devis estimatif</Typography>
            <Typography variant="subtitle1" style={{display : "flex", marginTop: '1%'}}> <p style={{color : '#d1c84b', marginRight : '2%'}}>● </p> et plein d'autre fonctionalites</Typography>

        </Grid>
    </Grid>




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
            <p><i className="fa fa-envelope mr-2" />asfaleiaveh@gmail.com</p>
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
</div>
    );
  }
  
 
