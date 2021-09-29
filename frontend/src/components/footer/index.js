import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    left:'0px',
    bottom:'0px',
    position: "fixed",
    overflow: "hidden",
    padding: "2em 0 ",
  },
  link: {
    fontSize: "1.25em",
    color: "#fff",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justify="center">
            <Grid item>
            <Typography
                  className={classes.link}
               
                >
                  Made with &#10084; By Prateek Saini
                </Typography>
            </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;