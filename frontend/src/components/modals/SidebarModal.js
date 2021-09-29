import React,{useState} from "react";
import { Formik, Form } from 'formik';
import * as yup from 'yup';                              
import {
    Typography,
    Grid,
    TextField,
    DialogTitle,
    DialogContent,
    IconButton,
    makeStyles,
    Dialog,
    Button
} from "@material-ui/core";
import Swal from 'sweetalert2';
import AuthService from "../../authServices/apicalls";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        width: "50px",
        flexDirection: "column",
        alignItems: "center",
    },
    dialogPaper: {
        position: "absolute",
        width: "30%",
        height: "101%",
        [theme.breakpoints.down("md")]: {
            width: "40%",
            left: "58vw",
        },
        [theme.breakpoints.down("xs")]: {
            width: "80%",
            left: "12vw",
        },
        left: "68vw",
        top: "-5%",
        maxHeight: "101%",
        animation: "$slideLeft 0.5s",
    },
    "@keyframes slideLeft": {
        from: {
            marginLeft: "80%",
        },
        to: {
            marginLeft: "0%",
        },
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        "&:hover": {
            backgroundColor: "#e9ecef",
        },
    },
    form:{
        marginTop:"15px"
    }, 
    submit:{
        backgroundColor: "#ccfed8",
        color: "#43ce81",
        transition: ".5s background-color",
        "&:hover": {
            backgroundColor: "#9cffc6",
        },
    },
    cancel:{
        backgroundColor: "#ffaeb2",
        color: "#ea5455",
        transition: ".5s background-color",
        "&:hover": {
            backgroundColor: "#fe9096",
        },
    },   
}));

const ValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required"),
    email: yup
      .string()
      .email()
      .required("Email is required"),
    phone: yup
      .string()
      .typeError('Entered value should be a valid number')
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, 'Must be exactly 10 digits')
      .max(11, 'Must be exactly 10 digits')
      .required('This field is required'),  
  })

 
const SidebarModal = ({ openModal, mode, closeModal, fetchData, FormData }) => {
    const classes = useStyles();
    const handleClose =()=>{
        closeModal();
    }
    return (
        <React.Fragment>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={openModal}
                onClose={closeModal}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle style={{ backgroundColor: "#e9ecef" }}>
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{ fontWeight: "bold" }}
                        align="center"
                    >
                        {mode==="create"? "Add User": "Update Existing User"}
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={FormData}
                        onSubmit={(values, { resetForm }) => {
                            // console.log(values);
                            handleClose();
                            Swal.fire({
                                title: 'Please Wait !',
                                html: 'data uploading',// add html attribute if you want or remove
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                showConfirmButton:false,
                                onBeforeOpen: () => {
                                    Swal.showLoading()
                                },
                            });
                            if(mode ==="create"){
                                AuthService.PushNewUser(values)
                                .then(function (response) {
                                    // console.log(response)
                                  if(response.status){
                                    Swal.fire({
                                        title: 'Success!',
                                        text: '👍User added successfully',
                                        icon: 'success',
                                        showCloseButton: true,
                                        confirmButtonText: 'Okay'
                                      })
                                    fetchData()
                                    resetForm();
                                  }
                                })
                                .catch(function (error) {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    showCloseButton: true,
                                    text: 'Something went wrong!',
                                  })
                                  console.error("err",error);
                                })
                            } else{
                                AuthService.updateUserById(values)
                                .then(function (response) {
                                    if(response.status){
                                        Swal.fire({
                                            title: 'Success!',
                                            text: '👍User updated successfully',
                                            icon: 'success',
                                            showCloseButton: true,
                                            confirmButtonText: 'Okay'
                                        })
                                        fetchData()
                                        resetForm();
                                    }
                                })
                                .catch(function (error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        showCloseButton: true,
                                        text: 'Something went wrong!',
                                    })
                                    console.error("err",error);
                                })
                            }
                        }}
                        validationSchema={ValidationSchema}
                    >
                    {({ errors, touched, values, setFieldValue, handleChange }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                {/* <Grid item md={12} xs={12} sm={12}>
                                    <FormControl className={classes.selectStyle}>
                                        <TextField
                                            size="small"
                                            select
                                            label="label"
                                            name="label"
                                            value={values.label}
                                            onChange={handleChange}
                                            error={errors.label && touched.label}
                                            helperText={errors.label && touched.label ? errors.label : ""}
                                        >
                                            {LabelOptions.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                    {option.icon}{option.text}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid> */}
                                <Grid item md={12} xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        id="name"
                                        label="User Name *"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}                                        
                                        error={errors.name && touched.name}
                                        helperText={errors.name && touched.name ? errors.name : ""}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        id="email"
                                        label="Email Address *"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? errors.email : ""}
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        id="phone"
                                        label="Phone Number*"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        error={errors.phone && touched.phone}
                                        helperText={errors.phone && touched.phone ? errors.phone : ""}
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        className={classes.submit}
                                    >
                                        {mode==="create"? "Add ": "Update"}
                                    </Button>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        className={classes.cancel}
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>                                                                                                
                            </Grid>                            
                        </Form>
                    )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default SidebarModal;
