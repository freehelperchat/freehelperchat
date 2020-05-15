import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiHome, FiSettings } from 'react-icons/fi';

import NavbarItem from 'components/layout/navbar/navbarItem/NavbarItem';

import classes from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ul className={classes.Navbar}>
      <NavbarItem path="/admin" exact>
        <FiHome size={18} /> {t('navbar.dashboard')}
      </NavbarItem>
      <NavbarItem path="/admin/settings">
        <FiSettings size={18} /> {t('navbar.settings')}
      </NavbarItem>
    </ul>
  );
};

export default Navbar;
