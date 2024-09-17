import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import WeatherCard from './WheatherCard'
import '@fontsource/roboto'

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Isfahan" />
      <WeatherCard city="Atlanta" />
      <WeatherCard city="" />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
