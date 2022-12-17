import React from 'react'
import MessagesComponent from '../../components/MessagesComponent/MessagesComponent'
import FormSuggestPet from './components/FormSuggestPet.component'
import { useSuggestPet } from './resources/useSuggestPet'

const SuggestPet: React.FC = () => {
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const { isLoading, suggest, setSuggest, errorsSuggest, handleOnClickButton, alertMessage } =
    useSuggestPet()

  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])

  return (
    <>
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <FormSuggestPet {...{ isLoading, suggest, setSuggest, errorsSuggest, handleOnClickButton }} />
    </>
  )
}

export default SuggestPet
