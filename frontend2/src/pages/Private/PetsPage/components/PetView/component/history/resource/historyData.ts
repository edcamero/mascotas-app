export interface IHistory {
    id: string
    title: string
    description: string
    createdAt: Date
}

export interface IHistoryPet {
    histories: IHistory[]
}


export interface IHeadCellPetHistory {
    disablePadding: boolean
    id: keyof IHistory
    label: string
    numeric: boolean
}

export const headCellsPetHistory: readonly IHeadCellPetHistory[] = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'Peso',
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: 'Peso',
    },
    {
        id: 'description',
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