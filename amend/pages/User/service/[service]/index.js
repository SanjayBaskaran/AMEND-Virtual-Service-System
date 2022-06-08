import {
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function Service() {
  const [openBd,setOpenBd] = useState(false);
  const router = useRouter();
  const [emps, setEmps] = useState([]);
  const [value, setValue] = React.useState(new Date());
  const [selectedSP, setSelectedSP] = useState({ select: false, value: {} });
  const dateRef = useRef();
  const [userData, setUserdata] = useState({});
  const handleSubmit = () => {
    setOpenBd(true);
    fetch("/api/services/bookService", {
      method: "POST",
      body: JSON.stringify({
        request: userData.email,
        date: new Date(value),
        serviceProvider: selectedSP.value,
        confirm:"pending"
      }),
    }).then((res) => {
      setOpenBd(false);
      router.reload();
    });
  };
  useEffect(() => {
    console.log(router.query.service);
    const datax = fetch("/api/user/loadUser", {
      method: "POST",
      body: JSON.stringify({ email: localStorage.getItem("token") }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((resx) => {
            const image = "data:image/png;base64," + resx.details?.image?.data;
            setUserdata((prevState) => {
              return { ...resx.details, image: image };
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/api/user/emp/getEmpService", {
      method: "POST",
      body: JSON.stringify({ serviceName: router.query.service }),
    })
      .then((res) => {
        res
          .json()
          .then((response) => {
            console.log(response.emps);
            setEmps(response.emps);
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  }, [router.query]);
  return (
    <>
      {!selectedSP.select && (
        <>
          {emps.length > 0 && (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {emps.map((item) => {
                return (
                  <div key={item._id}>
                    <ListItemButton
                      onClick={() => {
                        setSelectedSP((prevState) => {
                          return {
                            select: true,
                            value: item.email,
                          };
                        });
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={item.firstname}
                          src={"data:image/png;base64," + item?.image?.data}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.email}
                        secondary={item.firstname + " " + item.lastname}
                      />
                    </ListItemButton>

                    <Divider />
                  </div>
                );
              })}
            </List>
          )}
        </>
      )}
      {selectedSP.select && (
        <>
          <Typography variant="h4" component="h4">
            Booking for Service Provider
          </Typography>
          ;
          <form>
            <Stack spacing={2}>
              <TextField
                value={selectedSP.value}
                name="SP"
                label="Service Provider"
                variant="outlined"
                disabled
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  ref={dateRef}
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <Button variant="contained" onClick={handleSubmit}>
                Book
              </Button>
            </Stack>
          </form>
        </>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBd}
        onClick={()=>{return;}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
