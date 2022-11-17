import { IFoto } from "../../../Private/PetsPage/resource/usePets"

export interface IPetsPublic {
    ID: string
    nombre: string
    color: string
    tamaño: string
    esterilizado: boolean
    enAdopcion: boolean
    fechaNacimiento: Date
    especie: string
    raza:string
    fotos: IFoto[]
    sexo: string
    createdAt: Date
    updatedAt: Date
  }

  export const petInitialPublic = {
    ID: '',
    nombre: '',
    color: '',
    tamaño: '',
    esterilizado: false,
    descripcion: '',
    fechaNacimiento: new Date(),
    especie: '',
    fotos: [{id:'',url:''}],
    raza: '',
    sexo: ''
  }