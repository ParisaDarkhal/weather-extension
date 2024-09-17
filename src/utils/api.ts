const OPEN_WEATHER_API_KEY = 'ae11ba5de350e5ab9401e30d33257531'

export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    speed: number
    deg: number
  }
}

export async function fetchOpenWeatherData(
  city: string
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  )

  if (!res) {
    throw new Error('City not found!')
  }

  const data: OpenWeatherData = await res.json()
  return data
}
