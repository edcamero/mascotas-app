import { Collapse, Alert, IconButton, AlertTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { severety } from './Resources/IMessageAttributes'

interface IMessagesComponent {
  open: boolean
  setOpen(open: boolean): void
  message: string
  severity: severety
  title: string
}
const MessagesComponent: React.FC<IMessagesComponent> = ({
  open,
  setOpen,
  message,
  severity,
  title,
}) => {
  return (
    <Collapse in={open} sx={{ zIndex: 2500, width: '60%' }}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  )
}

export default MessagesComponent
