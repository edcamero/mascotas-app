import React from 'react'
import { useNavigate } from 'react-router-dom'
import IMessageAttributes from '../../../../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../../../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../../../../../services/axios.services'

export interface IPetVacunes {
  ID: string
  nombre: string
  peso: number
  createdAt: Date
  nextControlAt: Date
  updatedAt: Date
}

export interface IPetVacunesForm {
  nombre: string
  peso: number
  createdAt: Date | null
  nextControlAt: Date | null
}

export interface IPetVacunesFormError {
  nombre: string
  peso: string
  createdAt: string
  nextControlAt: string
}

export const newVacuneDefault = {
  nombre: '',
  peso: 0,
  createdAt: new Date(),
  nextControlAt: null,
}

export const newVacuneDefaulterror = {
  nombre: '',
  peso: '',
  createdAt: '',
  nextControlAt: '',
}

export const dommiVacune = [
  {
    ID: '56465',
    nombre: 'Parvo Virus',
    peso: 8.6,
    createdAt: new Date(),
    nextControlAt: new Date(new Date().setFullYear(2023, 10)),
    updatedAt: new Date(),
  },
]
export interface IHeadCellPetVacune {
  disablePadding: boolean
  id: keyof IPetVacunes
  label: string
  numeric: boolean
}

export const headCellsPetVacune: readonly IHeadCellPetVacune[] = [
  {
    id: 'nombre',
    numeric: true,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'peso',
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
  {
    id: 'nextControlAt',
    numeric: true,
    disablePadding: false,
    label: 'Prox. Control',
  },
]

export const usePetVacune = (id: string) => {
  const { axios } = useAxios()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [vacunePet, setVacunePet] = React.useState<IPetVacunesForm>(newVacuneDefault)
  const [vacunePetError, setVacunePetError] =
    React.useState<IPetVacunesFormError>(newVacuneDefaulterror)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const handleOnSubmit = () => {
    setIsLoading(true)

    axios
      .post(process.env.REACT_APP_API_URL + `admin/pets/${id}/vacune/save`, vacunePet)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_CREATED)
        navigate(`/pets/view/${id}/peso/`)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  return {
    vacunePet,
    setVacunePet,
    isLoading,
    alertMessage,
    vacunePetError,
    setVacunePetError,
    handleOnSubmit,
  }
}
