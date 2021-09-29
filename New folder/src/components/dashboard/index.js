import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AuthService from '../../authServices/apicalls';
import UserTable from '../Table';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttonStyle: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const Dashboard = () => {
    const classes = useStyles();
    const [TableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchUserData = async () => {
            AuthService.getAllUsers().then((data) => {
                if (data.status) {
                    console.log(data)
                    setTableData(data.data)
                }
            },
                (error) => {
                    console.log(error);
                }
            );
            setLoading(false);
        };
        fetchUserData();
    }, [])
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {/* <Grid item md={10} xs={12} sm={12}>
                    <Button variant="contained" color="primary">
                        <PersonAddIcon fontSize="small" />
                        <Typography variant="body1" className={classes.buttonStyle} > Add User</Typography>
                    </Button>
                </Grid> */}
                <Grid item md={12} xs={12} sm={12}>
                    {!loading && <UserTable data={TableData}/>}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard
