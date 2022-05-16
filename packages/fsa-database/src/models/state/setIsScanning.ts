import { getCurrentState, saveState } from './'

export default async function setIsScanning(isScanning = true) {
  console.log('first')
  const state = await getCurrentState()
  console.log('sss')
  const res = await saveState({ ...state, isScanning })
  console.log('tt')
  return res
}
