import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { Card, CardContent, Box } from '@mui/material'
import './WeatherCard.css'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })

      .catch((err) => setCardState('error'))
  }, [city])

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
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
      <WeatherCardContainer>
        <Typography variant="body1">
          Error: Could not retrive weather data for this city.
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer>
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        Temperature: {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
