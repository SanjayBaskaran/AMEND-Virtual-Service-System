import * as React from "react";
import { useState } from "react";
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
import bcrypt from "bcryptjs";
import OtpInput from "react-otp-input";
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

export default function Otp() {
  const [otp, setOtp] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
