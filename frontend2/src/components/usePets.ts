export interface IFoto {
  id: number
  url: string
}

export interface IVacuna {
  nombre: string
  fecha: Date
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
}
