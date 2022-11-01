import { Box } from '@mui/material'
import React from 'react'

interface ITabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{value === index && children}</Box>}
    </div>
  )
}

export default TabPanel
