import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { Card, CardContent, Box } from '@mui/material'

import './WeatherCard.css'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
      })

      .catch((err) => console.log(err))
  }, [city])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ p: 1 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="body1">
            Temperature: {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default WeatherCard
