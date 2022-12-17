import React from 'react'
import { useParams } from 'react-router-dom'
import MessagesComponent from '../../components/MessagesComponent/MessagesComponent'
import FormSponsorPet from './components/FormSponsorPet.component'
import { useSponsorPet } from './resources/useSponsorPet'

const SponsorPet: React.FC = () => {
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  let { id } = useParams()
  const { isLoading, sponsor, setSponsor, errorsSponsor, handleOnClickButton, alertMessage } =
    useSponsorPet(id ?? '')

  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])

  return (
    <>
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <FormSponsorPet
        {...{ isLoading, sponsor, setSponsor, errorsSponsor, handleOnClickButton, alertMessage }}
      />
    </>
  )
}

export default SponsorPet
