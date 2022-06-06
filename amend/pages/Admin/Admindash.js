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
import { useEffect, useRef, useState } from "react";
import BasicTabs from "../dashboard/Booked";
import Orders from "../dashboard/Orders";
// import FileUpload from "react-mui-fileuploader"
export default function Profile(props) {
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
  const [userData, setUserdata] = useState({});
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
    formData.append("name", userData.email + "U");
    setUploadLoading(true);
    fetch("http://localhost:3001/image-upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          fetch("/api/getImage", {
            method: "POST",
            body: JSON.stringify({ name: userData.email + "U" }),
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
    const datax = fetch("/api/user/loadAdmin", {
      method: "POST",
      body: JSON.stringify({ username: localStorage.getItem("token") }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((resx) => {
            console.log(resx.details);
            fetch("/api/getImage", {
              method: "POST",
              body: JSON.stringify({ name: resx.details.email + "U" }),
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
    <BasicTabs/>
    <Orders/>
    </>
  );
}