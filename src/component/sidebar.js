import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import Dvr from '@mui/icons-material/Dvr';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';


import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

import { auth, logoutUser  } from "../bdd/firebase";


import "./Client/profile.css";
//15171c
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

const SidebarNav = styled.nav`
  background: rgb(46, 47, 48);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;






const Sidebar = () => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();

  
const goDash = () =>{
  history.push('/dashboard')
  window.location.reload('/dashboard');
}


const goCon = () =>{
  history.push('/Form')
  window.location.reload('/Form');
}


const dec =()=>{
  logoutUser();
  setTimeout(() => {
     window.location.reload(`/`); 
  }, 100);
  
}

const ite = {
  title: 'dashboard',
  path: '/dashboard',
  icon: <BsIcons.BsFillPersonFill />,
}
const ite1 = {
  title: 'Constats',
  path: '/Constats',
  icon: <IoIcons.IoIosPaper />,
}
const ite2 = {
  title: 'dossierC',
  path: '/dossierC',
  icon: <FaIcons.FaCartPlus />
}
const ite3 = {
  title: 'Deconnecter',
  path: '/',
  icon: <AiIcons.AiOutlineLogout />
}



  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars size={25} onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <a>
              <div className="navlogos2">
                <img src="https://firebasestorage.googleapis.com/v0/b/asfaleia-vehicule.appspot.com/o/lo3.png?alt=media" className="logo2" />
              </div>
              </a> 
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose size={20} style={{marginRight:'15%'}} onClick={showSidebar} />
            </NavIcon>
            <a>
              <div style={{marginLeft:'55%'}} className="navlogos">
                <img src="https://firebasestorage.googleapis.com/v0/b/asfaleia-vehicule.appspot.com/o/lo3.png?alt=media" className="logo" />
              </div>
              </a> 
            {/* {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })} */}
            <Link className='navbar' onClick={() => window.location.href="/dashboard"}> <Dvr className='iconnv'/> <div className='textN'>Dashboard</div></Link>
            
            <Link className='navbar' onClick={() => window.location.href="/Constats"}> <ArticleIcon className='iconnv'/> <div className='textN'>Constats</div> </Link>
            
            <Link className='navbar' onClick={() => window.location.href="/Gestion"}> <SettingsSuggestIcon className='iconnv'/> <div className='textN'>Gestion</div> </Link>

            <Link className='navbar' onClick={dec} > <AiIcons.AiOutlineLogout className='iconnv' />  <div className='textN'>Deconnecter</div> </Link>
            
            {/* <div className='decB' ><SubMenu  item={ite3} /></div> */}
            
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
