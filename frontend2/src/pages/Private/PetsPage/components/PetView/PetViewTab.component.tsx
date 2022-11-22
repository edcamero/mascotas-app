import { AppBar, Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import RouteViewPetPanel from '../../../../../router/RouteViewPetPanel'
import TabPanel from './TabPanel.component'

interface IPetViewTabProms {
  idPet: string
}
const PetViewTab: React.FC<IPetViewTabProms> = ({ idPet }) => {
  let navigate = useNavigate()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue)

    if (newValue === 0) {
      navigate(`/pets/view/${idPet}/`)
    }
    if (newValue === 1) {
      navigate(`/pets/view/${idPet}/vacune`)
    }
    if (newValue === 2) {
      navigate(`/pets/view/${idPet}/peso`)
    }
    if (newValue === 3) {
      navigate(`/pets/view/${idPet}/history`)
    }
  }

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'aria-controls': `full-width-tabpanel-${index}`,
    }
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%', my: '1.5rem' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Fotos" {...a11yProps(0)} />
          <Tab label="Vacunas" {...a11yProps(1)} />
          <Tab label="Peso" {...a11yProps(2)} />
          <Tab label="Historial" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RouteViewPetPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RouteViewPetPanel />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RouteViewPetPanel />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RouteViewPetPanel />
      </TabPanel>
    </Box>
  )
}

export default PetViewTab
