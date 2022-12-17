import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import React from 'react'

const ChangeStateAdopter: React.FC = () => {
  const [state, setState] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value)
  }
  
  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small">Cambiar Estado</InputLabel>
      <Select
        labelId="select-state"
        id="select-state"
        value={state}
        label="Cambiar Estado"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Seleccione</em>
        </MenuItem>
        <MenuItem value={'aprobado'}>Aprobar</MenuItem>
        <MenuItem value={'en espera'}>en Espera</MenuItem>
        <MenuItem value={'pendiente'}>Pendiente</MenuItem>
        <MenuItem value={'rechazado'}>Rechazar</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ChangeStateAdopter
