import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Snackbar,
} from "@mui/material";

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const [snackbarStatus, setSnackbarStatus] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    fetch("/api/login/admin", {
      method: "POST",
      body: JSON.stringify(loginData),
    })
      .then((res) => {

        setLoading(true);
        if (res.status == 201) {
          fetch("/api/token/jwtCreation", {
            method: "POST",
            body: JSON.stringify(loginData),
          })
            .then((res) => {
              res
                .json()
                .then((resx) => {
                  console.log(resx);
                  localStorage.setItem("token", resx.token);
                  router.replace("/Admin/Admindash");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setLoading(false);
          setSnackbarStatus((prevState) => {
            return {
              open: true,
              message: "Invalid Login",
              severity: "error",
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
              Admin Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Dialog open={loading}>
        <LinearProgress />
        <DialogTitle>{"Logging in ..."}</DialogTitle>
        <DialogContent>
          <DialogContentText>Processing</DialogContentText>
        </DialogContent>
      </Dialog>
      <Snackbar open={snackbarStatus.open} autoHideDuration={6000}>
        <Alert severity={snackbarStatus.severity} sx={{ width: "100%" }}>
          {snackbarStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
}
