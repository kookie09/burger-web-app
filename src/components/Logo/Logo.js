import React from 'react';

import logoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className = {classes.Logo}>
        <img src = {logoImage} alt = "Burger App"/>
    </div>
);

export default logo;