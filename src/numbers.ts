import { endpoints } from './constants'
import { FwewError, FwewNumber } from './types'

export async function numberToNavi(num: number) {
  const url = endpoints.number_to_navi_url.replace('{num}', num.toString())
  const response = await fetch(url)
  const data = (await response.json()) as FwewNumber | FwewError
  return data
}

export async function naviToNumber(word: string) {
  const url = endpoints.navi_to_number_url.replace('{word}', word)
  const response = await fetch(url)
  const data = (await response.json()) as FwewNumber | FwewError
  return data
}
