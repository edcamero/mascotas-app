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
import BackButtonComponent from '../../../../../components/BackButtonComponent/BackButtonComponent'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { formatDistanceToNow } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import { useNavigate, useParams } from 'react-router-dom'
import { UsePetView } from './usePetView'
import messageAttributes from '../../../../../components/MessagesComponent/Resources/MessageAttributes'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../components/MessagesComponent/MessagesComponent'
import EditIcon from '@mui/icons-material/Edit'
import SpecieDelete from '../../../SpeciesPage/components/SpecieDelete/SpecieDelete.component'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import InfoIcon from '@mui/icons-material/Info'
import PetViewTab from './PetViewTab.component'

interface IPetViewProps {}

const PetView: React.FC<IPetViewProps> = () => {
  let { id } = useParams()
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  const { isLoading, petDetails } = UsePetView(id ?? '', setAlertMessage)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  let navigate = useNavigate()

  const handleOnClickButtonEdit = React.useCallback(
    (id: string) => {
      navigate(`/pets/edit/${id}`)
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
                    <ListItemText primary="Descripcion" secondary={petDetails.descripcion} />
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
                    onClick={() => {
                      handleOnClickButtonEdit(petDetails.ID)
                    }}
                  >
                    Editar
                  </Button>
                  <SpecieDelete specieId={petDetails.ID} setAlertMessage={setAlertMessage} />
                </ButtonGroup>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <PetViewTab idPet={petDetails.ID} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default PetView
