import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import { useNavigate } from 'react-router-dom'

interface IMenuPrivateComponentProps {
  privateMenuOpen: boolean
  handleDrawerPrivateMenuToggle: () => void
}
const MenuPrivateComponent: React.FC<IMenuPrivateComponentProps> = ({
  privateMenuOpen,
  handleDrawerPrivateMenuToggle,
}) => {
  let navigate = useNavigate()

  const handleOnClick = React.useCallback(
    (url: string) => {
      navigate(url)
    },
    [navigate]
  )
  
  return (
    <Drawer
      variant="temporary"
      open={privateMenuOpen}
      anchor="left"
      data-testid="menu-drawerRight"
      onClose={handleDrawerPrivateMenuToggle}
    >
      <List>
        <ListItem
          key={13}
          button
          onClick={() => {
            handleOnClick('/')
          }}
          data-testid={'menu-itemLeft-' + 13}
        >
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1">Página principal</Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          key={13}
          button
          onClick={() => {
            handleOnClick('/species')
          }}
          data-testid={'menu-itemLeft-' + 13}
        >
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1">Mis Especies</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MenuPrivateComponent
