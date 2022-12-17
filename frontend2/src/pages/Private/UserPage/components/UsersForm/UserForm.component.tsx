import React from 'react'
import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import BackButtonComponent from '../../../../../components/BackButtonComponent/BackButtonComponent'
import { IFormUserError, INewUser } from '../../resources/userData'

interface IUserFormProps {
  titleForm: string
  userFormAttributes: INewUser
  setUserFormAttributes: (value: INewUser) => void
  clickFormUser: () => void
  specieErrors?: IFormUserError
}

const UserForm: React.FC<IUserFormProps> = (props) => {
  const handleOnClickButton = () => {
    props.clickFormUser()
  }
  return (
    <>
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <BackButtonComponent />
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h2" variant="h5" align="center">
              {props.titleForm}
            </Typography>
            <Divider />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 1, m: 2 }}
            >
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    props.setUserFormAttributes({
                      ...props.userFormAttributes,
                      username: e.target.value as string,
                    })
                  }
                  value={props.userFormAttributes.username}
                  data-testid="text-title-news"
                  error={props.specieErrors?.username ? true : false}
                  helperText={props.specieErrors?.username}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    props.setUserFormAttributes({
                      ...props.userFormAttributes,
                      email: e.target.value as string,
                    })
                  }
                  value={props.userFormAttributes.email}
                  data-testid="test-field-email"
                  error={props.specieErrors?.email ? true : false}
                  helperText={props.specieErrors?.email}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="fullname"
                  label="fullname"
                  name="fullname"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    props.setUserFormAttributes({
                      ...props.userFormAttributes,
                      fullname: e.target.value as string,
                    })
                  }
                  value={props.userFormAttributes.fullname}
                  data-testid="test-field-fullname"
                  error={props.specieErrors?.fullname ? true : false}
                  helperText={props.specieErrors?.fullname}
                />
              </Grid>
              
              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={props.userFormAttributes.username === ''}
                  onClick={() => {
                    handleOnClickButton()
                  }}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default UserForm
