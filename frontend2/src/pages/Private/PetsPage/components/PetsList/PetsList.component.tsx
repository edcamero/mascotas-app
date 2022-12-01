import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'
import EnhancedTableToolbar from '../../../../../components/tableComponent/EnhancedTableToolbar'
import { stableSort, getComparator, Order } from '../../../../../components/tableComponent/resource'
import useAxios from '../../../../../services/axios.services'
import { IPetsLits } from '../../resource/usePets'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EnhancedTableHead from './EnhancedTableHead.component'

const propsTableToolbar = {
  title: 'Animales',
  messageAdd: 'Agregar nuevo animal',
  urlCreate: '/pets/create',
}

const PetsList = () => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(true)
  const [pets, setPets] = React.useState<IPetsLits[]>([])
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof IPetsLits>('nombre')
  const [dense] = React.useState(true)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  let navigate = useNavigate()
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pets.length) : 0

  const handleOnClickButtonView = React.useCallback(
    (id: string) => {
      navigate(`/pets/view/${id}`)
    },
    [navigate]
  )

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IPetsLits) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/pets')
        .then((response) => setPets(response.data as IPetsLits[]))
        .catch((error) => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }

    if (alertMessage.message !== messagesList.INTERNAL_ERROR.message) {
      setIsLoading(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} {...propsTableToolbar} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={pets.length}
              />
              <TableBody>
                {stableSort(
                  pets.map((pet) => ({
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ID: pet.ID,
                    nombre: pet.nombre,
                    color: pet.color,
                    tamaño: pet.tamaño,
                    esterilizado: pet.esterilizado,
                    enAdopcion: pet.enAdopcion,
                    fechaNacimiento: pet.fechaNacimiento,
                    especie: pet.especie,
                    descripcion: pet.descripcion,
                    sexo: pet.sexo,
                    createdAt: pet.createdAt,
                    updatedAt: pet.updatedAt,
                  })),
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.nombre)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.nombre}
                      >
                        <TableCell id={row.ID} align="right">
                          {row.nombre}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {row.color}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {row.tamaño}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {row.esterilizado ? 'Esterilizado' : 'sin Esterilizar'}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {row.enAdopcion ? 'SI' : 'NO'}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(row.fechaNacimiento ?? 0), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {row.especie}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {row.sexo}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(row.createdAt ?? 0), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(row.updatedAt ?? 0), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell align="right">
                          <ButtonGroup disableElevation variant="contained">
                            <Button
                              color="secondary"
                              size="small"
                              variant="contained"
                              startIcon={<VisibilityIcon />}
                              onClick={() => {
                                handleOnClickButtonView(row.ID)
                              }}
                            >
                              Ver
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={pets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  )
}

export default PetsList
