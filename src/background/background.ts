import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    tempScale: 'metric',
    homeCity: '',
    hasAutoOverlay: false,
  })

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension',
  })
})

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText])
  })
})
