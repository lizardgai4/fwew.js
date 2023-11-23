import { endpoints } from './constants'
import { LenitionTable, Version } from './types'

/**
 * Get the Na'vi lenition table
 * @returns {Promise<LenitionTable>}
 */
export async function lenition() {
  const url = endpoints.lenition_url
  const response = await fetch(url)
  const data = (await response.json()) as LenitionTable
  return data
}

/**
 * Get the version of fwew-api, fwew-lib, and the dictionary
 * @returns {Promise<Version>}
 */
export async function version() {
  const url = endpoints.version_url
  const response = await fetch(url)
  const data = (await response.json()) as Version
  return data
}
