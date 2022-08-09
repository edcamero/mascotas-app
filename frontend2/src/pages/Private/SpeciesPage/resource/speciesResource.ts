export interface IRazas {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id: number
  nombre: string
}

export interface ISpecie {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string
  nombre: string
  razas?: IRazas[]
  createdAt: Date
  updatedAt: Date
}

export interface INewSpecie {
  nombre: string
  razas?: IRazas[]
}
export interface ISpecieTable {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string
  nombre: string
  createdAt: Date
  updatedAt: Date
}

export interface IHeadCellSpecie {
  disablePadding: boolean
  id: keyof ISpecieTable
  label: string
  numeric: boolean
}
export interface ISpecieFormAttributesErrors {
  nombre: string
}
export const specieInitial = {
  nombre: ''
}
export const subSpecieInitial = {
  id: 0,
  nombre: ''
}
export const headCellsSpecies: readonly IHeadCellSpecie[] = [
  {
    id: 'nombre',
    numeric: true,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Fecha Creación',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Fecha de actualización',
  },
]
