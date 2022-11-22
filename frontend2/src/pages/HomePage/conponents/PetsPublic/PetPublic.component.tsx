import { Grid, TablePagination, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import BackDropLoadApi from '../../../../components/backDropLoad/BackDropLoadApi'
import PetCard from '../PetCard/PetCard.componnet'
import { IPetsPublic } from '../resource/usePetPublic'
import FilterPetPublic from './FilterPetPublic.component'

const basePage = 6

const PetPublic: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [pets, setPets] = React.useState<IPetsPublic[]>([])
  const [page, setPage] = React.useState(0)
  const [countPets, setCountPets] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(6)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(`${process.env.REACT_APP_API_URL}pets/count`)
        .then((response) => setCountPets(response.data))
        .finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${process.env.REACT_APP_API_URL}pets/page/${page+1}/base/${basePage}`)
      .then((response) => setPets(response.data))
      .finally(() => setIsLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography gutterBottom variant="h3" component="div">
          Amigos para adoptar
        </Typography>
      </Grid>
      <FilterPetPublic setPets={setPets} />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {pets.map((pet, index) => {
          return <PetCard pet={pet} key={index} />
        })}
      </Grid>
      <TablePagination
        sx={{ color: 'white' }}
        rowsPerPageOptions={[6]}
        component="div"
        count={countPets}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default PetPublic
