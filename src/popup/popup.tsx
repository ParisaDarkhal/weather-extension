import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import WeatherCard from './WheatherCard'
import '@fontsource/roboto'
import { Box, Paper, InputBase, IconButton } from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import { setStoredCities, getStoredCities } from '../utils/storage'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')

  // Load stored cities when the component mounts
  useEffect(() => {
    getStoredCities().then((storedCities) => setCities(storedCities))
  }, [])

  // Function to update cities and save to storage
  const updateCities = (newCities: string[]) => {
    setCities(newCities)
    setStoredCities(newCities) // Persist the cities in chrome storage
  }

  const handleCityBtnClick = () => {
    if (cityInput === '') {
      return
    }
    const updatedCities = [...cities, cityInput]
    updateCities(updatedCities)
    setCityInput('')
  }

  const handleCityKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (cityInput === '') {
        return
      }
      const updatedCities = [...cities, cityInput]
      updateCities(updatedCities)
      setCityInput('') // Clear the input
    }
  }

  const handleCityDeleteBtnClick = (index: number) => {
    const updatedCities = cities.filter((_, i) => i !== index) // Avoid mutating state directly
    updateCities(updatedCities)
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
