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
import { Box, createTheme } from "@mui/system";
import React from "react";
export default function Service() {
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
  
  const [loading, setLoading] = React.useState(false);
  return (
    <>
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
