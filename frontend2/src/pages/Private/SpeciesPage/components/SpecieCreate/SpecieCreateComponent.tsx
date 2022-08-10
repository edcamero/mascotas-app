import React from 'react'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../../services/axios.services'
import { INewSpecie, specieInitial } from '../../resource/speciesResource'
import SpecieFormComponent from '../SpecieForm/SpecieFormComponent'

const SpecieCreateComponent: React.FC = () => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(false)
  const titleForm = 'Formulario para la creación de especies'
  const [specieFormAttributes, setSpecieFormAttributes] = React.useState<INewSpecie>(specieInitial)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const clickFormSpecie = () => {
    setIsLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + 'admin/species', specieFormAttributes)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((response) => {})
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <SpecieFormComponent
        {...{ titleForm, specieFormAttributes, setSpecieFormAttributes, clickFormSpecie }}
      />
    </>
  )
}

export default SpecieCreateComponent
