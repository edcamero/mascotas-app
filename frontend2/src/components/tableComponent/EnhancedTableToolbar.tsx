import { Toolbar, alpha, Typography, Tooltip, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IEnhancedTableToolbarProps {
  numSelected: number
  title: string
  messageAdd: string
  urlCreate: string
}

const EnhancedTableToolbar: React.FC<IEnhancedTableToolbarProps> = (props) => {
  const { numSelected, title, messageAdd, urlCreate } = props
  let navigate = useNavigate()
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      <Tooltip
        title={messageAdd}
        onClick={() =>  navigate(urlCreate)}
      >
        <IconButton aria-label="Agregar Noticia">
          <AddIcon />
          <Typography> Agregar</Typography>
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default EnhancedTableToolbar
