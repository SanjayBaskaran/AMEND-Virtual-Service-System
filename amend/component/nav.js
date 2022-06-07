import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SellIcon from "@mui/icons-material/Sell";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LogoutIcon from '@mui/icons-material/Signout';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function Nav(props) {
  if(props.nav == "User"){
    return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SellIcon />
        </ListItemIcon>
        <ListItemText primary="Offers" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BuildCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Signout" />
      </ListItemButton>
    </React.Fragment>
    
    
  );
}
if(props.nav == "SP"){
  return (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Bookings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <AddBusinessIcon/>
      </ListItemIcon>
      <ListItemText primary="New Requests" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="History" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BuildCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Signout" />
      </ListItemButton>
  </React.Fragment>
);
}
if(props.nav == "Admin"){
  return (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <HowToRegOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="Verified SP" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PendingActionsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Unverified SP" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BuildCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <InfoOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Signout" />
      </ListItemButton>
  </React.Fragment>
);
}
}
