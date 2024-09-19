import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto'
import './options.css'
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
import SaveIcon from '@mui/icons-material/Save'
import {
  setStoredOptions,
  getStoredOption,
  localStorageOptions,
} from '../utils/storage'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<localStorageOptions | null>(null)
  const [FormState, setFormState] = useState<FormState>('ready')

  useEffect(() => {
    getStoredOption().then((options) => setOptions(options))
  }, [])

  if (!options) {
    return null
  }

  const handleHomeCityChange = (homeCity: string) => {
    console.log('homeCity :>> ', homeCity)
    setOptions({ ...options, homeCity })
  }

  const handleSaveBtnClick = () => {
    setFormState('saving')
    if (options) {
      setStoredOptions(options).then(() => {
        setTimeout(() => {
          setFormState('ready')
        }, 1000)
      })
    }
  }

  const handleSaveKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setFormState('saving')
      if (options) {
        setStoredOptions(options).then(() => {
          setTimeout(() => {
            setFormState('ready')
          }, 1000)
        })
      }
    }
  }

  const isFieldsDisabled = FormState === 'saving'

  return (
    <Box mx={'10%'} my={'10%'}>
      <Card>
        <CardContent>
          <Grid2 container direction={'column'} spacing={3}>
            <Grid2>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldsDisabled}
                onKeyDown={handleSaveKeyPress}
              ></TextField>
            </Grid2>
            <Grid2>
              <Button
                variant="outlined"
                endIcon={<SaveIcon />}
                onClick={handleSaveBtnClick}
                disabled={isFieldsDisabled}
              >
                {FormState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
