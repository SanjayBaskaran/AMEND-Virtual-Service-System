import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LinearProgress, Snackbar, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import bcrypt from 'bcryptjs';

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="./index">
        Amend.in
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  //Form data
  const firstName = React.useRef();
  const lastName = React.useRef();
  const email = React.useRef();
  const password = React.useRef();
  const phone = React.useRef();
  //SnackBar for Status Message
  const [open, setOpen] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  //Loading message
  const [loading, setLoading] = React.useState(false);
  //Form Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      firstName.current.value == "" ||
      lastName.current.value == "" ||
      email.current.value == "" ||
      password.current.value == ""||
      phone.current.value.length < 10||
      isNaN(phone.current.value)
    ) {
      setOpen((prevState) => {
        return {
          open: true,
          severity: "warning",
          message: "Enter valid details",
        };
      });
      return;
    }
    const data = new FormData(event.currentTarget);
    setLoading(true);
    //Fetching form data

    bcrypt.hash(password.current.value,10,(err,hash)=>{
      if(err)
        return;
      const user = {
        firstname: firstName.current.value,
        lastname: lastName.current.value,
        email: email.current.value,
        password: hash,
        phone:phone.current.value
      };
      //Sending request to backend requesting to store the provided information
      fetch("/api/login/newUser", {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((data) => {
          console.log(data);
          if (data.status == 201) {
            setOpen((prevState) => {
              return {
                open: true,
                severity: "success",
                message: "Successfully created !",
              };
            });
  
            fetch("/api/email",{
              method:"POST",
              body:JSON.stringify({semail:user.email,msg:"Thanks for registering into AMEND ",subject:"Successful Signup"})
            }).then((res)=>{
              console.log(res);
            }).catch((err)=>{
              console.log(err);
            });
          }else if(data.status==401) {
            setOpen((prevState) => {
              return {
                open: true,
                severity: "error",
                message: "Email id already exists!",
              };
            });
          } 
          
          else {
            setOpen((prevState) => {
              return {
                open: true,
                severity: "error",
                message: "Error in SignUp",
              };
            });
          }
          firstName.current.value = "";
          lastName.current.value = "";
          email.current.value = "";
          password.current.value = "";
          phone.current.value = "";
          setLoading(false);
        })
        .catch((err) => {
          setOpen((prevState) => {
            return {
              open: true,
              severity: "error",
              message: "Error in SignUp",
            };
          });
  
          firstName.current.value = "";
          lastName.current.value = "";
          email.current.value = "";
          password.current.value = "";
          phone.current.value = "";
          setLoading(false);
        });  
    });
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter the OTP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                inputProps={{ pattern: "[0-9]{1}" ,type:"number",min:0,max:9}}
                onInput = {(e) =>{
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
              }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  fullWidth
                />
              </Grid>
              </Grid>
          </Box>
        </Box>
        <Snackbar
          open={open.open}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason == "clickaway") {
              return;
            }
            setOpen((prevState) => {
              return {
                open: false,
                message: prevState.message,
              };
            });
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={open.severity}
            sx={{ width: "100%" }}
          >
            {open.message}
          </MuiAlert>
        </Snackbar>

        <Dialog open={loading}>
          <LinearProgress />
          <DialogTitle>{"Registering User"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Processing</DialogContentText>
          </DialogContent>
        </Dialog>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
