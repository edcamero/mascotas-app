import React from 'react'
import { useParams } from 'react-router-dom'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import Petsform from '../PetsForm/Petsform.component'
import { usePetEdit } from './usePetEdit'

const titleForm = 'Formulario para editar Animales'

const PetEdit: React.FC = () => {
    let { id } = useParams()
    const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
    const {isLoading,petFormAttributes, setPetFormAttributes, clickFormPet} = usePetEdit( id ?? '', setAlertMessage)
    const [openMessage, setOpenMessage] = React.useState<boolean>(false)
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

export default PetEdit
