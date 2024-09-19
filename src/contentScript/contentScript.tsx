import React, { useEffect, useState } from 'react'
import WeatherCard from '../components/WheatherCard'
import { createRoot } from 'react-dom/client'
import './contentScript.css'
import { getStoredOption, localStorageOptions } from '../utils/storage'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Paper,
  InputBase,
  IconButton,
  Grid2,
  TextField,
} from '@mui/material'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<localStorageOptions | null>(null)

  if (!options) {
    return null
  }

  return (
    <Card className="overlayCard">
      <WeatherCard city="Toronto" tempScale="metric" />
    </Card>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
