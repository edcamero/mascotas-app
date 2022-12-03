import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Link,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ICardInformation from '../resources/ICardInformation'

const CardDashboard: React.FC<ICardInformation> = (props) => {
  let navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: '100%', padding: '5px', Height: (theme) => theme.spacing(30) }}>
      {props.url !== '' && (
        <CardActionArea
          component="a"
          sx={{ minHeight: (theme) => theme.spacing(25) }}
          onClick={() => {
            navigate(props.url)
          }}
          data-testid="card-actionArea"
        >
          {props.image !== '' && (
            <CardMedia
              title="Image title"
              image={props.image}
              sx={{ width: '150px', height: '150px', margin: '0 auto' }}
              data-testid="card-image"
            />
          )}
          <CardContent sx={{ minHeight: (theme) => theme.spacing(5) }}>
            {props.title !== '' && (
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                style={{ textAlign: 'center' }}
                data-testid="card-title"
              >
                {props.title}
              </Typography>
            )}
            {props.description !== '' && (
              <Typography
                variant="body2"
                component="p"
                color="textSecondary"
                data-testid="card-description"
              >
                {props.description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      )}
      {props.url !== '' && (
        <CardActions>
          <Link
            variant="body2"
            color="secondary"
            data-testid="card-link"
            onClick={() => {
              navigate(props.url)
            }}
          >
            <OpenInNewIcon color="secondary" />
            <Typography
              style={{ position: 'relative', left: '5px', top: '-7px' }}
              color="secondary"
              variant="button"
            >
              INGRESAR
            </Typography>
          </Link>
        </CardActions>
      )}
    </Card>
  )
}

export default CardDashboard
