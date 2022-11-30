import { ExpandLess, ExpandMore } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PasswordIcon from '@mui/icons-material/Password'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MenuItemPerfil: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  let navigate = useNavigate()

  const handleOnClick = React.useCallback(
    (url: string) => {
      navigate(url)
    },
    [navigate]
  )
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Mi Perfil" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Editar mi perfil" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {
            handleOnClick('users/password')
          }}>
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Editar mi contraseña" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default MenuItemPerfil
