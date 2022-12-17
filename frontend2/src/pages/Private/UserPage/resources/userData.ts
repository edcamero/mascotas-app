export interface IUsertLits {
    id: string
    username: string
    email: string
    fullname: string
    rol: string
    state: boolean
}
interface IRol { name: string }

export interface IUsertLitsApi {
    id: string
    username: string
    email: string
    fullname: string
    rol: IRol
    state: boolean
}


export interface IHeadCellUser {
    disablePadding: boolean
    id: keyof IUsertLits
    label: string
    numeric: boolean
}

export interface INewUser {
    id: string
    username: string
    email: string
    fullname: string
    password: string
    rol: IRol
}

export const userDefault: INewUser = {
    id: "",
    username: "",
    email: "",
    fullname: "",
    password: "",
    rol: { name: "" }
}

export interface IFormUserError {
    id: string
    username: string
    email: string
    fullname: string
    password: string
    rol: string
}

export const headCellsUser: readonly IHeadCellUser[] = [
    {
        id: 'username',
        numeric: true,
        disablePadding: false,
        label: 'Nombre',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'fullname',
        numeric: true,
        disablePadding: false,
        label: 'Nombre Completo',
    },
    {
        id: 'rol',
        numeric: true,
        disablePadding: false,
        label: 'Rol',
    }
]