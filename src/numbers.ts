import { endpoints } from './constants'
import { FwewError, FwewNumber } from './types'

/**
 * Convert a decimal integer in closed range [0,32767] to Na'vi
 * @param num number to convert to Na'vi;
 * @returns {Promise<FwewNumber | FwewError>}
 */
export async function numberToNavi(num: number) {
  const url = endpoints.number_to_navi_url.replace('{num}', num.toString())
  const response = await fetch(url)
  const data = (await response.json()) as FwewNumber | FwewError
  return data
}

/**
 * Convert a Na'vi number word to decimal and octal
 * @param word Na'vi number word
 * @returns {Promise<FwewNumber | FwewError>}
 */
export async function naviToNumber(word: string) {
  const url = endpoints.navi_to_number_url.replace('{word}', word)
  const response = await fetch(url)
  const data = (await response.json()) as FwewNumber | FwewError
  return data
}
