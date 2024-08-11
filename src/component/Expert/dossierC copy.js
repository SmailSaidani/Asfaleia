import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Sidebar from './sidebar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';




import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function DossierC (){

    return(

        <div>
<Sidebar/>
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">

          <Box   sx={{ bgcolor: '#cfe8fc', height: '100vh' , alignContent:'center'}}
           >   
           
                   <Avatar  sx={{marginLeft: '5%', width: 56, height: 56}} alt="Remy Sharp" src="https://i.pinimg.com/564x/ea/68/12/ea6812beaff7194a82075282263699ba.jpg" /><h1>Name Le Klebs</h1>
           
                   <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#cfe8fc' }}>
                       <h1>Liste des vehicules assures</h1>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="Remy Sharp" src="https://i.pinimg.com/564x/ea/68/12/ea6812beaff7194a82075282263699ba.jpg" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Logan" secondary=" Date fin  d assurance Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="Remy Sharp" src="https://i.pinimg.com/564x/ea/68/12/ea6812beaff7194a82075282263699ba.jpg" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Logan" secondary=" Date fin  d assurance Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="Remy Sharp" src="https://i.pinimg.com/564x/ea/68/12/ea6812beaff7194a82075282263699ba.jpg" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Logan" secondary=" Date fin  d assurance Jan 7, 2014" />
      </ListItem>
    </List>
  




    <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#cfe8fc' }}>
                       <h1>Liste des constat en cours </h1>
      <ListItem>
        <ListItemAvatar>
       
        </ListItemAvatar>
        <ListItemText primary="Logan" secondary=" Date fin  d assurance Jan 7, 2014" />Etat <Alert sx={{bgcolor: '#cfe8fc'}} severity="warning"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
      
        </ListItemAvatar>
        <ListItemText primary="Logan" secondary=" Date fin  d assurance Jan 7, 2014" />     Etat <Alert sx={{bgcolor: '#cfe8fc'}} severity="error"/>

      </ListItem>
      <ListItem>
        <ListItemAvatar>
        
        </ListItemAvatar>
        <ListItemText primary="Logan" secondary=" Date fin  d assurance Jan 7, 2014" />  Etat <Alert sx={{bgcolor: '#cfe8fc'}} severity="success"/>
      </ListItem>
    </List>
  
           </Box>

        </Container>
      </React.Fragment>


      
      </div>
    )
}