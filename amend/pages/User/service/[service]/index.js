import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Service() {
  const router = useRouter();
  const [emps, setEmps] = useState([]);
  useEffect(() => {
    console.log(router.query.service);
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
      {emps.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {emps.map((item) => {
            return (
              <div key={item._id}>
                <ListItemButton >
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
  );
}
