import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, createTheme } from "@mui/system";
import { ThemeProvider } from "styled-components";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Link from "next/link";
import React from "react";
import { InboxIcon } from "@mui/icons-material";

export default function Service() {
  const theme = createTheme();
  const formRef = React.useRef();
  const [snackbarStatus, setSnackbarStatus] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [serviceDetails, setServiceDetails] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/services/getService", {
      method: "GET",
    })
      .then((res) => {
        res
          .json()
          .then((services) => {
            console.log(services);
            setServiceDetails((prevState) => {
              return services.services;
            });
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      serviceName: formData.get("service"),
    };
    fetch("/api/services/addService", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        fetch("/api/services/getService", {
          method: "GET",
        })
          .then((res) => {
            res
              .json()
              .then((services) => {
                console.log(services);
                setServiceDetails((prevState) => {
                  return services.services;
                });
              })
              .catch((err) => {
                return;
              });
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  };
  const [loading, setLoading] = React.useState(false);
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
              <ManageAccountsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Services
            </Typography>
            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="service"
                label="Service Name"
                name="service"
                autoComplete="service"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
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
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      ></Box>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav">
          {serviceDetails.map((item) => {
            return (
              <React.Fragment key={serviceDetails.indexOf(item)}>
                <ListItemButton>
                  <ListItemText primary={item.serviceName} />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </>
  );
}
