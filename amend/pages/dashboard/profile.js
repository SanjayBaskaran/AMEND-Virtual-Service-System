import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar
} from "@mui/material";
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
import * as React from "react";
// import FileUpload from "react-mui-fileuploader"
export default function BasicCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUploadError = (error) => {
    // Do something...
  };
  const formRef = React.useRef();
  const handleFilesChange = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    // console.log(formData.get("image"));
    fetch("http://localhost:3001/image-upload", {
      method: "POST",
      body: formData,
    });
  };
  console.log(props);
  return (
    <>
    
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={0} direction="column" alignItems="center">
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                src={props.image}
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
                    {"Sanjay Prakash"}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <EmailIcon />
                  </ListItemAvatar>
                  <Typography variant="body2">
                    {"sanjaybaskaranj@gmail.com"}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <LocalPhoneIcon />
                  </ListItemAvatar>
                  <Typography variant="body2">{"9677427924"}</Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile Photo</DialogTitle>
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
      </Dialog>
    </>
  );
}
export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/getImage", {
    mode: "cors",
  })
    .then((res) => {
      return res
        .json()
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(data);
  let dataxx;
  console.log(data);
  if (typeof data == undefined) {
    dataxx = "";
  } else {
    dataxx = "data:image/png;base64," + data?.image?.data;
  }
 
  // dataxx = "data:image/png;base64," + data.image.data;
  // const dataxx = "data:image/png;base64," + data.image.data;
  return {
    props: { image: dataxx },
  };
}
