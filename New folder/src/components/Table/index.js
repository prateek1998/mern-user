import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, IconButton, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Menu, MenuItem, Button, } from '@material-ui/core';
import { MoreVert as MoreIcon } from '@material-ui/icons';

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '1px 3px 5px 3px #d4d0d0',
        padding: 15,
        margin: '50px auto',
        flexGrow: 1,
    },
});

const BasicTable = ({data}) => {
    console.log(data)
  const classes = useStyles();
  const [dataId, setdataId] = useState('');
  const [ButtonRef, setButtonRef] = useState(null);
  const open = Boolean(ButtonRef);
  
  const handleClose = () => {
    setButtonRef(null);
  };
  const editHandler = () => {
    // if (OpenEditModal) {
    //   setOpenEditModal(false);
    // } else {
    //   setOpenEditModal(true);
    // }
  };
  const OpenDeleteModal = () => {
    // setdeleteModal(true);
  };
  const handleClick = (event, data) => {
    setdataId(data._id);
    setButtonRef(event.currentTarget);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
              <IconButton
                    aria-owns="widget-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, data)}
                  >
                    <MoreIcon />
                  </IconButton>      
            </TableCell>
            </TableRow>
          ))}
            <Menu
              id="widget-menu"
              open={open}
              anchorEl={ButtonRef}
              keepMounted
              onClose={handleClose}
              disableAutoFocusItem
            >
              <MenuItem>
                <Button onClick={editHandler}>Edit</Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={OpenDeleteModal}>Delete</Button>
              </MenuItem>
            </Menu>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;