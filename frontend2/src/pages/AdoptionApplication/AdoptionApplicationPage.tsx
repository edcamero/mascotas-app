import React from 'react'
import { useParams } from 'react-router-dom'
import MessagesComponent from '../../components/MessagesComponent/MessagesComponent'
import FormAdoptionApplication from './components/FormAdoptionApplication.component'
import { useAdopter } from './resources/useAdopter'

const AdoptionApplicationPage = () => {
 
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  let { id } = useParams()
  const { adopter, setAdopter, errorsAdopter, handleOnClickButton, alertMessage } = useAdopter(id ?? '')
  

  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])
  return (
    <>
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <FormAdoptionApplication {...{ adopter, setAdopter, handleOnClickButton, errorsAdopter }} />
    </>
  )
}

export default AdoptionApplicationPage
