import getCurrentState from './getCurrentState'
import saveState from './saveState'

export default async function setIsScanning(isScanning = true) {
  const state = await getCurrentState()
  const res = await saveState({ ...state, isScanning })
  return res
}
