import { OpenWeatherTempScale } from './api'
export interface localStorage {
  cities?: string[]
  options?: localStorageOptions
}

export interface localStorageOptions {
  tempScale: OpenWeatherTempScale
}

export type LocalStorageKeys = keyof localStorage

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: localStorage = {
    cities,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: localStorage) => {
      resolve(res.cities ?? [])
    })
  })
}

export function setStoredOptions(options: localStorageOptions): Promise<void> {
  const vals: localStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOption(): Promise<localStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: localStorage) => {
      resolve(res.options)
    })
  })
}
