import bytesToSize from './bytesToSize'
import round from './round'
export type fsaBrowserStorage = {
  percentageUsed: number
  remaining: number
  isAvailable: boolean
  remainingFormatted: string
}

/**
 * @category Utils
 */
async function checkBrowserStorage(): Promise<fsaBrowserStorage> {
  //  not available in safari tp v16.0 atm
  const defaultVal: fsaBrowserStorage = {
    percentageUsed: 0,
    remaining: 0,
    isAvailable: false,
    remainingFormatted: 'N/A',
  }
  if (navigator.storage && navigator.storage.estimate) {
    const quota = await navigator.storage.estimate()
    if (!quota.usage && !quota.quota) {
      return defaultVal
    }
    //   @ts-ignore - if we are here we have quota!
    const percentageUsed = round((quota.usage / quota.quota) * 100, 2)
    //   @ts-ignore - if we are here we have quota!
    const remaining = quota.quota - quota.usage

    return {
      percentageUsed,
      remaining,
      isAvailable: true,
      remainingFormatted: bytesToSize(remaining),
    }
  }
  return defaultVal
}

export default checkBrowserStorage
