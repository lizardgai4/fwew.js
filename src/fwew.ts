import { endpoints } from './constants'
import type { LanguageCode, Word } from './types'

/**
 * Search 1 or more words in both directions (Na'vi first)
 * @param {LanguageCode} lang
 * @param {string} words
 * @returns {Word[][]}
 */
async function search(lang: LanguageCode, words: string) {
  if (words === '') return [[]]
  const url = endpoints.search_url
    .replace('{lang}', lang)
    .replace('{words}', words)
  const response = await fetch(url)
  const data = (await response.json()) as Word[][]
  return data
}

/**
 * Search 1 or more words Na'vi -> Local
 * @param {string} navi
 * @returns {Word[][]}
 */
async function fwew(navi: string) {
  if (navi === '') return [[]]
  const url = endpoints.fwew_url.replace('{nav}', navi)
  const response = await fetch(url)
  const data = (await response.json()) as Word[][]
  return data
}

/**
 * Search 1 or more words Local -> Na'vi
 * @param {LanguageCode} lang
 * @param {string} local
 * @returns {Word[][]}
 */
async function fwewReverse(lang: LanguageCode, local: string) {
  if (local === '') return [[]]
  const url = endpoints.fwew_reverse_url
    .replace('{lang}', lang)
    .replace('{local}', local)
  const response = await fetch(url)
  const data = (await response.json()) as Word[][]
  return data
}

/**
 * Search 1 or more words Na'vi -> Local, return only 1D array
 * @param {string} navi
 * @returns {Word[]}
 */
async function fwew1D(navi: string) {
  if (navi === '') return []
  const url = endpoints.fwew_1d_url.replace('{nav}', navi)
  const response = await fetch(url)
  const data = (await response.json()) as Word[]
  return data
}

/**
 * Search 1 or more words Local -> Na'vi, return only 1D array
 * @param {LanguageCode} lang
 * @param {string} local
 * @returns {Word[]}
 */
async function fwew1DReverse(lang: LanguageCode, local: string) {
  if (local === '') return []
  const url = endpoints.fwew_1d_reverse_url
    .replace('{lang}', lang)
    .replace('{local}', local)
  const response = await fetch(url)
  const data = (await response.json()) as Word[]
  return data
}

/**
 * Search 1 or more words Na'vi -> Local, ignoring all affixed words
 * Use this only when you know you are searching a listed root word
 * @param {string} navi
 * @returns {Word[][]}
 */
async function fwewSimple(navi: string) {
  if (navi === '') return [[]]
  const url = endpoints.fwew_simple_url.replace('{nav}', navi)
  const response = await fetch(url)
  const data = (await response.json()) as Word[][]
  return data
}

export { fwew, fwew1D, fwew1DReverse, fwewReverse, fwewSimple, search }
