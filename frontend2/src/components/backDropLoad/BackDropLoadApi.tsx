import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

interface IBackDropLoadApiProps {
  open: boolean
}

const BackDropLoadApi: React.FC<IBackDropLoadApiProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff',
      }}
      open={open}
      data-testid="backdrop"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackDropLoadApi
