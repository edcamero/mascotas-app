import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface IAlertsProps {
  open: boolean
  setOpen(open: boolean): void
  onClickAccept(): void
  title: string
  content: string
}

const DeleteConfirmationMessage: React.FC<IAlertsProps> = (props) => {
  const handleClose = () => {
    props.setOpen(false)
  }
  const handleAccept = () => {
    props.onClickAccept()
    handleClose()
  }
  return (
    <Dialog open={props.open} onClose={handleClose} data-testid="alert">
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} data-testid="button-alert-cancelar" startIcon={<CloseIcon />}>
          Cancelar
        </Button>
        <Button onClick={handleAccept} autoFocus data-testid="button-alert-accept">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteConfirmationMessage
