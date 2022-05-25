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

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="./Home">
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
    const user = {
      firstname: firstName.current.value,
      lastname: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      phone:phone.current.value
    };
    //Sending request to backend requesting to store the provided information
    fetch("/api/login/newUser", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((data) => {
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
        } else {
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={lastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  inputRef={phone}
                  pattern="[0-9]{10}"
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./Signin" variant="body2">
                  Already have an account? Sign in
                </Link>
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
