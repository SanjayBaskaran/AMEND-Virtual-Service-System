import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LinearProgress, Snackbar, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Dialog } from "@mui/material";
import OtpInput from "react-otp-input";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import bcrypt from "bcryptjs";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Amend.in
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export default function SignUp() {
  //Form data
  const firstName = React.useRef();
  const lastName = React.useRef();
  const email = React.useRef();
  const password = React.useRef();
  const phone = React.useRef();
  const [userx, setUserx] = React.useState({});
  const [otp, setOtp] = useState("");
  const [otpx, setOtpx] = useState("");
  const [signIned, setSignIned] = React.useState(false);
  const router = useRouter();
  const handleSubmitx = async (event) => {
    event.preventDefault();
    if (otpx === otp) {
      console.log(userx);
      const createResponse = await fetch("/api/login/newEmp", {
        method: "POST",
        body: JSON.stringify(userx),
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

            fetch("/api/email", {
              method: "POST",
              body: JSON.stringify({
                semail: userx.email,
                msg: "Thanks for registering into AMEND ",
                subject: "Successful Signup",
              }),
            })
              .then((res) => {
                fetch("/api/token/jwtCreation", {
                  method: "POST",
                  body: JSON.stringify(userx),
                })
                  .then((res) => {
                    setLoading(true);
                    res
                      .json()
                      .then((resx) => {
                        console.log(resx);
                        localStorage.setItem("token", resx.token);
                        router.replace("/uploadVerification");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (data.status == 401) {
            setOpen((prevState) => {
              return {
                open: true,
                severity: "error",
                message: "Email id already exists!",
              };
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

          setLoading(false);
        });
    }
  };
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
      password.current.value == "" ||
      phone.current.value.length < 10 ||
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

    bcrypt.hash(password.current.value, 10, async (err, hash) => {
      if (err) return;
      const user = {
        firstname: firstName.current.value,
        lastname: lastName.current.value,
        email: email.current.value,
        password: hash,
        phone: phone.current.value,
      };
      setUserx(user);
      const userExists = await fetch("/api/email/emailEmpExists", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          setOpen((prevState) => {
            return {
              open: true,
              severity: "error",
              message: "Email id already exists",
            };
          });
          return;
        });
      if (!userExists.exists) {
        setLoading(false);
        setSignIned((prevState) => {
          return true;
        });
        const testotp = generateOTP();
        setOtpx(testotp);
        console.log(otpx);
        const otpResponse = await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify({
            semail: user.email,
            msg: "Your otp for AMEND is " + testotp,
            subject: "OTP",
          }),
        })
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        setOpen((prevState) => {
          return {
            open: true,
            severity: "warning",
            message: "User id already exists",
          };
        });
        setLoading(false);
      }

      //Sending request to backend requesting to store the provided information
    });
  };

  return (
    <>
      {!signIned && (
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
                Service Provider Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <Link href="/Signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
      {signIned && (
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
              <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                OTP Verification
              </Typography>
              <Box>
                <Grid item xs={12} textAlign="center">
                  <Typography variant="h6">
                    Please enter the verification code sent to your email
                  </Typography>
                </Grid>
              </Box>
              <Box component="form" onSubmit={handleSubmitx} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <OtpInput
                    value={otp}
                    onChange={(otp) => {
                      setOtp(otp);
                      console.log(otp);
                    }}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 1rem",
                      fontSize: "2rem",
                      borderRadius: 4,
                      border: "2px solid #000000",
                    }}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
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
    </>
  );
}
