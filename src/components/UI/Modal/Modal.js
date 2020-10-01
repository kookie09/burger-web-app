import React from 'react';

import classes from './Modal.module.css';

const modal =(prop) => (
    <div className = {classes.Modal}>
        {prop.children}
    </div>
);

export default modal;