import ICardInformation from "./ICardInformation"
import photoSpecies from "../../../Static/images/photo-species.png"
import photoUsers from "../../../Static/images/photo-users.png"
import photoPets from "../../../Static/images/photo-pets.png"
import photoAdopts from "../../../Static/images/photo-adopt.png"
import photoSponsor from "../../../Static/images/photo-sponsor.png"

export const cardOptionList: ICardInformation[] = [
    {
        id: 1,
        image: photoSpecies,
        title: 'Gestion de Especies',
        description: '',
        url: '/species',
        isAbsolute: false,
    },
    {
        id: 2,
        image: photoUsers,
        title: 'Gestion de Usuarios',
        description: '',
        url: '/users',
        isAbsolute: false,
    },
    {
        id: 3,
        image: photoPets,
        title: 'Gestion de Animales',
        description: '',
        url: '/pets',
        isAbsolute: false,
    },
    {
        id: 4,
        image: photoAdopts,
        title: 'Gestion de Adopciones',
        description: '',
        url: '/adot',
        isAbsolute: false,
    },
    {
        id: 4,
        image: photoSponsor,
        title: 'Gestion de Apadrinamientos',
        description: '',
        url: '/adot',
        isAbsolute: false,
    },
]
