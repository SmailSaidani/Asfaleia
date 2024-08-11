import React  from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';





// import Form from './component/form';

import Acceuil from './component/acceuil';
import Client from "./component/clients"
import ResponsiveDialog from './component/map';
import about from './component/about';
import Catalogue from './component/Catalogue';

//==============================================
 
import Login from './component/Client/login';
import Signup from './component/Client/signup';
import Profil from './component/Client/profil';
import ConstatF from './component/Client/formull';
import Contratau from './component/Client/contratau';
import CarDetails from './component/Client/CarDe';
import Inajou from './component/Client/inajou';
import Settings from './component/Client/settings';
import RecConst from './component/Client/formulRec';

//==============================================
 
import Dashboard from './component/Admin/dashboard';
import CarDetails2 from './component/Admin/carDea';
import Constat from './component/Admin/constDe';
import Constats from './component/Admin/Constats'
import Cft from './component/Admin/cft';
import Gestion from './component/Admin/gest';
import Rapport from "./component/Admin/Rapport";
import MiseAj from "./component/Admin/MiseAJ";
//==============================================
 
import DossierC from './component/Expert/dossierC';
import Expert from './component/Expert/expet';
import Rapexpertise from './component/Expert/rapexpertise';
import Pvexp from './component/Expert/pvexp';
import Settings1 from './component/Expert/settings';
import ContratVe from './component/Admin/ContratVe';









function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
      //---------------------generale
      <Route exact path='/' component={Acceuil}/>
      <Route exact path='/connexion' component={Login}/>
      <Route exact path='/inscription' component={Signup}/>
      <Route exact path='/about' component={about}/>
      <Route exact path='/Catalogue' component={Catalogue}/>
      <Route exact path='/map' component={ResponsiveDialog}/>

      //---------------------client
              
      <Route exact path='/profil' component={Profil}/>
      <Route exact path='/form' component={ConstatF}/>
      <Route exact path='/Rectifier-const/:idCon' component={RecConst}/>
      <Route exact path='/Ajouter' component={Inajou}/>
      <Route exact path='/Car/:idC' component={CarDetails}/> 
      <Route exact path='/contract/:idC' component={Contratau}/>
      <Route exact path='/Settings' component={Settings}/>
      
      

      //---------------------admin

      <Route exact path='/dashboard' component={Dashboard}/>
      <Route exact path='/Constats' component={Constats}/>
      <Route exact path='/constat/:idCo' component={Constat}/>
      <Route exact path='/details-car/:idC&:carid' component={CarDetails2}/>
      <Route exact path='/Contrat/:idC&:carid' component={ContratVe}/>
      <Route exact path='/client/:id' component={Client}/>
      <Route exact path='/Expert/:id' component={Client}/>
      <Route exact path='/Mise-a-jour/:id' component={MiseAj}/>
      
      <Route exact path='/Rapport/:id' component={Rapport}/>
      <Route exact path='/Gestion' component={Gestion}/>
     

      //---------------------expert 

      <Route exact path='/dossierC' component={DossierC}/>
      <Route exact path='/expert' component={Expert}/>
      <Route exact path='/Setting' component={Settings1}/>


      <Route exact path='/rapexpertise' component={Rapexpertise}/>
      
      <Route exact path='/PVexp/:idCo' component={Pvexp}/>
      <Route exact path='/cft/:id' component={Cft}/>


      {/* <Route exact path='/form' component={Form}/> */}

      
      
      

        
      </Switch>
    </Router>
    </div>
  );
}

export default App;