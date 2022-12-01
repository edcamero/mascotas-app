export interface ID {
    $oid: string;
}

export interface IDireccion {
    ciudad: string;
    barrio: string;
    direccion: string;
}

export interface IDocumento {
    tipo: string;
    numero: string;
}

export interface IAdopter {
    documento: IDocumento;
    nombres: string;
    apellidos: string;
    direccion: IDireccion;
    telefono: string;
    email: string;
}

export interface IAdopterResponseApi {
    id: string
    documento: IDocumento
    nombres: string
    apellidos: string
    direccion: IDireccion
    telefono: string
    email: string
    estado: string
    createdAt: Date
}

export interface IAdopterList {
    id: string
    documento: string
    nombres: string
    apellidos: string
    direccion: string
    telefono: string
    email: string
    estado: string
    createdAt: Date
}

export const adopterDefault: IAdopter = {
    documento: {
        tipo: '',
        numero: '',
    },
    nombres: '',
    apellidos: '',
    direccion: {
        ciudad: '',
        barrio: '',
        direccion: ''
    },
    telefono: '',
    email: '',
}

export interface IAdopterErrors {
    tipoDocumento: string
    documento: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string;
}

export const errorAdopterDefault: IAdopterErrors = {
    tipoDocumento: '',
    documento: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: ''
}
