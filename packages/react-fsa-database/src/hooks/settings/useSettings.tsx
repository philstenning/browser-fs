import { useState, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  db,
  updateSetting,
  createInitialSetting,
} from 'fsa-database'

export default function useSettings() {
  const [fsaSettings, setSettings] = useState(createInitialSetting())
  const settings = useLiveQuery(async () => {
    const setting = await db.settings.toCollection().last()
    return setting
  })
  // the settings is undefined until it loads
  // data, so use the useState to  give it a temp
  // object to load with.
  useEffect(() => {
    if (settings) {
      setSettings(settings)
    }
  }, [settings])

  const setFsaSettings = updateSetting

  return { fsaSettings, setFsaSettings }
}
