export interface IPetPesos {
  ID: string
  peso: number
  createdAt: Date
  updatedAt: Date
}

export const dommiPeso = [
  {
    ID: '56465',
    peso: 8.6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
export interface IHeadCellPetPesos {
  disablePadding: boolean
  id: keyof IPetPesos
  label: string
  numeric: boolean
}

export const headCellsPetPesos: readonly IHeadCellPetPesos[] = [
  {
    id: 'peso',
    numeric: true,
    disablePadding: false,
    label: 'Peso',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Fecha',
  },
]
