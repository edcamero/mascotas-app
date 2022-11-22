export interface IPetVacunes {
  ID: string
  nombre: string
  peso: number
  createdAt: Date
  nextControlAt: Date
  updatedAt: Date
}

export const dommiVacune=[{
    ID: '56465',
  nombre: 'Parvo Virus',
  peso: 8.6,
  createdAt: new Date(),
  nextControlAt: new Date(new Date().setFullYear(2023,10)),
  updatedAt:  new Date()
}]
export interface IHeadCellPetVacune {
  disablePadding: boolean
  id: keyof IPetVacunes
  label: string
  numeric: boolean
}

export const headCellsPetVacune: readonly IHeadCellPetVacune[] = [
  {
    id: 'nombre',
    numeric: true,
    disablePadding: false,
    label: 'Nombre',
  },
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
  {
    id: 'nextControlAt',
    numeric: true,
    disablePadding: false,
    label: 'Prox. Control',
  },
]
