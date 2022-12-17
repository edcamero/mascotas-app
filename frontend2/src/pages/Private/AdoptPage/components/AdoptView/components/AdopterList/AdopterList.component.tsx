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
import EnhancedTableToolbar from '../../../../../../../components/tableComponent/EnhancedTableToolbar'
import {
  stableSort,
  getComparator,
  Order,
} from '../../../../../../../components/tableComponent/resource'
import {
  IAdopterList,
  IAdopterResponseApi,
} from '../../../../../../AdoptionApplication/resources/adopter'
import ChangeStateAdopter from './ChangeStateAdopter.component'
import EnhancedTableHead from './EnhancedTableHead.component'

const propsTableToolbar = {
  title: 'Solicitudes de adoptantes',
  messageAdd: '',
  urlCreate: '',
}

interface IAdopterListProps {
  adopters: IAdopterResponseApi[]
}
const AdopterList: React.FC<IAdopterListProps> = ({ adopters }) => {
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof IAdopterList>('nombres')
  const [dense] = React.useState(true)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adopters.length) : 0

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IAdopterList) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <>
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
                rowCount={adopters.length}
              />
              <TableBody>
                {stableSort(
                  adopters.map(
                    (adopter) =>
                      ({
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        id: adopter.id,
                        nombres: adopter.nombres,
                        apellidos: adopter.apellidos,
                        documento: `${adopter.documento.tipo}-${adopter.documento.numero}`,
                        direccion: `${adopter.direccion.ciudad}-${adopter.direccion.barrio}-${adopter.direccion.direccion}`,
                        telefono: adopter.telefono,
                        email: adopter.email,
                        estado: adopter.estado,
                      } as IAdopterList)
                  ),
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell id={row.id} align="right">
                          {row.nombres}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.apellidos}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.documento}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.direccion}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.telefono}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.email}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.estado}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(row.createdAt ?? 0), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell align="right">
                          <ChangeStateAdopter />
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
            count={adopters.length}
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

export default AdopterList
