import React from 'react'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import { IPetRegister, petInitial } from '../../resource/usePets'
import Petsform from '../PetsForm/Petsform.component'
import useAxios from '../../../../../services/axios.services'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'

const PestCreate: React.FC = () => {
  const { axios } = useAxios()
  const titleForm = 'Formulario para el registro de Animales'
  const [isLoading, setIsLoading] = React.useState(false)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [petFormAttributes, setPetFormAttributes] = React.useState<IPetRegister>(petInitial)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const clickFormPet = () => {
    setIsLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + 'admin/pets', petFormAttributes)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_CREATED)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Petsform
        {...{ titleForm, petFormAttributes, setPetFormAttributes, clickFormPet, setAlertMessage }}
      />
    </>
  )
}

export default PestCreate
