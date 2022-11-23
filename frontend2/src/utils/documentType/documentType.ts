
export interface IDocumentType {
    value: string,
    label: string,
}
export const documentTypeOptions: IDocumentType[] = [
    {
        value: '',
        label: 'Seleccionar',
    },
    {
        value: 'CC',
        label: 'Cedula',
    },
    {
        value: 'pasaporte',
        label: 'Pasaporte',
    },
    {
        value: 'T.I',
        label: 'Tarjeta de Identidad',
    },
]
