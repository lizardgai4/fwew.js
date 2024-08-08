import { endpoints } from './constants'
import type { Word } from './types'

/**
 * Returns all the words with multiple IPAs
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function multiIPA(init?: RequestInit): Promise<Word[][]> {
  const url = endpoints.multi_ipa_url
  const response = await fetch(url, init)
  return (await response.json()) as Word[][]
}

/**
 * Returns all the words which fall outside normal Na'vi phonotactics
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function oddballs(init?: RequestInit): Promise<Word[][]> {
  const url = endpoints.oddballs_url
  const response = await fetch(url, init)
  return (await response.json()) as Word[][]
}

/**
 * Returns all the words with more than one dictionary entry
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<Word[][]>}
 */
async function homonyms(init?: RequestInit): Promise<Word[][]> {
  const url = endpoints.homonyms_url
  const response = await fetch(url, init)
  return (await response.json()) as Word[][]
}

/**
 * Returns whether the given string is valid Na'vi
 * @param {string} words words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string>}
 */
async function valid(words: string, init?: RequestInit): Promise<string> {
  const url = endpoints.validity_url.replace('{i}', words)
  const response = await fetch(url, init)
  return (await response.json()) as string
}

/**
 * Returns a string saying how long the dict is
 * @param {string} lang results/ui language
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string>}
 */
async function dictLen(lang: string, init?: RequestInit): Promise<string> {
  const url = endpoints.dict_len_url.replace('{lang}', lang);
  const response = await fetch(url, init)
  return (await response.json()) as string
}

/**
 * Returns reef dialect spelling and IPA given interdialect IPA
 * @param {string} words words to search
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string[]>}
 */
async function reefMe(words: string, init?: RequestInit): Promise<string[]> {
  const url = endpoints.reef_ipa_url.replace('{i}', words)
  const response = await fetch(url, init)
  return (await response.json()) as string[]
}

/**
 * Returns a map of how often every phoneme appears in Na'vi
 * @param {string} lang results/ui language
 * @param {RequestInit | undefined} init fetch options (optional)
 * @returns {Promise<string[][][]>}
 */

async function phonemeFrequency(lang: string, init?: RequestInit): Promise<string[][][]> {
  const url = endpoints.phonemes_url.replace('{lang}', lang);
  const response = await fetch(url, init)
  return (await response.json()) as Promise<string[][][]>
}

export {
  dictLen,
  homonyms,
  multiIPA,
  oddballs,
  phonemeFrequency,
  reefMe,
  valid
}
