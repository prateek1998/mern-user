import React from 'react'
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography } from '@material-ui/core';
import {People as PeopleIcon} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        // marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));
const Header = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <PeopleIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {/* MERN User Module */}
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header
