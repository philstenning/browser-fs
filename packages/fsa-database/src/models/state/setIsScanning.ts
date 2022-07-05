import getCurrentState from '@state/getCurrentState'
import saveState from '@state/saveState'

export default async function setIsScanning(isScanning = true) {
  const state = await getCurrentState()
  const res = await saveState({ ...state, isScanning })
  return res
}
