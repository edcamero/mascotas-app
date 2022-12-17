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
import VisibilityIcon from '@mui/icons-material/Visibility'
import EnhancedTableHead from './EnhancedTableHead.component'
import DeleteIcon from '@mui/icons-material/Delete'
import { IUsertLits, IUsertLitsApi } from '../../resources/userData'

const propsTableToolbar = {
  title: 'Lista de usuarios',
  messageAdd: 'Agregar usuario',
  urlCreate: 'create',
}

const UserList: React.FC = () => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(true)
  const [users, setUsers] = React.useState<IUsertLits[]>([])
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof IUsertLits>('username')
  const [dense] = React.useState(true)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  let navigate = useNavigate()
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

  const handleOnClickButtonView = React.useCallback(
    (id: string) => {
      navigate(`/users/edit/${id}`)
    },
    [navigate]
  )

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IUsertLits) => {
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
        .get(process.env.REACT_APP_API_URL + 'admin/users')
        .then((response) => {
          const usersResponse = (response.data as IUsertLitsApi[]).map((elem) => ({
            id: elem.id,
            username: elem.username,
            email: elem.email,
            fullname: elem.fullname,
            rol: elem.rol.name,
            state: elem.state,
          }))
          setUsers(usersResponse)
        })
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
                rowCount={users.length}
              />
              <TableBody>
                {stableSort(users, getComparator(order, orderBy))
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
                          {row.username}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.email}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.fullname}
                        </TableCell>
                        <TableCell id={row.id} align="right">
                          {row.rol}
                        </TableCell>
                        <TableCell align="right">
                          <ButtonGroup disableElevation variant="contained">
                            <Button
                              color="secondary"
                              size="small"
                              variant="contained"
                              startIcon={<VisibilityIcon />}
                              onClick={() => {
                                handleOnClickButtonView(row.id)
                              }}
                            >
                              Ver
                            </Button>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                handleOnClickButtonView(row.id)
                              }}
                            >
                              Eliminar
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
            count={users.length}
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

export default UserList
