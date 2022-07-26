import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "@mui/material/Link";

export default function NestedList(props) {
  const [openList, setOpenList] = React.useState(props.open);

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="secciones"
    >
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="productos" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventario" color="secondary"/>
        {(openList && props.open)  ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={(openList && props.open)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton href="/inventory-register/" color="primary" sx={{ pl: 3,}} selected={props.active==="Registrar Mercancia"}>
            <ListItemIcon>
              <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText primary="Registrar Mercancia"/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
