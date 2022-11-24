import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import BackDropLoadApi from '../../../../components/backDropLoad/BackDropLoadApi'
import PetsIcon from '@mui/icons-material/Pets'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import InfoIcon from '@mui/icons-material/Info'
import MessagesComponent from '../../../../components/MessagesComponent/MessagesComponent'
import BackButtonComponent from '../../../../components/BackButtonComponent/BackButtonComponent'
import { useNavigate, useParams } from 'react-router-dom'
import IMessageAttributes from '../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../components/MessagesComponent/Resources/MessageAttributes'
import { UsePetPublicDetails } from './usePetPublicDetails'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './PetPublicDetails.css'

const PetPublicDetails: React.FC = () => {
  let { id } = useParams()
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const { isLoading, petDetails } = UsePetPublicDetails(id ?? '', setAlertMessage)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  let navigate = useNavigate()

  const handleOnClickButtonAdot = React.useCallback(
    (id: string) => {
      navigate(`/pets/${id}/adopt`)
    },
    [navigate]
  )


  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <BackButtonComponent />
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              margin: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h2" variant="h5" align="center">
              {`Detalle Animal ${petDetails.nombre}`}
            </Typography>
            <Divider variant="middle" />
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Grid item xs={4}>
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <HourglassTopIcon color={'error'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Edad"
                      secondary={formatDistanceToNow(
                        new Date(petDetails?.fechaNacimiento ?? new Date()),
                        {
                          locale: esLocale,
                        }
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <TrendingUpIcon color={'warning'} />
                    </ListItemAvatar>
                    <ListItemText primary="Tamaño" secondary={petDetails.tamaño} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <ContentCutIcon color={'error'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Esterilizado"
                      secondary={petDetails.tamaño ? 'SI' : 'NO'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <MaleIcon color={'info'} />
                      <FemaleIcon color={'info'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Sexo"
                      secondary={petDetails.sexo === 'F' ? 'Hembra' : 'Macho'}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <ColorLensIcon color={'success'} />
                    </ListItemAvatar>
                    <ListItemText primary="Color" secondary={petDetails.color} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <InfoIcon color={'secondary'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Especie"
                      secondary={`${petDetails.especie} - ${petDetails.raza} `}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid container justifyContent="flex-end">
                <ButtonGroup disableElevation variant="contained">
                  <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    startIcon={<PetsIcon />}
                    onClick={() => {
                      handleOnClickButtonAdot(petDetails.ID)
                    }}
                  >
                    Adoctar
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className="carousel-wrapper"
                sx={{ marginTop: '2rem' }}
              >
                <Carousel>
                  {petDetails.fotos.map((photo, index) => {
                    return (
                      <div key={index}>
                        <img src={`${photo.url}`} />
                      </div>
                    )
                  })}
                </Carousel>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default PetPublicDetails
