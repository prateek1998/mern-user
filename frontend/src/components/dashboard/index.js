import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../authServices/apicalls";
import SideBarModal from "../modals/SidebarModal";
import UserTable from "../Table";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: "80%",
      margin: "0 auto",
    },
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      margin: "2% 0",
    },
  },
  buttonStyle: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const defaultData = {
  name: "",
  email: "",
  phone: "",
};
const Dashboard = () => {
  const classes = useStyles();
  const [formData, setformData] = useState(defaultData);
  const [AddModal, setAddModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [TableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const AddModalChange = () => {
    if (AddModal) {
      setAddModal(false);
    } else {
      setAddModal(true);
    }
  };
  const EditModalChange = () => {
    if (UpdateModal) {
      setUpdateModal(false);
    } else {
      setUpdateModal(true);
    }
  };

  const fetchUserData = async () => {
    AuthService.getAllUsers().then(
      (data) => {
        if (data.status) {
          setTableData(data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  };
  const fetchEditUser = (dataId) => {
    AuthService.getUserById(dataId).then(
      (data) => {
        setformData(data.data);
        EditModalChange();
      },
      (error) => {
        EditModalChange();
      }
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <React.Fragment>
      <SideBarModal
        openModal={AddModal}
        mode="create"
        closeModal={AddModalChange}
        FormData={formData}
        fetchData={fetchUserData}
      />
      <SideBarModal
        openModal={UpdateModal}
        mode="update"
        closeModal={EditModalChange}
        FormData={formData}
        fetchData={fetchUserData}
      />
      <Grid container spacing={2} className={classes.root}>
        <Grid item md={12} xs={12} sm={12} className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddModal(true)}
          >
            <PersonAddIcon fontSize="small" />
            <Typography variant="body1" className={classes.buttonStyle}>
              Add User
            </Typography>
          </Button>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          {!loading && TableData && (
            <UserTable
              data={TableData}
              editHandler={fetchEditUser}
              fetchData={fetchUserData}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
