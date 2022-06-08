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
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useRouter } from 'next/router';

export default function Nav(props) {
  const router=useRouter(); 
  if(props.nav == "User"){
    return (
    <React.Fragment>
      <ListItemButton onClick={()=>{
          console.log("redirecting to profile");
          router.replace("/User/dashboard");
          }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={()=>{
          console.log("redirecting to profile");
          router.replace("/User/profile");
          }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton onClick={()=>{
          console.log("redirecting to Bookings");
          router.replace("/User/Booked");
          }}>
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
      <ListItemButton onClick={()=>{
          console.log("success");
          router.replace("/Signin");
          }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out"  />
      </ListItemButton>
    </React.Fragment>
    
    
  );
}
if(props.nav == "SP"){
  return (
  <React.Fragment>
    <ListItemButton onClick={()=>{
          console.log("redirecting to profile");
          router.replace("/SP/eprofile");
          }}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton onClick={()=>{
          console.log("redirecting to orders");
          router.replace("/SP/Orders");
          }}>
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
    <ListItemButton onClick={()=>{
          console.log("success");
          router.replace("/SPSignin");
          }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItemButton>
  </React.Fragment>
);
}
if(props.nav == "Admin"){
  return (
  <React.Fragment>
    <ListItemButton onClick={()=>{
          console.log("redirecting to profile");
          router.replace("/Admin/SP");
          }}>
      <ListItemIcon>
        <HowToRegOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="Service Providers" />
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
    <ListItemButton onClick={()=>{
          console.log("success");
          router.replace("/AdminLogin");
          }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItemButton>
  </React.Fragment>
);
}
}
