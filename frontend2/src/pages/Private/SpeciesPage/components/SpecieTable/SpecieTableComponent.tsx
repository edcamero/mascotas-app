import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import EnhancedTableToolbar from '../../../../../components/tableComponent/EnhancedTableToolbar'
import { getComparator, Order, stableSort } from '../../../../../components/tableComponent/resource'
import useAxios from '../../../../../services/axios.services'
import { ISpecie, ISpecieTable } from '../../resource/speciesResource'
import EnhancedTableHead from './EnhancedTableHead'

interface ISpecieTableComponentProp {}
const SpecieTableComponent: React.FC<ISpecieTableComponentProp> = () => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(true)
  const [species, setSpecies] = React.useState<ISpecie[]>([])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof ISpecieTable>('nombre')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ISpecieTable) => {
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const propsTableToolbar = {
    title: 'Especies animales',
    messageAdd: 'Agregar nueva especie',
    urlCreate: '/species/create',
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - species.length) : 0

  React.useEffect(() => {
    if (isLoading) {
      axios
      .get(process.env.REACT_APP_API_URL + 'admin/species')
      .then(
        (response) => (
          setSpecies(response.data as ISpecie[])

        )
      )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {})
      .finally(() => setIsLoading(false))
  }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <Box sx={{ width: '80%' }}>
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
              rowCount={species.length}
            />
            <TableBody>
              {stableSort(
                species.map((specie) => ({
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  _id: specie._id,
                  nombre: specie.nombre,
                  createdAt: specie.createdAt,
                  updatedAt: specie.updatedAt,
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
                      <TableCell id={row._id} align="right">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(row.createdAt ?? 0), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(row.updatedAt ?? 0), 'dd/MM/yyyy')}
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
          count={species.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default SpecieTableComponent
