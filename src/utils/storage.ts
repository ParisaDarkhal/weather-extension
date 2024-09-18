export interface localStorage {
  cities?: string[]
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
