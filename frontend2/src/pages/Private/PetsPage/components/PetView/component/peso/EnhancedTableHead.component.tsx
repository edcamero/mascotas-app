import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React from 'react'
import { Order } from '../../../../../../../components/tableComponent/resource'
import { headCellsPetPesos, IPesos } from './resource/usePetPeso'

interface IEnhancedTableHeadProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IPesos) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead: React.FC<IEnhancedTableHeadProps> = (props) => {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof IPesos) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }
  return (
    <TableHead>
      <TableRow>
        {headCellsPetPesos.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
