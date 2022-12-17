import { Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  animalGender,
  animalSizes,
  IPetFilter,
  petFilterInitial,
  speciesDefault,
} from '../../../Private/PetsPage/resource/usePets'
import { IPetsPublic } from '../resource/usePetPublic'
import axios from 'axios'
import messagesList from '../../../../components/MessagesComponent/Resources/MessagesList'
import IMessageAttributes from '../../../../components/MessagesComponent/Resources/IMessageAttributes'
import BackDropLoadApi from '../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../components/MessagesComponent/MessagesComponent'
import messageAttributes from '../../../../components/MessagesComponent/Resources/MessageAttributes'

interface IFilterPetPublicProps {
  setPets: (value: IPetsPublic[]) => void
}
const FilterPetPublic: React.FC<IFilterPetPublicProps> = ({ setPets }) => {
  const [filter, setFilter] = React.useState<IPetFilter>(petFilterInitial)
  const [isLoading, setIsLoading] = React.useState(false)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const clickSearchPet = () => {
    setIsLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + `pets/page/${1}/base/${6}`, filter)
      .then((response) => {
        setPets(response.data as IPetsPublic[])
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ p: 1, m: 2 }}
            >
              <Grid item xs={2} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="tamaño"
                  label="Tamaño de Animal"
                  name="tamaño"
                  autoComplete="off"
                  autoFocus
                  value={filter.tamaño}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      tamaño: e.target.value as string,
                    })
                  }
                >
                  {animalSizes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="sexo"
                  label="Sexo"
                  name="sexo"
                  autoComplete="off"
                  autoFocus
                  value={filter.sexo}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      sexo: e.target.value as string,
                    })
                  }
                >
                  {animalGender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="especie"
                  label="Especie"
                  name="especie"
                  autoComplete="off"
                  autoFocus
                  value={filter.especie}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      especie: e.target.value as string,
                    })
                  }
                >
                  {speciesDefault.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Button startIcon={<SearchIcon />} variant="contained" onClick={() => {
                    clickSearchPet()
                  }}>
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  )
}

export default FilterPetPublic
