import { endpoints } from './constants'
import { FwewError, FwewNumber } from './types'

/**
 * Convert a decimal integer in closed range [0,32767] to Na'vi
 * @param num number to convert to Na'vi;
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<FwewNumber | FwewError>}
 */
export async function numberToNavi(
  num: number,
  init?: RequestInit
): Promise<FwewNumber | FwewError> {
  const url = endpoints.number_to_navi_url.replace('{num}', num.toString())
  const response = await fetch(url, init)
  return (await response.json()) as FwewNumber | FwewError
}

/**
 * Convert a Na'vi number word to decimal and octal
 * @param word Na'vi number word
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<FwewNumber | FwewError>}
 */
export async function naviToNumber(
  word: string,
  init?: RequestInit
): Promise<FwewNumber | FwewError> {
  const url = endpoints.navi_to_number_url.replace('{word}', word)
  const response = await fetch(url, init)
  return (await response.json()) as FwewNumber | FwewError
}
