import { IAdopter } from "../../../AdoptionApplication/resources/adopter"
import { IPetsLits } from "../../PetsPage/resource/usePets"

export interface IAdoptLitsApi {
    ID: string
    pet: IPetsLits
    adopter: IAdopter
}


export interface IAdoptLits {
    ID: string
    nombre: string
    color: string
    tamaño: string
    esterilizado: boolean
    enAdopcion: boolean
    fechaNacimiento: Date
    especie: string
    sexo: string
}

export interface IAdoptLitsResponse {
    pet: IAdoptLits
}

export interface IHeadCellAdopts {
    disablePadding: boolean
    id: keyof IAdoptLits
    label: string
    numeric: boolean
}

export const headCellsAdopts: readonly IHeadCellAdopts[] = [
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
]