import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import DeleteConfirmationMessage from '../../../../../components/Alerts/DeleteConfirmationMessage.component'
import alertsList from '../../../../../components/Alerts/Resources/AlertsList'
import useAxios from '../../../../../services/axios.services'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
interface ISpecieDeleteProps {
  specieId: string
  setAlertMessage: (value: IMessageAttributes) => void
}
const SpecieDelete: React.FC<ISpecieDeleteProps> = ({ specieId, setAlertMessage }) => {
  const { axios } = useAxios()
  const [openAlert, setOpenAlert] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const deleteSpecieOnClick = () => {
    setIsLoading(true)
    axios
      .delete(process.env.REACT_APP_API_URL + 'admin/species/' + specieId)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_DELETED)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <DeleteConfirmationMessage
        content={alertsList.ALLOW_DELETE_ITEM.message}
        onClickAccept={deleteSpecieOnClick}
        title={alertsList.ALLOW_DELETE_ITEM.title}
        open={openAlert}
        setOpen={setOpenAlert}
        data-testid={'test-confirmation-message'}
      />
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => setOpenAlert(true)}
        data-testid="button-delete-forest-features"
      >
        <DeleteIcon />
        Eliminar
      </Button>
    </>
  )
}

export default SpecieDelete
