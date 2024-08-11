import React, { useEffect, useState,useRef} from "react";
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
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Checkmark } from "react-checkmark";

export default function ContractCheck (){
    const idCar = useParams();
    const [car, setCar]=useState()
    const[State ,setState]=useState(null)
    const [mode, setMode] = useState(MODES.SUCCESS)

    const get = async ()=>{

    const Cars = await getDoc(doc(db, "Users", idCar.uid , "cars" , idCar.idC));
    setCar(Cars.data());
    // console.log(Cars);
    // console.log(Cars.exists());
    

    if(Cars.exists()){
        setState(true)
    }
    else if(!Cars.exists()) {
        setState(false)
    }
    

    }


    useEffect(() => {
       
       get(); 
        
      }, []);
    





return(
    <div>
        {State === true && (
        <>
        <div style={{marginTop: '10%', width : '30%', marginLeft: '30%',boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)'}}>
        <Checkmark size={60} />
        <Typography variant='h4'>Ceci est un contrat authentique</Typography>
          
      
        </div>
        </>)}

        {State === false && (
        <>
        <div style={{marginTop: '10%',height : '20%', width : '30%', marginLeft: '30%',boxShadow: '0 1px 1px rgb(0 0 0 / 0.2)'}}>   
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" style={{height : '20%', width : '30%'}}>
        <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
        <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
        </svg>
        <Typography variant='h4'>Ce contrat n'est pas authentique</Typography>        
            </div>
        </>)}

    </div>
)
}
// import React, { useEffect, useState,useRef} from "react";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// import Button from '@mui/material/Button';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageIcon from '@mui/icons-material/Image';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';

// import TextField from '@mui/material/TextField';

// import Grid from '@mui/material/Grid';
  


// import { auth, db ,setDoc ,addDoc} from "../../bdd/firebase";
// import { updateDoc, doc ,getDoc ,Timestamp} from "firebase/firestore";
// import {onAuthStateChanged, } from "firebase/auth";
// import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


// export default function ContractCheck (){
//     const idCar = useParams();
//     console.log(idCar)
//     const [car, setCar]=useState()
//     const[ex ,setEx]=useState(false)
//     const get = async ()=>{

//     const Cars = await getDoc(doc(db, "Users", idCar.uid , "cars" , idCar.idC));
//     setCar(Cars.data());
    

//     }
//     get()
// if (car == undefined){
//     return (
//         <div>   
//          <h1>nope</h1>
//         </div>
//     )
// }



// if (car != undefined){
//     return (
//         <div>
//          <img src="http://www.pigmazur.fr/wp-content/uploads/2020/05/check-mark-1292787_1280.png" alt="degats" className='imgbx' style={{}}/>
   
//          <h1>yellaaa</h1>
//         </div>
//     )
// }

// }