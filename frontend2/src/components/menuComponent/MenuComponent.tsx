import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useAuthSecurity } from '../../pages/LoginPage/AuthProvider'

interface IMenuComponentProps {
  window?: () => Window
}

const navHome = { name: 'Inicio', link: 'home' }
const navLogin = { name: 'Login', link: 'login' }
const navLogout = { name: 'Cerrar' }

const drawerWidth = 240
const MenuComponent: React.FC = (props: IMenuComponentProps) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { isAuthenticated, setIsAuthenticated } = useAuthSecurity()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const closedSesion = () => {
    setIsAuthenticated(false)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {`${process.env.REACT_APP_NAME}`}
      </Typography>
      <Divider />
      <List>
        <ListItem key={navHome.name} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to={navHome.link} style={{ textDecoration: 'none' }}>
              <ListItemText primary={navHome.name} />
            </Link>
          </ListItemButton>
        </ListItem>
        {!isAuthenticated ? (
          <ListItem key={navLogin.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={navLogin.link} style={{ textDecoration: 'none' }}>
                <ListItemText primary={navLogin.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={navLogout.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => closedSesion()}>
              <ListItemText primary={navLogout.name} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {`${process.env.REACT_APP_NAME}`}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link key={navHome.name} to={navHome.link} style={{ textDecoration: 'none' }}>
                <Button key={navHome.name} sx={{ color: '#fff' }}>
                  {navHome.name}
                </Button>
              </Link>
              {!isAuthenticated ? (
                <Link key={navLogin.name} to={navLogin.link} style={{ textDecoration: 'none' }}>
                  <Button key={navLogin.name} sx={{ color: '#fff' }}>
                    {navLogin.name}
                  </Button>
                </Link>
              ) : (
                <Button key={navLogout.name} sx={{ color: '#fff' }} onClick={() => closedSesion()}>
                  {navLogout.name}
                </Button>
              )}
            </Box>
            <Box component="nav">
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default MenuComponent
