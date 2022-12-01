import {
  Paper,
  Container,
  CssBaseline,
  Box,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ButtonGroup,
  Button,
} from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { useParams } from 'react-router-dom'
import esLocale from 'date-fns/locale/es'
import BackButtonComponent from '../../../../../components/BackButtonComponent/BackButtonComponent'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import SpecieDelete from '../../../SpeciesPage/components/SpecieDelete/SpecieDelete.component'
import { UseAdopt } from '../../resources/useAdopt'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import AdopterList from './components/AdopterList/AdopterList.component'

const AdoptView: React.FC = () => {
  let { id } = useParams()
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const { isLoading, adoptDetails } = UseAdopt(id ?? '', setAlertMessage)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <BackButtonComponent />
        <Container component="main" maxWidth="lg">
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
              {`Animal ${adoptDetails.pet.nombre}`}
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
                        new Date(adoptDetails.pet?.fechaNacimiento ?? new Date()),
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
                    <ListItemText primary="Tamaño" secondary={adoptDetails.pet.tamaño} />
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
                      secondary={adoptDetails.pet.tamaño ? 'SI' : 'NO'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <MaleIcon color={'info'} />
                      <FemaleIcon color={'info'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Sexo"
                      secondary={adoptDetails.pet.sexo === 'F' ? 'Hembra' : 'Macho'}
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
                    <ListItemText primary="Color" secondary={adoptDetails.pet.color} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <InfoIcon color={'secondary'} />
                    </ListItemAvatar>
                    <ListItemText primary="Descripcion" secondary={adoptDetails.pet.descripcion} />
                  </ListItem>
                </List>
              </Grid>
              <Grid container justifyContent="flex-end">
                <ButtonGroup disableElevation variant="contained">
                  <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <SpecieDelete specieId={adoptDetails.pet.ID} setAlertMessage={setAlertMessage} />
                </ButtonGroup>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {adoptDetails.adopters.length > 0 && (
                  <AdopterList adopters={adoptDetails.adopters} />
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default AdoptView
