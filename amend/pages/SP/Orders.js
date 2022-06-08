import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Booked(props) {
  const formRef = useRef();
  const [openBD,setOpenBD] = useState(false);
  const [userData, setUserdata] = useState({});
  const [userBooked, setUserBooked] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    const datax = fetch("/api/user/loadUserEmp", {
      method: "POST",
      body: JSON.stringify({ email: localStorage.getItem("token") }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((resx) => {
            const image = "data:image/png;base64," + resx.details?.image?.data;

            fetch("/api/services/getServiceUser", {
              method: "POST",
              body: JSON.stringify({ email: resx.details.email }),
            })
              .then((responseBooked) => {
                responseBooked
                  .json()
                  .then((bookedDetails) => {
                    console.log(bookedDetails);
                    setUserBooked(bookedDetails);
                  })
                  .catch((err) => {
                    return;
                  });
              })
              .catch((err) => {
                return;
              });
            setUserdata((prevState) => {
              return { ...resx.details, image: image };
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleAcceptOrder = (event) => {
    event.preventDefault();
    setOpenBD(true);
    const formData = new FormData(formRef.current);
    const data = {
      request: formData.get("request"),
      date: formData.get("date"),
    };
    console.log(data);
    fetch("/api/booked/accept", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        const datax = fetch("/api/user/loadUserEmp", {
          method: "POST",
          body: JSON.stringify({ email: localStorage.getItem("token") }),
        })
          .then((res) => {
            if (res.ok) {
              res.json().then((resx) => {
                const image =
                  "data:image/png;base64," + resx.details?.image?.data;

                fetch("/api/services/getServiceUser", {
                  method: "POST",
                  body: JSON.stringify({ email: resx.details.email }),
                })
                  .then((responseBooked) => {
                    responseBooked
                      .json()
                      .then((bookedDetails) => {
                        console.log(bookedDetails);
                        setUserBooked(bookedDetails);
                        setOpenBD(false);
                      })
                      .catch((err) => {
                        return;
                      });
                  })
                  .catch((err) => {
                    return;
                  });
                setUserdata((prevState) => {
                  return { ...resx.details, image: image };
                });
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {});
  };
  return (
    <>
      <List>
        {userBooked.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <ListItem>
                {"Requested by " +
                  item.request +
                  " need service on " +
                  item.date +
                  " is " +
                  item.confirm}
                <form onSubmit={handleAcceptOrder} key={item._id} ref={formRef}>
                  <input
                    type="text"
                    name="request"
                    value={item.request}
                    onChange={() => {
                      return;
                    }}
                    style={{
                      display: "none",
                    }}
                  />
                  <input
                    type="text"
                    name="date"
                    value={item.date}
                    onChange={() => {
                      return;
                    }}
                    style={{
                      display: "none",
                    }}
                  />
                  <br />
                  <br />
                  {item.confirm == "pending" && (
                    <input type="submit" value="Accept" />
                  )}
                </form>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBD}
        onClick={()=>{return;}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
