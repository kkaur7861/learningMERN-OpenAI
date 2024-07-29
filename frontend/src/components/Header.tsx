import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import Logo from './shared/Logo';

const Header=()=>{
    return(
        <AppBar sx={{position:"static"}}>
            <Toolbar sx={{display:'flex'}}>
                <Logo/>
            </Toolbar>
        </AppBar>
    )
}

export default Header
