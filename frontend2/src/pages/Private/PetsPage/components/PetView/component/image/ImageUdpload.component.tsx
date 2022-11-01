import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import BackDropLoadApi from '../../../../../../../components/backDropLoad/BackDropLoadApi'
import useAxios from '../../../../../../../services/axios.services'
import { Button, Grid } from '@mui/material'
import { DropzoneArea } from 'react-mui-dropzone'
import MessagesComponent from '../../../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../../../../../components/MessagesComponent/Resources/MessagesList'

const ImageUdpload: React.FC = () => {
  //let { id } = useParams()
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const handleOnLoad = (file: File) => {
    setFile(file)
    if (file !== null && file !== undefined) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
    }
  }

  const handleOnSubmit = () => {
    setIsLoading(true)
    let formData = new FormData()

    formData.append('file', file ?? '', 'stickers.jpg')

    axios
      .post(process.env.REACT_APP_API_URL + `admin/upload`, formData, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'multipart/form-data',
        },
      })
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
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={'Arrastra y suelta una imagen aquí o haz clic'}
        onChange={(files) => handleOnLoad(files[0])}
        filesLimit={1}
        onDelete={() => setFile(null)}
      ></DropzoneArea>
      <Grid container justifyContent="flex-end">
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => {
            handleOnSubmit()
          }}
        >
          Subir iamgenes
        </Button>
      </Grid>
    </>
  )
}

export default ImageUdpload
