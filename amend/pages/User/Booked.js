import { Box, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Booked(props) {
  const [userData, setUserdata] = useState({});
  const [userBooked, setUserBooked] = useState([]);
  useEffect(() => {
    const datax = fetch("/api/user/loadUser", {
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

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav">
          {userBooked.map((item) => {
            return (
              <React.Fragment key={item._id}>
                <ListItemButton>
                  <ListItemText primary={item.serviceProvider} secondary={item.confirm + " requested on " + item.date}/>
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
