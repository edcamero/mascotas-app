import {
  Box,
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
import EnhancedTableHead from './EnhancedTableHead.component'
import useAxios from '../../../../../../../services/axios.services'
import IMessageAttributes from '../../../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import { dommiVacune, IPetVacunes } from './resource/usePetVacune'
import {
  getComparator,
  Order,
  stableSort,
} from '../../../../../../../components/tableComponent/resource'
import messageAttributes from '../../../../../../../components/MessagesComponent/Resources/MessageAttributes'
import BackDropLoadApi from '../../../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../../../components/MessagesComponent/MessagesComponent'
import EnhancedTableToolbar from '../../../../../../../components/tableComponent/EnhancedTableToolbar'
import messagesList from '../../../../../../../components/MessagesComponent/Resources/MessagesList'

const propsTableToolbar = {
  title: 'Vacunas',
  messageAdd: 'Agregar nueva vacuna',
  urlCreate: '/pets/create',
}

const Vacune:React.FC = () => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(true)
  const [petVacunes, setPetVacune] = React.useState<IPetVacunes[]>([])
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof IPetVacunes>('nombre')
  const [dense] = React.useState(true)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - petVacunes.length) : 0

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IPetVacunes) => {
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
        .then((response) => setPetVacune(dommiVacune as IPetVacunes[]))
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
                rowCount={petVacunes.length}
              />
              <TableBody>
                {stableSort(
                  petVacunes.map((petVacune) => ({
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ID: petVacune.ID,
                    nombre: petVacune.nombre,
                    peso: petVacune.peso,
                    nextControlAt: petVacune.nextControlAt,
                    createdAt: petVacune.createdAt,
                    updatedAt: petVacune.updatedAt,
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
                          {row.peso}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {format(new Date(row.createdAt ?? 0), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell id={row.ID} align="right">
                          {format(new Date(row.nextControlAt ?? 0), 'dd/MM/yyyy')}
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
            count={petVacunes.length}
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

export default Vacune
