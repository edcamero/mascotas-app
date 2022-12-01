export interface ISponsorPet {
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
}
export interface ISponsorPetError {
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
}

export const sponsorDefault: ISponsorPet = {

    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
}

export const sponsorDefaultErrors: ISponsorPetError = {

    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
}