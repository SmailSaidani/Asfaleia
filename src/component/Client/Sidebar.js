import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';
import { Bookmark, ExitToApp, Home, Person, Mail, Settings,Notifications, NoEncryption ,CarRentalIcon } from '@material-ui/icons';
import React , {useState ,useEffect}from 'react'
import { Redirect, NavLink , Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import ArticleIcon from '@mui/icons-material/Article';
import { auth, logoutUser  } from "../../bdd/firebase";

const useStyles = makeStyles((theme)=> ({
  Container: {
      //19A8D9
      top:"0",
      width:"80%",
      height:"100%",
      paddingTop: theme.spacing(10),
      backgroundColor: "rgb(46, 47, 48); ",
      color:"white ",
      [theme.breakpoints.up("sm")]:{
          backgroundColor: "rgb(46, 47, 48);",
      color:"white ",
          // border: "1px solid #ece7e7"
      }
  
  },
  item:{
      display:"flex",
      alignItems: "center",
      marginBottom:theme.spacing(6),
      [theme.breakpoints.up("sm")]:{
          marginBottom:theme.spacing(6),
          cursor:"pointer"
      }
  },
  item2:{
      display:"flex",
      alignItems: "center",
      marginTop:theme.spacing(20),
      [theme.breakpoints.up("sm")]:{
          marginTop:theme.spacing(20),
          cursor:"pointer"
      }
  },
  
  icon:{
    
      [theme.breakpoints.up("sm")]:{
          fontsize:"18px",
      }
  },
  
  text:{
      marginLeft: theme.spacing(2),
      color:'white',
      fontWeight:600,
      [theme.breakpoints.down("sm")]:{
          display:"none",
          
      },
  },
  link:{
      color:"white",
      textDecoration: "none",
  }
  
  }));


export default function Sidebar(){

  let history = useHistory();


  const go =() => {
    window.open('/contratau', '_blank');
}
const dec =()=>{
    logoutUser();
    setTimeout(() => {
       window.location.reload(`/`); 
    }, 1000);
    

  }
const goprofil =() => {
    history.push(`/profil`);
    window.location.reload(`/profil`);
}

const goconstat =() => {
    history.push(`/form`);
    window.location.reload(`/form`);
}

const gotosett =() => {
    history.push('/settings');
    window.location.reload('/settings');
}
const AjouterV = () =>{
    history.push('/Ajouter')
    window.location.reload('/Ajouter');
  }

  const classes = useStyles();
    return (
      <Container className={classes.Container}>
          
        <a>
          <div className="navlogos">
            <img src="https://firebasestorage.googleapis.com/v0/b/asfaleia-vehicule.appspot.com/o/lo3.png?alt=media" className="logo" />
          </div>
        </a>       

{/* 
      <div className={classes.item}>  
              <ContentPasteIcon onClick={go} className={classes.icon}/>
              <Typography onClick={go} className={classes.text}>Contrat </Typography>
 
      </div> */}
      

      <div className={classes.item} >
            <NavLink onClick={goprofil}  to="/profil" exact className={classes.link}>
            <Person  className={classes.icon}/>
            </NavLink>
            <NavLink onClick={goprofil}   to="/profil" exact className={classes.link}>
            <Typography   className={classes.text}>Profil</Typography>
            </NavLink>
              
      </div>
      <div className={classes.item}>
          <Link onClick={AjouterV} to='/Ajouter' exact className={classes.link}>
               
              <TimeToLeaveIcon className={classes.icon}/>
              
          </Link>
          <NavLink onClick={AjouterV} to='/Ajouter' exact className={classes.link}>
              <Typography className={classes.text}> Ajouter Vehicules</Typography>
          </NavLink>
      </div>
          
      <div className={classes.item}>
          <NavLink onClick={goconstat}  to='/Form' exact className={classes.link}>
          <ArticleIcon  className={classes.icon}/>
          </NavLink>
          <NavLink onClick={goconstat} to='/Form' exact className={classes.link}>
          <Typography  className={classes.text}>Constat</Typography>
          </NavLink>
      </div>

          
      <div className={classes.item}>
              <NavLink onClick={gotosett} to="/settings" exact className={classes.link}>
              
                  <Settings className={classes.icon}/>
                  
              </NavLink>
              <NavLink onClick={gotosett} to="/settings" exact className={classes.link}>
                  <Typography className={classes.text}>Paramètres</Typography>
              </NavLink>
              
              
              
      </div>
      <div className={classes.item}>
              <NavLink onClick={dec}  to="/" exact className={classes.link}>
              <ExitToApp className={classes.icon}/>
              </NavLink>
              <NavLink onClick={dec} to="/" exact className={classes.link}>
              <Typography className={classes.text}>Déconnexion</Typography>
              </NavLink>
      </div>

      {/* <div className={classes.item}>
              <NavLink onClick={appel} to="/appel" exact className={classes.link}>
              <ExitToApp className={classes.icon}/>
              </NavLink>
              <NavLink onClick={appel} to="/appel" exact className={classes.link}>
              <Typography className={classes.text}>Appel</Typography>
              </NavLink>
      </div> */}
    </Container>
    )
}