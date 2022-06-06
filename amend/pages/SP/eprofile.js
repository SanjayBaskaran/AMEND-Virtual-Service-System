import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Avatar, Grid, List, ListItem, ListItemAvatar } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import jsonwebtoken from "jsonwebtoken";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import { styled } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
// import FileUpload from "react-mui-fileuploader"
export default function Profile(props) {
  const Input = styled("input")({
    display: "none",
  });
  const [SnackbarDetails, setSnackbarDetails] = useState({
    openS: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const handleSnackbarClick = (newState) => () => {
    setState({ openS: true, ...newState });
  };
  const handleSnackbarClose = () => {
    setState({ ...state, openS: false });
  };
  const { vertical, horizontal, openS } = SnackbarDetails;
  const [uploadLoading, setUploadLoading] = useState(false);
  const [userData, setUserdata] = useState({ verified: false });
  const formRef = useRef();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilesChange = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    formData.append("name", userData.email + "E");
    setUploadLoading(true);
    fetch("http://localhost:3001/image-upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          fetch("/api/getImage", {
            method: "POST",
            body: JSON.stringify({ name: userData.email + "E" }),
            mode: "cors",
          })
            .then((res) => {
              return res
                .json()
                .then((response) => {
                  setUploadLoading(false);
                  handleSnackbarClick({
                    vertical: "bottom",
                    horizontal: "center",
                  });
                  setOpen(false);
                  setUserdata((prevState) => {
                    return {
                      ...prevState,
                      image: "data:image/png;base64," + response?.image?.data,
                    };
                  });
                })
                .catch((err) => {
                  return err;
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const datax = fetch("/api/user/loadUserEmp", {
      method: "POST",
      body: JSON.stringify({ email: localStorage.getItem("token") }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((resx) => {
            console.log(resx.details);
            fetch("/api/getImage", {
              method: "POST",
              body: JSON.stringify({ name: resx.details.email + "E" }),
              mode: "cors",
            })
              .then((res) => {
                return res
                  .json()
                  .then((response) => {
                    setUserdata((prevState) => {
                      return {
                        ...resx.details,
                        image: "data:image/png;base64," + response?.image?.data,
                      };
                    });
                  })
                  .catch((err) => {
                    return err;
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFileUploadError = (error) => {
    // Do something...
  };

  return (
    <>
      {!(userData.verified == "not yet") && (
        <>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    alt={userData.firstname}
                    src={userData.image}
                    sx={{ width: 150, height: 150 }}
                    onClick={handleClickOpen}
                  />
                </Grid>

                <Grid item>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <AccountCircleIcon />
                      </ListItemAvatar>
                      <Typography sx={{ mb: 1.5 }} color="text.primary">
                        {userData.firstname + " " + userData.lastname}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <EmailIcon />
                      </ListItemAvatar>
                      <Typography variant="body2">{userData.email}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <LocalPhoneIcon />
                      </ListItemAvatar>
                      <Typography variant="body2">{userData.phone}</Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Profile Photo</DialogTitle>
            {!uploadLoading && (
              <form method="POST" ref={formRef} onSubmit={handleFilesChange}>
                <DialogContent>
                  <input type="file" name="image" />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Upload
                  </Button>
                </DialogActions>
              </form>
            )}
            {uploadLoading && <LinearProgress />}
          </Dialog>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openS}
            onClose={handleSnackbarClose}
            message="I love snacks"
            key={vertical + horizontal}
          />
        </>
      )}
      {(userData.verified == "not yet") && (
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="body2">
            Upload any document for verification (aadhar card/driving license)
          </Typography>

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </Stack>
      )}
    </>
  );
}
