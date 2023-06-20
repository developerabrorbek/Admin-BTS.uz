import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PersonIcon from '@mui/icons-material/Person';
import LayersIcon from '@mui/icons-material/Layers';
import LocalMallIcon from '@mui/icons-material/LocalMall';


export const mainListItems = (
  <React.Fragment>
      <ListItemButton href='/'>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton href='/profile'>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="My profile" />
      </ListItemButton>
    <ListItemButton href = '/orders'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton href = '/categories'>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItemButton>
    <ListItemButton href = '/products'>
      <ListItemIcon>
        <LocalMallIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    <ListItemButton href = '/customers'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton href = '/admins'>
      <ListItemIcon>
        <AccessibilityNewIcon />
      </ListItemIcon>
      <ListItemText primary="Admins" />
    </ListItemButton>
  </React.Fragment>
);

