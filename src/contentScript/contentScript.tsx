import React, { useEffect, useState } from 'react'
import WeatherCard from '../components/WheatherCard'
import { createRoot } from 'react-dom/client'
import './contentScript.css'
import { getStoredOption, localStorageOptions } from '../utils/storage'
import { Card } from '@mui/material'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<localStorageOptions | null>(null)
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    getStoredOption().then((options) => {
      setOptions(options)
      setIsActive(options.hasAutoOverlay)
    })
  },[])

  if (!options) {
    return null
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => {
              setIsActive(false)
            }}
          />
        </Card>
      )}
    </>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
