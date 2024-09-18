import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import WeatherCard from './WheatherCard'
import '@fontsource/roboto'
import { Box, Paper, InputBase, IconButton, Grid } from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    'Isfahan',
    'Atlanta',
    'error',
  ])

  const [cityInput, setCityInput] = useState<string>('')
  console.log('cityInput :>> ', cityInput)

  const handleCityBtnClick = () => {
    if (cityInput === '') {
      return
    }
    setCities([...cities, cityInput])
    setCityInput('')
  }

  const handleCityKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (cityInput === '') {
        return
      }
      setCities([...cities, cityInput])
      setCityInput('')
    }
  }

  const handleCityDeleteBtnClick = (index: number) => {
    cities.splice(index, 1)
    setCities([...cities])
  }

  return (
    <Box mx="5px" my="16">
      <Paper>
        <Box px="20px" py="5px">
          <InputBase
            placeholder="Add a city name"
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
            onKeyDown={handleCityKeyPress}
          />
          <IconButton onClick={handleCityBtnClick}>
            <AddLocationIcon />
          </IconButton>
        </Box>
      </Paper>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteBtnClick(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
