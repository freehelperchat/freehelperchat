import React from 'react';
import { FiHome, FiSettings } from 'react-icons/fi';

import NavbarItem from 'components/layout/navbar/navbarItem/NavbarItem';

import classes from './Navbar.module.css';

const Navbar: React.FC = () => (
  <ul className={classes.Navbar}>
    <NavbarItem path="/admin" exact>
      <FiHome size={18} /> Painel
    </NavbarItem>
    <NavbarItem path="/admin/settings">
      <FiSettings size={18} /> Configurações
    </NavbarItem>
  </ul>
);

export default Navbar;
