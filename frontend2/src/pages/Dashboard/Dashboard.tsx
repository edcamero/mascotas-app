import { Grid } from '@mui/material'
import React from 'react'
import CardDashboard from './components/CardDashboard.component'
import { cardOptionList } from './resources/dataCardInfomation'
import ICardInformation from './resources/ICardInformation'

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: '3rem', padding: '16px' }}>
      {cardOptionList.map((option: ICardInformation, index) => (
        <Grid item xs={12} sm={6} md={3} xl={3} data-testid="dashboard-card" key={option.id}>
          <CardDashboard
            id={option.id}
            image={option.image}
            title={option.title}
            description={option.description}
            url={option.url}
            isAbsolute={option.isAbsolute}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Dashboard
