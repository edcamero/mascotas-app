import React from 'react'
import { useNavigate } from 'react-router-dom'
import IMessageAttributes from '../../../../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../../../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../../../../../services/axios.services'

export interface IPesos {
  id: string
  peso: number
  createdAt: Date
}

export interface IPetPesos {
  controlPeso: IPesos[]
}

export interface IPetPesosForm {
  peso: number
}

export interface IPetPesosError {
  peso: string
}

export const defaultPesoForm = {
  peso: 0,
}

export const defaultPesoFormError= {
  peso: '',
}

export const dommiPeso = [
  {
    ID: '56465',
    peso: 8.6,
    createdAt: new Date(),
  },
]
export interface IHeadCellPetPesos {
  disablePadding: boolean
  id: keyof IPesos
  label: string
  numeric: boolean
}

export const headCellsPetPesos: readonly IHeadCellPetPesos[] = [
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
]

export const usePeso = (id:string) => {
  const { axios } = useAxios()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [petPeso, setPetPeso] = React.useState<IPetPesosForm>(defaultPesoForm)
  const [petPesoError, setPetPesoError] = React.useState<IPetPesosError>(defaultPesoFormError)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const handleOnSubmit = () => {
    setIsLoading(true)

    axios
      .post(process.env.REACT_APP_API_URL + `admin/pets/${id}/peso/save`, petPeso,)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_CREATED)
        navigate(`/pets/view/${id}/peso/`)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  return {petPeso, setPetPeso, isLoading , alertMessage, petPesoError , setPetPesoError, handleOnSubmit}
}
