import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import AuthService from "../../authServices/apicalls";
import DeleteDialog from '../modals/DeleteModal';
import { columns, formatDate } from "../../helpers";
import { MoreVert as MoreIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  paper: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "1px 3px 5px 3px #d4d0d0",
    padding: 15,
    margin: "50px auto",
    flexGrow: 1,
  },
  bold: {
    fontWeight: "600",
  },
});

const BasicTable = ({ fetchData, editHandler, data }) => {
  const classes = useStyles();
  const [dataId, setdataId] = useState("");
  const [deleteModal, setdeleteModal] = useState(false);
  const [ButtonRef, setButtonRef] = useState(null);
  const open = Boolean(ButtonRef);

  const deleteModalHandle = () => {
    if (deleteModal) {
      setdeleteModal(false);
    } else {
      setdeleteModal(true);
    }
  };

  const handleClose = () => {
    setButtonRef(null);
  };

  const deleteHandler = () => {
    AuthService.deleteUserById(dataId).then(
      (data) => {
        setdeleteModal(false);
        fetchData();
      },
      (error) => {
        setdeleteModal(false);
      }
    );
  };

  const handleClick = (event, data) => {
    setdataId(data._id);
    setButtonRef(event.currentTarget);
  };
  return (
    <React.Fragment>
      {deleteModal && (
        <DeleteDialog
          deleteModal={deleteModal}
          CloseDeleteModal={deleteModalHandle}
          deleteHandler={deleteHandler}
        />
      )}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className={classes.bold}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{formatDate(row.joined_date)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <IconButton
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, row)}
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
              <Button onClick={()=>editHandler(dataId)}>Edit</Button>
            </MenuItem>
            <MenuItem>
              <Button onClick={()=>setdeleteModal(true)}>Delete</Button>
            </MenuItem>
          </Menu>
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
};
export default BasicTable;
