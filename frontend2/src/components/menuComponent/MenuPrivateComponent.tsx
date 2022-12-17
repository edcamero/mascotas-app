import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import PeopleIcon from '@mui/icons-material/People'
import { useNavigate } from 'react-router-dom'
import MenuItemPerfil from './MenuItemPerfil.component'

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
      <Card
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          borderRadius: 0,
        }}
      >
        <CardHeader
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
            borderRadius: 0,
            textDecorationColor: (theme) => theme.palette.primary.contrastText,
            textEmphasisColor: (theme) => theme.palette.primary.contrastText,
          }}
          avatar={
            <Avatar
              aria-label="recipe"
              src={'https://randomuser.me/api/portraits/men/26.jpg'}
              sx={{}}
            />
          }
          title={
            <Typography noWrap={false}>
              <b>{'Administrador'}</b>
            </Typography>
          }
        />
        <CardContent>
          <Typography noWrap={true} variant="subtitle1" gutterBottom={true}>
            {'administradorpatitas@gmail.com'}
          </Typography>
        </CardContent>
      </Card>
      <List>
        <ListItem
          key={13}
          button
          onClick={() => {
            handleOnClick('/')
          }}
          data-testid={'menu-itemLeft-species'}
        >
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1">Página principal</Typography>
          </ListItemText>
        </ListItem>
        <MenuItemPerfil />
        <ListItem
          key={1}
          button
          onClick={() => {
            handleOnClick('/users')
          }}
          data-testid={'menu-itemLeft-' + 13}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1">Usuarios</Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          key={2}
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
        <ListItem
          key={13}
          button
          onClick={() => {
            handleOnClick('/pets')
          }}
          data-testid={'menu-itemLeft-pets'}
        >
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1">Mis Animales</Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          key={13}
          button
          onClick={() => {
            handleOnClick('/adopt')
          }}
          data-testid={'menu-itemLeft-adopt'}
        >
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1">Adopciones</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MenuPrivateComponent
