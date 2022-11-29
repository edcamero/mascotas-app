export interface IUsertLits {
    ID: string
    username: string
    email: string
    fullname: string
    rol: string
    state: boolean
}
interface IRol { name: string }

export interface IUsertLitsApi {
    ID: string
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