export interface IFoto {
  id: number
  url: string
}

export interface IVacuna {
  nombre: string
  fecha: Date
}

export interface IPetRegister {
  ID: string
  nombre: string
  color: string
  tamaño: string
  esterilizado: boolean
  descripcion: string
  fechaNacimiento: Date | null
  especie: string
  raza: string
  sexo: string
}

export const petInitial = {
  ID: '',
  nombre: '',
  color: '',
  tamaño: '',
  esterilizado: false,
  descripcion: '',
  fechaNacimiento: new Date(),
  especie: '',
  raza: '',
  sexo: ''
}

export const petDetailsInitial = {
  ID: '',
  nombre: '',
  color: '',
  tamaño: '',
  esterilizado: false,
  descripcion: '',
  fechaNacimiento: new Date(),
  especie: '',
  raza: '',
  sexo: '',
  enAdopcion: false,
  fotos: [],
  vacunas: [],
  createdAt: new Date(),
  updatedAt: new Date()
}

export const animalSizes = [
  {
    value: 'pequeño',
    label: 'pequeño',
  },
  {
    value: 'mediano',
    label: 'mediano',
  },
  {
    value: 'grande',
    label: 'grande',
  },
]
export interface IPetFormAttributesErrors {
  nombre: string
  color: string
  tamaño: string
  esterilizado: string
  descripcion: string
  fechaNacimiento: string
  especie: string
  sexo: string
}


export interface IPets {
  ID: string
  nombre: string
  color: string
  tamaño: string
  esterilizado: boolean
  enAdopcion: boolean
  descripcion: string
  fechaNacimiento: Date
  especie: string
  fotos: IFoto[]
  sexo: string
  vacunas: IVacuna[]
  createdAt: Date
  updatedAt: Date
}

export interface IPetsLits {
  ID: string
  nombre: string
  color: string
  tamaño: string
  esterilizado: boolean
  enAdopcion: boolean
  fechaNacimiento: Date
  especie: string
  sexo: string
  createdAt: Date
  updatedAt: Date
}


export interface IHeadCellPets {
  disablePadding: boolean
  id: keyof IPetsLits
  label: string
  numeric: boolean
}

export const headCellsPets: readonly IHeadCellPets[] = [
  {
    id: 'nombre',
    numeric: true,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'color',
    numeric: true,
    disablePadding: false,
    label: 'Color',
  },
  {
    id: 'tamaño',
    numeric: true,
    disablePadding: false,
    label: 'Tamaño',
  },
  {
    id: 'esterilizado',
    numeric: true,
    disablePadding: false,
    label: 'Esterilizado',
  },
  {
    id: 'enAdopcion',
    numeric: true,
    disablePadding: false,
    label: 'En Adopcion',
  },
  {
    id: 'fechaNacimiento',
    numeric: true,
    disablePadding: false,
    label: 'Fecha Nacimiento',
  },
  {
    id: 'especie',
    numeric: true,
    disablePadding: false,
    label: 'Especie',
  },
  {
    id: 'sexo',
    numeric: true,
    disablePadding: false,
    label: 'Sexo',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Fecha Creación',
  },
  {
    id: 'updatedAt',
    numeric: true,
    disablePadding: false,
    label: 'Fecha de actualización',
  },
]

