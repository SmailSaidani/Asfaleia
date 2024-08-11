import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HelpIcon from '@mui/icons-material/Help';
import FeedIcon from '@mui/icons-material/Feed';
import Tooltip from "@material-ui/core/Tooltip";


const Nav = styled.div`
  background: rgb(46, 47, 48);
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();




const steps = [
  {
    label: 'Commencer par créer un compte ',
    description: `Vous pouvez créer un compte dans notre site ! 
            Vous avez qu'à remplir vos informations dans le formulaire d'inscription 😃.`,
  },
  {
    label: 'inscription avec des applications tierces',
    description:
      "Vous pouvez aussi s'inscrire en utilisant Facebook ou Google ;just n'oublie pas de compléter vos informations 😊",
  },
  {
    label: 'Vous êtes sur votre profil 🥳',
    description: `Vous avez maintenant accès à à votre profil; vous pouvez ajouter des véhicules 🚗 ; 
    consulter L'état vos assurances 📜 ; faire un constat et plusieurs autres choses...`,
  },
];

const steps1 = [
  {
    label: 'Ajouter des véhicules',
    description: `Apres votre insciption vous pourrais ajouter votre vehicule et toute les informations le concernant ;
     vous serez capable de visualiser tous les offres possibles ainsi que leurs tarifs et faire une demande d assaurance depuis le profil! 
     La demande sera ultérieurement acceptée par un administrateur après la visite 😃.`,
  },
  {
    label: 'Faire un constat',
    description:
      "Si quelque chose arrive à votre véhicule vous n'êtes pas obligé de se déplacer vers l'agence vous pouvez faire votre constat en ligne , et suivre son avancement en restant chez vous 😊",
  },
  {
    label: 'Messagerie',
    description: `Vous avez accès à tous les messages envoyés soit par l'expert ou par l'administrateur 📜 `,
  },
];
const steps2 = [
  {
    label: 'Mise a jour des images de véhicule',
    description: `Vous pouvez à tout moment faire la mise à jour des images de votre véhicule ;
    En envoyant une demande avec de nouvelles images ; la demande sera ensuite traitée par un administrateur et elle sera soit accepté soit refusé 😃.`,
  },
  {
    label: 'Renouvellement',
    description:
      "Si votre assurance arrive a sa fin vous pouvez la renouvller facilement en ligne 😊.",
  },
  {
    label: 'Et autres ...',
    description:
      "On vous laisse découvrir vous-même 😊.",
  },
  
];



export default function About() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStep1, setActiveStep1] = React.useState(0);
  const [activeStep2, setActiveStep2] = React.useState(0);
  const [activeStep3, setActiveStep3] = React.useState(0);
  const [activeStep4, setActiveStep4] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext1 = () => {
    setActiveStep1((prevActiveStep1) => prevActiveStep1 + 1);
  };

  const handleBack1 = () => {
    setActiveStep1((prevActiveStep1) => prevActiveStep1 - 1);
  };

  const handleNext2 = () => {
    setActiveStep2((prevActiveStep2) => prevActiveStep2 + 1);
  };

  const handleBack2 = () => {
    setActiveStep2((prevActiveStep2) => prevActiveStep2 - 1);
  };

  const handleNext3 = () => {
    setActiveStep3((prevActiveStep3) => prevActiveStep3 + 1);
  };

  const handleBack3 = () => {
    setActiveStep3((prevActiveStep3) => prevActiveStep3 - 1);
  };

  const handleNext4 = () => {
    setActiveStep4((prevActiveStep4) => prevActiveStep4 + 1);
  };

  const handleBack4 = () => {
    setActiveStep4((prevActiveStep4) => prevActiveStep4 - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [Bool , setBool ] = React.useState(true);

  const [open , setopen ] = React.useState(false);
     
      const  openNav =(e) => {
        e.preventDefault();
        setopen(prevopen => !prevopen) ;
      }
  return (
    <>

      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars style={{marginLeft:'30px'}} size={25} onClick={openNav} />
          </NavIcon>
        </Nav>
        <a>
              <div className="navlogos2">
                <img src="https://firebasestorage.googleapis.com/v0/b/asfaleia-vehicule.appspot.com/o/lo3.png?alt=media" className="logo2" />
              </div>
              </a> 
        </IconContext.Provider>

        {open ?
        <div className='NavIco2'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
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

    <div className="Videoo">
      {/* <video loop autoPlay="true" width="750" height="200" controls >
      <source src={"../video/trap.mp4"} type="video/mp4"/>
      </video> */}
      <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/WZipC2ofBMw`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
      </div> 

    <Box sx={{marginLeft:"5%" , width: '90%' , backgroundColor: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered={Bool} value={value}  allowScrollButtonsMobile variant='scrollable' onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Premiers etapes" {...a11yProps(0)} />
          <Tab label="Le profil" {...a11yProps(1)} />
          <Tab label="Avantages" {...a11yProps(2)} />
          {/* <Tab label="Item Three" {...a11yProps(3)} />
          <Tab label="Item Three" {...a11yProps(4)} />
          <Tab label="Item Three" {...a11yProps(5)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div style={{padding : "2%"}}>
     

     <Grid container component="main" sx={{ height: '100%', boxShadow: "3px 3px 8px 8px rgba(150,150,150,0.64)"}}>
       <CssBaseline />
       
       <Grid  xs={12} sm={8} md={7}  elevation={6} square container>
         <Box
           sx={{
             my: 8,
             mx: 4,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
           }}
         >
           
            <Typography variant="h4">Comment Fonctionne Asfaleia</Typography>
            <Typography variant='body1'>C'est plus tot simple vous n'avez qu'a suivre les etapes suivantes</Typography>
           <Box sx={{ maxWidth: '100%',marginTop: '5%' }}>
     <Stepper activeStep={activeStep} orientation="vertical">
       {steps.map((step, index) => (
         <Step key={step.label}>
           <StepLabel
             optional={
               index === 2 ? (
                 <Typography variant="caption">Last step</Typography>
               ) : null
             }
           >
             {step.label}
           </StepLabel>
           <StepContent>
             <Typography>{step.description}</Typography>



             <Box sx={{ mb: 2 }}>
               <div>
                 <Button
                   variant="contained"
                   onClick={handleNext}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
                 </Button>
                 <Button
                   disabled={index === 0}
                   onClick={handleBack}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   Back
                 </Button>
               </div>
             </Box>
           </StepContent>
         </Step>
       ))}
     </Stepper>
     
   </Box>
           
      </Box>
       </Grid>


       <Grid
         
         xs={false}
         sm={2}
         md={5}
         sx={{
           backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
     </Grid>

   </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div style={{padding : "2%"}}>
     

     <Grid container component="main" sx={{ height: '100vh', boxShadow: "3px 3px 8px 8px rgba(150,150,150,0.64)"}}>
       <CssBaseline />
       
       <Grid  xs={12} sm={8} md={7}  elevation={6} square container>
         <Box
           sx={{
             my: 8,
             mx: 4,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
           }}
         >
           
            <Typography variant="h4">Une fois sur votre profil</Typography>
            <Typography variant='body1'>C'est plus tot simple vous n'avez qu'a suivre les etapes suivantes</Typography>
           <Box sx={{ maxWidth: '100%',marginTop: '5%' }}>
     <Stepper activeStep={activeStep1} orientation="vertical">
       {steps1.map((step, index) => (
         <Step key={step.label}>
           <StepLabel
             optional={
               index === steps1.length-1 ? (
                 <Typography variant="caption">Last step</Typography>
               ) : null
             }
           >
             {step.label}
           </StepLabel>
           <StepContent>
             <Typography>{step.description}</Typography>



             <Box sx={{ mb: 2 }}>
               <div>
                 <Button
                   variant="contained"
                   onClick={handleNext1}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
                 </Button>
                 <Button
                   disabled={index === 0}
                   onClick={handleBack1}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   Back
                 </Button>
               </div>
             </Box>
           </StepContent>
         </Step>
       ))}
     </Stepper>
     
   </Box>
           
      </Box>
       </Grid>


       <Grid
         
         xs={false}
         sm={2}
         md={5}
         sx={{
           backgroundImage: 'url(https://www.transpoco.com/hubfs/Car%20headlights%20dangerous%20on%20UK%20roads.jpg)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
     </Grid>

   </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div style={{padding : "2%"}}>
     

     <Grid container component="main" sx={{ height: '100vh', boxShadow: "3px 3px 8px 8px rgba(150,150,150,0.64)"}}>
       <CssBaseline />
       
       <Grid  xs={12} sm={8} md={7}  elevation={6} square container>
         <Box
           sx={{
             my: 8,
             mx: 4,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
           }}
         >
           
            <Typography variant="h4">Que peut-on faire ?</Typography>
            <Typography variant='body1'>Plusieurs choses comme ...</Typography>
           <Box sx={{ maxWidth: '100%',marginTop: '5%' }}>
     <Stepper activeStep={activeStep2} orientation="vertical">
       {steps2.map((step, index) => (
         <Step key={step.label}>
           <StepLabel
             optional={
               index === steps2.length - 1 ? (
                 <Typography variant="caption">Last step</Typography>
               ) : null
             }
           >
             {step.label}
           </StepLabel>
           <StepContent>
             <Typography>{step.description}</Typography>



             <Box sx={{ mb: 2 }}>
               <div>
                 <Button
                   variant="contained"
                   onClick={handleNext2}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
                 </Button>
                 <Button
                   disabled={index === 0}
                   onClick={handleBack2}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   Back
                 </Button>
               </div>
             </Box>
           </StepContent>
         </Step>
       ))}
     </Stepper>
     
   </Box>
           
      </Box>
       </Grid>


       <Grid
         
         xs={false}
         sm={2}
         md={5}
         sx={{
           backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
     </Grid>

   </div>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
      <div style={{padding : "2%"}}>
     

     <Grid container component="main" sx={{ height: '100vh', boxShadow: "3px 3px 8px 8px rgba(150,150,150,0.64)"}}>
       <CssBaseline />
       
       <Grid  xs={12} sm={8} md={7}  elevation={6} square container>
         <Box
           sx={{
             my: 8,
             mx: 4,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
           }}
         >
           
            <Typography variant="h4">Comment Fonctionne Asfaleia</Typography>
            <Typography variant='body1'>C'est plus tot simple vous n'avez qu'a suivre les etapes suivantes</Typography>
           <Box sx={{ maxWidth: '100%',marginTop: '5%' }}>
     <Stepper activeStep={activeStep} orientation="vertical">
       {steps.map((step, index) => (
         <Step key={step.label}>
           <StepLabel
             optional={
               index === 2 ? (
                 <Typography variant="caption">Last step</Typography>
               ) : null
             }
           >
             {step.label}
           </StepLabel>
           <StepContent>
             <Typography>{step.description}</Typography>



             <Box sx={{ mb: 2 }}>
               <div>
                 <Button
                   variant="contained"
                   onClick={handleNext}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
                 </Button>
                 <Button
                   disabled={index === 0}
                   onClick={handleBack}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   Back
                 </Button>
               </div>
             </Box>
           </StepContent>
         </Step>
       ))}
     </Stepper>
     
   </Box>
           
      </Box>
       </Grid>


       <Grid
         
         xs={false}
         sm={2}
         md={5}
         sx={{
           backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
     </Grid>

   </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div style={{padding : "2%"}}>
     

     <Grid container component="main" sx={{ height: '100vh', boxShadow: "3px 3px 8px 8px rgba(150,150,150,0.64)"}}>
       <CssBaseline />
       
       <Grid  xs={12} sm={8} md={7}  elevation={6} square container>
         <Box
           sx={{
             my: 8,
             mx: 4,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
           }}
         >
           
            <Typography variant="h4">Comment Fonctionne Asfaleia</Typography>
            <Typography variant='body1'>C'est plus tot simple vous n'avez qu'a suivre les etapes suivantes</Typography>
           <Box sx={{ maxWidth: '100%',marginTop: '5%' }}>
     <Stepper activeStep={activeStep} orientation="vertical">
       {steps.map((step, index) => (
         <Step key={step.label}>
           <StepLabel
             optional={
               index === 2 ? (
                 <Typography variant="caption">Last step</Typography>
               ) : null
             }
           >
             {step.label}
           </StepLabel>
           <StepContent>
             <Typography>{step.description}</Typography>



             <Box sx={{ mb: 2 }}>
               <div>
                 <Button
                   variant="contained"
                   onClick={handleNext}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
                 </Button>
                 <Button
                   disabled={index === 0}
                   onClick={handleBack}
                   sx={{ mt: 1, mr: 1 }}
                 >
                   Back
                 </Button>
               </div>
             </Box>
           </StepContent>
         </Step>
       ))}
     </Stepper>
     
   </Box>
           
      </Box>
       </Grid>


       <Grid
         
         xs={false}
         sm={2}
         md={5}
         sx={{
           backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
     </Grid>

   </div>
      </TabPanel> */}
    </Box>
    </>
  );
}