import React from 'react'
import { useParams } from 'react-router-dom'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import SpecieFormComponent from '../SpecieForm/SpecieFormComponent'
import { UseSpecieUpdate } from './useSpecieUpdate'

const titleForm = 'Formulario para la actualizar especies'

const SpecieUpdateComponent = () => {
  let { id } = useParams()

  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const {
    isLoadingAll: isLoading,
    clickFormSpecie,
    specieFormAttributes,
    setSpecieFormAttributes,
  } = UseSpecieUpdate(id ?? '', setAlertMessage)

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

export default SpecieUpdateComponent
