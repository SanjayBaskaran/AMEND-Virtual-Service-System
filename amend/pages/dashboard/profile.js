import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 150, height: 150 }}
            />
          </Grid>

          <Grid item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
              <ListItemAvatar>
                  <AccountCircleIcon/>
                </ListItemAvatar>
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                  {"Sanjay Prakash"}
                </Typography>
              </ListItem>
              <Divider/>
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
  );
}
