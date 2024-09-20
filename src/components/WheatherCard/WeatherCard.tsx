import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { Card, CardContent, Box, CardActions, Grid2 } from '@mui/material'
import './WeatherCard.css'
import {
  getWeatherIconSrc,
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from '../../utils/api'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button
              color="secondary"
              onClick={onDelete}
              className="weatherCard-body"
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })

      .catch((err) => setCardState('error'))
  }, [city, tempScale])

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Error: Could not retrive weather data for this city.'}
        </Typography>
      </WeatherCardContainer>
    )
  }
  // Check if weatherData and weatherData.main are properly defined
  if (!weatherData.main) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          Error: Could not retrive weather data for this city.
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid2 container justifyContent={'space-around'}>
        <Grid2>
          <Typography className="weatherCard-title">
            {weatherData.name}
          </Typography>
          <Typography className="weatherCard-body">
            Temperature: {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography className="weatherCard-body">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </Grid2>
        <Grid2>
          {weatherData.weather.length > 0 && (
            <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
          )}
          <Typography className="weatherCard-condition">
            {weatherData.weather[0].main}
          </Typography>
        </Grid2>
      </Grid2>
    </WeatherCardContainer>
  )
}

export default WeatherCard
