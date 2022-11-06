import { Button, Grid, ImageList, ImageListItem } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate, useParams } from 'react-router-dom'
import useAxios from '../../../../../../../services/axios.services'
import { IImage } from './resource/image'
import IMessageAttributes from '../../../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messagesList from '../../../../../../../components/MessagesComponent/Resources/MessagesList'
import messageAttributes from '../../../../../../../components/MessagesComponent/Resources/MessageAttributes'
import MessagesComponent from '../../../../../../../components/MessagesComponent/MessagesComponent'

const ImageView: React.FC = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(true)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const [images, setImages] = React.useState<IImage[]>([])
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + `admin/pets/${id}/photo`)
        .then((response) => setImages(response.data as IImage[]))
        .catch((error) => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
  return (
    <>
     <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.url}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container justifyContent="flex-end">
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => {
            navigate(`/pets/view/${id}/image/udpload`)
          }}
        >
          Subir imagenes
        </Button>
      </Grid>
    </>
  )
}

export default ImageView
