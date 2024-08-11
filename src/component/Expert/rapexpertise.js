import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }
  
export default function DossierC (){
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
      setValue(event.target.value);
    };



    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const [right, setRight] = React.useState([]);
  
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
    const numberOfChecked = (items) => intersection(checked, items).length;
  
    const handleToggleAll = (items) => () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
      } else {
        setChecked(union(checked, items));
      }
    };
  
    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };
  
    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
          <CardHeader
            sx={{ px: 2, py: 1 }}
            avatar={
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={
                  numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{
                  'aria-label': 'all items selected',
                }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
          />
          <Divider />
          <List
            sx={{
              width: 200,
              height: 230,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
            dense
            component="div"
            role="list"
          >
            {items.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`;
    
              return (
                <ListItem
                  key={value}
                  role="listitem"
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </Card>
      );




return(

<React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" sx={{alignItems:'center', bgcolor:'white'}}> 
   

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' , display:'flex', },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="Nom" label="Nom" variant="standard" />
      <TextField id="Code" label="Code" variant="standard" />
      

       <br/>
      
       <Typography variant="h4" gutterBottom component="div">
Car Specs      </Typography>
       
       <TextField id="Code" label="Code" variant="standard" size='normal' />
       <TextField id="Code" label="Code" variant="standard" />
       <TextField id="Code" label="Code" variant="standard" size='normal' />
       <TextField id="Code" label="Code" variant="standard" />

       <TextField id="Code" label="Code" variant="standard" size='normal' />
       <TextField id="Code" label="Code" variant="standard" />


       <Typography variant="h4" gutterBottom component="div" sx={{textAlign:'center'}}>
Zones endomages      </Typography>
  


    </Box>

    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
    
    </Container>
    </React.Fragment>
);
}