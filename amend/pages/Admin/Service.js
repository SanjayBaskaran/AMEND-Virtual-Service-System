import { Alert, Avatar, Button, Checkbox, CssBaseline, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container, createTheme } from "@mui/system";
import { ThemeProvider } from "styled-components";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Link from "next/link";
import React from "react";
import { InboxIcon } from "@mui/icons-material";

export default function Service() {
    const theme = createTheme();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [snackbarStatus, setSnackbarStatus] = React.useState({
        open: false,
        severity: "success",
        message: "",
      });
    const handleSubmit = (event)=>{
        event.preventDefault();
    }
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
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </Box>
    </>
  );
}
