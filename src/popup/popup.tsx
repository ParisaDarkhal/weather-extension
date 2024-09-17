import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import WeatherCard from './WheatherCard'

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Isfahan" />
      <WeatherCard city="Atlanta" />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
